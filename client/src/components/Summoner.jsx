import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loading from "./Loading";
import { getSummoner } from "../api";

import MyContext from "../contexts/PlayerContext";

const Summoner = () => {
	const [summoner, setSummoner] = useState(null)
	const { participantsInfo, setParticipantsInfo } = useContext(MyContext)

	const player = localStorage.getItem('player')
	const puuid = JSON.parse(player).puuid
	const playerName = JSON.parse(player).playerName

	if (!puuid) {
		return (
			<Loading />
		)
	}

	useEffect(() => {
		const fetchSummoner = async () => {
			try {
				const response = await getSummoner(puuid)
				setSummoner(response)
			} catch (error) {
				console.log("error accoured", error)
			}
		}
		fetchSummoner()
	}, [puuid])



	const getActiveGame = async () => {
		setParticipantsInfo(null)
		try {

			const activeGame = await getActiveGame(puuid)
			console.log("active game");
			setParticipantsInfo(activeGame.data.participants)

		} catch (error) {
			console.log("error accoured", error)
		}
	}



	return (
			<div className="flex items-center p-4 rounded-lg ml-60 mt-12">
				<div className="relative">
					<img src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/profileicon/${summoner?.profileIconId}.png`} alt="Profile" className="min-w-16 h-16 rounded-lg border-2 border-blue-500" />
					<div className="absolute -top-4  left-[14px] bg-blue-500 text-white text-xs rounded-full px-2 py-1">
						{summoner?.summonerLevel}
					</div>
				</div>
				<div className="ml-4">

					<div className="flex items-center mb-2">
						<h2 className="text-xl text-white font-bold">{playerName}</h2>
						<span className="ml-2 text-gray-400">#EUNE</span>
					</div>

					<button onClick={getActiveGame} className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600">
						Update
					</button>
				</div>

			</div>
	)
}

export default Summoner
