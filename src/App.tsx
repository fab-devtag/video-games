import { useState } from 'react';
import produce from 'immer';

import Alert from './components/Alert';
import Button from './components/Button/Button';
import Like from './components/Like';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ExpandableText from './ExpandableText';
import Form from './components/Form';

const App = () => {
	let items = ['Paris', 'Rome', 'New York', 'San Francisco', 'London'];
	const [cartItems, setCartItems] = useState(['Product1', 'Product2']);

	const [showAlert, setShowAlert] = useState(false);

	const [game, setGame] = useState({
		id: 1,
		player: {
			name: 'John',
		},
	});

	const [pizza, setPizza] = useState({
		name: 'Sprice Pepperoni',
		toppings: ['Mushrooms'],
	});

	const [cart, setCart] = useState({
		discount: 0.1,
		items: [
			{ id: 1, title: 'Product 1', quantity: 1 },
			{ id: 2, title: 'Product 2', quantity: 1 },
		],
	});

	const handleSelectItem = (item: string) => {
		console.log(item);
	};

	const handleClickButton = () => {
		setShowAlert(true);
	};

	const handleDismissAlert = () => {
		setShowAlert(false);
	};

	//immer
	const immerFunction = () => {
		/* srtBugs(produce(draft => {
			const bug = draft.find(bug => bug.id === 1);
			if (bug) bug.fixed = true;

		})) */
	};

	const handleClickGame = () => {
		setGame({ ...game, player: { ...game.player, name: 'Fab' } });
	};

	const handleClickPizza = () => {
		setPizza({ ...pizza, toppings: [...pizza.toppings, 'Ananas'] });
	};

	const handleClickCartQte = () => {
		setCart({
			...cart,
			items: cart.items.map((item) =>
				item.id === 1 ? { ...item, quantity: 2 } : item
			),
		});
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
			<Like onClick={() => console.log('clicked')} />
			<Navbar cartItemsCount={cartItems.length} />
			<Cart cartItems={cartItems} onClear={() => setCartItems([])} />
			<p>{game.player.name}</p>
			<button onClick={handleClickGame}>Change player name</button>
			<p>{pizza.toppings}</p>
			<button onClick={handleClickPizza}>add toppings</button>
			{cart.items.map((item) => (
				<p>
					{item.title} {item.quantity}
				</p>
			))}
			<button onClick={handleClickCartQte}>Change qte</button>
			<ExpandableText maxChars={15}>
				DFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODG
				DFGODGDFGODGDFGODGDFGODGDFGODGDFGODGDFGODG
				DFGODGDFGODGDFGODGDFGODGDFGODGDFGODG DFGODGDFGODGDFGODG
				DFGODGDFGODGDFGODGDFGODG
			</ExpandableText>
			<Form />
		</div>
	);
};

export default App;
