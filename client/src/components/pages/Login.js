import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineUser } from "react-icons/ai";

import InputField from "../InputField";
import UserContext from "../../context/UserContext";
import loginAUser from "../../utils/loginAUser";
import Error from "../Error";

const initialState = {
	email: "",
	password: "",
};

function Login() {
	const [formData, setFormData] = useState(initialState);
	const [errorMessage, setErrorMessage] = useState("");

	const { setUserData } = useContext(UserContext);

	const history = useHistory();

	const handleChange = ({ target: { value, id } }) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await loginAUser(formData, setUserData, history);
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};
	return (
		<main className='page Login'>
			<div className='container p-1'>
				<form className='form' onSubmit={handleSubmit}>
					<header className='flex-jc-sb p-1'>
						<h3>Login</h3>
						<AiOutlineUser />
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

					<Button color='primary' variant='contained' type='submit'>
						login
					</Button>
				</form>
			</div>
		</main>
	);
}

export default Login;

