import React from "react";
import { render as rlt } from "@testing-library/react";
import Header from "../layouts/Header";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

const render = (
	contextValue = {
		userData: {
			token: undefined,
			user: undefined,
		},
		setUserData: () => {},
	}
) =>
	rlt(
		<BrowserRouter>
			<UserContext.Provider value={{ ...contextValue }}>
				<Header />
			</UserContext.Provider>
		</BrowserRouter>
	);

describe("Header component", () => {
	test("renders the brand:`sell-it.ng`", () => {
		const component = render();
		component.getByTestId(/sell-it\.ng/i);
	});

	describe("when logged in", () => {
		const contextValue = {
			userData: {
				token: "test token",
				user: { _id: "test id", email: "test@email.com" },
			},
			setUserData: () => {},
		};
		test("renders the loggedInOptions", () => {
			const component = render(contextValue);

			component.getByTestId(/my-ads/i);
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

