// import BigValue from "bignumber.js";
// import JSBI from "jsbi";
// // @ts-ignore
// import { multiplier } from "universal-calci-pro";
// // @ts-ignore
// import CryptoJS from "crypto-js";
// import { isAddress } from "viem";
// import packageJson from "../../package.json";
// import { logoutAdmin } from "../redux/Slices/admin.slice";
// import { resetLoader } from "../redux/Slices/loader.slice";
// import { clearToken } from "../redux/Slices/token.slice";
// import { logoutUser } from "../redux/Slices/user.slice";
// import store from "../redux/Store";
// import {
//   LENGTH,
//   SECRET_KEY1,
//   SECRET_KEY2,
//   SECRET_KEY3,
//   SECRET_KEY4,
// } from "../Utills/Utils";
// // import { isAddress } from "viem"
// import { getPublicClient } from "@wagmi/core";
// import { wagmiConfig } from "../components/common/connectWallet/wagmiConfig";
// // import { config } from "../wagmiConfig" // your wagmi config

// /**CUTMIZE ADDRESS FOR SHOW */
// export const customizeAddress = (address: string) => {
//   const firstFive = address?.substring(0, 5);
//   const lastFour = address.substring(address.length - 4);
//   return firstFive + "..." + lastFour;
// };
// export const customizeAddressForUserPanel = (address: string) => {
//   const firstFive = address?.substring(0, 14);
//   const lastFour = address.substring(address.length - 14);
//   return firstFive + "....." + lastFour;
// };
// export const handleBigNumbers = (
//   number1: any,
//   number2: any,
//   action: string = "sum"
// ) => {
//   try {
//     const bigInt1 = BigInt(
//       number1?.toString().includes(".")
//         ? number1?.toString().split(".")[0]
//         : number1
//     );
//     const bigInt2 = BigInt(
//       number2?.toString().includes(".")
//         ? number2?.toString().split(".")[0]
//         : number2
//     );
//     let result;
//     switch (action) {
//       case "sum":
//         result = bigInt1 + bigInt2;
//         break;
//       case "sub":
//         result = bigInt1 - bigInt2;
//         break;
//       case "mul":
//         result = bigInt1 * bigInt2;
//         break;
//       case "div":
//         result = bigInt1 / bigInt2;
//         break;
//       default:
//         result = 0;
//     }
//     result = result.toString().includes(".")
//       ? result.toString().split(".")[0]
//       : result;

//     return result.toString().replace(/n$/, "");
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

// function numberToString(arg: any) {
//   if (typeof arg === "string") {
//     if (!arg.match(/^-?[0-9.]+$/)) {
//       throw new Error(
//         "while converting number to string, invalid number value '" +
//           arg +
//           "', should be a number matching (^-?[0-9.]+)."
//       );
//     }
//     return arg;
//   } else if (typeof arg === "number") {
//     return String(arg);
//   } else if (
//     typeof arg === "object" &&
//     arg.toString &&
//     (arg.toTwos || arg.dividedToIntegerBy)
//   ) {
//     if (arg.toPrecision) {
//       return String(arg.toPrecision());
//     } else {
//       return arg.toString(10);
//     }
//   }
//   throw new Error(
//     "while converting number to string, invalid number value '" +
//       arg +
//       "' type " +
//       typeof arg +
//       "."
//   );
// }

// export const divideBigNumber = (value: any, decimal: number) => {
//   if (!decimal || decimal === 0 || !value) {
//     return "0";
//   } else {
//     const decimalBigN = JSBI.BigInt(decimal);
//     const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
//     const x = new BigValue(value?.toString());
//     const y = new BigValue(String(convertedDecimal));
//     const z = x.dividedBy(y);
//     return fixedToDecimal(z.toString(), decimal);
//   }
// };
// function toWei(input: any, unit: any) {
//   var ether = numberToString(input);
//   var base = unit;
//   var baseLength = base.length - 1 || 1;
//   if (ether === ".") {
//     throw new Error(
//       "[ethjs-unit] while converting number " + input + " to wei, invalid value"
//     );
//   }

//   var negative = ether.substring(0, 1) === "-";

