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
  
        expect(num1).to.equal(3);
        expect(num2).to.equal(30);
        expect(num3).to.equal(10);
        expect(num4).to.equal(100);
        expect(num5).to.equal(20);
        expect(num6).to.equal(40);
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
  
        expect(num1).to.equal(3.1);
        expect(num2).to.equal(30.43);
        expect(num3).to.equal(10.2354);
        expect(num4).to.equal(100.2345);
        expect(num5).to.equal(20.3456);
        expect(num6).to.equal(40.5678);
      });

      it("should correctly read a fractional input", () => {
        const input1 = "2/3lbs";
        const input2 = "1/2kg";
        const input3 = "3/4km";
        const input4 = "1/4mi";
        const input5 = "3/5L";
        const input6 = "1/3gal";
        const input7 = "23/40kg"
        const input8 = "230/400/gal";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);
        const num7 = convertHandler.getNum(input7);
        const num8 = convertHandler.getNum(input8);

        expect(num1).to.equal(2/3);
        expect(num2).to.equal(1/2);
        expect(num3).to.equal(3/4);
        expect(num4).to.equal(1/4);
        expect(num5).to.equal(3/5);
        expect(num6).to.equal(1/3);
        expect(num7).to.equal(23/40);
        expect(num8).to.equal(230/400);
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

        expect(num1).to.equal(3.4/10);
        expect(num2).to.equal(1.5/2.5);
        expect(num3).to.equal(23/5.3);
        expect(num4).to.equal(100.3/45);
        expect(num5).to.equal(3.1415925269/45);
        expect(num6).to.equal(4.25/3);
      });

      it("should correctly return an error on a double-fraction", () => {
        const input1 = "3/4/5mi";
        const input2 = "1/2/3km";
        const input3 = "12/23/34L";
        const input4 = "120/230/40gal";
        const input5 = "2/3/4lbs";
        const input6 = "6/7/8kg";

        const num1 = convertHandler.getNum(input1);
        const num2 = convertHandler.getNum(input2);
        const num3 = convertHandler.getNum(input3);
        const num4 = convertHandler.getNum(input4);
        const num5 = convertHandler.getNum(input5);
        const num6 = convertHandler.getNum(input6);

        expect(num1).to.Throw("invalid number");
        expect(num2).to.Throw("invalid number");
        expect(num3).to.Throw("invalid number");
        expect(num4).to.Throw("invalid number");
        expect(num5).to.Throw("invalid number");
        expect(num6).to.Throw("invalid number");
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

        expect(num1).to.equal(1);
        expect(num2).to.equal(1);
        expect(num3).to.equal(1);
        expect(num4).to.equal(1);
        expect(num5).to.equal(1);
        expect(num6).to.equal(1);
        expect(num7).to.equal(1);
        expect(num8).to.equal(1);
        expect(num9).to.equal(1);
        expect(num10).to.equal(1);
        expect(num11).to.equal(1);
        expect(num12).to.equal(1);
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

        expect(unit1).to.equal("mi");
        expect(unit2).to.equal("km");
        expect(unit3).to.equal("L");
        expect(unit4).to.equal("kg");
        expect(unit5).to.equal("gal");
        expect(unit6).to.equal("lbs");
        expect(unit7).to.equal("mi");
        expect(unit8).to.equal("km");
        expect(unit9).to.equal("L");
        expect(unit10).to.equal("kg");
        expect(unit11).to.equal("gal");
        expect(unit12).to.equal("lbs");
        expect(unit13).to.equal("mi");
        expect(unit14).to.equal("lbs");
        expect(unit15).to.equal("L");
        expect(unit16).to.equal("gal");
        expect(unit17).to.equal("kg");
        expect(unit18).to.equal("km");
        expect(unit19).to.equal("mi");
        expect(unit20).to.equal("lbs");
        expect(unit21).to.equal("kg");
        expect(unit22).to.equal("km");
        expect(unit23).to.equal("L");
        expect(unit24).to.equal("gal");
        expect(unit25).to.equal("mi");
        expect(unit26).to.equal("lbs");
        expect(unit27).to.equal("kg");
        expect(unit28).to.equal("km");
        expect(unit29).to.equal("L");
        expect(unit30).to.equal("gal");
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

        expect(unit1).to.Throw("invalid unit");
        expect(unit2).to.Throw("invalid unit");
        expect(unit3).to.Throw("invalid unit");
        expect(unit4).to.Throw("invalid unit");
        expect(unit5).to.Throw("invalid unit");
        expect(unit6).to.Throw("invalid unit");
        expect(unit7).to.Throw("invalid unit");
        expect(unit8).to.Throw("invalid unit");
        expect(unit9).to.Throw("invalid unit");
        expect(unit10).to.Throw("invalid unit");
        expect(unit11).to.Throw("invalid unit");
        expect(unit12).to.Throw("invalid unit");
        expect(unit13).to.Throw("invalid unit");
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

        expect(returnUnit1).to.equal("km");
        expect(returnUnit2).to.equal("mi");
        expect(returnUnit3).to.equal("gal");
        expect(returnUnit4).to.equal("L");
        expect(returnUnit5).to.equal("kg");
        expect(returnUnit6).to.equal("lbs");
        expect(returnUnit7).to.equal("km");
        expect(returnUnit8).to.equal("mi");
        expect(returnUnit9).to.equal("gal");
        expect(returnUnit10).to.equal("L");
        expect(returnUnit11).to.equal("kg");
        expect(returnUnit12).to.equal("lbs");
      });

      it("should correctly convert gal to L", () => {
        const unit1 = "gal";
        const unit2 = "Gal";
        const unit3 = "GAL";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        expect(returnUnit1).to.equal("L");
        expect(returnUnit2).to.equal("L");
        expect(returnUnit3).to.equal("L");
      });

      it("should correctly convert L to gal", () => {
        const unit1 = "L";
        const unit2 = "l";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);

        expect(returnUnit1).to.equal("gal");
        expect(returnUnit2).to.equal("gal");
      });

      it("should correctly convert mi to km", () => {
        const unit1 = "mi";
        const unit2 = "MI";
        const unit3 = "Mi";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        expect(returnUnit1).to.equal("km");
        expect(returnUnit2).to.equal("km");
        expect(returnUnit3).to.equal("km");
      });

      it("should correctly convert km to mi", () => {
        const unit1 = "km";
        const unit2 = "KM";
        const unit3 = "Km";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        expect(returnUnit1).to.equal("mi");
        expect(returnUnit2).to.equal("mi");
        expect(returnUnit3).to.equal("mi");
      });

      it("should correctly convert lbs to kg", () => {
        const unit1 = "lbs";
        const unit2 = "LBS";
        const unit3 = "Lbs";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        expect(returnUnit1).to.equal("kg");
        expect(returnUnit2).to.equal("kg");
        expect(returnUnit3).to.equal("kg");
      });

      it("should correctly convert kg to lbs", () => {
        const unit1 = "kg";
        const unit2 = "KG";
        const unit3 = "Kg";

        const returnUnit1 = convertHandler.getReturnUnit(unit1);
        const returnUnit2 = convertHandler.getReturnUnit(unit2);
        const returnUnit3 = convertHandler.getReturnUnit(unit3);

        expect(returnUnit1).to.equal("lbs");
        expect(returnUnit2).to.equal("lbs");
        expect(returnUnit3).to.equal("lbs");
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

        expect(spelledUnit1).to.equal("miles");
        expect(spelledUnit2).to.equal("kilometers");
        expect(spelledUnit3).to.equal("liters");
        expect(spelledUnit4).to.equal("gallons");
        expect(spelledUnit5).to.equal("pounds");
        expect(spelledUnit6).to.equal("kilograms");
        expect(spelledUnit7).to.equal("miles");
        expect(spelledUnit8).to.equal("kilometers");
        expect(spelledUnit9).to.equal("liters");
        expect(spelledUnit10).to.equal("gallons");
        expect(spelledUnit11).to.equal("pounds");
        expect(spelledUnit12).to.equal("kilograms");
      });
    });
  });
});