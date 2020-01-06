---
author: "Theo"
date: 2020-06-1
title: "Top 30 Javascript Interview Warmup Exercises️ Part I"
summary: "Practice basic Javascript Interview Questions, one at the time"
weight: 10
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

A lot of times when we have upcoming interviews there are cases when you will be asked to do a technical task in front of the reviewer in your language of choice. Because this phase is the most critical for your success, it's important to be prepared and at least be more confident with your programming skills.

So with this article we are going to list the most important warmup exercises for Javascript interviews. The type of exercises are simple, basic questions that ask you to write a simple function and expand it further if necessary.

This is not meant to be a complete interview prep because the interviewer could ask more advanced questions. They are however good enough for stretching your memory.

Here we go then. The top 30 Javascript warmup exercises for interview preparation. **We list the first 10 out of 30 questions in this Part**.

{{< header title="Questions🤔💭" >}}

Here is the complete list algorithms together with detailed explanations:

* **1. Write a function the reverses a string**.

Javascript does not have a build in String Builder class so you cannot modify an existing string. What we can do is create a list that we `push` each character from the original string starting from the end.

Then we use [Array Join](https://www.w3schools.com/jsref/jsref_join.asp) to combine the characters as the reversed string.

Here is the gist of the code:

{{< code-block javascript >}}
function reverseString(s) {
  // Create the result list
  const result = [];
  // Start from the end of the string and iterate towards the start
  for (let i = s.length-1; i >= 0; i -= 1) {
    // Push the current char in the list
    result.push(s[i]);
  }
  // Combine the result in a string
  return result.join('');
}

// Examples
console.log(reverseString(""))
console.log(reverseString("abc"))
console.log(reverseString("aaabbbcccd"))

{{< /code-block >}}


* **2. Write a function that filters out numbers from a list**.

We can filter the list and remove anything that is not a number. How do we check if a list item is not a number? Well if we use the typeOf operator we can get:

`typeof 1 // number`

but if the interviewer asks that valid numbers are strings are also allowed we get:

`typeof "1" // string`

which is not what we need. The solution is to use [isNaN](https://www.w3schools.com/jsref/jsref_isNaN.asp) function.


However if you noticed (and maybe the interviewer is picky) there are two cases where this thing fails:

{{< code-block javascript >}}
isNaN('') //false
isNaN(true) //false
{{< /code-block >}}

So we want to add two more checks for empty string and boolean:

{{< code-block javascript >}}
function isBoolean(value) {
  return typeof value === 'boolean';
}

function isEmptyString(value) {
  return typeof value === 'string' && value.trim().length === 0;
}

{{< /code-block >}}


Here is the gist of the code:

{{< code-block javascript >}}
function filterNumbers(arr) {
  // Create the result list
  const result = arr.filter(function(value, i) {
    // Filter based on the rules for checking the input is number
    if (isNaN(value) || isBoolean(value) || isEmptyString(value)) {
      return false;
    }
    return true;
  });
  // Return numbers only list
  return result;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isEmptyString(value) {
  return typeof value === 'string' && value.trim().length === 0;
}

console.log(filterNumbers([1, "2", "   ", NaN, Number.POSITIVE_INFINITY, 66, "ab1", false]))
{{< /code-block >}}


* **3. Write a function that finds an element inside an unsorted list.**

This is a typical linear search algorithm that takes Θ(n) time to complete. We need to traverse the whole list and compare the search item with the current item:

{{< code-block javascript >}}
function linearSearch(arr, x) {
  let lo = 0;
  let hi = arr.length-1;
  // Iterate from start till end of list
  while (lo <= hi) {
    // If item was found then return index
    if (arr[lo] === x) {
      return lo;
    } else {
      lo += 1
    }
  }
  // Return -1 to denote the item was not found
  return -1;
}

let arr = [1,3,5,7,9,11,14,18,22];
console.info("Item was found at index: " + linearSearch(arr, 22));
{{< /code-block >}}


* **4. Write a function that showcases the usage of closures.**

Please review existing dev.to articles about [what](https://dev.to/spukas/what-do-you-know-about-javasscript-closures-4725) is a [Closure](https://dev.to/mkhy19/do-you-know-es6-part-3-advanced-3fcl). They are better at explaining the details.

Here is a simple example:

{{< code-block javascript >}}
function multiplier(first) {
  let a = first;
  return function(b) {
    return a * b;
  };
}

let multiplyBy2 = multiplier(2);

console.info(multiplyBy2(4));
console.info(multiplyBy2(5));
{{< /code-block >}}

You should be able to explain where is the closure there


* **5. What is a Promise? Write a function that returns a Promise.**

Please review existing dev.to articles regarding [what](https://dev.to/damcosset/i-promise-i-wont-callback-anymore-cp3) is a [Promise](https://dev.to/kayis/3-facts-about-promises-215c). They are better at explaining the details.

Here is a simple example of a Promise:

{{< code-block javascript >}}
const resultPromise = function(idea) {
  return new Promise(function(resolve, reject) {
    if (idea.isGood) {
      resolve(idea);
    } else {
      reject({
        idea: idea,
        reason: "Not Realistic"
      });
    }
  });
};

resultPromise({idea: "Make Gold from Iron", isGood: false})
  .then(function() {
    console.info("I'm Rich!")
  }, function(err) {
    console.info("Rejected as: " + err.reason);
  });
{{< /code-block >}}


* **6. Write a function that flattens a list of items.**

This is a typical interview question. A list of lists can be flattened so that it contains only one level of items. For example: `[1, [2,3, [4]]]` should flatten into `[1,2,3,4]`.

In order to flatten we need to recurse as we may have a deep hierarchy of lists. First we create the result list. Then we iterate over all the items and check if the item is a list. If it's not a list we append to the result. Otherwise we call the calling function again but with the contents of the item instead.

Here is the gist of the code:

{{< code-block javascript >}}
function flatten(arr=[]) {
    // Create the result list;
    let result = [];
    for (let item of arr) {
        // If item is an array we concat the contents
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result = result.concat(item);
        }
    }
    return result;
}

console.info(flatten([[1, 2, [3]], 4]));
{{< /code-block >}}

* **7. Write a function that finds an element inside a sorted list.**

The question seeks to test how well can you implement binary search here. So with binary search you find the middle element and then you check if it's the target element. If it's less than the target, then we know that it is located in the first half of the input array. If it's greater, then it's located in the second right half of the input array.

Here is the complete code:

{{< code-block javascript >}}
function binarySearch(arr, x) {
  let lo = 0;
  let hi = arr.length-1;
  while (lo <= hi) {
    // Find mid element
    let m = Math.floor((lo + hi) / 2);
    // Check if equal to target
    if (arr[m] === x) {
      return m;
    // Reduce array search space by half
    } else if (arr[m] < x) {
      lo = m + 1;
    } else {
      hi = m - 1;
    }
  }
  // Item not found
  return -1;
}

let arr = [1,3,5,7,9,11,14,18,22];
console.info(console.info("Item was found at index: " + binarySearch(arr, 22)));
{{< /code-block >}}


* **8. Write a function that accepts two numbers `a` and `b` and returns both the division of `a` and `b` and their modulo of `a` and `b`.**

This is straightforward. Here we need to return two values:

`a / b` and `a % b`.

{{< code-block javascript >}}
function divMod(a, b) {
  // Be careful for division by zero
  if (b !== 0 ) {
    return [a / b, a % b];
  }
  return [0, 0];
}

console.info(divMod(16, 5));
console.info(divMod(20, 0));
{{< /code-block >}}

* **9. Write a function that computes the fibonacci number of N.**

In the Fibonacci sequence, every element is the sum of the previous two terms. For example, starting from 0 and 1:

{{< code-block javascript >}}
0, 1, 1 , 2, 3, 5 ,8 ...
{{< /code-block >}}

We can do this using either recursion or just a while loop. With recursion we may fall into the trap and do it like this:

{{< code-block javascript >}}
function fib(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n-1) + fib(n-2);
  }
}
{{< /code-block >}}

And allow the interviewer to ask why is inefficient. Or we can just add a memoization and make it slightly better:

{{< code-block javascript >}}
function memo(func) {
  let cache = {};
  return function (x) {
      if (x in cache) return cache[x];
      return cache[x] = func(x);
  };
};

let fib = memo(function(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n-1) + fib(n-2);
  }
});

console.info(fib(20))
{{< /code-block >}}

* **10. Write a function that accepts a string and returns a map with the strings character frequency.**

To calculate the frequency we need to use a hash-table. Typically we use either an object mapping the keys to values or even more semantically a javascript Map.

We iterate over all the characters of the string and increase their char counter.

Here is the code for it:

{{< code-block javascript >}}
function computeFrequency(s) {
  // Create the freq hashtable
  const freqTable = new Map();

  // for each char in the string
  for (ch of s) {
    // Check if we have seen it already
    if (!freqTable.has(ch)) {
      freqTable.set(ch, 1);
    } else {
      // Just increase the existing entry
      freqTable.set(ch, freqTable.get(ch) + 1);
    }
  }
  // Return result
  return freqTable;
}

console.info(computeFrequency("abrakatabra"));
{{< /code-block >}}

 
{{< header title="What's next" >}}

Stay put for the next part!

😉👌💖
