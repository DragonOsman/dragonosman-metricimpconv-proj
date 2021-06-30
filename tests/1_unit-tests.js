const { expect } = require("chai");
const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  describe("Do conversions for numbers between metric and imperial", () => {
    describe("Get a number", () => {
      it("should correctly read a whole number input", () => {
        const input1 = "3mi";
        const input2 = "30km";
        const input3 = "10L";
        const input4 = "100kg";
        const input5 = "20gal";
        const input6 = "40lbs";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
  
        assert(num1 === 3);
        assert(num2 === 30);
        assert(num3 === 10);
        assert(num4 === 100);
        assert(num5 === 20);
        assert(num6 === 40);
      });

      it("should correctly read a decimal number input", () => {
        const input1 = "3.1mi";
        const input2 = "30.43km";
        const input3 = "10.2354L";
        const input4 = "100.2345kg";
        const input5 = "20.3456gal";
        const input6 = "40.5678lbs";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
  
        assert(num1 === 3.1);
        assert(num2 === 30.43);
        assert(num3 === 10.2354);
        assert(num4 === 100.2345);
        assert(num5 === 20.3456);
        assert(num6 === 40.5678);
      });

      it("should correctly read a fractional input", () => {
        const input1 = "2/3lbs";
        const input2 = "1/2kg";
        const input3 = "3/4km";
        const input4 = "1/4mi";
        const input5 = "3/5L";
        const input6 = "1/3gal";
        const input7 = "23/40kg"
        const input8 = "230/400gal";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
        const num7 = convertHandler.getNum(input7);
        const num8 = convertHandler.getNum(input8);

        assert(num1 === 2/3);
        assert(num2 === 1/2);
        assert(num3 === 3/4);
        assert(num4 === 1/4);
        assert(num5 === 3/5);
        assert(num6 === 1/3);
        assert(num7 === 23/40);
        assert(num8 === 230/400);
      });

      it("should correctly read a fractional input with a decimal", () => {
        const input1 = "3.4/10mi";
        const input2 = "1.5/2.5lbs";
        const input3 = "23/5.3L";
        const input4 = "100.3/45gal";
        const input5 = "3.1415925269/45kg";
        const input6 = "4.25/3km";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);

        assert(num1 === 3.4/10);
        assert(num2 === 1.5/2.5);
        assert(num3 === 23/5.3);
        assert(num4 === 100.3/45);
        assert(num5 === 3.1415925269/45);
        assert(num6 === 4.25/3);
      });

      it("should correctly return an error on a double-fraction", () => {
        const input1 = "3/4/5mi";
        const input2 = "1/2/3km";
        const input3 = "12/23/34L";
        const input4 = "120/230/40gal";
        const input5 = "2/3/4lbs";
        const input6 = "6/7/8kg";

        expect(convertHandler.getNum.bind(convertHandler, input1)).to.throw("invalid number");
        expect(convertHandler.getNum.bind(convertHandler, input2)).to.throw("invalid number");
        expect(convertHandler.getNum.bind(convertHandler, input3)).to.throw("invalid number");
        expect(convertHandler.getNum.bind(convertHandler, input4)).to.throw("invalid number");
        expect(convertHandler.getNum.bind(convertHandler, input5)).to.throw("invalid number");
        expect(convertHandler.getNum.bind(convertHandler, input6)).to.throw("invalid number");
      });

      it("should correctly default to a numerical input of 1 when no numerical input is provided", () => {
        const input1 = "mi";
        const input2 = "lbs";
        const input3 = "kg";
        const input4 = "km";
        const input5 = "L";
        const input6 = "gal";
        const input7 = "MI";
        const input8 = "LBS";
        const input9 = "KG";
        const input10 = "KM";
        const input11 = "l";
        const input12 = "GAL";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
        const num7 = convertHandler.getNum(input7);
        const num8 = convertHandler.getNum(input8);
        const num9 = convertHandler.getNum(input9);
        const num10 = convertHandler.getNum(input10);
        const num11 = convertHandler.getNum(input11);
        const num12 = convertHandler.getNum(input12);

        assert(num1 === 1);
        assert(num2 === 1);
        assert(num3 === 1);
        assert(num4 === 1);
        assert(num5 === 1);
        assert(num6 === 1);
        assert(num7 === 1);
        assert(num8 === 1);
        assert(num9 === 1);
        assert(num10 === 1);
        assert(num11 === 1);
        assert(num12 === 1);
      })
    });

    describe("Get a unit", () => {
      it("should correctly read each valid input unit", () => {
        const input1 = "3.1mi";
        const input2 = "30.43km";
        const input3 = "10.2354L";
        const input4 = "100.2345kg";
        const input5 = "20.3456gal";
        const input6 = "40.5678lbs";
        const input7 = "3.1Mi";
        const input8 = "30.43Km";
        const input9 = "10.2354l";
        const input10 = "100.2345Kg";
        const input11 = "20.3456Gal";
        const input12 = "40.5678Lbs";
        const input13 = "3.4/10MI";
        const input14 = "1.5/2.5LBS";
        const input15 = "23/5.3L";
        const input16 = "100.3/45GAL";
        const input17 = "3.1415925269/45KG";
        const input18 = "4.25/3KM";
        const input19 = "mi";
        const input20 = "lbs";
        const input21 = "kg";
        const input22 = "km";
        const input23 = "L";
        const input24 = "gal";
        const input25 = "MI";
        const input26 = "LBS";
        const input27 = "KG";
        const input28 = "KM";
        const input29 = "l";
        const input30 = "GAL";
        
        const unit1 = convertHandler.getUnit(input1);
        const unit2 = convertHandler.getUnit(input2);
        const unit3 = convertHandler.getUnit(input3);
        const unit4 = convertHandler.getUnit(input4);
        const unit5 = convertHandler.getUnit(input5);
        const unit6 = convertHandler.getUnit(input6);
        const unit7 = convertHandler.getUnit(input7);
        const unit8 = convertHandler.getUnit(input8);
        const unit9 = convertHandler.getUnit(input9);
        const unit10 = convertHandler.getUnit(input10);
        const unit11 = convertHandler.getUnit(input11);
        const unit12 = convertHandler.getUnit(input12);
        const unit13 = convertHandler.getUnit(input13);
        const unit14 = convertHandler.getUnit(input14);
        const unit15 = convertHandler.getUnit(input15);
        const unit16 = convertHandler.getUnit(input16);
        const unit17 = convertHandler.getUnit(input17);
        const unit18 = convertHandler.getUnit(input18);
        const unit19 = convertHandler.getUnit(input19);
        const unit20 = convertHandler.getUnit(input20);
        const unit21 = convertHandler.getUnit(input21);
        const unit22 = convertHandler.getUnit(input22);
        const unit23 = convertHandler.getUnit(input23);
        const unit24 = convertHandler.getUnit(input24);
        const unit25 = convertHandler.getUnit(input25);
        const unit26 = convertHandler.getUnit(input26);
        const unit27 = convertHandler.getUnit(input27);
        const unit28 = convertHandler.getUnit(input28);
        const unit29 = convertHandler.getUnit(input29);
        const unit30 = convertHandler.getUnit(input30);

        assert(unit1 === "mi");
        assert(unit2 === "km");
        assert(unit3 === "L");
        assert(unit4 === "kg");
        assert(unit5 === "gal");
        assert(unit6 === "lbs");
        assert(unit7 === "mi");
        assert(unit8 === "km");
        assert(unit9 === "L");
        assert(unit10 === "kg");
        assert(unit11 === "gal");
        assert(unit12 === "lbs");
        assert(unit13 === "mi");
        assert(unit14 === "lbs");
        assert(unit15 === "L");
        assert(unit16 === "gal");
        assert(unit17 === "kg");
        assert(unit18 === "km");
        assert(unit19 === "mi");
        assert(unit20 === "lbs");
        assert(unit21 === "kg");
        assert(unit22 === "km");
        assert(unit23 === "L");
        assert(unit24 === "gal");
        assert(unit25 === "mi");
        assert(unit26 === "lbs");
        assert(unit27 === "kg");
        assert(unit28 === "km");
        assert(unit29 === "L");
        assert(unit30 === "gal");
      });

      it("should correctly return an error for an invalid input unit", () => {
        const input1 = "3.1m";
        const input2 = "30.43in";
        const input3 = "10.2354cm";
        const input4 = "100.2345kilogagrams";
        const input5 = "20.3456gallons";
        const input6 = "40.5678pounds";
        const input7 = "20kilograms";
        const input8 = "30miles";
        const input9 = "10liters";
        const input10 = "40kilometers";
        const input11 = "45meters";
        const input12 = "50inches";
        const input13 = "60centimeters";

        expect(convertHandler.getUnit.bind(convertHandler, input1)).to.throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input2)).to.throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input3)).to.throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input4)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input5)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input6)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input7)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input8)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input9)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input10)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input11)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input12)).to.Throw("invalid unit");
        expect(convertHandler.getUnit.bind(convertHandler, input13)).to.Throw("invalid unit");
      });
    });

    describe("Get the returned unit from input",() => {
      it("should return the correct return unit for each valid input unit", () => {
        const unit1 = "mi";
        const unit2 = "km";
        const unit3 = "L";
        const unit4 = "gal";
        const unit5 = "lbs";
        const unit6 = "kg";
        const unit7 = "MI";
        const unit8 = "KM";
        const unit9 = "l";
        const unit10 = "GAL";
        const unit11 = "LBS";
        const unit12 = "KG";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);
        const returnUnit4 = convertHandler.getReturnUnit(unit4);
        const returnUnit5 = convertHandler.getReturnUnit(unit5);
        const returnUnit6 = convertHandler.getReturnUnit(unit6);
        const returnUnit7 = convertHandler.getReturnUnit(unit7);
        const returnUnit8 = convertHandler.getReturnUnit(unit8);
        const returnUnit9 = convertHandler.getReturnUnit(unit9);
        const returnUnit10 = convertHandler.getReturnUnit(unit10);
        const returnUnit11 = convertHandler.getReturnUnit(unit11);
        const returnUnit12 = convertHandler.getReturnUnit(unit12);

        assert(returnUnit1 === "km");
        assert(returnUnit2 === "mi");
        assert(returnUnit3 === "gal");
        assert(returnUnit4 === "L");
        assert(returnUnit5 === "kg");
        assert(returnUnit6 === "lbs");
        assert(returnUnit7 === "km");
        assert(returnUnit8 === "mi");
        assert(returnUnit9 === "gal");
        assert(returnUnit10 === "L");
        assert(returnUnit11 === "kg");
        assert(returnUnit12 === "lbs");
      });

      it("should correctly convert gal to L", () => {
        const unit1 = "gal";
        const unit2 = "Gal";
        const unit3 = "GAL";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        assert(returnUnit1 === "L");
        assert(returnUnit2 === "L");
        assert(returnUnit3 === "L");
      });

      it("should correctly convert L to gal", () => {
        const unit1 = "L";
        const unit2 = "l";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);

        assert(returnUnit1 === "gal");
        assert(returnUnit2 === "gal");
      });

      it("should correctly convert mi to km", () => {
        const unit1 = "mi";
        const unit2 = "MI";
        const unit3 = "Mi";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        assert(returnUnit1 === "km");
        assert(returnUnit2 === "km");
        assert(returnUnit3 === "km");
      });

      it("should correctly convert km to mi", () => {
        const unit1 = "km";
        const unit2 = "KM";
        const unit3 = "Km";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        assert(returnUnit1 === "mi");
        assert(returnUnit2 === "mi");
        assert(returnUnit3 === "mi");
      });

      it("should correctly convert lbs to kg", () => {
        const unit1 = "lbs";
        const unit2 = "LBS";
        const unit3 = "Lbs";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        assert(returnUnit1 === "kg");
        assert(returnUnit2 === "kg");
        assert(returnUnit3 === "kg");
      });

      it("should correctly convert kg to lbs", () => {
        const unit1 = "kg";
        const unit2 = "KG";
        const unit3 = "Kg";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        assert(returnUnit1 === "lbs");
        assert(returnUnit2 === "lbs");
        assert(returnUnit3 === "lbs");
      })
    });

    describe("Get the spelled-out form of a unit", () => {
      it ("should correctly return the spelled-out string unit for each valid input", () => {
        const unit1 = "mi";
        const unit2 = "km";
        const unit3 = "L";
        const unit4 = "gal";
        const unit5 = "lbs";
        const unit6 = "kg";
        const unit7 = "MI";
        const unit8 = "KM";
        const unit9 = "l";
        const unit10 = "GAL";
        const unit11 = "LBS";
        const unit12 = "KG";

        const spelledUnit1 = convertHandler.spellOutUnit(unit1);
        const spelledUnit2 = convertHandler.spellOutUnit(unit2);
        const spelledUnit3 = convertHandler.spellOutUnit(unit3);
        const spelledUnit4 = convertHandler.spellOutUnit(unit4);
        const spelledUnit5 = convertHandler.spellOutUnit(unit5);
        const spelledUnit6 = convertHandler.spellOutUnit(unit6);
        const spelledUnit7 = convertHandler.spellOutUnit(unit7);
        const spelledUnit8 = convertHandler.spellOutUnit(unit8);
        const spelledUnit9 = convertHandler.spellOutUnit(unit9);
        const spelledUnit10 = convertHandler.spellOutUnit(unit10);
        const spelledUnit11 = convertHandler.spellOutUnit(unit11);
        const spelledUnit12 = convertHandler.spellOutUnit(unit12);

        assert(spelledUnit1 === "miles")
        assert(spelledUnit2 === "kilometers");
        assert(spelledUnit3 === "liters");
        assert(spelledUnit4 === "gallons");
        assert(spelledUnit5 === "pounds");
        assert(spelledUnit6 === "kilograms");
        assert(spelledUnit7 === "miles");
        assert(spelledUnit8 === "kilometers");
        assert(spelledUnit9 === "liters");
        assert(spelledUnit10 === "gallons");
        assert(spelledUnit11 === "pounds");
        assert(spelledUnit12 === "kilograms");
      });
    });
  });
});