---
author: "Theo"
date: 2020-18-1
title: "Top 30 Javascript Interview Warmup Exercises️ Part II"
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

Welcome back. Here is the second part of the series about the top 30 Javascript Interview Warmup Exercises. If you are going to attend an interview that will ask algorithmic questions in Javascript then this list should be bookmarked for reference.

Let's get started.

{{< header title="Questions 🤔" >}}


* **1. Write a function that accepts a number and checks if it's a prime or not.**

To check if a number `n` is prime we need to go through the list of numbers `i` from 2 up until `sqrt(n)` and check if `n` equally divides this number `i`. This is to ensure that we cannot express `n` as a factor of `i`.

Here is the gist of the code:

{{< code-block javascript >}}
function isPrime(n) {
  if (n === 1) {
    // Special case for 1
    return false;
  } else {
    // Go through all numbers from 2 up until sqrt(n)
    for (let i = 2; i < sqrt(n); i += 1) {
      if (n % i === 0) {
        // We found a number i such as i * x = n so the number is not prime
        return false;
      }
    }
    // If we got to this point then we know the number is prime
    return true;
  }
}

let num = 45;
console.info("Is " + num + " a prime?: " + isPrime(num));
num = 37;
console.info("Is " + num + " a prime?: " + isPrime(num));
num = 73;
console.info("Is " + num + " a prime?: " + isPrime(num));

{{< /code-block >}}

* **2. Write a function that accepts a list of objects with the following type structure:**

{{< code-block javascript >}}
{
   id: number,
   accountType: "user" | "admin" | "root"
   name: string
}

{{< /code-block >}}

The function should return the list of objects grouped by their `accountType` in this order. For example it should return a list with a list of **user** followed by a list of **admin** and a list of **root** accounts.

In order to group by the account type we need to store them in a way that the key is the `accountType` value (user, admin or root) and the value is the list of records with that `accountType`. We can use a map and just iterate over the those keys and update the collection every-time we match a value.

Then to return the results in a custom order we just combine the results for each type of `accountType` in an array.

Here is the gist of the code:

{{< code-block javascript >}}
// Somewhat generic group function
function groupBy(records, keyFunc) {
  // Save groups by key here.
  const groups = new Map();
  for (record of records) {
    // We need this call to retrieve the actual key
    const key = keyFunc(record);
    if (groups.has(key)) {
      const data = groups.get(key);
      data.push(record);
    } else {
      groups.set(key, [record]);
    }
  }
  return groups;
}

function getGroupsByAccountType (records) {
  const groups = groupBy(records,function(record) {
    return record.accountType;
  });

  // Return by custom ordering here
  return [
    ...groups.get('user'),
    ...groups.get('admin'),
    ...groups.get('root'),
  ]
}
console.info(getGroupsByAccountType([
  {
    id: 1,
    accountType: 'user',
    name: 'Mike'
  },
  {
    id: 2,
    accountType: 'admin',
    name: 'Alex'
  },
  {
    id: 3,
    accountType: 'root',
    name: 'Jordan'
  },
  {
    id: 4,
    accountType: 'user',
    name: 'Silas'
  },
  {
    id: 5,
    accountType: 'admin',
    name: 'John'
  },
]))
{{< /code-block >}}

* **3. Write a function that accepts a DOM element and a string and prints any of it's immediate children that contain the class name with that string.**

Using the DOM API we can request the NodeList of the current element children using the [childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) property. Then we can iterate this list and check the `class` value using the `getAttribute("class")` or the `classList` property for the specified class name.

Here is the gist of the code:

Given the following DOM for example:

{{< code-block html >}}
<ul id="list">
    <li class="even"><a href="#Syntax" rel="internal">Syntax</a></li>
    <li class="odd"><a href="#Examples" rel="internal">Examples</a></li>
    <li class="even"><a href="#Polyfill" rel="internal">Polyfill</a></li>
    <li class="odd"><a href="#Specifications" rel="internal">Specifications</a></li>
    <li class="even"><a href="#Browser_compatibility" rel="internal">Browser compatibility</a></li>
    <li class="even"><a href="#See_also" rel="internal">See also</a></li>
</ul>
{{< /code-block >}}

The code for printing the children nodes with a target className is:

