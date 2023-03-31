import React from 'react';
import { Card, CardBody, Image, Heading, Text } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import PlatformIconList from './PlatformIconList';

interface Props {
	game: Game;
}

const GameCard = ({
	game: { name, background_image, parent_platforms },
}: Props) => {
	return (
		<Card borderRadius={10} overflow="hidden">
			<Image src={background_image} />
			<CardBody>
				<Heading fontSize="2xl">{name}</Heading>
				<PlatformIconList
					platforms={parent_platforms.map(({ platform }) => platform)}
				/>
			</CardBody>
		</Card>
	);
};

export default GameCard;
