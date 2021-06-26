const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
chai.use(chaiHttp);

suite("Functional Tests", () => {
  chai.request(server)
    .get("/api/convert")
    .send("10L")
  ;
  chai.request(server)
    .get("/api/convert")
    .send("32g")
  ;
  chai.request(server)
    .get("/api/convert")
    .send("3/7.2/4kg")
  ;
  chai.request(server)
    .get("/api/convert")
    .send("kg")
  ;
});
