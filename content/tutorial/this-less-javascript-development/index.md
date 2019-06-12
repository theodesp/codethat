---
author: "Theo"
date: 2017-06-30T14:15:59-06:00
title: "‘this’-less Javascript Development"
summary: "or programming without using ‘this’."
weight: 30
tags: [
    "javascript",
    "development",
]
categories: [
   "javascript",
   "development",
   "data structures"
]
levels: "basic"
---

The keyword this in JavaScript is probably the most discussed keyword in Javascript just because it 
has a different behavior depending on where is called and what environment mode is enabled ( strict vs non-strict ).

{{< note class="green" title="If you want to learn more about how the keyword ‘this’ works you can read those excellent articles">}}

* [Keyword This for beginners](https://codeburst.io/javascript-the-keyword-this-for-beginners-fb5238d99f85)

* [The Simple Rules to ‘this’ in Javascript](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)
{{< /note >}}

I won’t get into an intro how it works but instead, I will focus on a different idea and a method of programming.

The way that this behaves has made some programmers angry so they decided not use it at all. 
I don’t blame them as it has created so many side effects and language extensions in order not to deal with its 
peculiarities (see arrow functions etc, this binding, etc) that at the end of the day we can do without it. 
So now let's try a new way of dealing with a 'thisless' world by thinking deeply...

{{< seperator >}}

{{< header title="The idea" >}}

The main thing we need to remember is that functions are first-class citizens in Javascript. 
You can use them as values to function parameters or you can return functions. When you do that you create a closure. 
A **closure** is an inner function that has access to the outer (enclosing) function’s variables scope chain. 
Those variables are private to the function so they are not accessible to the scope that holds the inner function value by direct means. 

For example, take a look at this function `makeAdder`:

{{< code-block javascript >}}
function makeAdder(base) {
  let current = base;
  return function(addition) {
    current += addition;
    return current;    
  }
}
{{< /code-block >}}

This function will accept a base parameter and it will return a function. That function will accept a parameter and when is called it will have access to the current variable so it will do the addition and return the result. For each subsequent calls, it will retain the current value each time.

Thus the important thing to note is:

**Closures define their own local lexical environment that act as private space for the functions.**

Closures are a very powerful feature in Javascript and when used correctly one can build very good abstractions.

Now that we have this knowledge we can extend the notion of returning a particular object that knows how to manipulate on the local environment. Think of it as a public API that the closure exposes. The name of it is the **revealing module pattern**.

You can say that in the revealing module pattern you can define which members are publicly accessible and which members are private. That makes the code more readable and easier to use.

Here is an example of it:

{{< code-block javascript >}}
let counter = (function() {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
{{< /code-block >}}

As you can see the privateCounter variable is our data we need to handle and the operations are the increment, decrement, and value

Armed with that knowledge we have all the required tools to program without this and I will prove it with an example.

{{< header title="The example" >}}

To demonstrate one simple example on how to use closures and functions and no this, we are going to implement a simple data structure called a **deque**. A deque or double-ended queue is an abstract data type that acts as a queue, for which elements can be added to or removed from either the front (head) or back (tail) It is also often called a head-tail linked list as we are going to implemented using a linked list. It may sound complicated but it's not and if you follow along with the logic you will be able to understand how to implement all the required operations that a deque has to satisfy. Note that while this is an example you can apply similar techniques to any object that holds state whether its a Model object, a Store or whatever.

Here are the required operations.

* **create**: Creates a new deque object.
* **isEmpty**: Checks if the deque object is empty.
* **pushBack**: Appends a new item at the end of the deque.
* **pushFront**: Appends a new item at the front of the deque.
* **popBack**: Removes and returns the last element of the deque.
* **popFront**: Removes and returns the first element of the deque.

Let's first think of how to represent our deque in terms of objects and closure variables. If we have a good representation of that we can implement the operations easily.

We need a variable lets call it `data` that will hold each item on the deque. We also need pointers for the first and last item on the deque. Let's call them `head` and `tail` respectively. As it’s a linked list implementation we need a way we can link each item with each other so for each item we need pointers for the next and previous items. Let's call them `next` and `prev`. Lastly, we need to keep track of how may items we have so let’s call it `length`.

Next, we need to group the variables in their right place. For each node we need the data and the pointers to next and prev so let's define the Node as:

{{< code-block javascript >}}
let Node = {
  next: null,
  prev: null,
  data: null
};
{{< /code-block >}}

For each Deque we need a head, a tail and a length so let's define the Deque as:

{{< code-block javascript >}}
let Deque = {
  head: null,
  tail: null,
  length: 0
};
{{< /code-block >}}

Now, these objects represent a specification of a Node and a Deque. We need to keep them inside our closure:

{{< code-block javascript >}}
module.exports = LinkedListDeque = (function() {
  let Node = {
    next: null,
    prev: null,
    data: null
  };
  let Deque = {
    head: null,
    tail: null,
    length: 0
  };
 // need to return the public api here
})();
{{< /code-block >}}

Now that we have established what our closure variables will be we can implement the `create` method which is as simple as:

{{< code-block javascript >}}
function create() {
  return Object.create(Deque);
}
{{< /code-block >}}

That's it. A newly constructed deque has no elements. Now for the `isEmptymethod`.

{{< code-block javascript >}}
function isEmpty(deque) {
  return deque.length === 0
}
{{< /code-block >}}

We pass a deque object and we check that its length property is zero. Cool.

Now for the pushFront method, we have to actually do the following steps:

* Create a new Node.
* If the deque is empty you just assign the head and tail to point the new Node.
Otherwise, if the deque is not empty grab the current head of the deque and make sure you assign prev to the new Node 
and let the new Node point its next to the head. Thus the first item will be the new Node followed by the old head. 
We need not forget to update the deque head to point to the new Node.
* Increment length.

{{< code-block javascript >}}
function pushFront(deque, item) {
  // Create a new Node
  const newNode = Object.create(Node);
  newNode.data = item;
  
  // Grab the current head
  let oldHead = deque.head;
  deque.head = newNode;
  if (oldHead) {
    // We have at least one item. Prepend new Node in the front
    oldHead.prev = newNode;
    newNode.next = oldHead;
  } else {// The deque is empty. Just assign tail.
    deque.tail = newNode;
  }
  // Update length
  deque.length += 1;
  
  return deque;
}
{{< /code-block >}}

Similarly, we do the same for the pushBack method for the last item of the deque.

{{< code-block javascript >}}
function pushBack(deque, item) {
  // Create a new Node
  const newNode = Object.create(Node);
  newNode.data = item;
  
  // Grab the current tail
  let oldTail = deque.tail;
  deque.tail = newNode;
  if (oldTail) {
    // We have at least one item. Append new Node at the back
    oldTail.next = newNode;
    newNode.prev = oldTail;
  } else {// The deque is empty. Just assign head.
    deque.head = newNode;
  }
  // Update length
  deque.length += 1;
  
  return deque;
}
{{< /code-block >}}

Lastly, we need to expose our public methods outside the closure so we return an object of the exported required methods:

{{< code-block javascript >}}
return {
 create: create,
 isEmpty: isEmpty,
 pushFront: pushFront,
 pushBack: pushBack,
 popFront: popFront,
 popBack: popBack
}
{{< /code-block >}}

So far so good. So how do we use it? Let's show usage example showing a simple representation of the structure:

{{< code-block javascript >}}
const LinkedListDeque = require('./lib/deque');
d = LinkedListDeque.create();
LinkedListDeque.pushFront(d, '1'); // [1]
LinkedListDeque.popFront(d); // []
LinkedListDeque.pushFront(d, '2'); // [2]
LinkedListDeque.pushFront(d, '3'); // [3]<=>[2]
LinkedListDeque.pushBack(d, '4'); // [3]<=>[2]<=>[4]
LinkedListDeque.isEmpty(d); // false
{{< /code-block >}}

Notice how we have a clear separation of data and operations against the data. As long as we hold a valid reference of a deque we can use the particular LinkedList operations with confidence.

{{< header title="Homework time" >}}

Yes, you thought you are going away by not practicing anything on your own would ya? For a complete understanding of how things work and you get the feel of this type of development I suggest you work on the following exercises on your own. Just clone/fork my github repo [here](https://github.com/theodesp/thisless-deque) and start working on them. (Nope you won’t find any answers there hohoho.)

1. Based on the previous operations implementations satisfy the rest. Implement the `popBack` and `popFront` functions that remove and return the first and the last item on the deque accordingly.

2. This particular implementation of a deque uses linked lists. A different implementation uses plain Javascript array objects. Implement all the required operations of a deque using an array and call it `ArrayDeque`. Remember no this, no new.

3. What differences in time and space complexity you can find for each method of the `ArrayDeque` and `LinkedListDeque`. Write down your thoughts in markdown.
Another way of implementing a deque is by using both an Array and a LinkedList. Call it `MixedDeque` . In that case, you allocate a fixed size Array block lets say 64 items where you put your items. When you push too many items in the block that exceed the block size you allocate a new block which you use a linked list to link the blocks together in a FIFO fashion. Implement the required methods for the deque using this approach. What are the advantages and the disadvantages of this structure? Write down your thoughts in markdown.

4. In his book about [Design Patterns in Javascript](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) the Author Addy Osmany notes that one disadvantage of the revealing module pattern is that if a private function refers to a public function, that public function can’t be overridden if a patch is necessary as because the private function will continue to refer to the private implementation. Thus the pattern doesn’t apply to public members, only to functions. Devise a way to overcome this disadvantage. Think about what the dependencies are and how to inverse that control. How to make sure all the private functions access public functions in a way that we are always in control what's get passed inside the closure thus not having to do worry about patches on the public functions? Write down your thoughts in markdown.

5. Write a method called `join` that glues together 2 deques. For instance calling `LinkedListDeque.join(first, second)` will append the second deque at the end of the first and return the new deque.

6. Develop a non-destructive traversal mechanism for the deque so that it can be iterated in a for loop. For this example, you can use es6 iterators.

7. Develop a non-destructive reverse traversal mechanism for the deque so that it can be iterated in a for loop in reverse order.

8. Join the movement and publish your code on Github bragging that you made a deque implementation with no this and how well you know deques inside out. Don’t forget to mention your [awesome mentor](https://www.linkedin.com/in/theofanis-despoudis-7bb30913/).

9. **Extra Marks**: Use any kind of testing framework to add tests to all of your implementations. Don’t forget to test edge cases.

10. **Extra Marks**: Modify the deque implementation to allow handling of weighted nodes. For example, you when you pushBack an item you can specify a `weight` or a priority `score`. If you don’t specify a weight the behavior is the same as a normal deque. If you specify a weight you need to make sure that after each operation the last item in the list has the lowest priority and the first element on the list has the highest priority. Add tests to verify that invariant.

11. **Extra Marks**: A **polynomial** is an expression that can be written as: `an * x^n + an-1*x^n-1 + ... + a1x^1 + a0` where `an..a0` are coefficients and `n…1` are exponents. Design a deque class that can represent a polynomial. Add methods for adding, subtracting, multiplying and dividing a polynomial. Assume that you pass only simplified polynomials don’t bother with complex ones. Add tests to verify the results are ok. Make sure that in all your methods you return the result as a new deque.

12. **Ultra Marks**: Pick a programming language other than Javascript (Python, Go, C++, etc.) and implement the all the previous exercises. Woohoo.

{{< header title="Conclusion" >}}

Ok I hope you did your homework and you learned something from it. If you think that the benefits of not using this are worth you can also check out this eslint rules plugin where you can enforce it to your lint checks. Make sure you achieve consensus with your colleagues first though as you might get grumpy faces whenever they see you!

Happy coding.


