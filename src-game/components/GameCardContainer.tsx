import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
	children: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
	return (
		<Box minHeight="400px" width="300px" borderRadius={10} overflow="hidden">
			{children}
		</Box>
	);
};

export default GameCardContainer;
