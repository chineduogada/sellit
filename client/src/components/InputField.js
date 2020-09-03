import React, { forwardRef } from "react";
import { TextField } from "@material-ui/core";

const InputField = forwardRef(({ id, value, onChange, ...rest }, ref) => {
	return (
		<TextField
			ref={ref}
			{...rest}
			variant='outlined'
			size='small'
			id={id}
			name={id}
			value={value}
			onChange={onChange}
		/>
	);
});

export default InputField;

