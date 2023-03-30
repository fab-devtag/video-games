import React from 'react';
import { Card, CardBody, Image, Heading } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';

interface Props {
	game: Game;
}

const GameCard = ({ game: { name, background_image } }: Props) => {
	return (
		<Card borderRadius={10} overflow="hidden">
			<Image src={background_image} />
			<CardBody>
				<Heading fontSize="2xl">{name}</Heading>
			</CardBody>
		</Card>
	);
};

export default GameCard;
