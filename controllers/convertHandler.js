function ConvertHandler() {
  const checkNumber = (number) => {
    return /^\d*(\.\d+)?(\/\d+(\.\d+)?)?$/.test(number);
  }

  const checkUnit = (unit) => {
    return /^(mi|km|L|lbs|kg|gal)$/i.test(unit);
  }

  const checkNumberAndUnit = (number, unit) => {
    return (checkNumber(number) && checkUnit(unit));
  };

  this.getNum = function(input) {
    if (!/^([0-9])/.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    }

    const [number, unit] = input.split(/([a-z]+)/i);

    if (!checkNumber(number)) {
      throw new Error("invalid number");
    }

    if (!checkNumberAndUnit(number, unit)) {
      throw new Error("invalid number and unit");
    }

    // check if we've got a fraction (indexOf returns -1 when the character is not found)
    if (number.indexOf("/") !== -1) {
      const numbers = number.split("/");

      if (numbers.length === 2) {
        const numerator = Number(numbers[0]);
        const denominator = Number(numbers[1]);

        return numerator / denominator;
      }
    }
    return Number(number);
  };

  this.getUnit = function(input) {
    const [number, unit] = input.split(/([a-z]+)/i);
    if (!checkUnit(unit)) {
      throw new Error("invalid unit");
    }

    if (!checkNumberAndUnit(number, unit)) {
      throw new Error("invalid number and unit");
    }

    if (unit === "l" || unit === "L") {
      return "L";
    }
    return unit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
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
      case "l":
        result = "gal";
        break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
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
      case "l":
        result = "liters";
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.785411784;
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
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return Number(result).toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
