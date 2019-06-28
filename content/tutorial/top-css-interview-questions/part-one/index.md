---
author: "Theo"
date: 2019-06-28
title: "Top CSS Interview Questions with detailed answers.✌️🤩✌️ Part I"
summary: "Practice your CSS knowledge with some basic CSS interview questions"
weight: -20
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

CSS tends to produce excessive headaches among developers, and we don't blame them. Working with CSS can be notoriously cumbersome and time-consuming especially if you have detailed design requirements and a boss with a magnifying glass 😎🔎.

In terms of interviewing, I took the opportunity to compile a list of basic competence questions that cover the fundamentals of CSS together with their explanations. This is aid you in the process of handling CSS related questions with ease and most importantly understand why things happen the way they happen with CSS.

I've listed all questions first and then all the answers at the end of this article.

Here it is then. The list of the Top CSS Interview Questions that any respectable Front-end artisan should know. 

{{< header title="Questions🤔💭" >}}

Q1.) **What are the different states of a link element?**

Q2.) **Explain the concept of CSS inheritance.**

Q3.) **By default, all properties are inherited. True or False?**

Q4.) **Write down some shorthand properties you can think of.**

Q5.) **Explain the difference between `inherit` and `initial`**

Q6.) **Whenever the specificity level of 2 selectors are the same, what are the most common implications of that? Can you give an example?**

Q7.) **Explain what is the `rem` unit and how it works.**

Q8.) **Write down the equivalent of `margin: 1rem 2rem 1rem`.**

Q9.) **Explain in simple words what is the meaning of "responsive CSS".**

Q10.) **Explain the difference between relative units and absolute units.**

Q11.) **Explain what is the `em` unit and how it works.**

Q12.) **User agent or Browser specific styles are have more importance than author styles. True or false?**

Q13.) **Is it a good practice to include ID selectors and why?**

Q14.) **What selector combination has the highest specificity?**

Q15.) **In respect to specificity, is the universal selector (*) and combinators (>, +, ~) selectors have any effect on specificity? For example is `h1 ~ p` more specific than `p`?**

Q16.) **In respect to specificity, are pseudo-class or attribute selectors more, less or of equal importance than the class selectors?**

Q17.) **What is the difference between unitless values and the ones with specified units.**

Q18.) **In case of conflicting declarations which one of the following order of precedence is correct when applying styles and why?**

  1. Different script origin or importance -> Inline Styles -> Order of Styles declared
  2. Selector Specificity -> Inline Styles -> Order of Styles declared
  3. Inline Styles -> Order of Styles declared -> Selector Specificity

Q19.) **Given that snippet below:**

{{< code-block css >}}
#main-nav a {
  color: white;
  background-color: green;
  padding: 5px;
  text-decoration: none;
}

.featured {
  background-color: orange;        1
}
{{< /code-block >}}

{{< code-block html >}}
<div id="main-nav">
  <a href="#" class="featured">Bonus</a>
</div>
{{< /code-block >}}

**We notice that the `featured` link is not rendered with an orange background. How can you refactor the ruleset to make it work?**

Q20.) **Given the following styles:**

{{< code-block css >}}
body {
  font-size: 16px;
}

.block {
  font-size: 1.5em;             
  padding: 1.5em;               
}
{{< /code-block >}}

**What is the computed value of the padding block in pixels?**

Q21.) **Explain what is the `rem` unit and how it works.**

Q22.) **How can we set the root element font-size to be 12px in `em`**

Q23.) **Explain what are the `vmin` and `vmax` units.**

Q24.) **Explain what is the viewport and what it includes.**

Q25.) **What are the dangers of setting a specific height property in an element?**

Q26.) **In the default boxing model, when you define 2 elements to have in total 100% width, what will happen if you add some padding or margin? Will it line up or will it show side by side?**

Q27.) **How can we make percentage-based heights to work?**

Q28.) **How do negative margins work?**

Q29.) **List some ways to stop margins from collapsing.**

Q30.) **You are trying to set a a vertical-align property to an element but does not work. What is the most common reason?**

Q31.) **This is collapsing of margins means? Give a simple example.**

Q32.) **What does the `box-sizing: content-box` do?**

---

{{< header title="Answers⛅🗽" >}}

A1.) There are four states in the link element: 
`unvisited`, `visited`, `hover` and `active`.

A2.) When an element has no cascaded value for a given property, it may inherit one from an ancestor element.

A3.) False. Not all properties are inherited. For example `border` or `will-change` are not inherited.

A4.) Here are some shorthand properties:

* `border` is a shorthand for `border-width`, `border-style`, and `border-color`

*  `padding` is a shorthand for `padding-top`, `padding-right`, `padding-bottom` and `padding-left`

A5.) Sometimes if you have both a cascaded value and inherited value on the same element then by default the cascaded value will be applied. If you don't want that you may use `inherit` to force the inherited value. 

`initial` will undo the values of the property so it will go back to the default value.

A6.) First the source order determines the style that will be applied. For example:


{{< code-block css >}}
.nav a {
  color: white;
  background-color: green;
  text-decoration: none;
}

