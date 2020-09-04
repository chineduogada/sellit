import React, { forwardRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Clickable from "./Clickable";

const SearchBox = ({ value, onChange, ...rest }) => {
	return (
		<form className='SearchBox flex-jc-sb'>
			<input
				{...rest}
				className='SearchBox__input child-flex'
				value={value}
				onChange={onChange}
			/>
			<Clickable className='SearchBox__control'>
				<AiOutlineSearch />
			</Clickable>
		</form>
	);
};

export default SearchBox;