//   if (negative) {
//     ether = ether.substring(1);
//   }
//   var comps = ether.split(".");
//   if (comps.length > 2) {
//     throw new Error(
//       "[ethjs-unit] while converting number " +
//         input +
//         " to wei,  too many decimal points"
//     );
//   }
//   var whole = comps[0],
//     fraction = comps[1];
//   if (!whole) {
//     whole = "0";
//   }
//   if (!fraction) {
//     fraction = "0";
//   }
//   if (fraction.length > baseLength) {
//     throw new Error(
//       "[ethjs-unit] while converting number " +
//         input +
//         " to wei, too many decimal places"
//     );
//   }

//   while (fraction.length < baseLength) {
//     fraction += "0";
//   }

//   if (!parseInt(whole)) {
//     return fraction.replace(/^0*(?=[1-9])/g, "");
//   }

//   if (negative) {
//     return "-" + whole + fraction;
//   }

//   return whole + fraction;
// }

// function fromWei(input: any, unit: any) {
//   if (!input) return "0";

//   let str = "";

//   if (Math.sign(input) !== Math.sign(unit)) str += "-";

//   const numer = Math.abs(input);
//   const denom = Math.abs(unit);

//   str += Math.floor(numer / denom);
//   let rem = numer % denom;
//   if (!rem) return str;
//   str += ".";

//   const map = new Map();

//   while (rem !== 0) {
//     map.set(rem, str.length);

//     rem *= 10;
//     str += Math.floor(rem / denom);
//     rem %= denom;

//     if (map.has(rem)) {
//       const idx = map.get(rem);
//       return str.slice(0, idx) + `(${str.slice(idx)})`;
//     }
//   }
//   return str;
// }

// /** Divide with Decimal*/
// export const divideWithDecimal = (value: any, decimal: any) => {
//   const decimalBigN = JSBI.BigInt(decimal);
//   const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
//   return fromWei(value, String(convertedDecimal));
// };

// // export const intToSuffixes = (num: any, fixed = 5) => {
// //   num = parseFloat(num);
// //   if (isNaN(num)) {
// //     return null;
// //   }
// //   if (num === 0) {
// //     return "0";
// //   }
// //   fixed = !fixed || fixed < 0 ? 0 : fixed;
// //   const suffixes = ["", "K", "M", "B", "T", "P", "E"];
// //   const smallSuffixes = ["", "m", "µ", "n", "p", "f"];
// //   const b: any = num.toPrecision(2).split("e"),
// //     exponent = b.length === 1 ? 0 : parseInt(b[1]),
// //     k = exponent >= 0 ? Math.floor(exponent / 3) : Math.ceil(exponent / 3),
// //     power = Math.pow(10, k * 3);

// //   if (exponent < 0 && Math.abs(exponent) > 5) {
// //     return "<0.00001";
// //   }
// //   let c: any = fixedToDecimal(num / power, fixed);
// //   c = c.toString();
// //   if (k >= 0) {
// //     return c + (suffixes[k] || "");
// //   } else {
// //     return c + (smallSuffixes[-k] || "");
// //   }
// // };

// function expandExponential(s: any) {
//   if (!/[eE]/.test(s)) return s;
//   // split mantissa and exponent
//   let [mantissa, expStr] = s.split(/[eE]/);
//   const exp = parseInt(expStr, 10);
//   if (isNaN(exp)) return s;
//   // handle sign on mantissa
//   const sign = mantissa.startsWith("-") ? "-" : "";
//   if (mantissa[0] === "+" || mantissa[0] === "-") mantissa = mantissa.slice(1);
//   const [intPart, fracPart = ""] = mantissa.split(".");
//   if (exp >= 0) {
//     // move decimal point to right
//     if (exp >= fracPart.length) {
//       return sign + intPart + fracPart + "0".repeat(exp - fracPart.length);
//     } else {
//       const all = intPart + fracPart;
//       const pos = intPart.length + exp;
//       return sign + all.slice(0, pos) + "." + all.slice(pos);
//     }
//   } else {
//     // move decimal point to left
//     const move = -exp;
//     if (move >= intPart.length) {
//       return (
//         sign + "0." + "0".repeat(move - intPart.length) + intPart + fracPart
//       );
//     } else {
//       const pos = intPart.length - move;
//       return sign + intPart.slice(0, pos) + "." + intPart.slice(pos) + fracPart;
//     }
//   }
// }

