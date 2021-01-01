import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import axios from 'axios';
import { userLoggedIn } from '../store/login';

class SignupForm extends Form {
	state = {
		data: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			password1: '',
			password2: ''
		},
		errors: {}
	};

	schema = Joi.object({
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.required()
			.label('Email'),
		phone: Joi.string()
			.required()
			.label('Phone Number')
			.regex(/^[0-9]{9}$/),
		address: Joi.string().required().label('Address').min(5).max(50),
		password1: Joi.string().required().label('Password').min(8),
		password2: Joi.string().required().label('Re-Enter Password').min(8)
	});

	doSubmit = async () => {
		const {
			firstName,
			lastName,
			email,
			phone,
			address,
			password1,
			password2
		} = this.state.data;

		if (password1 !== password2) {
			const errors = { ...this.state.errors };
			errors.password2 = 'Passwords do not match';
			return this.setState({ errors });
		}

		const body = {
			firstName,
			lastName,
			email,
			phone,
			address,
			password: password1
		};

		try {
			const { data: user } = await axios.post('api/users', body);

			const { data } = await axios.post(
				`api/users/${user.email}/${body.password}`
			);

			this.props.dispatch(
				userLoggedIn({
					id: data._id,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phone: data.phone,
					address: data.address
				})
			);

			this.props.history.push('/home');
		} catch (err) {
			const errors = { ...this.state.errors };
			errors.signup = 'Signup error, please try again';
			this.setState({ errors });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.state.errors.signup && (
					<small className='alert alert-danger d-block mt-0'>
						{this.state.errors.signup}
					</small>
				)}

				{this.renderInput('firstName', 'First Name')(true)}
				{this.renderInput('lastName', 'Last Name')(false)}
				{this.renderInput('email', 'Email')(false)}
				{this.renderInput('phone', 'Phone')(false)}
				{this.renderTextArea('address', 'Address')}
				{this.renderInput('password1', 'Password', 'password')(false)}
				{this.renderInput('password2', 'Re-Enter Password', 'password')(false)}
				{this.renderSubmitButton('Sign up')}
			</form>
		);
	}
}

export default SignupForm;
