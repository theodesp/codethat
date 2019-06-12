---
author: "Theo"
date: 2017-7-17T14:15:59-06:00
title: "Behind Continuations Passing Style. Practical Examples in Go"
summary: "In computer science and computer programming, a continuation is an abstract representation of the control state of a computer program. A continuation reifies the program control state."
weight: -20
tags: [
    "programming",
    "go"
]
categories: [
   "go"
]
levels: "basic"
---

* In computer science and computer programming, a continuation is an abstract representation of the control state of a 
computer program. A continuation reifies the program control state.*

Continuation-passing style, or CPS more shortly, is a style of programming sometimes employed in 
[Functional Programming](http://wiki.c2.com/?FunctionalProgramming) languages. The main idea is that instead of having a function return a value, you let a function 
take another function as a parameter that will be used a channel or a continuation of the resulting operation.

> You can think of this function as a callback function that at any point it holds the state of the closure.

In Continuation Passing Style programming is a style of constructing your functions so they are not allowed to return. 
A function must emulate returning by passing its would-be-return value to a continuation function that was passed into it as an explicit parameter. Thus you can say that all continuation passing style functions are gotos with arguments.

Let’s see a simple example in Go as the language supports Closures.

{{< code-block go >}}
// Identity just maps a value passed to the same value
func identity(v int, next func(int)) {
   next(v)
}
{{< /code-block >}}

I used an `int` here for simplicity. As you can see this function just accepts a parameter `v` and a function `next` that 
accepts a value of integer type and it just passes the parameter to `next`.

In order to use this function you just call it by supplying a value to next:

{{< code-block go >}}
// main.go
identity(5, func(result int) {
   fmt.Println(result) // prints 5
})
{{< /code-block >}}

Some things to note here are:

1. There are no return values. Just a function that accepts another function that passes the current state.

OK, let’s see another example this time for factorials.

{{< code-block go >}}
// Recursive Example
func factorial(n int, next func(int)) {
   if n == 0 {
      next(1)
   } else {
      factorial(n-1, func(k int) {
         next(n * k)
      })
   }
}
factorial(5, func(result int) {
   fmt.Println(result) // prints 120
})
{{< /code-block >}}

As you can see we do it recursively this time. As long as we haven’t reached n to be 0 we call the factorial again this 
time passing a different next function that will calculate the next factorial number and decrement n by 1.

Let’s see how this unrolls for `n=2`:

{{< code-block go >}}
factorial(2, next) (1)
factorial(1, func(k int) { // n !== 0
         next(2 * k) // (2)  
      })
factorial(0, func(k int) { // n !== 0
         next(1 * k) // (3)
      })

next(1) // n == 0 on the 3rd call. This will feed a value to k. ﻿So go backwards at the stack of calls.
next(1 * 1) // (3)
next(2 * 1) // (2)
fmt.Println(2) // (1)
{{< /code-block >}}

There is also a way to do it by passing the result to the function, which is more tail-call friendly.

{{< code-block go >}}
// Tail recursive way
func factorial(n int, next func(int)) {
   tailFactorial(n, 1, next)
}
func tailFactorial(n int, a int, next func(int)) {
   if n == 0 {
      next(a)
   } else {
      tailFactorial(n-1, n*a, next)
   }
}
{{< /code-block >}}

The only difference is how you handle the total calculation result inside the functions and the number of functions created.

{{< header title="OK, what about Errors?" >}}

Once a program is in CPS, it breaks the standard exception mechanisms in the language. 
Fortunately, it’s easy to implement exceptions in CPS. This leads to a more standard way of dealing with errors.

Let’s say for example you have a function that performs some calls that may throw or return an error. 
In that case, you would like to catch it in a way that there is a relevant continuation function so that 
you can pass the error value there and handle it appropriately. That way the continuation invariant is maintained.

In order to do that let’s add another function parameter call it fail, this time for accepting errors:

{{< code-block go >}}
func factorial(n int, next func(int), fail func(e error)) {
   if n < 0 {
      fail(errors.New("Number is negative"))
   } else if n == 0 {
      next(1)
   } else {
      factorial(n-1, func(k int) {
         next(n * k)
      }, fail)
   }
}

func getFactorial(n int, next func(int)) {
   factorial(n, next, func(e error) {
      fmt.Println(e) // handle error case here and pass something ﻿downwards
      next(n)
   })
}
getFactorial(-1, func(result int) {
   fmt.Println(result) // this will print the error case first and then print -1
})
{{< /code-block >}}

As you can see now you can utilize closures to pass all the errors of the application to the fail function 
and catch them later on. That will give you a chance to perform recovery operations after the failure. 
Then you can pass a valid value down using the next function. 
This is similar to doing a try/catch in some languages but with out the burden of the exception handling or 
if it’s missing a language feature. These are just functions here calling each other.

Note that in that case with Go you can at any case pass any error handlers in the fail continuation and handle them all in the same function.

What are the advantages you see here? It clearly groups your error handlers into functions which you can reuse. 
It also makes your code a little bit more readable and consistent.

You might find sometimes though that you cannot keep track of what is meant to be called and its difficult to 
follow the continuations especially if they are multiple tail calls. 
In general, if you keep it simple there will be no ambiguities.

{{< header title="Verdict" >}}

That’s it. I hope you got a taste of what are continuation passing style of programming and how they help emulate 
certain language features using only functions and closures.

{{< header title="Excercises" >}}

1. Implement a function to calculate the Fibonacci numbers up to N. using continuation passing style.
2. If you implemented the previous function using recursion, implement it now using tail recursion.
3. Pick a programming language other than Go (for example Javascript). What structures and language features are available to help you develop functions using continuation passing style? Compare and comment down your thoughts.
4. Whats the difference between continuations and promises?

{{< header title="References" >}}

* [Wiki Article](https://en.wikipedia.org/wiki/Continuation-passing_style)
