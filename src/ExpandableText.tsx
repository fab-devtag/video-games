import React, { useState } from 'react';

interface ExpandableTextProps {
	children: string;
	maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: ExpandableTextProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};
	if (children.length < maxChars) return <p>children</p>;

	const text = isExpanded ? children : children.substring(0, maxChars);
	return (
		<p>
			{text}...
			<button onClick={handleClick}>{isExpanded ? 'Less' : 'More'}</button>
		</p>
	);
};

export default ExpandableText;
