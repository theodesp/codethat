---
author: "Theo"
date: 2020-8-2
title: "Top 30 Javascript Interview Warmup Exercises️ Part III"
summary: "Practice basic Javascript Interview Questions, one at the time"
weight: 20
tags: [
    "javascript",
    "interview"
]
categories: [
   "javascript"
]
levels: "medium"
series: ["Top 30 Javascript Warmup Interview Questions"]
series_weight: -20
---

This is the third and sadly the last part of this series. In this part we are going to see some extra but interesting algorithmic questions when preparing for a Javascript Interview.

Let's start.

{{< header title="Questions 🤔" >}}


* **1. Write a function that checks if a string is an anagram of another one**

A string can have many permutations, but essentially all characters of that string will have the same frequency table. So to check if one string is an anagram of another string we just need to compare their frequency table if they are the same.

We have seen before how to compute a frequency table so we will just make it work for two strings.

Here is the gist of the code:

{{< code-block javascript >}}
function areAnagrams(first, second) {
  // Find their freq tables
  const firstFreq = computeFrequency(first);
  const secondFreq = computeFrequency(second);

  // Compare them one by one
  if (areMapsEqual(firstFreq, secondFreq)) {
    return true;
  }
  return false;
}

function areMapsEqual(a, b) {
  // First check their sizes
  if (a.size !== b.size) {
    return false;
  }
  for (let [key, val] of a) {
    // Then check if each one of the key exists in the other and are the same
    let other = b.get(key);
    if (other !== val || other === undefined) {
      return false;
    }
  }

  return true;
}

function computeFrequency(s) {
  const freqTable = new Map();
  for (ch of s) {
    if (!freqTable.has(ch)) {
      freqTable.set(ch, 1);
    } else {
      freqTable.set(ch, freqTable.get(ch) + 1);
    }
  }

  return freqTable;
}

console.log(areAnagrams("abc", "cab"));
console.log(areAnagrams("tyrannos", "polemos"));
console.log(areAnagrams("polemos", "solepom"));
{{< /code-block >}}

* **2. Write a function that curries the arguments of a function. So for example instead of taking all the arguments at the same time, it will return a new function that takes the first one and return, then take the second one and return and so on.**

You will need to invoke it for example as:

{{< code-block javascript >}}
function mul(a, b, c) {
  return a * b * c;
}

let curriedMul = curry(mul);
curriedMul(1)(2)(3) // 6
curriedMul(1)(5, 3) // 15
curriedMul(1, 3, 3) // 9
{{< /code-block >}}

We need a function `curry` that accepts another function as a parameter. Then we need a way to check if we passed fewer arguments in each call and if so we can call the `curry` function again with those arguments. Otherwise when we have all the arguments so we call the original function with those arguments.

Here is the gist of the code:

{{< code-block javascript >}}
function curry(fn) {
  // Return a function that captures the arguments passed
  return function handler(...args) {
    // If we passed all the arguments we call the function
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      // Otherwise we return another function capturing the rest of the arguments
      // and we call handler again aggregating the current arguments with the rest of the 
      // arguments
      return function(...argsLeft) {
        return handler(...args.concat(argsLeft));
      }
    }
  };
}

function mul(a, b, c) {
  return a * b * c;
}

let curriedMul = curry(mul);
console.log(curriedMul(1)(2)(3)) // 6
console.log(curriedMul(1, 5, 3)) // 15
console.log(curriedMul(1)(3, 3)) // 9
console.log(curriedMul(1)) // function
{{< /code-block >}}

* **3. Write a function that given two sorted lists you return a list with all their elements merged and sorted.**

This is the familiar merge part of the merge sort algorithm. You should be very familiar with it and able to explain how it works.

The idea is to iterate over the two arrays keeping an index for each one of the iterations i and j. We compare arr1[i] with arr2[j] and put the smallest element in the result table. Then we increase the index of the array with the smallest element.

At the end we need to make sure to move the rest of the elements if we've finished iterating one array but still have more in the other.

Here is the gist of the code:

