import React from 'react';
import { useDispatch } from 'react-redux';

import SignupForm from './signupForm';

const Signup = props => {
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<div className='jumbotron mx-auto pt-4 pb-5 mt-4' style={{ width: 500 }}>
				<h1 className='text-center display-4'>Signup</h1>
				<hr className='mb-4' />
				<SignupForm dispatch={dispatch} {...props} />
			</div>
		</React.Fragment>
	);
};

export default Signup;
