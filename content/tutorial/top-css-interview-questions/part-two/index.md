---
author: "Theo"
date: 2019-07-01
title: "Top CSS Interview Questions with detailed answers.😁🏆🥇💯 Part II"
summary: "Practice your CSS knowledge with some basic CSS interview questions"
weight: 10
tags: [
    "css",
    "interview"
]
categories: [
   "css"
]
levels: "medium"
series: ["Top CSS Interview Questions"]
series_weight: -20
---

Hey welcome back. This is the second article of the series about Top CSS Interview questions and answers. I hope you enjoyed the first part.

Today I will be posting a whole new list of questions about CSS flex-box, grid layout and other. As always I will be posting the questions first followed by the answers. 

I expect that the answers are representative but not an absolute requirement. If you are preparing for a technical interview you need to be able to explain with your own words how things works and maybe writing your own examples. It is not necessary to know everything but at least admit what you know or what you don't know so that you make yourself clear.

Let's start then.

{{< header title="Questions🤔💭">}}

Q1.) **What happens if you add `float` to sibling elements in the same direction?**

Q2.) **Floated elements add height to their parent elements. True of false?**

Q3.) **What is a pseudo-element? Show an example.**

Q4.) **How do we typically center content inside a page?**

Q5.) **Explain in simple words what is the block formatting context or BFC?**

Q6.) **Explain the difference between `:nth-child` and `:nth-of-type`?**

Q7.) **What is the default direction of the flex container?**

Q8.) **Show how can we use an attribute selector, targeting elements based on their some attribute.**

Q9.) **How many axis does a flex-box layout contain?**

Q10.) **What is the difference between `inline-flex` and `inline-block`?**

Q11.) **What happens if an item has a flex-grow of 0?**

Q12.) **Given the following HTML and CSS:**

{{< code-block html >}}
<div class="flex">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
{{< /code-block >}}
{{< code-block css >}}
.flex {
  display: flex;
}
.column {
  flex-basis: 40%;
  flex-shrink: 0;
}
{{< /code-block >}}

What will happen in this case with our flex container? How can we fix it?

Q13.) **What is the full expansion of the rule `flex: 2`?**

Q14.) **Given the following HTML and CSS:**

{{< code-block html >}}
<body class="flex">
  <div class="column-main"></div>
  <div class="column-sidebar"></div>
</div>
{{< /code-block >}}
{{< code-block css >}}
.flex {
  display: flex;
}
.column-main {
  flex: 2;
}

.column-sidebar {
  flex: 1;
}
{{< /code-block >}}

We also know that the `body` element has no margin or padding and the total width of the viewport is 1157px.

What is the width in pixels of the `column-main` and `column-sidebar` elements?

Q15.) **Given the following HTML:**

{{< code-block html >}}
<ul class="nav">
  <li><a href="/">Home</a></li>
  <li><a href="/blog">Blog</a></li>
  <li><a href="/about">About</a></li>
  <li class="nav-right"><a href="/contact">Contact</a></li>
</ul>
{{< /code-block >}}

How can we target every list item that follows another list item?

Q16.) **What will happen if you run in Safari the following rule?**

{{< code-block css >}}
.nav {
  display: -ms-flexbox;
}
{{< /code-block >}}

Q17.) **When we have `flex-direction: column` do the `flex-basis`, `flex-grow`, and `flex-shrink` apply for height or width?**

Q18.) **We want to select all input elements that are not of type radio or number. How can we do that?**

Q19.) **What is the difference between `align-items` and `align-content` in a flex-box container?**

Q20.) **You have an `input type=text` element and you apply a `display: block` rule. You noticed that the input lands in its own line, but does not expand to fill the whole width of the input text area. Why is that? How can you fix it?**

Q21.) **What is the meaning of the `fr` unit in the grid layout?**

Q22.) **When `flex-wrap` is is `wrap` or `wrap-reverse` then what happens to the `flex-shrink` rule?**

Q23.) **We have the following html and css:**

{{< code-block html >}}
<div class="flex">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
{{< /code-block >}}

