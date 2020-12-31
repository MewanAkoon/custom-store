import React from 'react';
import Joi from 'joi';
import axios from 'axios';
import { toast } from 'react-toastify';

import Form from '../common/form';
import Loading from '../common/loading';

class ProductForm extends Form {
	state = {
		data: { name: '', description: '', quantity: 0 },
		errors: {},
		loading: true
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.loadData();
	}

	loadData() {
		const { name, description, quantity } = this.props.product;
		const { data } = { ...this.state };
		data.name = name;
		data.description = description;
		data.quantity = quantity;
		this.setState({ data, loading: false });
	}

	schema = Joi.object({
		name: Joi.string().label('Product Name'),
		description: Joi.string().label('Description'),
		quantity: Joi.number().min(0).label('Quantity')
	});

	doSubmit = async () => {
		const { name, description, quantity } = this.state.data;
		const { _id } = this.props.product;

		const body = {
			name,
			description,
			quantity: parseInt(quantity)
		};

		console.log(body);

		try {
			await axios.patch(`/api/products/${_id}`, body);
			this.props.history.push('/home');
			toast.success('Product updated successfully.');
		} catch (err) {
			const errors = { ...this.state.errors };
			errors.update = 'Update failed';
			this.setState({ errors });
		}
	};

	render() {
		const { loading } = this.state;
		return !loading ? (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.state.errors.update && (
					<small className='alert alert-danger d-block mt-0'>
						{this.state.errors.update}
					</small>
				)}
				{this.renderInput('name', 'Product Name')(true)}
				{this.renderTextArea('description', 'Description')}
				{this.renderInput('quantity', 'Quantity')(false)}
				{this.renderSubmitButton('Update')}
			</form>
		) : (
			<Loading />
		);
	}
}

export default ProductForm;
