import React, { useState, useEffect } from 'react';
import axios from 'axios';

import image from '../../images/buy-now.webp';

const getQuantity = quantity =>
	quantity === 0 ? 'Not Available' : `${quantity} item(s) are in the stock`;

const ViewProduct = ({ user: { id }, match }) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		async function getProduct() {
			const { data: product } = await axios.get(
				`/api/products/${match.params.id}`
			);
			setProduct(product);
		}

		getProduct();
	}, [match]);

	return (
		<div
			className='jumbotron mt-4 mx-auto text-center py-4'
			style={{ width: 600 }}>
			<h1 className='display-4'>{product.name}</h1>
			<hr className='mt-2' />
			<img src={image} alt='item' style={{ width: 300, height: 300 }} />
			<p className='lead mt-2'>{product.description}</p>
			<p className='text-muted'>{getQuantity(product.quantity)}</p>
		</div>
	);
};

export default ViewProduct;
