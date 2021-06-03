const { expect } = require("chai");
const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  describe("Do conversions for numbers between metric and imperial", () => {
    describe("Get a number", () => {
      it("should correctly read a whole number input", () => {
        const input1 = "3mi";
        const input2 = "30km";
        const input3 = "10L";
        const input4 = "100kg";
        const input5 = "20gal";
        const input6 = "40lbs";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
  
        expect(num1).to.equal(3);
        expect(num2).to.equal(30);
        expect(num3).to.equal(10);
        expect(num4).to.equal(100);
        expect(num5).to.equal(20);
        expect(num6).to.equal(40);
      });

      it("should correctly read a decimal number input", () => {
        const input1 = "3.1mi";
        const input2 = "30.43km";
        const input3 = "10.2354L";
        const input4 = "100.2345kg";
        const input5 = "20.3456gal";
        const input6 = "40.5678lbs";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
  
        expect(num1).to.equal(3.1);
        expect(num2).to.equal(30.43);
        expect(num3).to.equal(10.2354);
        expect(num4).to.equal(100.2345);
        expect(num5).to.equal(20.3456);
        expect(num6).to.equal(40.5678);
      });

      it("should correctly read a fractional input", () => {
        
      });
    });
  });
});