a.featured {                    
  background-color: orange;
}
{{< /code-block >}}

Both have the same specificity so the order here matters. With that order that means that though that if we apply a `featured` class on a link we lose all the rules from the nav element.

A7.) `rem` refers to the root em instead on the current em. Instead of being relative to the current element, rems are relative to the root element.

A8.) `margin: 1rem 2rem 1rem` is equal to `margin-top: 1rem`, `margin-left: 2rem`, `margin-right: 2rem`, `margin-bottom: 1rem` so the middle value is the same for the left-right properties.

A9.)  Responsive CSS refers to the styles that apply different rules based on the resolution of the browser window or the orientation type (landscape or portrait). For example they will look different in mobile and different in web.

A10.) With `absolute` the value of units such as pixels remain the same. For example 5px is always 5px and does not change based on some factor. With `relative` the value of units changes, for example, the meaning of 5em changes depending on which element or property you’re using it on.

A11.) The `em` unit represents the font size of the current element that it could be inherited from the html body. For example if we specify a ruleset for a font size of 16 px then the padding of 1em will be 16px:

{{< code-block css >}}
.pad-1em {
  font-size: 16px;
  padding: 1em;          1
}
{{< /code-block >}}

A12.) False. The browser styles have the lowest specificity. If the author declares a style, it will be applied instead.

A13.)  No. ID selectors are very specific, they apply to only one element and therefore very prone to try to overcome them with `!important`.

A14.) Inline and !important. This combination of styles has the highest specificity. If it was only inline we could use `!important` in our CSS declaration file to override it.

A15.) None. The universal selector (*) and combinators (>, +, ~) selectors have no effect on specificity.

A16.) The same. pseudo-class or attribute selectors have the same specificity as a class selector.

A17.) Unitless values such as z-index, or font-weight don't have units. In a special case, we can use the value `0` without length units for length px, em, or rem.

A18.) The correct on is Different script origin or importance -> Inline Styles -> Order of Styles declared

  The browser checks the origin of the scripts then checks the inline scopes then checks the specificity and lastly it checks the order of the declaration rules.

A19.) Try to avoid !important. Either raise the specificity of `.featured`:

{{< code-block css >}}
#main-nav a {
  color: white;
  background-color: green;
  padding: 5px;
  text-decoration: none;
}

#main-nav .featured {
  background-color: orange;        
}
{{< /code-block >}}

or even better, lower the specificity of `a`:

{{< code-block css >}}
nav {                               
  margin-top: 10px;
  list-style: none;
  padding-left: 0;
}

.nav li {                            
  display: inline-block;
}

.nav a {                             
  color: white;
  background-color: green;
  padding: 5px;
  text-decoration: none;
}

.nav .featured {                    
  background-color: orange;
}
{{< /code-block >}}

A20.) It's 36px. That's because the value of the padding is calculated after the value of the font-size has been evaluated. 

In that example 1.5 * 16 = 24px so the padding will apply a 1.5 multiplier on top of the 24px so it's 1.5 * 24 = 36px.

A21.) `rem` refers to the root em instead on the current em. Instead of being relative to the current element, rems are relative to the root element.

A22.) We need to add the following rule:

{{< code-block css >}}

:root {
  font-size: 0.75em;
}
{{< /code-block >}}

Or 12/16 = 0.75

A23.) `vmin` is the 1/100th of the smaller dimension (height or width), `vmax` is the 1/100th of the larger dimension. They are typically used to make the element appear always in the viewport even if the orientation changes.

A24.) The viewport is the area in area in the browser window where the web page is visible. This excludes the browser’s address bar, toolbars, and status bar, if present.

A25.) If we specify a height property in an element and add too much content it will overflow the container and render after the specified height.

A26.) They will line wrap. So they will stack on top of each other instead of being side to side. This is because in default boxing model you define the width properties of its content and any padding or border properties are added up. So in the end they will exceed the 100% of the viewport.

A27.) For percentage-based heights we need to have an explicitly defined height on an elements parent block because the browser needs to determine the percentage base.

A28.)  By setting a negative margin you pull the element in the respective direction. For example `margin-left: -10px` will pull the element by 10px on the left.

A29.) We can stop collapsing with the following ways:

* Adding a padding or a border property between the 2 margins. 
* Adding `overflow: auto` to the container. 
* Adding a fixed, inline-block or absolute position to the container.
* Using flexbox. 
* Using `table-cell`.

A30.) Most probably the element is block based as vertical-align affects only inline and table-cell elements.

A31.) Collapsing refers to the situation when the top or bottom margins are overlapping. When that happens the form a single margin instead. For example a `p` paragraph usually has 1em top margin and 1em bottom margin. When we have 2 paragraphs together then instead of adding both the margins they produce only 1em margin between them. 

When top and/or bottom margins are adjoining, they overlap, combining to form a single margin. The size of the collapsed margin is equal to the largest of the margins.

A32.) `box-sizing: border-box` will adjust the box model to include the padding and borders properties when calculating the width of the element.
