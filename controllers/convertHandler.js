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
    if (Number(number) === Number.isNaN() || /^\d+(?:(\s(\d)+)*)(?:\/\d+){2,}/.test(number)) {
      return false;
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    if (!/^\d+/.test(input)) {
      input = `1${input}`;
    }

    const [unit] = input.match(/([a-z]+)/i);
    const [number] = input.match(/^\d+(?:(\.\d))(?:(\s(\d)+)*)(?:\/\d+){1}/);
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
    let [number] = input.match(/(\d+(?:.\d+)?)(?:(\s(\d)+)*)(?:\/\d+){1}/);

    if (checkNumber(number)) {
      // to check if the number is a fraction and to evaluate it if so
      const index = number.indexOf("/");
    
      // -1 means not found
      if (index !== -1) {
        const numbers = number.split(index);
        const numerator = parseFloat(numbers[0]);
        const denomenator = parseFloat(numbers[1]);
        number = numerator / denominator;
      }
      return number;
    } else if (!checkNumber) {
      throw new Error("invalid number");
    } else if (!checkNumberAndUnit(input)) {
      throw new Error("invalid number and unit");
    }
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

      result = result.toFixed(5);
    
      return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
