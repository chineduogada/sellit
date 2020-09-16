import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import notFoundSvg from "../assets/svg/page-not-found.svg";
// import unExpectedSvg from "../assets/svg/page-not-found.svg";
import Clickable from "./Clickable";

function Error({ err, message, onClose }) {
	if (err) {
		if (err.isUnexpected)
			return (
				<div data-testid='error' className='Error Error--full'>
					<img
						src={notFoundSvg}
						alt='unexpected error'
						className='Error__svg'
					/>
				</div>
			);

		if (err.isNotFound)
			return (
				<div data-testid='error' className='Error Error--full'>
					<img
						src={notFoundSvg}
						alt='not found error'
						className='Error__svg'
					/>
				</div>
			);
	}

	return (
		<div
			data-testid='error'
			className='Error flex-jc-sb flex-ai-center mb-2 p-1'
		>
			<p className='Error__message'>{(err && err.message) || message}</p>

			{onClose && (
				<Clickable onClick={onClose} className='Error__control'>
					<AiFillCloseCircle className='tera' />
				</Clickable>
			)}
		</div>
	);
}

export default Error;

