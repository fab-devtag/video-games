import { useState } from 'react';

import styles from './ListGroup.module.css';

interface ListGroupProps {
	items: string[];
	heading: string;
	onSelectItem: (item: string) => void;
}

const ListGroup = ({ items, heading, onSelectItem }: ListGroupProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<>
			<h1>{heading}</h1>
			{items.length === 0 && <p>No item found</p>}
			<ul className={[styles.listGroup, styles.container].join(' ')}>
				{items.map((item, index) => (
					<li
						key={index}
						className={`list-group-item ${selectedIndex === index && 'active'}`}
						onClick={() => {
							setSelectedIndex(index);
							onSelectItem(item);
						}}
					>
						{item}
					</li>
				))}
			</ul>
		</>
	);
};

export default ListGroup;
