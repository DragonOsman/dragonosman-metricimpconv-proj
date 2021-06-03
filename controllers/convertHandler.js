function ConvertHandler() {
  const checkUnit = (unit) => {
    if (unit.toLowerCase() !== "gal" && unit.toLowerCase() !== "kg" &&
    unit.toLowerCase() !== "mi" && unit.toLowerCase() !== "km" &&
    unit.toLowerCase() !== "L" && unit.toLowerCase() !== "lbs") {
      return false;
    }
    return true;
  }

  const checkNumber = (input) => {
    if (Number(input) === Number.isNaN() || /^\d+(?:(\s(\d)+)*)(?:\/\d+){2,}/.test(input)) {
      return false;
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    if (!/^\d+/.test(input)) {
      input = `1${input}`;
    }

    const [unit] = input.match(/([a-z]+)/i);
    if (!checkNumber(input) && !checkUnit(unit)) {
      return new Error("invalid number and unit");
    } else if (!checkNumber(input)) {
      return new Error("invalid number");
    } else if (!checkUnit(unit)) {
      return new Error("invalid unit");
    }
    return true;
  }

  this.getNum = function(input) {
    if (/^[a-z]/i.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    } else if (checkNumber(input)) {
      // extract number part from string containing number and unit
      const [number] = input.match(/(\d+(?:.\d+)?)/);
      const result = parseFloat(number);

      return result;
    }
  };

  this.getUnit = function(input) {
    const [unit] = input.match(/([a-z]+)/i);
    if (checkUnit(unit)) {
      return unit;
    }
    return new Error("invalid unit");
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (initUnit) {
      switch (initUnit.toLowerCase()) {
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
          return new Error("invalid unit");
      }
      
      return result;
    }
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit) {
      switch (unit.toLowerCase()) {
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
          return new Error("invalid unit");
      }
      
      return result;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    let input = `${initNum}${initUnit}`;
    if (input.match(/^[a-z]+$/i)) {
      initNum = 1;
      input = `${initNum}${initUnit}`;
    }

    if (checkNumberAndUnit(input)) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      let result;
      switch (initUnit.toLowerCase()) {
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

      result = result.toPrecision(7);
    
      return result;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
