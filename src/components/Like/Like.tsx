import React, { useState } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import styles from './Like.module.css';

interface LikeProps {
	onClick: () => void;
}

const Like = ({ onClick }: LikeProps) => {
	const [status, setStatus] = useState(false);

	const toggle = () => {
		setStatus(!status);
		onClick();
	};
	if (status)
		return (
			<div onClick={() => setStatus(false)}>
				<AiFillHeart color="#ff6b81" size="3rem" onClick={toggle} />
			</div>
		);
	return (
		<div onClick={toggle}>
			<AiOutlineHeart size="3rem" />
		</div>
	);
};

export default Like;
