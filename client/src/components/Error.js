import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import Clickable from "./Clickable";

function Error({ message, onClose }) {
	return (
		<div className='Error flex-jc-sb flex-ai-center mb-2 p-1'>
			<p className='Error__message'>{message}</p>

			<Clickable onClick={onClose} className='Error__control'>
				<AiFillCloseCircle className='tera' />
			</Clickable>
		</div>
	);
}

export default Error;

