import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import axios from 'axios';
import { userLoggedIn } from '../store/login';

class LoginForm extends Form {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.required()
			.label('Email'),
		password: Joi.string().min(8).required().label('Password')
	});

	doSubmit = async () => {
		const { email, password } = this.state.data;

		try {
			const { data } = await axios.post(`api//users/${email}/${password}`);

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
			errors.login = 'Invalid login, please try again';
			this.setState({ errors });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='mx-auto'>
				{this.state.errors.login && (
					<small className='alert alert-danger d-block mt-0'>
						{this.state.errors.login}
					</small>
				)}
				{this.renderInput('email', 'Email')(true)}
				{this.renderInput('password', 'Password', 'password')(false)}
				{this.renderSubmitButton('Login')}
			</form>
		);
	}
}

export default LoginForm;