{{< code-block javascript >}}
function mergeTwoSortedArrays(arr1, arr2) {
  // reserve the result table
  const result = Array(arr1.length + arr2.length);
  // Initialized the indexes
  let i = 0;
  let j = 0;
  let k = 0;
  // we iterate over the two arrays. This will stop when one of them is fully iterated
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result[k] = arr1[i];
      i += 1;
    } else {
      result[k] = arr2[j];
      j += 1;
    }
    k += 1;
  }
  // We have finished iterating arr2. Now we need to move the rest of arr1 into the result list
  while ( i < arr1.length ) {
    result[k] = arr1[i];
    i += 1;
    k += 1;
  }
  // We have finished iterating arr1. Now we need to move the rest of arr2 into the result list
  while ( j < arr2.length ) {
    result[k] = arr2[j];
    j += 1;
    k += 1;
  }

  return result;
}

console.log(mergeTwoSortedArrays([1, 3, 11], [2, 4, 6, 8]));
console.log(mergeTwoSortedArrays([1, 2, 3, 15], [5, 7 ,9 , 11]));
console.log(mergeTwoSortedArrays([1, 3, 5, 6], []));
console.log(mergeTwoSortedArrays([10, 14, 16], [11, 15]));
{{< /code-block >}}

* **4.Write a function that accepts two dates and returns the number of days that have in difference.**

When you create two Date objects and subtract them, then the result is the number of milliseconds between them. For example:

{{< code-block javascript >}}
let d = new Date()
// Mon Feb 03 2020 07:23:09 GMT+0000 (Greenwich Mean Time)
let m = new Date()
// Mon Feb 03 2020 07:23:18 GMT+0000 (Greenwich Mean Time)

console.log(d -  m) // -8406
console.log(m - d) // 8406
{{< /code-block >}}

So if we can convert milliseconds in days we can return the difference in days.

Here is the gist of the code:

{{< code-block javascript >}}
function daysDifference(first, second) {
  const diff = Math.abs(second - first);
  const result = Math.floor(diff / (1000 * 60 * 60 * 24)); 
  return result
}
console.log(daysDifference(new Date('2020-01-01'), new Date('2020-01-02')))
{{< /code-block >}}

* **5. Write a function that accepts a string and removes any characters that present more that once in that string.**


We can keep count of the existing occurrences of a string char using either a set or a map. So we just iterate over the characters and if we haven't seen the last one we push it into a list. Then we use `join` to return the result.

Here is the gist of the code:

{{< code-block javascript >}}
function removeDuplicateChars(s) {
  const result = [];
  let seen = new Set();
  for (let c of s) {
      if (!seen.has(c)) {
          seen.add(c);
          result.push(c);
      }
  }
  return result.join('');
}

console.log(removeDuplicateChars('aba'));
console.log(removeDuplicateChars('tyasua'));
{{< /code-block >}}

* **6. Write a function that accepts an object and returns a deep frozen copy of it's internal objects and functions.**

Here we need to do the following:
1. Freeze the object using `Object.freeze`.
2. Recursively call the same freeze function for any function or object properties of that object.


Here is the gist of the code:

{{< code-block javascript >}}
function deepFreeze(obj) {
  // We first freeze the base object here
  Object.freeze(obj);

  // Then we recursively iterate over its own properties and call deepFreeze on them
  const ownProperties = Object.getOwnPropertyNames(obj);
  for (prop of ownProperties) {
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function")
    ) {
      deepFreeze(obj[prop]);
    }
  }
}

let o = {
  item: 1,
  cb: {
    cb: function() {
      return 2;
    }
  }
};

deepFreeze(o);
o.item = 2;
o.cb.cb = function() {
  return 3;
};
console.log(o.cb.cb());
console.log(o.item);
{{< /code-block >}}

* **7. Write a function that given a list and an index position in that list, will return a list with all elements less that the element at the index left of it and all the elements greater that the index right of it.**

This is the partition method of the Quicksort algorithm.
You should be very familiar with it and able to explain how it works.

The idea is to use the index position as the pivot point. Then have two iterators, one starting from the beginning and then other starting from the end. First use the left iterator to find an element less than pivot. Then use right iterator to find an element greater than pivot.

If both are found then swap their places in the array. The loop breaks when both iterators have crossed with each other.

Here is the gist of the code:

