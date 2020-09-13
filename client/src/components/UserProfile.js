import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineUser } from "react-icons/ai";

import Detail from "./Detail";
import TelBtn from "./TelBtn";
import formatDate from "../utils/formatDate";
import getFullName from "../utils/getFullName";

function UserProfile({ user, showExternalOpts, product }) {
	const history = useHistory();

	return (
		<>
			<header className='Profile__header flex-dir-col flex-ai-center'>
				<div className='Profile__img-wrapper'>
					<AiOutlineUser className='Profile__img' />
				</div>

				<h3 className='Profile__name'>{getFullName(user)}</h3>
			</header>

			<main>
				{!product && (
					<>
						<Detail
							className='ViewSpecificProducts__detail'
							data={{
								title: "registered",
								value: formatDate(user.createdAt),
							}}
						/>

						<Detail
							data={{ title: "followers", value: user.followers.length }}
						/>

						<Detail
							data={{
								title: "followings",
								value: user.followings.length,
							}}
						/>
					</>
				)}

				<Detail
					data={{
						title: "total products",
						value: user.totalProducts,
					}}
				/>

				{showExternalOpts && (
					<>
						<Button
							onClick={() =>
								history.push(`/products?userId=${user._id}`)
							}
							variant='contained'
							color='primary'
							className='ViewSpecificProducts__footer-control'
						>
							view products
						</Button>
						<TelBtn userPhone={user.phone_number} />
					</>
				)}

				{product && !showExternalOpts && (
					<footer className='ViewSpecificProducts__footer'>
						<Button
							onClick={() =>
								history.push(`/profile?id=${product.user_id}`)
							}
							variant='contained'
							color='primary'
							className='ViewSpecificProducts__footer-control'
						>
							view profile
						</Button>

						<TelBtn
							userPhone={user.phone_number}
							productPhone={product.phone_number}
						/>
					</footer>
				)}
			</main>
		</>
	);
}

export default UserProfile;

