class StringCalculator {
  add(numbers) {
    if (!numbers) {
      return 0;
    }

    let delimiters = [',', '\n'];
    let numbersStr = numbers;

    // Check for custom delimiter
    if (numbers.startsWith("//")) {
      const parts = numbers.split('\n', 2);
      const customDelimiter = parts[0].substring(2);
      delimiters.push(customDelimiter);
      numbersStr = parts[1];
    }

    // Create regex for delimiters
    const delimitersRegex = new RegExp(`[${delimiters.join('')}]`);

    // Split the numbers string using the delimiters
    const numberList = numbersStr.split(delimitersRegex);

    // Convert to integers and check for negatives
    let total = 0;
    const negatives = [];
    numberList.forEach(num => {
      if (num) {
        const n = parseInt(num, 10);
        if (n < 0) {
          negatives.push(n);
        }
        total += n;
      }
    });

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return total;
  }
}

// Test cases
const calc = new StringCalculator();
console.log(calc.add(""));  // Output: 0
console.log(calc.add("1"));  // Output: 1
console.log(calc.add("1,5"));  // Output: 6
console.log(calc.add("1\n2,3"));  // Output: 6
console.log(calc.add("//;\n1;2"));  // Output: 3

// Handling negative numbers
try {
  console.log(calc.add("1,-2,3"));
} catch (e) {
  console.log(e.message);  // Output: Negative numbers not allowed: -2
}

try {
  console.log(calc.add("//;\n1;-2;-3"));
} catch (e) {
  console.log(e.message);  // Output: Negative numbers not allowed: -2, -3
}
