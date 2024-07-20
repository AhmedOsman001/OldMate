import React, { useState } from 'react';
import NoGame from './NoGame';
import champions from '../data/champions.json';
import summonerSpells from '../data/summonerSpells.json';
import MatchHistory from './MatchHistory';

const CurrentGame = ({ participantsInfo, puuid, matches, clicked }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className=' flex justify-center items-center mb-24 h-auto'>
      {participantsInfo && (
        <table className="w-2/3 bg-gray-800 text-gray-300 ">
          <tr className='bg-gray-700'>
            <td colSpan={3} className='text-xl p-2 pl-5 font-bold text-gray-300'>Classic</td>
          </tr>
          <tbody>
            {participantsInfo.map((player) =>
            (
              <React.Fragment key={player.puuid}>
                <tr className={`   ${player.teamId === 100 ? "bg-blue-800" : "bg-red-900"} h-16`}>
                  <td className="py-2 px-4">
                    <div className="flex items-center   ">
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champions[player.championId]}.png`} alt="Player Icon" className="w-10 h-10 border-teal-800" />
                      <div className="flex flex-col gap-0 ">
                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summonerSpells[player.spell1Id]}.png`} alt="Spell1" className="w-5 h-5" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summonerSpells[player.spell2Id]}.png`} alt="Spell2" className="w-5 h-5" />
                      </div>
                      <p className='pl-2'>{player.riotId} </p>
                    </div>

                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col items-center">
                      {matches ? matches[player.puuid]?.matches.length : 0}
                      {player.puuid !== puuid && <button
                        onClick={() => handleExpand(player.puuid)}
                        className=" text-white px-4 py-2 rounded-lg "
                      >

                        {expandedRow === player.puuid ?
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 13.5L12 10.5L15 13.5" stroke="white" />
                          </svg>
                          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 10.5L12 13.5L15 10.5" stroke="white" />
                          </svg>}
                      </button>}
                    </div>

                  </td>
                </tr>
                {expandedRow === player.puuid && (
                  <tr>
                    <td colSpan={3}>
                      <MatchHistory matches={matches} player={player} puuid={puuid} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
            )}
          </tbody>
        </table>
      )}
      {!participantsInfo && <NoGame clicked={clicked} />}
    </div>
  );
};

export default CurrentGame;
