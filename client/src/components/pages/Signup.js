import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FaPaperPlane } from "react-icons/fa";
import Axios from "axios";

import InputField from "../InputField";
import UserContext from "../../context/UserContext";
import loginAUser from "../../utils/loginAUser";
import Error from "../Error";

const initialState = {
	email: "",
	password: "",
	password_check: "",
	first_name: "",
	last_name: "",
	phone_number: "",
};

function Signup() {
	const { setUserData } = useContext(UserContext);

	const history = useHistory();

	const [formData, setFormData] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = ({ target: { value, id } }) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await Axios.post("/users/signup", formData);

			const loginData = {
				email: formData.email,
				password: formData.password,
			};

			await loginAUser(loginData, setUserData, history);
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};
	return (
		<main className='page Signup'>
			<div className='container p-1'>
				<form className='form' onSubmit={handleSubmit}>
					<header className='flex-jc-sb p-1'>
						<h3>Sign up</h3>
						<FaPaperPlane />
					</header>

					{errorMessage && (
						<Error
							message={errorMessage}
							onClose={() => setErrorMessage("")}
						/>
					)}
					<InputField
						id='email'
						label='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<InputField
						type='password'
						id='password'
						label='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<InputField
						type='password'
						id='password_check'
						label='confirm password'
						value={formData.password_check}
						onChange={handleChange}
						required
					/>
					<InputField
						id='first_name'
						label='first name'
						value={formData.first_name}
						onChange={handleChange}
						required
					/>
					<InputField
						id='last_name'
						label='last name'
						value={formData.last_name}
						onChange={handleChange}
					/>
					<InputField
						id='phone_number'
						label='phone number'
						value={formData.phone_number}
						onChange={handleChange}
						required
					/>

					<Button color='primary' variant='contained' type='submit'>
						register
					</Button>
				</form>
			</div>
		</main>
	);
}

export default Signup;