{{< code-block javascript >}}
function printChildrenContainingClass(rootElement, className) {
  if (rootElement) {
    // Iterate over the childNodes
    list.childNodes.forEach((node) => {
      // If a childnode contains a className print the node
      if (node.classList.contains(className)) {
        console.info(node);
      }
    });
  }
}

printChildrenContainingClass(document.querySelector('#list'), 'odd'));
{{< /code-block >}}

* **4. Write a function that accepts a DOM element and a string and prints if any of its parent nodes contains the class with that string. It should stop when there are no parent elements.**

Here we can use the [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) property to get the current element parent Node. Then we will check if the parent has a class with that name. If not we will recursively get the parent of that node again until we reach the Document Node or a node that has no parent:

Here is the gist of the code:

Given the following DOM for example:

{{< code-block html >}}
<body>
    <aside class="sidebar">
        <ul id="list" class="sidebar-list">
            <li class="even"><a href="#Syntax" rel="internal">Syntax</a></li>
            <li class="odd"><a href="#Examples" rel="internal">Examples</a></li>
            <li class="even"><a href="#Polyfill" rel="internal">Polyfill</a></li>
            <li class="odd"><a href="#Specifications" rel="internal">Specifications</a></li>
            <li class="even"><a id="start" href="#Browser_compatibility" rel="internal">Browser compatibility</a></li>
            <li class="even"><a href="#See_also" rel="internal">See also</a></li>
        </ul>
    </aside>
</body>
{{< /code-block >}}

The code for printing the parent nodes with a target className is:

{{< code-block javascript >}}
function printParentsContainingClass(childElement, className) {
  if (childElement) {
    // Iterate over the parentNodes
    let parentNode = childElement.parentNode;
    while (parentNode !== null) {
      // If a parentNode contains a className print the node
      if (parentNode.classList && parentNode.classList.contains(className)) {
        console.info(parentNode);
      }
      // Go up
      parentNode = parentNode.parentNode;
    }
  }
}

printParentsContainingClass(document.getElementById('start'), 'sidebar');

{{< /code-block >}}

* **5. Given the following DOM structure:**


{{< code-block html >}}
<ul id="list-start">
   <li>Theo</li>
   <li>Alex</li>
   <li>Mike</li>
</ul>
{{< /code-block >}}

Write relevant Javascript code so that when we click any of the list elements the following alert will display in the browser:

`<name> was clicked` where `<name>` is the element clicked. How can you make it work with only one event listener?

We could add individual event listeners here one for each `<li>` element but we can do better by using one in the parent node `<ul>`. The idea is to leverage [event propagation and bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture) so that when we click anywhere within the `<ul>` area we would pick the current target text node and show the alert message.


Here is the gist of the code:

{{< code-block javascript >}}
function onListElementClicked(event) {
  if(event.target && event.target.nodeName == "LI") {
    // List item found. Alert the innerText
    alert(event.target.innerText +  " was clicked");
  }
}

let list = document.getElementById('list-start');
if (list) {
  list.addEventListener('click', onListElementClicked);
}
{{< /code-block >}}

* **6. Write a function that checks if a given string is a palindrome.**

By definition, a string is a palindrome if it read backwards the same. For example the following strings are palindrome:

"aba", "assissa"

However the following strings are not palindrome:

"abc", "asibisaa"

We can check if a string is a palindrome using a for loop over two indexes. The first index start at the start of the string and the second index starts at the end and moves towards the start. If at any time the characters at S[i] !== S[j] then we found a mismatch so the string is not a palindrome. We stop when we've reached the middle of the string.

Here is the gist of the code:

{{< code-block javascript >}}
function isPalindrome(inputStr) {
  let lo = 0;
  let hi = inputStr.length;
  let mid = Math.floor((lo + hi) / 2);
  // Check until the mid element
  for (let i = 0, j = hi-1; i < mid; i += 1, j -= 1) {
    if (inputStr[i] !== inputStr[j]) {
      return false;
    }
  }
  // If we got in here then we know that the string is palindrome
  return true;
}

console.info(isPalindrome("ab"))
console.info(isPalindrome("a"))
console.info(isPalindrome("aba"))
console.info(isPalindrome("abc"))
console.info(isPalindrome("abba"))
{{< /code-block >}}

* **7. Write a function to represents a linked list.**

A lot of times you are asked to implement something in a linked list such as reverse a list or find any cycles. So it's important to be able to implement one on the fly. Here is a simple implementation with a few basic operations:

