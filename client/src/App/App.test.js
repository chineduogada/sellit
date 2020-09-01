import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders hello world text", () => {
	const component = render(<App />);

	component.getByText(/hello world/i);
});

