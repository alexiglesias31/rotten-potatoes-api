// import app from '../app';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';

// chai.use(chaiHttp);
// const assert = chai.assert;
// const expect = chai.expect;

// const Movies = require('../db/models/movie')

// const testSuite = () => {
//   // Hello API
//   describe('API Tests', async function () {
//     it('Hello API Request', function(done){
//         chai
//             .request(app)
//             .get('/')
//             .end((err,res) => {
//               assert.equal(res.text, "Hola Mundo! I\'m Alex")
//               done()
//             })
//     })
//   })

//   // Movies Tests
//   describe('API Functional Tests', async function() {
//     this.beforeEach(async () => {
//       await Movies.deleteMany({})
//     })

//     // GET
//     describe('GET /movies', async function() {
//       it('Should get all movies in DB', (done) => {
//         new Movies({
//           title: 'Title 1',
//           plotSummary: 'Summary 1',
//           duration: 10
//         }).save((err, movie) => {

//         })
//       })
//     })
//   })
// }

// module.exports = testSuite()