// export function intToSuffixes(input: any, fixed = 1) {
//   if (input === null || input === undefined) return null;

//   // convert to string (preserve input string exactly)
//   let str = typeof input === "string" ? input.trim() : String(input);

//   // Expand exponential notation if present (e.g. "2.2e+8")
//   str = expandExponential(str);

//   // handle sign
//   let sign = "";
//   if (str[0] === "+" || str[0] === "-") {
//     if (str[0] === "-") sign = "-";
//     str = str.slice(1);
//   }

//   // allow only digits and optional decimal point now
//   if (!/^\d+(\.\d+)?$/.test(str)) return null;

//   const [intPartRaw = "0", fracPartRaw = ""] = str.split(".");
//   const intPart = intPartRaw.replace(/^0+/, "") || "0"; // keep one zero if all zeros

//   // If integer part is 0 => number < 1. We will return a truncated decimal (no small-suffix mapping here).
//   if (intPart === "0") {
//     // take the fractional digits and truncate (no rounding)
//     if (!fracPartRaw || /^0+$/.test(fracPartRaw)) return "0";
//     const fracTrunc = fracPartRaw
//       .slice(0, fixed)
//       .padEnd(fixed, "0")
//       .replace(/0+$/, "");
//     return sign + (fracTrunc ? `0.${fracTrunc}` : "0");
//   }

//   const suffixes = ["", "K", "M", "B", "T", "P", "E"];

//   const digits = intPart.length; // number of digits in integer part
//   const k = Math.floor((digits - 1) / 3); // suffix index
//   const divisorDigits = k * 3;
//   const leadingDigitCount = digits - divisorDigits; // how many digits remain before decimal in scaled value

//   const leading = intPart.slice(0, leadingDigitCount);
//   const rest = intPart.slice(leadingDigitCount) + fracPartRaw; // everything after the leading part becomes fractional digits

//   // take fixed digits from 'rest' for fractional part (truncate, do NOT round)
//   const frac = (rest.slice(0, fixed) || "").padEnd(fixed, "0");

//   // construct formatted, then remove trailing zeros of fractional part
//   let formatted;
//   if (fixed > 0) {
//     const fracTrimmed = frac.replace(/0+$/, "");
//     formatted = fracTrimmed ? `${leading}.${fracTrimmed}` : `${leading}`;
//   } else {
//     formatted = leading;
//   }

//   const suf = suffixes[k] || "";
//   return sign + formatted + suf;
// }
// export const divideBigNumberWithSuffixes = (
//   value: any,
//   decimal: number,
//   suffixes = false
// ) => {
//   if (!decimal || decimal === 0 || !value) {
//     return "0";
//   } else {
//     const decimalBigN = JSBI.BigInt(decimal);
//     const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
//     const x = new BigValue(value?.toString());
//     const y = new BigValue(String(convertedDecimal));
//     const z = x.dividedBy(y);
//     return suffixes
//       ? intToSuffixes(parseFloat(z.toString()))
//       : fixedToDecimal(z.toString(), 5);
//   }
// };

// /**CONVERT NUMBER WITH DECIMALS FOR CONTRACT CALL */
// export const convertWithDecimal = (value: any, decimal: any) => {
//   const decimalBigN = JSBI.BigInt(decimal);
//   const convertedDecimal = JSBI.exponentiate(JSBI.BigInt(10), decimalBigN);
//   return toWei(value, String(convertedDecimal));
// };

// export const allowOnlyNumberWithDecimalsInput = (
//   value: any,
//   decimals: any,
//   limit: number
// ) => {
//   let re;
//   let decimalValue = Number(decimals);
//   re = new RegExp(
//     "^(\\d{0," + limit + "}|\\d{0,12}\\.\\d{0," + decimalValue + "})$",
//     "gm"
//   );
//   if (re?.test(value)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// /** Multiply with big numbers */
// export const multiplyTwoBigDigits = (valueOne: any, valueTwo: any) => {
//   const a = JSBI.BigInt(valueOne);
//   const b = JSBI.BigInt(valueTwo);
//   const result = JSBI.multiply(a, b);
//   return String(result);
// };

