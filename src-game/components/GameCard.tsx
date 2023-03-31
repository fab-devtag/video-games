import React from 'react';
import { Card, CardBody, Image, Heading, Text, HStack } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import getCroppedImageUrl from '../services/image-url';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';

interface Props {
	game: Game;
}

const GameCard = ({
	game: { name, background_image, parent_platforms, metacritic },
}: Props) => {
	let imgUrl = getCroppedImageUrl(background_image);
	return (
		<Card>
			<Image src={imgUrl} />
			<CardBody>
				<Heading fontSize="2xl">{name}</Heading>
				<HStack justifyContent="space-between">
					<PlatformIconList
						platforms={parent_platforms.map(({ platform }) => platform)}
					/>
					<CriticScore score={metacritic} />
				</HStack>
			</CardBody>
		</Card>
	);
};

export default GameCard;
