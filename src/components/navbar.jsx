import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { userLoggedOut } from '../store/login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import handleUserDelete from './common/handleUserDelete';

const Navbar = ({ user }) => {
	const { id, firstName, lastName } = user;
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<React.Fragment>
			<span className='navbar-brand'>Custom Store</span>
			<ul className='navbar-nav'>
				{/* Username display */}
				<li className='nav-item nav-link text-light'>
					{id ? (
						<React.Fragment>
							<ul className='navbar-nav'>
								<li className='nav-item nav-link text-light'>
									{`${firstName} ${lastName}`}
								</li>
								<NavDropdown
									title={
										<i className='fa fa-cog text-white' aria-hidden='true' />
									}
									id='dropdown-navbar'>
									<NavDropdown.Item onClick={() => history.push('/user/edit')}>
										<i className='fa fa-wrench mr-2' aria-hidden='true' />
										Update Info
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => handleUserDelete(id, dispatch)}>
										<i className='fa fa-trash mr-2' aria-hidden='true' />
										Delete Account
									</NavDropdown.Item>
									<NavDropdown.Item onClick={() => dispatch(userLoggedOut())}>
										<i className='fa fa-sign-out mr-2' aria-hidden='true' />
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</ul>
						</React.Fragment>
					) : (
						<React.Fragment>
							<button
								onClick={() => history.push('/login')}
								className='btn btn-sm btn-success mr-2'>
								Sign in
							</button>
							<button
								onClick={() => history.push('/signup')}
								className='btn btn-sm btn-success'>
								Sign up
							</button>
						</React.Fragment>
					)}
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
