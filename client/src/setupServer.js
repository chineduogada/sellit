import { rest } from "msw";
import { setupServer } from "msw/node";
import { cleanup } from "@testing-library/react";

const server = setupServer(
	rest.get("/products", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				count: 2,
				data: {
					products: [
						{
							_id: "product id",
							user_id: "user id",
							title: "product title",
							slug: "product-title",
							description: "product description",
						},
					],
				},
			})
		);
	}),
	rest.get("*", (req, res, ctx) => {
		console.log(
			`please add a request handler for this endpoint: ${req.url.roString()}`
		);
		return res(
			ctx.status(500),
			cxt.json({ message: "no request handler defined!" })
		);
	})
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(() => cleanup());

export { server, rest };

