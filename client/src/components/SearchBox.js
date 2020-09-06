import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Clickable from "./Clickable";

const SearchBox = ({ value, onChange, onSearch, ...rest }) => {
	const handleSearch = (e) => {
		e.preventDefault();

		console.log("searching...", value);
		onSearch();
	};

	return (
		<form className='SearchBox flex-jc-sb' onSubmit={handleSearch}>
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

