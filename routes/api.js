"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = (app) => {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    try {
      const inputStr = req.query.input;
      const inputNumber = convertHandler.getNum(inputStr);
      const inputUnit = convertHandler.getUnit(inputStr);
      const returnUnit = convertHandler.getReturnUnit(inputUnit);
      const result = convertHandler.convert(inputNumber, inputUnit);
      const fullResultStr = convertHandler.getString(inputNumber, inputUnit, result, returnUnit);
      res.json({
        initNum: inputNumber,
        initUnit: inputUnit,
        returnNum: result,
        returnUnit: returnUnit,
        string: fullResultStr
      });
    } catch (error) {
      console.log("routes/api.js:", error.message);
      res.json({
        error: error.message
      });
    }
  });

};
