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
    if (result) {
      let number = result.groups["num"];

      // check if we've got a fraction (indexOf returns -1 when the character is not found)
      if (number.toString().indexOf("/") !== -1) {
        const numbers = number.toString().split("/");

        // if there are more than two elements in the numbers array, it's invalid
        // because this means it's a double (or more) fraction
        if (numbers.length === 3) {
          return "invalid number";
        } else if (numbers.length === 2) {
          const numerator = numbers[0];
          const denominator = numbers[1];
          number = Number((numerator / denominator).toString());

          return number;
        }
      } else if (number.toString().indexOf("/") === -1) {
        number = Number(result.groups["num"]);

        return number;
      } else if (!Number(number)) {
        return "invalid number";
      }
    } else {
      if (!checkNumberAndUnit(input)) {
        return "invalid number and unit";
      } else if (!checkNumber(input)) {
        return "invalid number";
      }
    }
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