// export const multiplyTwoSmallDigit = (
//   valueOne: string | number,
//   valueTwo: string | number,
//   decimals: number = 18 // default like Ethereum
// ) => {
//   const factor = JSBI.BigInt(10 ** decimals);

//   // scale numbers into integers
//   const a = JSBI.BigInt(Math.round(Number(valueOne) * 10 ** decimals));
//   const b = JSBI.BigInt(Math.round(Number(valueTwo) * 10 ** decimals));

//   // multiply
//   const result = JSBI.multiply(a, b);

//   // scale back down
//   const scaled = Number(result.toString()) / Number(factor.toString());
//   return scaled;
// };

// export const multiplyBigDigitsWithDecimals = (
//   valueOne: string,
//   valueTwo: string
// ) => {
//   let a: any;
//   let b: any;
//   let decimalLengthA: any = 0;
//   let decimalLengthB: any = 0;
//   if (valueOne.includes(".")) {
//     a = convertWithDecimal(valueOne, valueOne.split(".")[1].length);
//     decimalLengthA = valueOne.split(".")[1].length;
//   } else {
//     a = valueOne;
//   }
//   if (valueTwo.includes(".")) {
//     b = convertWithDecimal(valueTwo, valueTwo.split(".")[1].length);
//     decimalLengthB = valueTwo.split(".")[1].length;
//   } else {
//     b = valueTwo;
//   }
//   let decimalLength = decimalLengthA + decimalLengthB;
//   let result = multiplyTwoBigDigits(a, b);

//   if (
//     result.substring(0, result.length - decimalLength).length &&
//     result.substring(result.length - decimalLength).length
//   ) {
//     result =
//       result.substring(0, result.length - decimalLength) +
//       "." +
//       result.substring(result.length - decimalLength);
//   } else if (!result.substring(0, result.length - decimalLength).length) {
//     result = "0" + "." + result.substring(result.length - decimalLength);
//   }
//   return result;
// };

// /**REMOVE e FORM BIG NUMBER */
// export const toFixed = (x: any) => {
//   if (Math.abs(x) < 1.0) {
//     var e = parseInt(x.toString().split("e-")[1]);
//     if (e) {
//       x *= Math.pow(10, e - 1);
//       x = "0." + new Array(e).join("0") + x.toString().substring(2);
//     }
//   } else {
//     e = parseInt(x.toString().split("+")[1]);
//     if (e > 20) {
//       e -= 20;
//       x /= Math.pow(10, e);
//       x += new Array(e + 1).join("0");
//     }
//   }
//   return x;
// };

// function isPrime(number: number) {
//   if (number <= 1) {
//     return false;
//   }

//   if (number <= 3) {
//     return true;
//   }

//   if (number % 2 === 0 || number % 3 === 0) {
//     return false;
//   }

//   for (let i = 5; i * i <= number; i += 6) {
//     if (number % i === 0 || number % (i + 2) === 0) {
//       return false;
//     }
//   }

//   return true;
// }

// function getPrimeNumbersInRange(start: number, end: number) {
//   const primeNumbers: any = [];

//   for (let number = start; number <= end; number++) {
//     if (isPrime(number)) {
//       primeNumbers.push(number);
//     }
//   }
//   return primeNumbers;
// }

// function getKey(value: number) {
//   let encyptionKey = SECRET_KEY1.concat(SECRET_KEY2, SECRET_KEY3, SECRET_KEY4);
//   const primeNumbers: any = getPrimeNumbersInRange(1, value);
//   const string = primeNumbers
//     .map((number: number) => encyptionKey[number])
//     .join("");
//   return string;
// }

// export const truncateToDecimals = (num: any, decimalPlaces = 4): string => {
//   if (!num) return "0";

//   let value = typeof num === "number" ? num : Number(num);
//   if (isNaN(value)) return "0";

//   const multiplier = Math.pow(10, decimalPlaces);
//   const truncated = Math.floor(value * multiplier) / multiplier;

//   // Format with comma separator and fixed decimals
//   return truncated.toLocaleString(undefined, {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: decimalPlaces,
//   });
// };

