import React from "react";
import { render as rtl } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ViewSpecificProducts from "../pages/ViewSpecificProducts";
import AppContext from "../../context/AppContext";

const render = (globalErr, noUserQuery) => {
	return rtl(
		<BrowserRouter>
			<AppContext.Provider
				value={{
					globalErr: globalErr || undefined,
					setGlobalErr: jest.fn(),
				}}
			>
				<ViewSpecificProducts
					userId={!noUserQuery && "user-1"}
					slug='product-title-1'
				/>
			</AppContext.Provider>
		</BrowserRouter>
	);
};

describe("ViewSpecificProducts", () => {
	describe("when fetch operation is pending", () => {
		test("renders loading", () => {
			const component = render();

			component.getByTestId("loading");
		});
	});

	describe("when fetch operation is completed", () => {
		describe("when userId is passed in the URL query", () => {
			test("renders the product", async () => {
				const component = render();

				await component.findByText(/product title 1/i);
				await component.findByText(/product description 1/i);
				await component.findByText(/100.99/i);
				await component.findByText(/electronics/i);
				const keywords = await component.findAllByText(/test keyword/i);
				expect(keywords.length).toEqual(2);
			});
		});

		describe("when userId NOT passed in the URL query", () => {
			test("renders list of product cards", async () => {
				const component = render(null, true);

				await component.findAllByTestId(/product-card/i);
			});
		});

		test("renders erroneously", async () => {
			const component = render({ isNotFound: true });

			await component.findByTestId(/error/i);
		});
	});
});

