import app from "../src/app";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import { IMovie } from "../src/interfaces/movie.interface";
import { MoviesService } from "../src/services/movies.services";
import { Movie } from "../src/models/movie";

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;

const testSuite = () => {
	// Hello API
	describe("API Tests", async () => {
		it("Hello API Request", (done) => {
			chai
				.request(app)
				.get("/")
				.end((err, res) => {
					assert.equal(res.text, "Welcome to Rotten Potatoes, by Alex");
					done();
				});
		});
	});

	// Movies Tests
	describe("API Functional Tests", async () => {
		beforeEach(async () => {
			await Movie.deleteMany({});
		});

		// GET
		describe("GET tests to /movies and /movies/:id", async () => {
			it("Should get all movies in DB", (done) => {
				new Movie({
					title: "Title 1",
					plotSummary: "Summary 1",
					duration: 10,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.get("/movies")
						.end((error, res) => {
							assert.equal(res.status, 200);
							assert.isAtLeast(res.body.length, 1);
							assert.property(res.body[0], "title");
							assert.property(res.body[0], "plotSummary");
							assert.property(res.body[0], "duration");
							done();
						});
				});
			});

			it("Should get one movie by correct ID", (done) => {
				new Movie({
					title: "Title 2",
					plotSummary: "Summary 2",
					duration: 10,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.get(`/movies/${movie._id}`)
						.end((error, res) => {
							assert.equal(res.status, 200);
							assert.equal(res.body.title, movie.title);
							assert.equal(res.body.plotSummary, movie.plotSummary);
							assert.equal(res.body.duration, movie.duration);
							done();
						});
				});
			});

			it("Should error on incorrect ID", (done) => {
				new Movie({
					title: "Title 2",
					plotSummary: "Summary 2",
					duration: 10,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.get(`/movies/1111111111111111111111111`)
						.end((error, res) => {
							assert.equal(res.status, 500);
							done();
						});
				});
			});
		});

		// POST
		describe("POST tests to /movies and /movies/:id", async () => {
			it("Should create a new movie", (done) => {
				chai
					.request(app)
					.post(`/movies`)
					.send({
						title: "Title 3",
						plotSummary: "Summary 3",
						duration: 30,
					})
					.end((error, res) => {
						assert.equal(res.status, 200);
						assert.property(res.body, "title");
						assert.equal(res.body.title, 'Title 3');
						assert.property(res.body, "plotSummary");
						assert.equal(res.body.plotSummary, 'Summary 3');
						assert.property(res.body, "duration");
						assert.equal(res.body.duration, 30);
						done();
					});
			})

			it("Should return error on empty fields", (done) => {
				chai
					.request(app)
					.post(`/movies`)
					.send({
						title: "Title 3",
					})
					.end((error, res) => {
						assert.equal(res.status, 500);
						done();
					});
			})

			it("Update with POST an existing Movie", (done) => {
				new Movie({
					title: "Title 4",
					plotSummary: "Summary 4",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.post(`/movies/${movie._id}`)
						.send({
							title: "Title Updated",
							plotSummary: "Summary Updated",
							duration: 20,
						})
						.end((error, res) => {
							assert.equal(res.status, 200);
							assert.equal(res.body.title, "Title Updated");
							assert.equal(res.body.plotSummary, "Summary Updated");
							assert.equal(res.body.duration, movie.duration);
							done();
						});
				});
			});
		})

		// PUT
		describe("PUT tests to /movies/:id", async () => {
			it("Update with PUT an existing Movie", (done) => {
				new Movie({
					title: "Title 5",
					plotSummary: "Summary 5",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.put(`/movies/${movie._id}`)
						.send({
							title: "Title Updated",
							plotSummary: "Summary Updated",
							duration: 20,
						})
						.end((error, res) => {
							assert.equal(res.status, 200);
							assert.equal(res.body.title, "Title Updated");
							assert.equal(res.body.plotSummary, "Summary Updated");
							assert.equal(res.body.duration, movie.duration);
							done();
						});
				});
			});

			it("Should return an error update with missing fields", (done) => {
				new Movie({
					title: "Title 6",
					plotSummary: "Summary 6",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.put(`/movies/${movie._id}`)
						.send({
							title: "Title Updated",
						})
						.end((error, res) => {
							assert.equal(res.status, 500);
							done();
						});
				});
			});

			it("Should return an error on incorrect ID", (done) => {
				new Movie({
					title: "Title 7",
					plotSummary: "Summary 7",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.put(`/movies/1111111111111111111111111`)
						.send({
							title: "Title Updated",
							plotSummary: "Summary Updated",
							duration: 20,
						})
						.end((error, res) => {
							assert.equal(res.status, 500);
							done();
						});
				});
			});
		})

		// DELETE
		describe("DELETE tests to /movies/:id", async () => {
			it("DELETE an existing Movie", (done) => {
				new Movie({
					title: "Title 8",
					plotSummary: "Summary 8",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.delete(`/movies/${movie._id}`)
						.end((error, res) => {
							assert.equal(res.status, 200);
							assert.equal(res.body.title, movie.title);
							assert.equal(res.body.plotSummary, movie.plotSummary);
							assert.equal(res.body.duration, movie.duration);
							done();
						});
				});
			});

			it("Should return an error on incorrect ID", (done) => {
				new Movie({
					title: "Title 9",
					plotSummary: "Summary 9",
					duration: 20,
				}).save((err: any, movie: IMovie) => {
					chai
						.request(app)
						.delete(`/movies/1111111111111111111111111`)
						.end((error, res) => {
							assert.equal(res.status, 500);
							done();
						});
				});
			});
		})
	});
};

module.exports = testSuite();
