import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	description: z
		.string()
		.min(3, { message: 'Description should be at least 3 characters' }),
	amount: z.number({
		invalid_type_error: 'Amount is required',
	}),
	category: z.string().min(1, { message: 'Category is required' }),
});

type ExpenseTrackerFormData = z.infer<typeof schema>;

interface ExpenseTrackerProps {
	items: ExpenseTrackerFormData[];
	onDeleteItem: (item: ExpenseTrackerFormData) => void;
}

interface ExpenseTrackerFormProps {
	onAddingItems: (item: ExpenseTrackerFormData) => void;
}

const ExpenseTracker = () => {
	const [items, setItems] = useState([
		{
			description: 'La description 1',
			amount: 3,
			category: 'Groceries',
		},
		{
			description: 'La description 2',
			amount: 7,
			category: 'Entertainement',
		},
		{
			description: 'La description 3',
			amount: 4,
			category: 'Utilities',
		},
	]);

	const handleAddingItems = (data: ExpenseTrackerFormData) => {
		setItems([...items, data]);
	};

	const handleDeleteItem = (data: ExpenseTrackerFormData) => {
		setItems(items.filter((item) => item.description !== data.description));
	};
	return (
		<>
			<ExpenseTrackerForm onAddingItems={handleAddingItems} />
			<ExpenseTrackerList items={items} onDeleteItem={handleDeleteItem} />
		</>
	);
};

const ExpenseTrackerList = ({ items, onDeleteItem }: ExpenseTrackerProps) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Description</th>
					<th scope="col">Amount</th>
					<th scope="col">Category</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<tr key={index + 1}>
						<th scope="row">#{index + 1}</th>
						<td>{item.description}</td>
						<td>{item.amount}</td>
						<td>{item.category}</td>
						<td>
							<button
								onClick={() => onDeleteItem(item)}
								className="btn btn-danger"
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const ExpenseTrackerForm = ({ onAddingItems }: ExpenseTrackerFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ExpenseTrackerFormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: ExpenseTrackerFormData) => {
		onAddingItems(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3 mt-4">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					{...register('description')}
					id="description"
					type="text"
					className="form-control"
				/>
				{errors.description && (
					<p className="text-danger">{errors.description.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					{...register('amount', { valueAsNumber: true })}
					id="amount"
					type="number"
					className="form-control"
				/>
				{errors.amount && (
					<p className="text-danger">{errors.amount.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select
					{...register('category', { required: true })}
					id="category"
					className="form-control"
				>
					<option value=""></option>
					<option value="Groceries">Groceries</option>
					<option value="Utilities">Utilities</option>
					<option value="Entertainement">Entertainement</option>
				</select>
				{errors.category && (
					<p className="text-danger">{errors.category.message}</p>
				)}
			</div>
			<button disabled={!isValid} className="btn btn-primary" type="submit">
				Submit
			</button>
		</form>
	);
};

export default ExpenseTracker;
