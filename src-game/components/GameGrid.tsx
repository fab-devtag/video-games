import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import apiClient from '../services/api-client';

interface Game {
	id: number;
	name: string;
}

interface FetchGamesResponse {
	count: number;
	results: Game[];
}

const GameGrid = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		apiClient
			.get<FetchGamesResponse>('/xgames')
			.then((response) => setGames(response.data.results))
			.catch((error) => setError(error.message));
	}, []);

	return (
		<>
			{error && <Text>{error}</Text>}
			<ul>
				{games.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</>
	);
};

export default GameGrid;
