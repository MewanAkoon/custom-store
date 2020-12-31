import React, { Component } from 'react';
import axios from 'axios';
import EditProductForm from './editProductForm';

class EditProduct extends Component {
	state = { product: {} };

	async componentDidMount() {
		const { id } = this.props.match.params;
		try {
			const { data: product } = await axios.get(`/api/products/${id}`);
			this.setState({ product });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className='jumbotron mx-auto pt-4 pb-5 mt-4' style={{ width: 500 }}>
				<h1 className='text-center display-4 mb-4'>Update Product</h1>
				<EditProductForm product={this.state.product} {...this.props} />
			</div>
		);
	}
}

export default EditProduct;
