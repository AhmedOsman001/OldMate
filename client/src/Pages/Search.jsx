import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [playerName, tag] = inputData.split('#');
    if (!playerName || !tag) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/api/account/${playerName}/${tag}`);
      const data = response.data;
      const playerData = {
        playerName: data.gameName,
        tagLine: data.tagLine,
        puuid: data.puuid,
      };

      // Store player data in localStorage
      localStorage.setItem('player', JSON.stringify(playerData));

      navigate(`/summoner/eun1/${data.gameName}-${data.tagLine}`);
    } catch (error) {
      setError("Player Not Found!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-lg">
        <div className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              name="q"
              className="w-full h-12 p-4 rounded-full py-2 pl-6 font-mono font-bold text-gray-700 bg-white border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              placeholder="example#1234"
              value={inputData}
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
              <svg
                className="h-5 w-5 absolute top-3.5 right-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
        {error && <p className="text-red-500 absolute inset-y-2.5 right-16">{error}</p>}
      </div>
    </div>
  );
};

export default Search;
