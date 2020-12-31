import React from 'react';
import LoginForm from './loginForm';
import { useDispatch } from 'react-redux';

const Login = props => {
	const { id, firstName, lastName } = props.user;
	const dispatch = useDispatch();

	const handleCancel = () => {
		props.history.push('/home');
	};

	return (
		<React.Fragment>
			<div className='jumbotron mx-auto pt-4 pb-5 mt-4' style={{ width: 500 }}>
				<h1 className='text-center display-4'>Login</h1>
				<hr className='mb-4' />
				{id ? (
					<div>
						<p>
							You are already logged in as {firstName} {lastName}, you need to
							log out before logging in as different user.
						</p>
						<hr />
						<button
							onClick={handleCancel}
							className='btn btn-secondary btn-block w-25 ml-auto text-center'>
							Cancel
						</button>
					</div>
				) : (
					<LoginForm dispatch={dispatch} {...props} />
				)}
			</div>
		</React.Fragment>
	);
};

export default Login;
