// numberToWords.js
function numberToWords(num) {
  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0) return "Zero";

  let words = "";

  // Function to convert numbers less than 100
  const convertLessThan100 = (n) => {
    if (n < 20) return belowTwenty[n];
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return tens[ten] + (unit ? " " + belowTwenty[unit] : "");
  };

  // Function to convert numbers less than 1000
  const convertLessThan1000 = (n) => {
    if (n < 100) return convertLessThan100(n);
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    return (
      belowTwenty[hundred] +
      " Hundred" +
      (remainder ? " " + convertLessThan100(remainder) : "")
    );
  };

  // Convert the number to words for lakhs and crores
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  if (crore) {
    words += convertLessThan1000(crore) + " Crore";
  }
  if (lakh) {
    words += (words ? " " : "") + convertLessThan1000(lakh) + " Lakh";
  }
  if (thousand) {
    words += (words ? " " : "") + convertLessThan1000(thousand) + " Thousand";
  }
  if (remainder) {
    words += (words ? " " : "") + convertLessThan1000(remainder);
  }

  return "Rs. " + words.trim();
}

// Export the function
export { numberToWords };
