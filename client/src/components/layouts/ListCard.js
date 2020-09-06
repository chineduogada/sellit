import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { AiOutlineStar, AiFillCrown } from "react-icons/ai";

import testImgSrc from "../../assets/img/page-not-found-sm.png";
import { formatCardClassName } from "./Card";
import Clickable from "../Clickable";

function ListCard({ data, className }) {
	return (
		<li className={`${formatCardClassName(data)}ListCard ${className || ""}`}>
			<div className='ListCard__img-wrapper'>
				{/* <img src={data.photos[0]} alt={data.title} /> */}
				<img className='ListCard__img' src={testImgSrc} alt='card' />
			</div>

			<div className='ListCard__content flex-dir-col flex-jc-sb'>
				<div>
					<h5 className='ListCard__title'>
						<Link to={`/products/${data.slug}`}>{data.title}</Link>
					</h5>
					<p className='ListCard__price'>{data.price}</p>

					<p className='ListCard__description'>
						{data.description} Lorem ipsum dolor sit, amet consectetur
						adipisicing elit. Beatae, veritatis, praesentium, molestiae
						ratione...
					</p>
				</div>

				{data.plan !== "standard" && (
					<p className={`Card__plan Card__plan--${data.plan}`}>
						{data.plan}

						{data.plan === "vip" && <AiFillCrown className='ml' />}
					</p>
				)}

				<footer className='ListCard__footer'>
					<p className='ListCard__views milli'>
						views <b>{data.views}</b>
					</p>

					<Clickable className='Like'>
						<FaHeart className='Like__control' />

						<b className='Like__text'>{data.likes || "1k"}</b>
					</Clickable>

					<Clickable className='Rating'>
						<FaStar className='Rating__icon' />
						<FaStar className='Rating__icon' />
						<FaStar className='Rating__icon' />
						<AiOutlineStar className='Rating__icon' />
						<AiOutlineStar className='Rating__icon' />

						<b className='Rating__text'>{data.ratingsAverage || "1.0"}</b>
					</Clickable>

					<p className='ListCard__date milli'>2000-20-20.10:10</p>
				</footer>
			</div>
		</li>
	);
}

ListCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		slug: PropTypes.string,
		_id: PropTypes.string,
		price: PropTypes.number,
		views: PropTypes.number,
		photos: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default ListCard;