// export const encryptData = (data: any) => {
//   const key: string = getKey(Number(LENGTH));
//   const stringData = JSON.stringify(data);
//   const encryptData = CryptoJS.AES.encrypt(stringData, key).toString();
//   return encryptData;
// };
// export const decrypt = (data: any, string = false) => {
//   try {
//     const key: string = getKey(LENGTH);
//     const decryptData = CryptoJS.AES.decrypt(data, key);
//     let stringData = decryptData.toString(CryptoJS.enc.Utf8);
//     stringData = string ? stringData : JSON.parse(stringData);
//     return stringData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return false;
//   }
// };

// export const fixedToDecimal = (value: any, decimals = 4) => {
//   value =
//     value && parseFloat(value) !== 0
//       ? decimals === 2
//         ? value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
//         : value.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0]
//       : 0;
//   return parseFloat(value);
// };

// export const custmizeWallet = (address: string) => {
//   const firstFive = address?.substring(0, 5);
//   const lastFour = address.substring(address.length - 4);
//   return firstFive + "..." + lastFour;
// };

// export const formatUserCount = (count: string): string => {
//   const num = parseInt(count, 10);
//   if (isNaN(num)) return "00";
//   // Add leading zero for single digits
//   if (num < 10) {
//     return `0${num}`;
//   }

//   // Add comma separators for larger numbers
//   return num.toLocaleString();
// };
// function trimTrailingZeros(numStr: any) {
//   if (typeof numStr !== "string") numStr = numStr.toString();
//   return numStr.indexOf(".") >= 0
//     ? numStr.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.$/, "")
//     : numStr;
// }

// export const  bigNumberDivision1 = (value: any, decimals: number) => {
//   if (value == 0) {
//     return 0;
//   }
//   const multipliedValue = multiplier(
//     value?.toString(),
//     (1 / 10 ** decimals)?.toString()
//   );
//   return trimTrailingZeros(String(multipliedValue?.output));
// };

// export const devideBignumbers = (value: any, value2: number) => {
//   if (value == 0 || value2 == 0) {
//     return 0;
//   }
//   const multipliedValue = multiplier(
//     value?.toString(),
//     (1 / value2)?.toString()
//   );
//   return multipliedValue?.output;
// };

// export const calculateTotal = (arr: any, key: string) => {
//   return arr.reduce(
//     (acc: any, item: any) => handleBigNumbers(acc, Number(item[key]) || 0),
//     0
//   );
// };
// export const getError = (error: any) => {
//   const errorMsg = error?.data?.message
//     ? error?.data?.message
//     : error?.message
//     ? error?.message
//     : "Something went wrong";
//   if (errorMsg.indexOf("Execution reverted:") > -1) {
//     let msg = errorMsg.replace("Error: ", "").replace(" with reason:", ":");
//     return msg;
//   } else if (errorMsg.indexOf("ContractFunctionExecutionError") > -1) {
//     let msg = errorMsg.replace("ContractFunctionExecutionError: ", "");
//     return msg;
//   } else if (errorMsg.indexOf("The current chain of the connector") > -1) {
//     return errorMsg;
//   } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
//     return errorMsg.split("(")[0];
//   } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
//     const msg = errorMsg.replace("MetaMask Tx Signature:", "");
//     return msg;
//   } else if (
//     errorMsg.indexOf("Transaction has been reverted by the EVM") > -1
//   ) {
//     const msg = "Transaction has been reverted by the EVM";
//     return msg;
//   } else if (errorMsg.indexOf("Execution reverted with reason") > -1) {
//     let msg = errorMsg;

//     msg = msg =
//       msg.indexOf("Execution reverted with reason: ") > -1
//         ? msg.split("execution reverted: ")[1].split("{")[0].split(".")[0]
//         : msg;

//     return msg;
//   } else {
//     const err = errorMsg.split("*")[0].split(":")[1];
//     if (err?.trim() === "insufficient funds for gas") {
//       return err;
//     } else {
//       return errorMsg;
//     }
//   }
// };

