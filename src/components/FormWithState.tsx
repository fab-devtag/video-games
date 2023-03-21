import React, { useState, FormEvent } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
	age: z
		.number({ invalid_type_error: 'Age field is required' })
		.min(18, { message: 'Age must be at least 18' }),
});

type FormWithStateProps = z.infer<typeof schema>;

/* interface FormWithStateProps {
	name: string;
	age: number;
}
 */
const FormWithState = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormWithStateProps>({ resolver: zodResolver(schema) });
	/* 	const [person, setPerson] = useState({
		name: '',
		age: '',
	});
 */
	/* 	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log(person);
	}; */

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">
					Name
				</label>
				{/* <input
					onChange={(e) => setPerson({ ...person, name: e.target.value })}
					value={person.name}
					id="name"
					type="text"
					className="form-control"
				/> */}
				<input
					/* 	{...register('name', { required: true, minLength: 3 })} */
					{...register('name')}
					id="name"
					type="text"
					className="form-control"
				/>
				{/* {errors.name?.type === 'required' && (
					<p className="text-danger">The name field is required.</p>
				)} */}
				{errors.name && <p className="text-danger">{errors.name.message}</p>}
				{/* {errors.name?.type === 'minLength' && (
					<p>The name must be at least 3 characters.</p>
				)} */}
			</div>
			<div className="mb-3">
				<label htmlFor="age" className="form-label">
					Age
				</label>
				<input
					{...register('age', { valueAsNumber: true })}
					id="age"
					type="number"
					className="form-control"
				/>
				{errors.age && <p className="text-danger">{errors.age.message}</p>}
			</div>
			<button disabled={!isValid} className="btn btn-primary" type="submit">
				Sumbit
			</button>
		</form>
	);
};

export default FormWithState;
