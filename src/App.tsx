import { useState } from 'react';

import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';

const App = () => {
	let items = ['Paris', 'Rome', 'New York', 'San Francisco', 'London'];

	const [showAlert, setShowAlert] = useState(false);

	const handleSelectItem = (item: string) => {
		console.log(item);
	};

	const handleClickButton = () => {
		setShowAlert(true);
	};

	const handleDismissAlert = () => {
		setShowAlert(false);
	};

	return (
		<div>
			{showAlert && (
				<Alert color="warning" onDismiss={handleDismissAlert}>
					Hello <span>World</span>
				</Alert>
			)}
			<ListGroup
				items={items}
				heading="Cities"
				onSelectItem={handleSelectItem}
			/>
			<Button onClick={handleClickButton}>Mon bouton</Button>
		</div>
	);
};

export default App;
