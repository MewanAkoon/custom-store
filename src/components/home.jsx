import React, { Component } from 'react';
import axios from 'axios';

import Product from './product';

class Home extends Component {
	state = { user: {}, products: [] };

	componentDidMount() {
		this.renderData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) this.renderData();
	}

	// calls the backend
	renderData = async () => {
		try {
			const { user } = this.props;
			let products = [];

			if (!user.id) {
				const { data } = await axios.get('/api/products/');
				products = data;
			} else {
				// Gets products created by the user
				const { data } = await axios.get(`/api/products/user/${user.id}`);
				products = data;
			}
			this.setState({ user, products });
		} catch (err) {
			console.log('Error', err);
		}
	};

	renderMessage = () => (
		<div className='alert alert-primary w-50 text-center mx-auto'>
			No Products available...
		</div>
	);

	render() {
		const { products } = this.state;
		return (
			<React.Fragment>
				<div className='container mt-4'>
					{products.length === 0 ? (
						this.renderMessage()
					) : (
						<div className='card mx-auto' style={{ width: 900 }}>
							<div className='card-header'>Products Overview</div>
							<div className='card-body'>
								{products.map(product => (
									<Product key={product._id} product={product} />
								))}
							</div>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
