import champions from '../data/champions.json';
import summonerSpells from '../data/summonerSpells.json';

const MatchHistory = ({ matches, player, puuid }) => {

  const csPerMin = (cs, duration) => {
    if (duration === 0) return 'N/A';
    return (cs / (duration)).toFixed(1);
  };

  const kdaRatio = (kills, deaths, assists) => {
    if (deaths === 0) return 'Perfect';
    return ((kills + assists) / deaths).toFixed(2);
  };

  const kda = (kills, deaths, assists) => {
    return `${kills} / ${deaths} / ${assists}`;
  };

  return (
    <div>
      <h4 className="text-white font-bold mb-2">Match History</h4>
      {matches[player.puuid]?.matches.map((match, matchIndex) => (
        <div key={matchIndex} className="mb-4">

          {match.match.participants.filter((participant) => participant.puuid === puuid).map((participant, index) => (
            <div key={index} className={`flex items-center text-white rounded-lg p-4 pl-8 pr-8 w-full h-auto space-x-4 justify-between ${participant.win ? 'bg-green-500' : 'bg-red-500'}`}>
              <div className='flex '>
                <div className="flex flex-col items-center pr-4">
                  <div className="font-extrabold text-gray-300">{match.gameMode}</div>
                  <div className="font-bold text-gray-100 text-sm">{participant.win ? "WIN" : "LOSS"} </div>
                  <div className="font-bold text-gray-100 text-sm">{(match.gameDuration / 60).toFixed(0)} mins</div>
                </div>
                <div className="flex items-center space-x-4">
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${participant.championName}.png`} alt="Champion" className="w-14 h-14" />
                  <div className="flex flex-col gap-1 ">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summonerSpells[participant.summoner1Id]}.png`} alt="Spell1" className="w-6 h-6" />
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summonerSpells[participant.summoner2Id]}.png`} alt="Spell2" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold">{kda(participant.kills, participant.deaths, participant.assists)}</div>
                    <div className="text-sm text-gray-200">{kdaRatio(participant.kills, participant.deaths, participant.assists)} KDA</div>
                    <div className="text-sm text-gray-200">{participant.neutralMinionsKilled + participant.totalMinionsKilled} CS ({csPerMin((participant.neutralMinionsKilled + participant.totalMinionsKilled), ((match.gameDuration) / 60))} per min)</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 pl-20  ">
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item0}.png`} alt="Item0" className="w-8 h-8" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item1}.png`} alt="Item1" className="w-8 h-8" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item2}.png`} alt="Item2" className="w-8 h-8" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item3}.png`} alt="Item3" className="w-8 h-8" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item4}.png`} alt="Item4" className="w-8 h-8" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${participant.item5}.png`} alt="Item5" className="w-8 h-8" />
                </div>
              </div>
              <div className="grid grid-cols-2 font-poppins font-bold text-sm">
                <div>
                  {match.match.participants.slice(0, 5).map((participant, index) => (
                    <div key={index} className="flex items-center space-x-2 ">
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champions[participant.championId]}.png`} alt="Player Icon" className="w-5 h-5" />
                      {participant.puuid === puuid ? <div className="text-xs truncate bold " style={{ maxWidth: '70px' }}>{participant.riotIdGameName}</div> :
                        <div className="text-xs truncate bold text-gray-600  " style={{ maxWidth: '70px' }}>{participant.riotIdGameName}</div>
                      }
                    </div>
                  ))}
                </div>
                <div>
                  {match.match.participants.slice(5).map((participant, index) => (
                    <div key={index} className="flex items-center space-x-2 ">
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champions[participant.championId]}.png`} alt="Player Icon" className="w-5 h-5" />
                      {participant.puuid === puuid ? <div className="text-xs truncate bold" style={{ maxWidth: '70px' }}>{participant.riotIdGameName}</div> :
                        <div className="text-xs truncate bold text-gray-600 " style={{ maxWidth: '70px' }}>{participant.riotIdGameName}</div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MatchHistory;