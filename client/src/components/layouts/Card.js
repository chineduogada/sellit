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
	data.price = formatPrice("en-NG", data.price, "NGN");

	return (
		<li className={formatCardClassName(data, propClassName)}>
			<div className='Card__img-wrapper'>
				{/* <img src={data.photos[0]} alt={data.title} /> */}
				<img className='Card__img' src={testImgSrc} alt='card' />
			</div>

			<div className='Card__content'>
				<Link to={`/products/${data.slug}`} className='Card__header'>
					<h6 className='Card__title milli'>{data.title}</h6>
					<p className='Card__price'>{data.price}</p>

					{data.plan !== "standard" && (
						<p className={`Card__plan Card__plan--${data.plan}`}>
							{data.plan}
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Aliquam, ab aperiam officiis voluptatibus sapiente
							consequuntur distinctio corrupti impedit, nisi perspiciatis
							deserunt, molestias fuga quo voluptatem eaque maxime!
							Distinctio nesciunt sequi quaerat odio fuga quas harum
							pariatur, voluptate ut similique atque voluptatem
							accusantium ex! Et a esse pariatur eligendi ut
							reprehenderit laboriosam culpa necessitatibus non
							distinctio maiores sapiente voluptate cum mollitia
							quisquam, praesentium sed voluptatibus recusandae. Rerum
							qui quisquam sit culpa? Ab cumque eos enim praesentium,
							voluptatum distinctio alias labore, nostrum sit at fugiat
							necessitatibus dolore ex. Molestiae laudantium, ipsum quasi
							minima libero in tempore, eaque iure minus perferendis
							nesciunt quos. Facilis iure voluptatibus reprehenderit
							ullam, quas quam error tenetur, quos suscipit ratione
							magnam expedita voluptates itaque harum incidunt. Ipsum
							ipsa ea tenetur cupiditate molestias quae ex, voluptatum
							consectetur reprehenderit itaque, nulla quas velit harum
							aut! Accusantium veritatis libero repellat nostrum harum
							hic laudantium vitae et natus neque ut iusto amet
							voluptatibus facere, aliquam magni facilis. Quae repellat
							laudantium veniam sint, voluptatum aspernatur neque libero
							suscipit eum nemo sed autem minima doloribus tempore
							nesciunt molestias quam sit rerum explicabo similique
							distinctio iste accusamus quia rem. Id vero tempore,
							tempora ex dolores dolor expedita repudiandae consectetur
							repellendus, suscipit consequatur provident ducimus nisi
							possimus earum dolorem libero deleniti in quisquam a nihil!
							Reiciendis a veritatis voluptate ratione modi in quibusdam
							cumque nihil molestiae dolorum aliquid perferendis debitis
							tempore enim obcaecati error nisi accusamus, deleniti
							architecto tenetur dignissimos placeat odit. Nesciunt
							eligendi delectus repellat eius? Possimus, voluptatibus
							veniam beatae quis tempora nihil ipsum, dolorum maxime
							adipisci dolores libero dolorem vitae iure inventore
							exercitationem sapiente quia consequuntur? Quidem pariatur
							accusantium praesentium molestias culpa, quas nesciunt
							corporis eum voluptatem laudantium, doloremque impedit
							voluptatum delectus, cupiditate dolorum perspiciatis? Eius
							quas, harum dolorem doloremque itaque possimus totam
							eveniet ab consequuntur ad ex sint unde odit excepturi
							error molestias illum tenetur commodi? Ad eius sit rerum
							minima dolorum aut iusto porro aspernatur quas distinctio
							quasi libero reprehenderit assumenda ducimus praesentium,
							eaque facilis minus enim ex consectetur molestias delectus.
							Unde beatae inventore in at est, cum nulla dicta repellat
							ea explicabo tenetur eligendi natus molestiae, rem dolore
							alias quas dignissimos exercitationem voluptatibus iusto
							quos nobis! Quis, tenetur. Dignissimos velit corporis
							dolorum omnis assumenda, voluptates, magni aperiam
							cupiditate natus quasi nulla fugit et ad. Eveniet, aperiam
							quos harum eos mollitia accusantium? Eveniet pariatur
							magnam corporis saepe cum explicabo recusandae beatae
							molestiae hic voluptatibus. Amet itaque adipisci ex est
							debitis odio quibusdam?
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