{{< code-block javascript >}}
function partition(arr, index) {
  // Pivot point out of bounds
  if (index < 0 || index > arr.length) {
    return;
  }

  let pivot = arr[index];
  // Left index from the beginning
  let i = 0;
  // Right index from the end
  let j = arr.length - 1;
  // As long as they do not cross each other
  while (i <= j) {
    while (arr[i] < pivot) {
      i += 1; // move i left until we find an item less that pivot
    }

    while (arr[j] > pivot) {
      j -= 1; // move j right until we find an item less that pivot
    }

    if (i <= j) {
      swap(arr, i, j);
      i += 1;
      j -= 1;
    }
  }

  return;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let arr = [1, 5, 11, 9, 4, 22, 7];
partition(arr, 3);
console.info(arr);
{{< /code-block >}}


* **8. Write a function that converts a decimal number into binary.**

The idea behind this is that every time we take the modulo of the number that represents the last bit set.  For example:

```
2 --> 10 == 2 % 2
3 --> 11 == 3 % 2
5 --> 101 == 5  % 2
```

So we can calculate the last bit. Then to calculate the last but one bit we need to take the floor of num / 2 and so on. [Read this wiki](https://www.wikihow.com/Convert-from-Decimal-to-Binary) for more details.

Here is the gist of the code:


{{< code-block javascript >}}
function decToBin(num) {
  const result = [];
  let i = 0;
  while(num > 0) {
    // We grab the result of the mudulo num 2 which corresponds to the last bit of the result binary number
    result[i] = num % 2;
    i += 1;
    // We divide by 2 so that we can get the last but one bit on the next run
    num = Math.floor(num / 2);
  }
  // The result has the bits in reverse order. So we reverse first before returning the result.
  return result.reverse().join('');
}


console.log(decToBin(10));
console.log(decToBin(134));
console.log(decToBin(999));
{{< /code-block >}}


* **9. Write a function that converts a binary number into decimal.**

Here we have a binary string and we want to convert into integer. First we traverse the string from the end. Each time we find a `1` we use that index to get the value of 2 exp i. Then we add it to the result. For example the number 34 in binary is 100010 so we have:

```
1 * 2 ^ 5 + 1 * 2 ^ 1 = 32 + 2 = 34
```

Here is the gist of the code:


{{< code-block javascript >}}
function binToDec(num) {
  let result = 0;
  // Start from the last bit digit and down to the first
  for (let i = num.length-1; i >= 0; i -= 1) {
    // Calculate the current value of exponent
    let exp = num.length - 1 - i;
    if (num[i] === '1') {
      result += Math.pow(2, exp);
    }
  }
  return result;
}

console.log(binToDec("101010"));
console.log(binToDec("100010"));
console.log(binToDec("111110101"));
{{< /code-block >}}


* **10. Write a function that given a string it returns the list of its permutations.**

For example:

```
in: "ab" out: ["ab", "ba"]
```

This is the most tricky question. The idea is to use recursion to construct one permutation from the string of characters. Then we backtrack to produce the next permutation and so on.

For a simple example of two chars: "ab"

First we fix "a" in place and we call permutate for the remainder string "b". Because "b" is the last character we have the sequence "ab" so we add it to the result.

Then we fix "b" in the front and we call permutate for the remainder string "a". Because "a" is the last character we have the sequence "ba" so we add it to the result.

Similarly we can do that for any string of length n.

Here is the gist of the code:

{{< code-block javascript >}}
function permutate(str) {
  let result = []
  // Here we call a recursive function passing all the required parameters
  permutateRecursive(str.split(''), 0, str.length-1, result);
  return result;
}

function permutateRecursive(str, start, end, result) {
  if (start === end) {
    // We have completed a unique permutation string. Push it to the result string
    return result.push(str.join(''));
  }
  // else for each char in the sequence starting from start and ending to end
  for (let i = start; i <= end; i += 1) {
    // We swap the current i with the end
    swap(str, i, start)
    // We call the same function again but we advance the start ahead by one
    permutateRecursive(str, start+1, end, result);
    // We restore the swap we did earlier with the current i and the end
    swap(str, start, i)
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.info(permutate("abc"));
console.info(permutate("artfg"));
{{< /code-block >}}


{{< header title="It's not the end yet" >}}

In this article we listed some warmup exercises with detailed answers. We wanted you to have a good variety of questions as a reference before your next big interview. Stay put for more articles regarding programming interviews in the future.


# Interested in Mentoring or Training?
Contact me via [techway.io](www.techway.io) for more information.
