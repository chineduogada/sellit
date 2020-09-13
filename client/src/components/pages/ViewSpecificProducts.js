import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { FaSpinner, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

import img from "../../assets/img/page-not-found.png";
import imgSm from "../../assets/img/page-not-found-sm.png";
import Error from "../Error";
import Products from "../layouts/Products";
import formatPrice from "../../utils/formatPrice";
import Detail from "../Detail";
import Clickable from "../Clickable";
import formatDate from "../../utils/formatDate";
import BadgeBox from "../BadgeBox";
import fetchUser from "../../utils/fetchUser";
import UserProfile from "../UserProfile";

function ViewSpecificProducts() {
	const [product, setProduct] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [errMsg, setErrMsg] = useState(undefined);

	const { slug } = useParams();
	const { search } = useLocation();
	const { userId } = queryString.parse(search);

	useEffect(() => {
		if (userId) {
			const getProduct = async () => {
				try {
					const {
						data: { data },
					} = await Axios.get(`/products/users/${userId}/${slug}`);

					const { product } = data;

					setProduct(product);
				} catch (err) {
					// setErrMsg(err.response.data.message);
				}
			};

			getProduct();
		}
	}, [slug, userId]);

	useEffect(() => {
		if (userId) {
			const getUser = async () => {
				const user = await fetchUser(userId);

				setUser(user);
			};

			getUser();
		}
	}, [userId, product]);

	const renderUser = () => {
		if (!user) {
			return <FaSpinner data-testid='loading' />;
		}

		return <UserProfile user={user} product={product} />;
	};

	const renderProduct = () => {
		if (errMsg) {
			return <Error message={errMsg} />;
		}

		if (!product) {
			return <FaSpinner data-testid='loading' />;
		}

		return (
			<>
				<main className='ViewSpecificProducts__main'>
					<div className='carousel flex-dir-col'>
						<div className='carousel__img-wrapper carousel__img-wrapper--lg'>
							<img
								src={img}
								alt='carousel-current'
								className='carousel__img'
							/>
						</div>

						<ul className='carousel__images flex-wrap'>
							<li className='carousel__img-wrapper'>
								<img
									src={imgSm}
									alt='carousel-item'
									className='carousel__img'
								/>
							</li>
							<li className='carousel__img-wrapper'>
								<img
									src={imgSm}
									alt='carousel-item'
									className='carousel__img'
								/>
							</li>
							<li className='carousel__img-wrapper'>
								<img
									src={imgSm}
									alt='carousel-item'
									className='carousel__img'
								/>
							</li>
							<li className='carousel__img-wrapper'>
								<img
									src={imgSm}
									alt='carousel-item'
									className='carousel__img'
								/>
							</li>
							<li className='carousel__img-wrapper'>
								<img
									src={imgSm}
									alt='carousel-item'
									className='carousel__img'
								/>
							</li>
						</ul>
					</div>

					<div className='ml-2 mr-2'>
						<h2 className='ViewSpecificProducts__title'>
							{product.title}
						</h2>

						{product.is_negotiable && (
							<div className='badge badge--dark'>
								this product is{" "}
								<span className='uppercase'>negotiable</span>
							</div>
						)}

						<p className='ViewSpecificProducts__desc'>
							{product.description} Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Corporis maxime sint cumque
							atque, officiis minima et, iusto facere deleniti,
							aspernatur adipisci esse error. Cum sapiente temporibus,
							perferendis corrupti omnis cupiditate!
						</p>

						<BadgeBox
							title='categories'
							dark
							badges={[product.category]}
						/>
						<BadgeBox title='keywords' badges={product.keywords} />
						<BadgeBox title='type' badges={[product.type]} />
						<BadgeBox title='region' badges={[product.region]} />
						<BadgeBox title='condition' badges={[product.condition]} />

						<div className='flex-wrap flex-jc-center mb-3 mt-3'>
							<p className='Card__views ListCard__views milli'>
								<FaEye /> <b>{product.views}</b>
							</p>

							<Clickable className='Like ml-2'>
								<FaHeart className='Like__control' />

								<b className='Like__text'>{product.likes || "1k"}</b>
							</Clickable>

							<Clickable className='Rating ml-2 mr-2'>
								<FaStar className='Rating__icon' />
								<FaStar className='Rating__icon' />
								<FaStar className='Rating__icon' />
								<AiOutlineStar className='Rating__icon' />
								<AiOutlineStar className='Rating__icon' />

								<b className='Rating__text'>
									{product.ratingsAverage || "1.0"}
								</b>
							</Clickable>

							<p className='ListCard__date milli'>
								<b>postedAt: </b>
								{formatDate(product.createdAt)}
							</p>
						</div>

						<h5 className=' capitalize t-center'>more information</h5>

						<ul className='ViewSpecificProducts__info-list'>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2033434.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
							<li className='ViewSpecificProducts__info-item'>
								<Detail data={{ title: "ram", value: "2.5g" }} />
							</li>
						</ul>
					</div>
				</main>

				<aside className='ViewSpecificProducts__aside'>
					<div className='ViewSpecificProducts__price tera'>
						{formatPrice("en-NG", product.price, "NGN")}
					</div>

					{renderUser()}
				</aside>
			</>
		);
	};

	return (
		<div className='ViewSpecificProducts page'>
			<div className='container flex-jc-sb'>
				{userId ? (
					renderProduct()
				) : (
					<Products
						listCard
						route={`/products?slug=${slug}&fields=title,price,views,likes,ratingsAverage,plan,description,createdAt,slug,userId`}
					/>
				)}
			</div>
		</div>
	);
}

export default ViewSpecificProducts;

