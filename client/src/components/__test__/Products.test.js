import React from "react";
import { render as rtl } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Products from "../layouts/Products";

const render = () =>
	rtl(
		<BrowserRouter>
			<Products route='/products' />
		</BrowserRouter>
	);

describe("Products", () => {
	describe("when fetch operation is pending", () => {
		test("renders loading", () => {
			const component = render();

			component.getByTestId("loading");
		});
	});

	describe("when fetch operation is completed", () => {
		test("renders products", async () => {
			const component = render();
			const products = await component.findAllByTestId(/product-card/i);
			await component.findByText(/product title 1/i);
			await component.findByText(/product title 2/i);
			await component.findByText(/product title 3/i);

			expect(products.length).toEqual(3);
		});
	});
});

