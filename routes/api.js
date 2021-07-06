"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = (app) => {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const inputStr = req.query.input;
    let inputNumber;
    let inputUnit;

    try {
      inputNumber = convertHandler.getNum(inputStr);
      inputUnit = convertHandler.getUnit(inputStr);
    } catch (error) {
      return res.json(error.message);
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
