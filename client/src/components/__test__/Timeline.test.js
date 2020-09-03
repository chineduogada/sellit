import React from "react";
import { render } from "@testing-library/react";
import Timeline from "../layouts/Timeline";

describe("Timeline", () => {
	test("renders products", () => {
		const component = render(<Timeline />);

		component.getByTestId("loading");
	});
});

