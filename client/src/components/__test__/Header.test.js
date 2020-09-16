import React from "react";
import { render as rlt } from "@testing-library/react";
import Header from "../layouts/Header";
import { BrowserRouter } from "react-router-dom";
import AppContext from "../../context/AppContext";

const render = (
	contextValue = {
		appData: {
			token: undefined,
			user: undefined,
		},
		setAppData: () => {},
	}
) =>
	rlt(
		<BrowserRouter>
			<AppContext.Provider value={{ ...contextValue }}>
				<Header />
			</AppContext.Provider>
		</BrowserRouter>
	);

describe("Header component", () => {
	test("renders the brand:`sell-it.ng`", () => {
		const component = render();
		component.getByTestId(/sell-it\.ng/i);
	});

	describe("when logged in", () => {
		const contextValue = {
			appData: {
				token: "test token",
				user: { _id: "test id", email: "test@email.com" },
			},
			setAppData: () => {},
		};
		test("renders the loggedInOptions", () => {
			const component = render(contextValue);

			component.getByTestId(/my-products/i);
			component.getByTestId(/profile/i);
			component.getByText(/sell it/i);
		});
	});

	describe("when logged out", () => {
		test("renders the loggedOutOptions", () => {
			const component = render();

			component.getByText(/login/i);
			component.getByText(/sign up/i);
		});
	});
});

