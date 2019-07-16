---
author: "Theo"
date: 2019-06-28
title: "Top HTML Interview Questions with detailed answers 🍁🔥👌😊🤘 Part I"
summary: "Practice your HTML knowledge with some basic interview questions"
weight: -30
tags: [
    "html",
    "interview"
]
categories: [
   "html"
]
levels: "medium"
series: ["Top HTML Interview Questions"]
series_weight: -20
---

Hello. As we have reviewed the most [useful CSS interview Questions](http://codethat.today/tutorial/top-css-interview-questions/part-one/), we can continue our little adventure and practice with HTML for this series.

You may be thinking, *hey HTML is easy right?*. Wrong! HTML is a rabbits hole and has a lot more tricky parts to understand than CSS. There are lots of properties, rules and APIs and more. It's not only about Markup but the rules that govern them. Hopefully, with this series you can prepare in advance and demystify some of the hard parts of HTML.

I've made some changes, though. For your convenience, I've placed the answers next to each question. However, you should be able to answer the majority of those questions without cheating or at least grasp the concepts.

As always a little advice on your next technical interview. Try being yourself and don't be absurd. There are things that you can fake but most of them you cannot. You also want to show your personality and how you can fit with the interviewing team so be extra careful.

Let's start 💫

### Where do we use the `<video>` element?

**Answer**: The `<video>` element provides a way to play video in the browser without requiring a plugin.

### What of the most basic structure of an HTML5 document?

**Answer**: A most basic structure is a `<!DOCTYPE>` followed by `html`, `head` and `body`.

### What is the meaning of the following meta tag?

{{< code-block html >}}
<meta charset="utf-8">
{{< /code-block >}}

**Answer**: This `charset` meta tag declares the page’s character set to be a `utf-8`. For example it will only show the UTF-8 range of chars.

### What is the default type of a stylesheet link?

**Answer**: By default it's `text/css`.

### Which element is semantically suitable for headings, titles or other important details?

**Answer**: That would be the `<header>` element.

### How would we typically use a `<hgroup>` element?

**Answer**: We would use a `<hgroup>` to group multiple h1-h6 elements that will form a title. For example:

{{< code-block html >}}
<hgroup>
    <h1>Chapter 1</h1>
    <h4>Once upon a time...</h2>
</hgroup>
{{< /code-block >}}

### How would we typically use a `<mark>` element?

**Answer**: We can use the `<mark>` element to tag or highlight a piece of text within a bigger text. For example when we autocomplete terms in an search input.

### How can we add a placeholder text in an input element?

**Answer**: By adding a `placeholder` attribute.

### What does the following element show?

{{< code-block html >}}
<progress value="25" max="100" min="50"></progress>
{{< /code-block >}}

**Answer**: It will show a progress bar quarter filled. The min property has no effect.

### What does the following element show?

{{< code-block html >}}
<details>
  <summary>Copyright 2018</summary>
  <p> - by Theo. All Rights Reserved.</p>
  <p>All content and graphics on this web site are the property of Theo.</p>
</details>
{{< /code-block >}}

**Answer**: It will show a collapsible element with the title `Copyright 2018` and when we click on the title the rest of the content will show.

### What does the `<canvas>` element do?

**Answer**: The `<canvas>` element offers an API for drawing or manipulating images and graphics without installing a plugin. For example we can create shapes, we can define paths, use color, export to png etc.

### What is the main difference between Server sent events and Websockets?

**Answer**: The main difference is that Server sent events are one-way only from the server to the browser but Websockets establish a two-way communication.

### How can we make any element in the DOM editable?

**Answer**: We can use the global `contenteditable="true"` attribute that will make the text context editable.

### How can we make any the whole document editable?

**Answer**: We can use the global `document.designMode="on"` attribute that will make the whole document editable.

### What happens when we exceed the maximum size of the cookie storage?

**Answer**: The browser will start discarding older cookies to make space for the newer ones.

### What is the main difference between `Session Storage` and `Local Storage`?

**Answer**: With `sessionStorage` the client data persists only for the length of the current session or per tab. When we open a new tab it will start anew. With `localStorage` we don't have that limitation.

### What is the main purpose of the `<output>` element?

**Answer**: The `<output>` element is used to display a result of a calculation. It accepts properties like `form_id` to reference the form id  that it belongs.

### We have an input field that we want to add a simple check to test against a rule, for example the input has the right length and consists only of numbers. How can we do that with HTML?

**Answer**: We can use the `pattern` attribute to specify a regular expression. For example:
`pattern="[0-9]{10,16}"` will allow only numeric characters with minimum 10 and maximum 16 numbers.

### We have a form and we want to disable the build-in form validation effects. What we need to do?

**Answer**: We can add a `novalidate` attribute on the form so that it will bypass the validation rules applied.

### We have the following form:

{{< code-block html >}}
<form action="/submit.php">
  First name: <input type="text" name="fist_name"><br>
  Last name: <input type="text" name="last_name"><br>
  <button type="submit">Submit</button><br>
  <button type="submit">Save for later</button>
</form>
{{< /code-block >}}

We want to be able to submit to a different endpoint when we click the Save for later button. How can we do that?

**Answer**: We can add a `formaction` attribute to the button. For example:

{{< code-block html >}}
<button type="submit" formaction="/save_for_later.php">Save for later</button>
{{< /code-block >}}

That will post to a different endpoint for that button.

### How can we get the value of an input element as number without using Javascript?

**Answer**: In that case we need to use the `valueAsNumber` property that returns the value on an element a number if it's valid.

### What is the main difference between a `<select>` element and a `<datalist>` element?

**Answer**: A `<select>` element offers a list of options that we need to choose from, whereas a `<datalist>` element offers a list of options that we mar or not choose as they act as a recommendation.

### What do you know about the Constraint Validation API?

**Answer**: The Constraint Validation API is a set of methods and properties you can use to detect and modify the validity of a given element. We can use it to apply custom validation rules or change the default error messages natively.

### What is the main purpose of the `setCustomValidity` method?

**Answer**: We use `setCustomValidity` to set a custom message for the validation check of an element.

### How can we listen for invalid events when we submit a form?

**Answer**: We actually have to use an `oninvalid` event listener. For example:

{{< code-block html >}}
<input type="text" oninvalid="alert('You must fill your name!');" required>
{{< /code-block >}}

### What is a polyfill?

**Answer**: A polyfill is a piece of code that mimic some functionality that is missing from the browser. For example Promises or es6 methods etc.

---

{{< header title="Resources for further reading">}}

* [Constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)
* [HTML5 new Tags](https://www.htmlgoodies.com/tutorials/html5/new-tags-in-html5.html)
