import React from 'react';
import Joi from 'joi';
import axios from 'axios';
import { toast } from 'react-toastify';

import Form from '../common/form';

class AddProductForm extends Form {
	state = {
		data: { name: '', description: '', quantity: '' },
		errors: {}
	};

	schema = Joi.object({
		name: Joi.string().label('Product Name'),
		description: Joi.string().label('Description'),
		quantity: Joi.number().min(0).label('Quantity')
	});

	doSubmit = async () => {
		const { name, description, quantity } = this.state.data;
		const { id: userId } = this.props.user;

		const body = {
			name,
			description,
			quantity: parseInt(quantity),
			userId
		};

		try {
			await axios.post(`/api/products`, body);
			this.props.history.push('/home');
			toast.success('Product added successfully.');
		} catch (err) {
			const errors = { ...this.state.errors };
			errors.add = "Couldn't add a product. Operation failed";
			this.setState({ errors });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.state.errors.add && (
					<small className='alert alert-danger d-block mt-0'>
						{this.state.errors.add}
					</small>
				)}
				{this.renderInput('name', 'Product Name')(true)}
				{this.renderTextArea('description', 'Description')}
				{this.renderInput('quantity', 'Quantity')(false)}
				{this.renderSubmitButton('Add')}
			</form>
		);
	}
}

export default AddProductForm;
