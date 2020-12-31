import React from 'react';
import AddProductForm from './addProductForm';

const AddProduct = props => {
	return (
		<div className='jumbotron mx-auto pt-4 pb-5 mt-4' style={{ width: 500 }}>
			<h1 className='text-center display-4 mb-4'>Add Product</h1>
			<AddProductForm {...props} />
		</div>
	);
};

export default AddProduct;
