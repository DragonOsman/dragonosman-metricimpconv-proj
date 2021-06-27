const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const { expect } = require("chai");
chai.use(chaiHttp);

suite("Functional Tests", () => {
  chai.request(server)
    .get("/api/convert?input=10L")
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body).to.equal({
        initNum: 10,
        initUnit: "L",
        returnNum: 2.64172,
        returnUnit: "gal",
        string: "10 liters converts to 2.64172 gallons"
      });
    })
  ;
  chai.request(server)
    .get("/api/convert?input=32g")
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body).to.equal("invalid unit");
    })
  ;
  chai.request(server)
    .get("/api/convert?input=3/7.2/4kg")
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body).to.equal("invalid number");
    })
  ;
  chai.request(server)
    .get("/api/convert?input=3/7.2/4kilomegagram")
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body).to.equal("invalid number and unit")
    })
  ;
  chai.request(server)
    .get("/api/convert?input=kg")
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body).to.equal({
        initNum: 1,
        initUnit: "kg",
        returnNum: 2.20462,
        returnUnit: "lbs",
        string: "1 kilograms converts to 2.20462 pounds"
      })
    })
  ;
});
