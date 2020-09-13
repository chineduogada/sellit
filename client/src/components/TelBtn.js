import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { Button } from "@material-ui/core";

function TelBtn({ userPhone, productPhone }) {
	const [placeCall, setPlaceCall] = useState(false);

	const phone = productPhone || userPhone;

	return placeCall ? (
		<a
			href={`tel:${phone}`}
			className='MuiButtonBase-root MuiButton-root MuiButton-contained ViewSpecificProducts__footer-control MuiButton-containedSecondary'
			style={{ color: "#eee" }}
		>
			<FaPhone className='mr-2' /> {phone}
		</a>
	) : (
		<Button
			variant='contained'
			color='secondary'
			className='ViewSpecificProducts__footer-control'
			onClick={setPlaceCall.bind(true)}
		>
			contact seller <AiFillPhone />
		</Button>
	);
}

export default TelBtn;

