function ConvertHandler() {
  const checkNumber = (number) => {
    if (!/^\d*(\.\d+)?(\/\d+(\.\d+)?)?$/.test(number)) {
      return false;
    }
    return true;
  }

  const checkUnit = (unit) => {
    if (!/^(mi|km|L|lbs|kg|gal)$/i.test(unit)) {
      return false;
    }
    return true;
  }

  this.getNum = function(input) {
    if (/^([a-z]+)$/i.test(input)) {
      return 1;
    }

    const [number, unit] = input.split(/([a-z]+)/i);
    return number;
  };

  this.getUnit = function(input) {
    const [number, unit] = input.split(/([a-z]+)/i);
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

    // check if we've got a fraction (indexOf returns -1 when the character is not found)
    if (checkNumber(initNum) && checkUnit(initUnit)) {
      if (initNum.toString().indexOf("/") !== -1) {
        const numbers = initNum.split("/");
  
        if (numbers.length === 2) {
          const numerator = Number(numbers[0]);
          const denominator = Number(numbers[1]);
          initNum = Number(numerator / denominator);
        }
        initNum = Number(initNum);
      }

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
    } else if (!checkNumber(initNum) && !checkUnit(initUnit)) {
      throw new Error("invalid number and unit");
    } else if (!checkNumber(initNum)) {
      throw new Error("invalid number");
    } else if (!checkUnit(initUnit)) {
      throw new Error("invalid unit");
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