{{< code-block javascript >}}
// Node holds the data and a reference to the next node
function LinkListNode(data) {
  this.data = data;
  this.next = null;
}

// Linked list Basic Structure
function LinkedList() {
  this.len = 0;
  this.head = null;
}

// Operations
LinkedList.prototype.push = function(item) {
  if (item) {
    let node = new LinkListNode(item);
    // if the current head is null we set item as head and update the length
    if (!this.head) {
      this.head = node;
      this.len += 1;
      return node;
    }
    // Otherwise we follow the next links until we reach the end of the list
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    // If we got here then we have reached the end. currentNode points to the last element
    currentNode.next = node;
    this.len += 1;
    return node;
  }
};

LinkedList.prototype.head = function() {
  return this.head;
};

LinkedList.prototype.length = function() {
  return this.len;
};


let list = new LinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);

console.info('List is: ');
let currentNode = list.head
while(currentNode !== null) {
  console.info(currentNode.data);
  currentNode = currentNode.next;
}

{{< /code-block >}}


* **8. Write a function to represents a Stack.**

A lot of times you are asked to implement an algorithm that uses a Stack such as DFS traversal or checking if an expression is balanced. So it's important to be able to implement one on the fly. Here is a simple implementation with a few basic operations:

{{< code-block javascript >}}
function Stack() {
  this.items = [];
}

// Operations
Stack.prototype.push = function(item) {
  this.items.push(item);
}

Stack.prototype.pop = function() {
  return this.items.pop();
}

Stack.prototype.top = function() {
  return this.items[this.items.length - 1];
}

Stack.prototype.isEmpty = function() {
  return this.items.length === 0;
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.info('Stack is: ', );
while(!stack.isEmpty()) {
  console.info(stack.pop());
}
{{< /code-block >}}


* **9. Write code that represents a queue data structure.**

A lot of times you are asked to implement an algorithm that uses a Queue such as BFS traversal. So it's important to be able to implement one on the fly. Here is a simple implementation with a few basic operations:

{{< code-block javascript >}}
function Queue() {
  this.items = [];
}

Queue.prototype.enqueue = function(item) {
  this.items.push(item);
}

Queue.prototype.dequeue = function() {
  return this.items.shift();
}

Queue.prototype.top = function() {
  if (this.items.length > 0) {
    return this.items[0];
  }
  return null;
}

Queue.prototype.isEmpty = function() {
  return this.items.length === 0;
}

let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);

console.info('Queue is: ', );
while(!q.isEmpty()) {
  console.info(q.dequeue());
}

{{< /code-block >}}


* **10. Write code that represents a graph data structure.**

A lot of times you are asked to implement an algorithm that uses a Graph DTS such as finding shortest paths. So it's important to be able to implement one on the fly. Here is a simple implementation with a few basic operations:


{{< code-block javascript >}}
function Graph() {
  this.vertices = new Map();
  this.edges = [];
}

Graph.prototype.addVertex = function(vertex) {
  this.vertices.set(vertex, vertex);
  this.edges[vertex] = [];
};

Graph.prototype.addEdge = function(from, to) {
  this.edges[from].push(to);
  this.edges[to].push(from);
};

Graph.prototype.size = function() {
  return this.vertices.size;
};

Graph.prototype.removeVertex = function(vertex) {
  // Check if vertex exists
  if (this.vertices.has(vertex)) {
    this.vertices.delete(vertex);

    // Find all relevant edges and delete them
    while (this.edges[vertex].length > 0) {
      let linkedVertex = this.edges[vertex].pop();
      // Remove all edges pointing to this vertex.
      this.removeEdge(linkedVertex, vertex);
    }
  }
};

Graph.prototype.removeEdge = function(from, to) {
  // Find all references of from edges and remove them
  let firstIndex = this.edges[from] ? this.edges[from].indexOf(to) : -1;
 // Find all references of to edges and remove them
  let secondIndex = this.edges[to] ? this.edges[to].indexOf(from) : -1;
  if (firstIndex !== -1) {
    this.edges[from].splice(firstIndex, 1);
  }
  if (secondIndex !== -1) {
    this.edges[to].splice(secondIndex, 1);
  }
};

let graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 4);

graph.removeVertex(2);
console.info(graph);

{{< /code-block >}}


{{< header title="What's next" >}}

Stay put for the next part!

😉👌💖
