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
import FormWithState from './components/FormWithState';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
import ExpenseList from './components/ExpenseTrackerSolution/ExpenseList';
import ExpenseFilter from './components/ExpenseTrackerSolution/ExpenseFilter';
import ExpenseForm from './components/ExpenseTrackerSolution/ExpenseForm';
import categories from './components/ExpenseTrackerSolution/categories';

const App = () => {
	const [expenses, setExpenses] = useState([
		{
			id: 1,
			description: 'oeroezir',
			amount: 2,
			category: 'Groceries',
		},
		{
			id: 2,
			description: 'fsfs',
			amount: 5,
			category: 'Entertainement',
		},
		{
			id: 3,
			description: 'jljknkl',
			amount: 7,
			category: 'Utilities',
		},
	]);

	const [selectedCategory, setSelectedCategory] = useState('');
	const visibleExpenses = selectedCategory
		? expenses.filter((e) => e.category === selectedCategory)
		: expenses;

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
				<p key={item.id}>
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
			Form with refs
			<Form />
			Form with states
			<FormWithState />
			My Expense tracker
			<ExpenseTracker />
			Solution Expense Tracker
			<div className="mb-3">
				<ExpenseForm
					onSubmit={(expense) =>
						setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
					}
				/>
			</div>
			<div className="mb-3">
				<ExpenseFilter
					onSelectCategory={(category) => setSelectedCategory(category)}
				/>
			</div>
			<ExpenseList
				expenses={visibleExpenses}
				onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
			/>
		</div>
	);
};

export default App;
