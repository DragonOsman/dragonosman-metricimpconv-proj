function ConvertHandler() {
  const checkNumber = (input) => {
    if (/^([a-z]+)$/i.test(input)) {
      return true;
    }

    return /^\d*(\.\d+)?(\/\d+(\.\d+)?)?/.test(input);
  }

  const checkUnit = (input) => {
    return /(mi|lbs|gal|km|kg|L)$/i.test(input);
  }

  const checkNumberAndUnit = (input) => {
    if (!checkNumber(input) && !checkUnit(input)) {
      return false;
    }
    return true;
  };

  const verifyInput = (input) => {
    if (!checkNumberAndUnit(input)) {
      throw new Error("invalid number and unit");
    }
    return true;
  }

  this.getNum = function(input) {
    if (/^([a-z])$/i.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    } 

    if (!checkNumber(input)) {
      throw new Error("invalid number");
    }

    if (verifyInput(input)) {
      const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
      if (!result) {
        throw new Error("invalid number");
      }
      let number = 0;
      number = result.groups["num"];

      // check if we've got a fraction (indexOf returns -1 when the character is not found)
      if (number.toString().indexOf("/") !== -1) {
        const numbers = number.toString().split("/");

        // if there are more than two elements in the numbers array, it's invalid
        // because this means it's a double (or more) fraction
        if (numbers.length > 2) {
          throw new Error("invalid number");
        } else if (numbers.length === 2) {
          const numerator = numbers[0];
          const denominator = numbers[1];
          number = Number((numerator / denominator).toString());

          return number;
        }
      } else {
        number = Number(result.groups["num"]);

        return number;
      }
    }
  };

  this.getUnit = function(input) {
    const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
    let unit = result.groups["unit"];
    if (unit === "l" || unit === "L") {
      return "L";
    }

    if (!checkUnit(input)) {
      throw new Error("invalid unit");
    }
    return unit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toString()) {
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
      default:
        throw new Error("invalid unit");
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit) {
      switch (unit.toString()) {
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
        default: 
          throw new Error("invalid unit");
      }
      
      return result;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toString()) {
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

    if (result) {
      result = result.toFixed(5);
    
      return result;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
