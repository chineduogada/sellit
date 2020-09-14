import { rest } from "msw";
import { setupServer } from "msw/node";
import { cleanup } from "@testing-library/react";

const server = setupServer(
	rest.get("/products", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				count: 3,
				data: {
					products: [
						{
							_id: "product id 1",
							user_id: "user id 1",
							title: "product title 1",
							slug: "product-title-1",
							description: "product description 1",
							price: "100",
							plan: "standard",
							createdAt: new Date().toISOString(),
						},
						{
							_id: "product id 2",
							user_id: "user id 2",
							title: "product title 2",
							slug: "product-title-2",
							description: "product description 2",
							price: "200",
							plan: "pro",
							createdAt: new Date().toISOString(),
						},
						{
							_id: "product id 3",
							user_id: "user id 3",
							title: "product title 3",
							slug: "product-title-3",
							description: "product description 3",
							price: "300",
							plan: "vip",
							createdAt: new Date().toISOString(),
						},
					],
				},
			})
		);
	}),
	rest.get("*", (req, res, ctx) => {
		console.log(
			`please add a request handler for this endpoint: ${req.url.toString()}`
		);
		return res(
			ctx.status(500),
			cxt.json({ message: "no request handler defined!" })
		);
	})
);

afterEach(() => cleanup());

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };

