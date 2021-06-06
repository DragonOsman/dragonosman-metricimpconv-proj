function ConvertHandler() {
  const checkUnit = (unit) => {
    if (unit.toLowerCase() !== "gal" && unit.toLowerCase() !== "kg" &&
    unit.toLowerCase() !== "mi" && unit.toLowerCase() !== "km" &&
    unit.toLowerCase() !== "L" && unit.toLowerCase() !== "lbs") {
      return false;
    }
    return true;
  }

  const checkNumber = (number) => {
    if (Number(number.toString()) === Number.isNaN()) {
      return false;
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    if (!/^\d+/.test(input)) {
      input = `1${input}`;
    }

    const [unit] = input.match(/([a-z]+)/i);
    const [number] = input.match(/[^a-z]/i);
    if (!checkNumber(number) && !checkUnit(unit)) {
      return false;
    }
    return true;
  }

  this.getNum = function(input) {
    if (/^[a-z]/i.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    }

    // extract number part from string containing number and unit
    let numberStr = input.match(/[^a-z]/i);
    numberStr = numberStr.toString();

    // to check if the number is a fraction
    const index = numberStr.indexOf("/");

    // if there's at least one / in there, check if it's the only one
    // -1 means not found
    if (index !== -1) {
      if (numberStr.indexOf("/") === numberStr.lastIndexOf("/")) {
        const numbers = numberStr.split("/");
        const numerator = parseFloat(numbers[0]);
        const denominator = parseFloat(numbers[1]);
        numberStr = (numerator / denominator).toString();
      } else {
        throw new Error("invalid number");
      }
    }

    const number = parseFloat(numberStr);

    if (!checkNumber(number)) {
      throw new Error("invalid number");
    } else if (!checkNumberAndUnit(input)) {
      throw new Error("invalid number and unit");
    }
    return number;
  };

  this.getUnit = function(input) {
    const [unit] = input.match(/([a-z]+)/i);
    if (checkUnit(unit)) {
      return unit;
    }
    throw new Error("invalid unit");
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (initUnit) {
      switch (initUnit.toString().toLowerCase()) {
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
    }
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit) {
      switch (unit.toString().toLowerCase()) {
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
    if (initNum && initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      let result;
      switch (initUnit.toString().toLowerCase()) {
        case "gal":
          result = initNum * galToL;
          break;
        case "lbs":
          result = initNum * lbsToKg;
          break;
        case "mi":
          result = initNum = miToKm;
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
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
