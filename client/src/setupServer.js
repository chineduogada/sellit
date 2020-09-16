import { rest } from "msw";
import { setupServer } from "msw/node";
import { cleanup } from "@testing-library/react";

const server = setupServer(
	rest.get("/products/product-title-1/users/user-1", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: {
					product: {
						_id: "product-1",
						user_id: "user-1",
						title: "product title 1",
						slug: "product-title-1",
						description: "product description 1",
						price: 100.99,
						plan: "standard",
						likes: 10,
						full_name: "stanley richard",
						phone_number: "12345678901",
						ratings_average: "2.2",
						is_negotiable: false,
						category: "electronics",
						keywords: ["test keyword 1", "test keyword 2"],
						type: "test type",
						region: "test region",
						condition: "used",
						photos: ["img-1.png", "img-3.png", "img-3.png"],
						createdAt: "2020-06-16T00:40:22.047Z",
					},
				},
			})
		);
	}),
	rest.get("/products", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				count: 3,
				data: {
					products: [
						{
							_id: "product-1",
							user_id: "user-1",
							title: "product title 1",
							slug: "product-title-1",
							description: "product description 1",
							price: 100.99,
							plan: "standard",
							likes: 10,
							full_name: "stanley richard",
							phone_number: "12345678901",
							ratings_average: "2.2",
							is_negotiable: false,
							category: "electronics",
							keywords: ["test keyword 1", "test keyword 2"],
							type: "test type",
							region: "test region",
							condition: "used",
							photos: ["img-1.png", "img-3.png", "img-3.png"],
							createdAt: "2020-06-16T00:40:22.047Z",
						},
						{
							_id: "product-2",
							user_id: "user-1",
							title: "product title 2",
							slug: "product-title-2",
							description: "product description 2",
							price: 200.99,
							plan: "pro",
							likes: 20,
							full_name: "stanley richard",
							phone_number: "12345678901",
							ratings_average: "3.5",
							is_negotiable: false,
							category: "fashion",
							keywords: ["test keyword 1"],
							type: "test type",
							region: "test region",
							condition: "used",
							photos: ["img-1.png", "img-3.png", "img-3.png"],
							createdAt: "2020-07-16T00:40:22.047Z",
						},
						{
							_id: "product-3",
							user_id: "user-2",
							title: "product title 3",
							slug: "product-title-3",
							description: "product description 3",
							price: 300.99,
							plan: "vip",
							likes: 2,
							full_name: "hello hi",
							phone_number: "12345678901",
							ratings_average: "1.0",
							is_negotiable: false,
							category: "electronics",
							keywords: ["test keyword 1", "test keyword 2"],
							type: "test type",
							region: "test region",
							condition: "new",
							photos: ["img-1.png"],
							createdAt: "2020-07-16T00:40:22.047Z",
						},
					],
				},
			})
		);
	}),

	rest.get("/users/user-1", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: {
					user: {
						_id: "user-1",
						first_name: "stanley",
						last_name: "richard",
						email: "stanley@gmail.com",
						phone_number: "08077917051",
						createdAt: "2020-05-16T00:40:22.047Z",
					},
				},
			})
		);
	}),
	rest.get("/users/user-2", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: {
					user: {
						_id: "user-2",
						first_name: "hello",
						last_name: "hi",
						email: "hello@gmail.com",
						phone_number: "12345678901",
						createdAt: "2020-06-16T00:40:22.047Z",
					},
				},
			})
		);
	}),
	rest.get("/users", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: {
					user: {
						_id: "user-1",
						first_name: "stanley",
						last_name: "richard",
						email: "stanley@gmail.com",
						phone_number: "08077917051",
						createdAt: "2020-05-16T00:40:22.047Z",
					},
				},
			})
		);
	}),

	rest.get("/followers/user-1", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				followers: [
					{
						following: {
							user_id: "user-1",
							full_name: "stanley richard",
						},
						user_id: "user-2",
					},
				],
			})
		);
	}),
	rest.get("/followers/followings/user-1", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				followers: [
					{
						following: {
							user_id: "user-2",
							full_name: "hello hi",
						},
						user_id: "user-1",
					},
				],
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

