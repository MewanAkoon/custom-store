import React from 'react';
import Joi from 'joi';
import axios from 'axios';
import { toast } from 'react-toastify';

import Form from '../common/form';
import Loading from '../common/loading';
import { userLoggedIn } from '../../store/login';

class EditUserForm extends Form {
	state = {
		data: { firstName: '', lastName: '', email: '', address: '' },
		errors: {},
		loading: true
	};

	componentDidMount() {
		this.loadData();
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevProps !== this.props) this.loadData();
	// }

	loadData() {
		const { firstName, lastName, email, address, phone } = this.props.user;
		const { data } = { ...this.state };
		data.firstName = firstName;
		data.lastName = lastName;
		data.email = email;
		data.address = address;
		data.phone = phone;
		this.setState({ data, loading: false });
	}

	schema = Joi.object({
		firstName: Joi.string().label('First Name'),
		lastName: Joi.string().label('Last Name'),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.label('Email'),
		phone: Joi.string()
			.regex(/^[0-9]{9}$/)
			.label('Phone Number'),
		address: Joi.string().min(5).max(50).label('Address')
	});

	doSubmit = async () => {
		const { firstName, lastName, email, address, phone } = this.state.data;
		const { id } = this.props.user;

		const body = {
			firstName,
			lastName,
			email,
			address,
			phone
		};

		try {
			await axios.patch(`/api/users/${id}`, body);
			// logs in the user
			this.props.dispatch(userLoggedIn({ id, ...body }));

			this.props.history.push('/home');
			toast.success('User Profile updated successfully.');
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
				{this.renderInput('firstName', 'First Name')(true)}
				{this.renderInput('lastName', 'Last Name')(false)}
				{this.renderInput('email', 'Email')(false)}
				{this.renderTextArea('address', 'Address')}
				{this.renderInput('phone', 'Phone Number')(false)}
				{this.renderSubmitButton('Update')}
			</form>
		) : (
			<Loading />
		);
	}
}

export default EditUserForm;
