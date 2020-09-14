import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillCrown } from "react-icons/ai";
import { FaHeart, FaStar, FaEye } from "react-icons/fa";

import testImgSrc from "../../assets/img/page-not-found-sm.png";
import Clickable from "../Clickable";
import formatPrice from "../../utils/formatPrice";

export const formatCardClassName = (data, propClassName) => {
	let className = `Card `;

	if (data.plan !== "standard") {
		className += `Card--${data.plan} `;
	}

	if (propClassName) {
		className += propClassName;
	}

	return className;
};
function Card({ data, className: propClassName }) {
	const price = formatPrice("en-NG", data.price, "NGN");

	return (
		<li
			className={formatCardClassName(data, propClassName)}
			data-testid='product'
		>
			<div className='Card__img-wrapper'>
				{/* <img src={data.photos[0]} alt={data.title} /> */}
				<img className='Card__img' src={testImgSrc} alt='card' />
			</div>

			<div className='Card__content'>
				<Link
					to={`/products/${data.slug}?userId=${data.user_id}`}
					className='Card__header'
				>
					<h6 className='Card__title milli'>{data.title}</h6>
					<p className='Card__price'>{price}</p>

					{data.plan !== "standard" && (
						<p className={`Card__plan Card__plan--${data.plan}`}>
							{data.plan}

							{data.plan === "vip" && <AiFillCrown className='ml' />}
						</p>
					)}
				</Link>
				<footer className='Card__footer'>
					<p className='Card__views milli'>
						<FaEye /> <b>{data.views}</b>
					</p>

					<div className='flex'>
						<Clickable className='Like'>
							<FaHeart className='Like__control' />

							<p className='Like__text m-0'>{data.likes || "1k"}</p>
						</Clickable>

						<Clickable className='Rating ml-1'>
							<FaStar className='Rating__icon' />
							<FaStar className='Rating__icon' />
							<FaStar className='Rating__icon' />
							<AiOutlineStar className='Rating__icon' />
							<AiOutlineStar className='Rating__icon' />
						</Clickable>
					</div>
				</footer>
			</div>
		</li>
	);
}

Card.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Card;
