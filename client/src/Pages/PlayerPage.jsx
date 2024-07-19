import { useEffect, useState, useContext } from 'react';
import Summoner from '../components/Summoner';
import { getMatch, getMatchHistory } from '../api';
import CurrentGame from '../components/CurrentGame';
import MyContext from '../contexts/PlayerContext';
import Loading from '../components/Loading';


const PlayerPage = () => {
    const [matches, setMatches] = useState(null);
    const [matchesInfo, setMatchesInfo] = useState(null);
    const [playerMatches, setPlayerMatches] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const player = localStorage.getItem('player');
    const puuid = JSON.parse(player).puuid;
    const { participantsInfo, setParticipantsInfo } = useContext(MyContext)


    // Fetch match history for the player
    useEffect(() => {
        const fetchGames = async () => {
            const response = await getMatchHistory(puuid);
            setMatches(response);
            console.log(response);

        };
        if (puuid) {
            console.log("first");
            fetchGames();
        }
    }, [puuid]);

    useEffect(() => {
        const fetchMatchesInfo = async () => {

            const halfwayIndex = Math.ceil(matches.length / 2);
            const firstHalf = matches.slice(0, halfwayIndex);
            const secondHalf = matches.slice(halfwayIndex);

            const fetchMatches = async (matchesArray) => {
                const matchesData = matchesArray.map(async (match) => {
                    const matchinfo = await getMatch(match);
                    return matchinfo;
                });
                return Promise.all(matchesData);
            };

            const firstHalfMatches = await fetchMatches(firstHalf);
            setMatchesInfo(firstHalfMatches);

            setIsLoading(true);

            setTimeout(async () => {

                const secondHalfMatches = await fetchMatches(secondHalf);

                setMatchesInfo((prevMatchesInfo) => [...prevMatchesInfo, ...secondHalfMatches]);

                setIsLoading(false);
            }, 3000);
        }

        if (matches) {
            console.log("second");
            fetchMatchesInfo();
        }
    }, [matches]);

    useEffect(() => {
        const fetchPlayerMatches = () => {
            const playerMatchesMap = {};
            participantsInfo.forEach((player) => {
                matchesInfo.forEach((match) => {
                    const participants = match.metadata.participants;
                    if (participants.includes(player.puuid) && player.puuid !== puuid) {
                        if (!playerMatchesMap[player.puuid]) {
                            playerMatchesMap[player.puuid] = {
                                playerID: player.puuid,
                                matches: [],
                            };
                        }
                        playerMatchesMap[player.puuid].matches.push({
                            match: match.info,
                            gameMode: match.info.gameMode,
                            gameDuration: match.info.gameDuration,
                        });
                    }
                });
            });
            setPlayerMatches(playerMatchesMap);
        };
        if (matchesInfo && participantsInfo) {
            console.log("third");
            fetchPlayerMatches();
        }
    }, [matchesInfo, participantsInfo]);

    console.log(playerMatches);

    return (
        <div className="flex flex-col gap-20 ml-12 mr-12">
            <Summoner />
            {isLoading ? <Loading /> : <CurrentGame participantsInfo={participantsInfo} puuid={puuid} matches={playerMatches} />
            }
        </div>
    )
}

export default PlayerPage;