import React, { useRef, useEffect, useState } from 'react';
import { CanceledError } from './services/api-client';

import ProductList from './components/ProductList';
import userService, { User } from './services/userService';
import useUsers from './hooks/useUsers';

const AppBackendModule = () => {
	/* const ref = useRef<HTMLInputElement>(null); */
	const [category, setCategory] = useState('');
	const { users, error, isLoading, setUsers, setError } = useUsers();
	//autre méthode pour gérer les erreurs
	/* useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get<User[]>(
					'https://jsonplaceholder.typicode.com/xusers'
				);
				setUsers(response.data);
			} catch (err) {
				setError((err as AxiosError).message);
			}
		};
		fetchUsers();
	}, []); */
	/* useEffect(() => {
		if (ref.current) {
			console.log(ref.current);
			ref.current.focus();
		}
	}, []);
 */
	const deleteUser = (user: User) => {
		const originalUsers = [...users];
		setUsers(users.filter((u) => u.id !== user.id));

		userService.delete(user.id).catch((err) => {
			setError(err.message);
			setUsers(originalUsers);
		});
	};

	const addUser = () => {
		const originalUsers = [...users];
		const newUser = { id: 0, name: 'Fab' };
		setUsers([newUser, ...users]);

		userService
			.create(newUser)
			.then(({ data: savedUser }) => setUsers([savedUser, ...users]))
			.catch((err) => {
				setError(err.message);
				setUsers(originalUsers);
			});
	};

	const updateUser = (user: User) => {
		const originalUsers = [...users];
		const updatedUser = { ...user, name: user.name + '!' };
		setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

		userService.update(updatedUser).catch((err) => {
			setError(err.message);
			setUsers(originalUsers);
		});
	};
	return (
		<div>
			Connecting the backend
			{/* <input ref={ref} type="text" className="form-control"></input> */}
			<select
				onChange={(event) => setCategory(event.target.value)}
				className="form-select"
			>
				<option value=""></option>
				<option value="Clothing">Clothing</option>
				<option value="Household">Household</option>
			</select>
			<ProductList category={category} />
			{error && <p className="text-danger">{error}</p>}
			{isLoading && <div className="spinner-border"></div>}
			<button className="btn btn-primary mb-3" onClick={addUser}>
				Add
			</button>
			<ul className="list-group">
				{users.map((user) => (
					<li
						key={user.id}
						className="list-group-item d-flex justify-content-between"
					>
						{user.name}
						<div>
							<button
								className="btn btn-outline-secondary mx-1"
								onClick={() => updateUser(user)}
							>
								Update
							</button>
							<button
								className="btn btn-outline-danger"
								onClick={() => deleteUser(user)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AppBackendModule;