{{< code-block css >}}
.flex {
  display: flex;
  justify-content: flex-start;
}
.column {
  background-color: blue;
  width: 70px;
  margin: auto;
  height: 70px;
}
{{< /code-block >}}

We notice that the items do not align to the left based on the `justify-content` rule. Why is that?

Q24.) **How can we create a 3x2 grid layout of equal fractions with a 0.25em gap between cells?**

Q25.) **With the emergence of the grid layout, the flex-box is useless. True or false?**

Q26.) **We need to define a two-column grid with three vertical lines named start, middle and end. The first column will have double the size of the second one. How we can do that?**

Q27.) **What do you know about feature queries? How do we declare them?**

Q28.) **What is the purpose of the `object-fit` rule?**

Q29.) **What is the difference between `auto-fill` and `auto-fit` properties when defining a grid-template?**

Q30.) **`justify-content` has no real meaning inside a grid layout. True or false?**

{{< header title="Answers⛅🗽">}}

A1.) If you float multiple elements in the same direction, they’ll stack alongside next to each other.

A2.) False. This is because floated elements just allow the text to wrap around them. It does not make the parent container larger to accommodate the new height.

A3.) pseudo-elements are special selectors that start with a double-colon (::) syntax. They usually target specific parts of the document. For example `::before` and `::after` are used to insert content at the beginning or end of an element.

A4.) We use two nested containers and then set margins on the inner container to position it within the outer one. For example:

{{< code-block css >}}
.container {
  max-width: 960px;
  margin: 0 auto;
}
{{< /code-block >}}

{{< code-block html >}}
<body class="main">
  <div class="container"></div>
</body>
{{< /code-block >}}

This way in smaller viewports, the inner container will fill the screen, but on larger ones it will stop at 960px width.

A5.) Block formatting context is a region in which the layout of block boxes occurs and in which floats interact with other elements. 

In other words we have a section where some rules apply only to things within the same block formatting context and not between different ones. One simple way to create a BFC is to use block elements where overflow has a value other than visible `overflow: auto` or use absolutely positioned elements.

A6.) We use `:nth-child` to target an element position amongst it’s siblings starting from 0. For example :nth-child(0) will target the first child, `:nth-child(2n)` will target every second child, etc. We use `:nth-of-type` to target an element position amongst amongst it’s siblings starting from 0 but also of the same type.

A7.) By default, flex items align side by side, in a row from left to right.

A8.) An attribute selector is defined like this:

{{< code-block css >}}
[class*="column-"] {
}
{{< /code-block >}}

This will match all elements whose class attribute contains the `column-` value. For example:
`column-1`, `column-2` will be matched but `column` won't.

A9.) Two axis. The main axis and the cross axis.

A10.) An `inline-flex` creates a container where the elements 
won’t automatically grow to 100% width. It makes the flex container to display inline and the container items behave the same as `display:flex`.

With `inline-block` the items behave the same as `display:block` and the container is displayed inline.

A11.) When an item has flex-grow of 0 it won’t grow past its flex basis parameter.

A12.) The flex items will overflow the container as they add up to more than 100% of the width because of the `flex-shrink: 0` rule. We can fix it by just changing it to `flex-shrink: 1`.

A13.) `flex: 2` is a shortcut for:

{{< code-block css >}}
  flex-grow: 2;
  flex-shrink: 1;
  flex-basis: 0%;
{{< /code-block >}}

A14.) It will be approximately `771px` and `386px` respectively. We can calculated it as ratio of the total width for example we have total flex items = 2 + 1 = 3 and `column-main` occupies 2/3 = 0.666 times 1157 ~ 771px and the rest is for `column-sidebar` ~ 386px.

A15.) We need to use the following selector:

{{< code-block css >}}
.nav > li + li {}
{{< /code-block >}}

The `nav > li` will target the first list item of each `.nav` container and the `+ li` will match the elements that are placed immediately after it.

A16.)  It will ignore it and won't apply the `display: flex` as there is no associated rule for Safari. This is an example of a vendor prefix that works in older browsers such as IE10.