// export function extractErrorMessage(error: any) {
//   if (error?.cause?.data?.message) {
//     return new Error(error.cause.data.message);
//   } else if (error?.cause?.message) {
//     const errorString = String(error.cause.message);
//     const match = errorString.match(
//       /reverted with the following reason:\s*(.+)/
//     );
//     const extractedMessage = match
//       ? match[1].trim()
//       : "Error message not found";

//     return extractedMessage;
//   } else if (error?.reason) {
//     return new Error(error?.reason);
//   } else if (error.data?.message) {
//     return new Error(error.data.message);
//   } else {
//     return error;
//   }
// }
// export const capitalizeFirstLetter = (word: string) => {
//   if (!word) return "";
//   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// };

// /**CREATE URL FOR API CALL WITH PARAMS */
// export const formatUrl = (url: string, params: any) => {
//   const finalParams: Record<string, unknown> = { ...(params || {}) };

//   // Replace ":param" placeholders in path with matching params
//   url = url.replace(/:([a-zA-Z0-9_]+)/g, (_match: string, key: string) => {
//     const value = finalParams[key];
//     if (value === undefined || value === null || value === "") {
//       // keep placeholder if value absent to make issue visible
//       return `:${key}`;
//     }
//     delete finalParams[key];
//     return encodeURIComponent(String(value));
//   });

//   const queryString =
//     finalParams && Object.keys(finalParams).length > 0
//       ? `?${new URLSearchParams(
//           finalParams as Record<string, string>
//         ).toString()}`
//       : ``;
//   return `${url}${queryString}`;
// };

// /**ALLOW ONLY STRING */
// export const allowOnlyString = (inputString: string) => {
//   let res = /^[a-zA-Z]+$/.test(inputString);
//   return res;
// };

// export const cryptoDecimals = (inValue: any) => {
//   let value = Number(inValue);
//   if (value == 0) {
//     return 0.0;
//   } else if ((value > 0 && value <= 9) || (value < 0 && value >= -9)) {
//     return toCustomFixed(value, 5);
//   } else if ((value > 9 && value <= 99) || (value < -9 && value >= -99)) {
//     return toCustomFixed(value, 4);
//   } else if ((value > 99 && value <= 999) || (value < -99 && value >= -999)) {
//     return toCustomFixed(value, 3);
//   } else if (
//     (value > 999 && value <= 9999) ||
//     (value < -999 && value >= -9999)
//   ) {
//     return toCustomFixed(value, 2);
//   } else if (value > 9999 || value < -9999) {
//     return toCustomFixed(value, 0);
//   }
// };
// const toCustomFixed = (num: any, fixed: number) => {
//   const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
//   return num.toString().match(re)[0];
// };

// export const validateAddress = async (
//   address: string,
//   type?: "wallet" | "contract"
// ): Promise<boolean> => {
//   try {
//     if (!isAddress(address)) {
//       return false;
//     }

//     // ✅ Safe: does not use hooks
//     const client = getPublicClient(wagmiConfig);

//     const code = await client.getBytecode({
//       address: address as `0x${string}`,
//     });
//     console.log("!type", !type);
//     if (!type) {
//       console.log("111", 111);
//       return true;
//     }

//     if (type === "wallet") {
//       return !code || code === "0x";
//     }
//     if (type === "contract") {
//       return !!code && code !== "0x";
//     }

//     return false;
//   } catch (error) {
//     console.error("Error validating address:", error);
//     return false;
//   }
// };

// export const clearCookies = () => {
//   const cookies = document.cookie.split(";");

//   for (const cookie of cookies) {
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
//     document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
//   }
// };

// export const versionManager = async () => {
//   try {
//     const version = packageJson.version;
//     const react_version = localStorage.getItem("react_version");

//     if (!react_version || (react_version && version !== react_version)) {
//       resetRedux();
//       localStorage.clear();
//       clearCookies();

//       setTimeout(() => {
//         window.location.reload();
//       }, 100);
//     }

//     localStorage.setItem("react_version", version);
//   } catch (error) {}
// };

// export const resetRedux = () => {
//   store.dispatch(logoutAdmin());
//   store.dispatch(logoutUser());
//   store.dispatch(resetLoader());
//   store.dispatch(logoutAdmin());
//   store.dispatch(clearToken());
// };
