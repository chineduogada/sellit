import React from "react";
import PropTypes from "prop-types";

import testImgSrc from "../../assets/img/page-not-found-sm.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Product({ data, className }) {
	return (
		<li className={`Product ${className || ""}`}>
			<div className='Product__img-wrapper'>
				{/* <img src={data.photos[0]} alt='product' /> */}
				<img className='Product__img' src={testImgSrc} alt='product' />
			</div>

			<Link to={`/products/${data.slug}`} className='Product__content'>
				<header className='Product__header'>
					<h6 className='Product__title'>{data.title}</h6>
					<p className='Product__price'>{data.price}</p>
				</header>
				<footer className='Product__footer'>
					<p className='Product__views'>views {data.views}</p>
					<FaHeart />
				</footer>
			</Link>
		</li>
	);
}

Product.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		slug: PropTypes.string,
		_id: PropTypes.string,
		price: PropTypes.number,
		views: PropTypes.number,
		photos: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default Product;