A17.) It will apply to the height of the element instead of the width.

A18.) We need to use the two `not` selectors that invert the selection and combine them together. For example:

{{< code-block css >}}
input:not([type=radio]):not([type=number]
{{< /code-block >}}

A19.) The `align-items` rule controls the positioning of the items along the cross axis. For example for `flex-direction: row` it would be for the column axis and vice versa. `align-content` only applies when `flex-wrap` is enabled and it controls the spacing of the flex rows along the cross axis.

A20.) For `input` elements the `size` attribute determines it's width, which indicates roughly the number of characters it should contain without scrolling. Setting `display:block will` just place it in its own line. You can fix it by applying a `width: 100%` rule.

A21.)  `fr` represents a fraction unit that is used in the grid layout to represent a part of the whole in terms of fractions.

A22.) In that case because we allow wrapping, the `flex-shrink` will not shrink according to that rule.

A23.) Because we added the `margin: auto;` the `justify-content` rule will have no effect.

A24.) We can use the following css:

{{< code-block css >}}
.grid {
  display: grid;                           
  grid-template-columns: 1fr 1fr 1fr;      
  grid-template-rows: 1fr 1fr;             
  grid-gap: 0.25em;                         
}
{{< /code-block >}}

A25.) False. Both grid layout and the flex-box are complementary. Flex-box for example is one-dimensional and suitable for content based rules, whereas the grid is two-dimensional and is suitable for layout based rules.

A26.) We need to use the following rule:

{{< code-block css >}}
grid-template-columns: [start] 2fr [middle] 1fr [end];
{{< /code-block >}}

Here `[start]` marks the starting grid line `[middle]` the middle one and `[end]` the last one. The fractions in between represent how much span the layout will have. We can now use it for example as:

{{< code-block css >}}
grid-column: [start] / [end];
{{< /code-block >}}
And the column will span the whole width from start to end.

A27.) Feature queries are much like feature flags. They are checks we add for a particular css property or value validate that is supported by the current browser. For example:

{{< code-block css >}}
@supports (display: grid) {
  ...
}
{{< /code-block >}}

Will check if the `display: grid` rule is supported and then it will apply the block rules to the current styles. If not, that styling will be skipped.

A28.) The `object-fit` rule works only for `img` or `video` elements. It's used to determine how they will be resized to fit it's container. 
For example we have an image with natural aspect ratio of 4/3:

{{< code-block css >}}
img {
  width: 400px;
  height: 300px;
}
{{< /code-block >}}

If we change an image dimensions to `width: 300px, height 400px` it will break its aspect ratio and look distorted.
To fix that we need to apply for example `object-fit: cover` or `object-fit:contain` so that the aspect ratio stays the same.

A29.) With `auto-fill` the browser will try to place as many items in the same row or column as possible possible creating additional empty tracks if there’s space available. On the other hand, `auto-fit` will not create additional tracks but it will try to expand the tracks into so that they take up any available space. For example with the following rules:

{{< code-block css >}}
.grid-container--fill {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.grid-container--fit {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
{{< /code-block >}}

The more column you add with `grid-container--fill` it will squeeze the items towards the minimum 100px width and once you reach that then it will wrap to the next row. With `grid-container--fit` it will try to expand their available space up to the available fraction width.

A30.) False. It actually does. It's used in the grid container to place the tracks horizontally within it.
For example:

{{< code-block html >}}
<div class="grid">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
{{< /code-block >}}
{{< code-block css >}}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 200px);
  justify-content: center;
}
{{< /code-block >}}

Will place all the columns in the center if the container space is larger than 800px width.

---

{{< header title="Resources for further reading" >}}

* [**A Complete Guide to Grid**](https://css-tricks.com/snippets/css/complete-guide-grid/)

* [**A Complete Guide to Flexbox**](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

* [**All about Floats**](https://css-tricks.com/all-about-floats/)

* [**object-fit**](https://css-tricks.com/almanac/properties/o/object-fit/)