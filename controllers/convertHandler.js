function ConvertHandler() {
  const checkNumber = (input) => {
    return /^\d*(\.\d+)?(\/\d+(\.\d+)?)?/.test(input);
  }

  const checkUnit = (input) => {
    const unit = input.match(/(mi|lbs|gal|km|kg|L)$/i);
    if (!unit) {
      return false;
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    return (checkNumber(input) && checkUnit(input));
  };

  this.getNum = function(input) {
    if (!/^([0-9])/.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    } 

    const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
    if (!result) {
      return "invalid number";
    }

    if (!checkNumber(input)) {
      return "invalid number";
    } else if (!checkNumberAndUnit(input)) {
      return "invalid number and unit";
    }

    let number = result["groups"]["num"];

    // if indexOf returns -1 here, it means a slash wasn't found and it's a not a fraction
    if (number.toString().indexOf("/") !== -1) {
      number = Number(number);
    } else {
      // turn the number string into an array, each part separated by the / being an element
      // then check the number of elements
      const numbers = number.toString().split("/");
      if (numbers.length === 2) {
        const numerator = numbers[0];
        const denominator = numbers[1];
        number = Number(numerator / denominator);
      } else if (numbers.length > 2) {
        return "invalid number";
      }
    }

    return number;
  };

  this.getUnit = function(input) {
    const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
    if (!result) {
      return "invalid number";
    }
    const unit = result.groups["unit"];
    if (unit === "l" || unit === "L") {
      return "L";
    }

    if (!checkUnit(input)) {
      return "invalid unit";
    }
    return unit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case "mi":
        result = "km";
        break;
      case "gal":
        result = "L";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "L":
        result = "gal";
        break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case "mi":
        result = "miles";
        break;
      case "gal":
        result = "gallons";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "L":
        result = "liters";
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    result = Number(result).toFixed(5);
    return Number(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
