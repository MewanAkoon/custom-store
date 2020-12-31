import React, { Component } from 'react';
import axios from 'axios';

import Product from './product';

class Home extends Component {
	state = { user: {}, products: [] };

	async componentDidMount() {
		try {
			const { data: products } = await axios.get('/api/products');
			console.log(products);
			this.setState({ user: {}, products });
		} catch (err) {
			console.log('Error', err);
		}
	}

	renderMessage = () => (
		<div className='alert alert-primary'>No Products available...</div>
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
