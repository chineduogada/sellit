import React from "react";
import { render } from "@testing-library/react";
import Products from "../layouts/Products";

describe("Products", () => {
	test("renders products", () => {
		const component = render(<Products />);

		component.getByTestId("loading");
	});
});

