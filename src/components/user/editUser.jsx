import React from 'react';
import { useDispatch } from 'react-redux';
import EditUserForm from './editUserForm';

const EditUser = props => {
	const dispatch = useDispatch();

	return (
		<div className='jumbotron mx-auto pt-4 pb-5 mt-4' style={{ width: 500 }}>
			<h1 className='text-center display-4 mb-4'>Update User</h1>
			<EditUserForm {...props} dispatch={dispatch} />
		</div>
	);
};

export default EditUser;
