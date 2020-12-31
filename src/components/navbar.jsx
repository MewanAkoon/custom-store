import React from 'react';

const Navbar = props => {
	const { id, firstName, lastName, phone, email, address } = props;

	return (
		<React.Fragment>
			<span className='navbar-brand'>Custom Store</span>
			<ul className='navbar-nav'>
				{/* Username display */}
				<li className='nav-item nav-link text-light'>
					{id ? `${firstName} ${lastName}` : 'You are not logged in.'}
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Navbar;
