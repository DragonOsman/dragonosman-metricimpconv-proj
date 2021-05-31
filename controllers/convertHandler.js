function ConvertHandler() {
  const checkUnit = (unit) => {
    if (unit.toLowerCase() !== "gal" || unit.toLowerCase() !== "kg" ||
    unit.toLowerCase() !== "mi" || unit.toLowerCase() !== "km" ||
    unit.toLowerCase() !== "L" || unit.toLowerCase() !== "lbs") {
      throw new Error("invaid unit");
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    const [unit] = input.match(/([a-z]+)/i);

    if (Number(input) === NaN && (unit.toLowerCase() !== "gal" || 
    unit.toLowerCase() !== "kg" || unit.toLowerCase() !== "mi" ||
    unit.toLowerCase() !== "km" || unit.toLowerCase() !== "L" ||
    unit.toLowerCase() !== "lbs")) {
      throw new Error("invalid number and unit");
    }
    return true;
  }

  this.getNum = function(input) {
    if (Number(input) === NaN) {
      throw new Error("invalid number");
    }

    try {
      if (checkNumberAndUnit(input)) {
        // extract number part from string containing number and metric unit
        const [number] = input.match(/(\d+(?:.\d+)?)/);
        const result = parseFloat(number);
  
        return result;
      }
    } catch (error) {
      console.log(error.message());
    }
  };

  this.getUnit = function(input) {
    try {
      if (checkUnit(input)) {
        const [unit] = input.match(/([a-z]+)/i);
      
        return unit;
      }
    } catch (error) {
      console.log(error.toString());
    }
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
      default:
        throw new Error("invalid unit");
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
      default:
        throw new Error("invalid unit");
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
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
