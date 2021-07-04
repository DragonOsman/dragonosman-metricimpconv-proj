"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = (app) => {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const inputStr = req.query.input;
    const inputNumber = convertHandler.getNum(inputStr);
    if (inputNumber === "invalid number" || inputNumber === "invalid number and unit") {
      return inputNumber;
    }
    const inputUnit = convertHandler.getUnit(inputStr);
    if (inputUnit === "invalid unit") {
      return inputUnit;
    }
    const returnUnit = convertHandler.getReturnUnit(inputUnit);
    const result = convertHandler.convert(inputNumber, inputUnit);
    const fullResultStr = convertHandler.getString(inputNumber, inputUnit, result, returnUnit);
    return res.json({
      initNum: inputNumber,
      initUnit: inputUnit,
      returnNum: Number(result),
      returnUnit: returnUnit,
      string: fullResultStr
    });
  });

};
