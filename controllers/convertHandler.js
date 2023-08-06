const checkDivision = function(input) {
  let nums = input.split('/');
  if (nums.length > 2) {
    return false;
  }
  return nums;
}
const checkDecimal = function(input) {
  let nums = input.split('.');
  if (nums.length > 2) {
    return false;
  }
  return input;
}
  
function ConvertHandler() {
  this.getNum = function(input) {
    let num = input.match(/[\d\/.]+/g) || ['1']
    let nums = checkDivision(num[0]);
    
    if (!nums[0]) {
      return undefined;
    }

    let num1 = checkDecimal(nums[0])
    let num2 = nums[1] || '1'
    num2 = checkDecimal(num2);
    let result = parseFloat(num1) / parseFloat(num2);
    return result || undefined;
  };
  
  this.getUnit = function(input) {
    let str = input.match(/[a-zA-Z]+/g)[0];
    let unit = (str).toLowerCase();
    switch (unit) {
      case "km":
        return "km";
      case "lbs":
        return "lbs";
      case "gal":
        return "gal";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    const fullUnit = {
      gal: "gallons",
      lbs: "pounds",
      mi: "miles",
      l: "liters",
      L: "liters",
      kg: "kilograms",
      km: "kilometers",
    }

    return fullUnit[unit] || undefined;
    
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase();
    const galTol = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        result = initNum * galTol;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break; 
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galTol;
        break; 
      case "kg":
        result = initNum / lbsToKg;
        break; 
      case "km":
        result = initNum / miToKm;
        break;  
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

  };
  
}

module.exports = ConvertHandler;
