import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Product from './product/product';

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
				const { data } = await axios.get('/api/products');
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
		<div className='alert alert-primary text-center mx-auto'>
			No Products available...
		</div>
	);

	deleteProduct = async id => {
		try {
			axios.delete(`/api/products/${id}`);
			toast.success('Product deleted successfully');
		} catch (err) {
			toast.warning(err);
		}
	};

	render() {
		const {
			products,
			user: { id }
		} = this.state;

		return (
			<React.Fragment>
				<ToastContainer
					position='top-center'
					autoClose={2000}
					hideProgressBar={true}
				/>
				<div className='container mt-4'>
					<div className='card mx-auto' style={{ width: 900 }}>
						<div className='card-header d-flex'>
							<span className='my-auto font-weight-bold'>
								Products Overview
							</span>
							{id && (
								<button
									className='btn btn-danger d-flex ml-auto'
									onClick={() => this.props.history.push('/product/add')}>
									Add Product
								</button>
							)}
						</div>
						<div className='card-body'>
							{products.length === 0
								? this.renderMessage()
								: products.map(product => (
										<Product
											key={product._id}
											product={product}
											user={id}
											deleteProduct={this.deleteProduct}
										/>
								  ))}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
