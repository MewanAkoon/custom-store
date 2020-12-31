import React from 'react';
import logo from '../images/item.png';

const getAvailableProducts = quantity =>
	quantity === 0 ? 'Not Available' : `${quantity} item(s) are in the stock`;

const Product = ({ product }) => {
	return (
		<div className='card mb-2'>
			<div className='card-body row p-0'>
				<div className='col-lg-2'>
					<img src={logo} alt='item' className='w-100 h-100' />
				</div>
				<div className='col'>
					<p className='my-0 mt-2 text-primary' style={{ fontSize: '1.2rem' }}>
						<strong>{product.name}</strong>
					</p>
					<hr className='mt-1 mb-2' />
					<p className='my-0'>{product.description}</p>
					<small className='text-muted'>
						{getAvailableProducts(product.quantity)}
					</small>
					<div className='d-flex justify-content-end px-4'>
						<a href='#' className='mr-2'>
							Details
						</a>
						<a href='#' className='mr-2'>
							Edit
						</a>
						<a href='#'>Delete</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
