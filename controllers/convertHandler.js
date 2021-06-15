function ConvertHandler() {
  const checkNumber = (input) => {
    if (/^([a-z]+)$/i.test(input)) {
      return true;
    }

    return /^\d*(\.\d+)?(\/\d+(\.\d+)?)?/.test(input);
  }

  const checkUnit = (input) => {
    console.log("line 11: test");
    const [unit] = input.match(/(mi|lbs|gal|km|kg|L)$/i);
    if (!unit) {
      return false;
    }
    return true;
  }

  const checkNumberAndUnit = (input) => {
    console.log("line 16: test");
    return checkNumber(input) && checkUnit(input);
  };

  this.getNum = function(input) {
    if (/^([a-z])$/i.test(input)) {
      // We only got a unit, so the number should be 1
      return 1;
    } 

    const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
    let number = 0;
    let unit;
    if (result) {
      number = result.groups["num"];

      console.log("line 36: result is (type) ", typeof result);
      unit = result.groups["unit"];

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
    } else {
      if (!checkNumberAndUnit(input)) {
        console.log("line 61: test");
        throw new Error("invalid number and unit");
      } else if (!checkNumber(input)) {
        console.log("line 64: test");
        throw new Error("invalid number");
      } else if (!checkUnit(input)) {
        console.log("line 67: test");
        throw new Error("invalid unit");
      }
    }
  };

  this.getUnit = function(input) {
    const result = input.match(/^(?<num>\d*(\.\d+)?(\/\d+(\.\d+)?)?)(?<unit>([a-z]+))$/i);
    if (!result) {
      throw new Error("invalid number");
    }
    const unit = result.groups["unit"];
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
