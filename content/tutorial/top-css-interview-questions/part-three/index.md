---
author: "Theo"
date: 2019-07-06
title: "Top CSS Interview Questions with detailed answers.👑✨😊🏈⚽🏀🏐⚾ Part III"
summary: "Practice your CSS knowledge with some basic CSS interview questions"
weight: 20
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

Hey, how are you doing?

This is the third part of our series about CSS interview questions.

Today, I've prepared a new set of Questions and Answers in the usual format. We are going to be asking things about Positioning, HSL, KSS and FOUT so be prepared.

One good advice when preparing for a technical interview. Try to write things down in a piece of paper. Often, writing is almost a forgotten skill when we mostly type and rely on the IDE, but quite a few companies will give you a piece of paper or a whiteboard and a marker to write, so make sure you are comfortable with it.

So let's begin.

{{< header title="Questions🤔💭" >}}

Q1.) **What is the stacking context?**

Q2.) **What is the initial value of the position property?**

Q3.) **How can we make an element fill the whole viewport?**

Q4.) **What is the main difference between absolute and fixed positioning?**

Q5.) **When we apply a relative position to an element we always see a change on the page. True or false?**

Q6.) **With relative positioning, if we use both the `top` and `bottom` rules what will happen?**

Q7.) **What is the purpose of the z-index?**

Q8.) **When the browser parses the HTML and renders the DOM how does it show by default the positioned and the non-positioned elements?**

Q9.) **When an element resides at the back stacking context then no other element within that stacking can be brought behind it. True or false?**

Q10.) **As a best practice, it's recommended to always create a new stacking context.**

Q11.) **With responsive design you keep separate versions of HTML for each device. True or false?**

Q12.) **What is the purpose of the viewport meta tag?**

Q13.) **What do you know about CSS Modules?**

Q14.) **How can we use a media query that targets one of `max-width: 25em` or `min-width: 35em`?**

Q15.) **What is the difference between CSS reset and CSS normalization?**

Q16.) **Using an ID selector makes an element less reusable. True or false?**

Q17.) **Let's say we have a button with the following styles:**

{{< code-block html >}}
<button class="button">Click me</button>
{{< /code-block >}}

{{< code-block css >}}
.button {                            1
  padding: 0.5em 1em;
  border: 1px solid #000;
  border-radius: 0.33em;
  background-color: transparent;
  color: #000;
}
{{< /code-block >}}

We want to have another button with a similar style but an orange background-color and red border. What is the best way to do that?

Q18.) **Let's say we have the following HTML:**

{{< code-block html >}}
<div class="box">
  <img class="box__image" src="image.png">
  <div class="box__body">
    <h3 class="text-center">Title</h3>
  </div>
</div>
{{< /code-block >}}

{{< code-block css >}}
.text-center {
  text-align: center:
}
{{< /code-block >}}

We want to target the inner `h3` element ad apply some styles. Which one of the following rules is most versatile and why?

{{< code-block css >}}
.box h3 {}

.box__body > h3 {}

.box__body > .text-center {}
{{< /code-block >}}

Q19.) **Are you familiar with KSS? What can you tell me about it?**

Q20.) **Can you enumerate all the properties of the `background` rule?**

Q21.) **What does the `transform` property do?**

Q22.) **We cannot add two or more images in a background property. True or false?**

Q23.) **What is the color of the following hsl values?**

{{< code-block css >}}
hsl(0, 100%, 100%)
hsl(100, 100%, 100%)
{{< /code-block >}}

Q24.) **With HSL how can we find a complementary color of a hue value?**

Q25.) **What is the main difference between font-size and line height?**

Q26.) **How is it possible to use external fonts like Google Fonts?**

Q27.) **What do you know about the term Flash of Unstyled Text or FOUT?**

{{< header title="Answers⛅🗽" >}}

A1.) A stacking context is an element that contains a set of layers. This can be a root stacking context created initially. Or it can be a local stacking context, as created by specific properties and values. This is essentially the third dimension relative to the user. The element or a group of elements are painted together by the browser.


A2.) By default it's `position: static`.


A3.) By using `position: fixed` like that:

{{< code-block css >}}
.cover {                           
  position: fixed;                          
  top: 0;                                   
  right: 0;                                 
  bottom: 0;                                
  left: 0;                                  
}
{{< /code-block >}}

A4.) With fixed positioning the actual position is based on the viewport. With absolute its position is based on the closest positioned ancestor element (which it may be the viewport).

A5.) Most of the times relative position does not occur a visual change. It will create a stacking context.

A6.) The bottom rule will be ignored. The same will happen if we use `left` and `right`. The `right` will be ignored.

A7.) The `z-index` rule determines the order of the element as it appears in the stacking context. An element with greater stack order is always in front of an element with a lower stack order.

A8.) True. The same thing happens for every element that resides at the front. For example:

{{< code-block html >}}
<div>
  <div class="row relative row-1">
    <div class="absolute">In</div>
  </div>
  <div class="row relative row-2">
  </div>
</div>
{{< /code-block >}}

{{< code-block css >}}
.row {
  height: 100px;
  background-color: blue;
  width: 100px;
  border: 1px solid black;
  z-index:1;
}

.row-1 {
  left: 2em;
}

.row-2 {
  left: 3em;
  top: -4em;
}

.relative {
  position: relative;
}
.absolute {
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
}
{{< /code-block >}}

Even though we used a bigger z-index for the `.absolute` element the base root z-index is 1 and the second row will be always in front of the first one.

A9.) By default the browser puts any positioned element in front of any non-positioned elements.

A10.) False. A stacking context creates more complex layout rules and it's sometimes difficult to determine why some elements appear on top of the other.  For this reason we should always have a good reason to create a stacking context. For example we should create one for Portals or Modals because we usually want to display them on top of the existing page as a dialog.

A11.) False. You keep the same html but you use media queries and CSS rules for each device class of dimensions in order to accommodate content.

A12.) The viewport meta tag is used to instruct the the browser on how to control the page's dimensions and scaling. It is mainly used for enabling a mobile view in your page as without it, the pages will look scaled out.

A13.) For OR operations we use a comma (,) in between:

{{< code-block css >}}
@media (max-width: 25em), (min-width: 35em) {}
{{< /code-block >}}

A14.) CSS modules is a way to namespace class names and selectors by giving them unique identifiers. That way we can break up multiple styles into its own components where at the end we can combine them together without conflicts.

A15.) A CSS reset will force an unstyled layout to the most common elements such as html, body, h1-h6 elements. etc. in order to deal with inconsistencies between user agent stylesheets. It will remove any default styles from them.

On the other hand, CSS normalize tries to even out inconsistencies by keeping them in-sync with each other. It will not remove the defaults but it will apply rules to make them consistent.

A16.) True. Using a selector like `#app .item` would mean this module could only be used inside a #app element and we will have to clone the same copy of the styles if we want to use it elsewhere.

A17.) By adding a modifier class variation. For example:

{{< code-block html >}}
.button--orange {
  border: 2px solid red;
  background-color: orange;
}
{{< /code-block >}}

{{< code-block html >}}
<button class="button button--orange">Click me</button>
{{< /code-block >}}

A18.) The first one is too broad as it targets all h3 elements in a `.box`. The third one is a bit irrelevant as the .text-center is a utility class. The most suitable option is the second one.

A19.) KSS stands for Knyle Style Sheets. Its a methodology for documenting CSS and generating styleguides. The idea is to write documentation comments for your components and with a tool will be parsed and generate a styleguide for your project. One example is the https://primer.style/components.

A20.) `background` is a shorthand of 8 properties: `background-image`, `background-position`, `background-size`, `background-repeat`, `background-origin`, `background-clip`, `background-attachment` and `background-color`.

A21.) The `transform` property allow basic geometric transformations of your elements. For example `scale`, `rotate` or `translateX`, `translateY`.

A22.) False. We can. Using CSS blend modes. Just add 2 or more images and use the `background-blend-mode` rule to blend them based on a specific way.

A23.) Both represent the color white. With saturation and lightness at 100% they max out as white irrespective of the Hue value.

A24.) By adding or subtracting 180 from the Hue value. Complementary colors lie on the opposite side of the color wheel and it's fairly easy to calculate using HSL notation.

A25.) The `size` represents the printed size of the font. The `line- height` represents the overall height of the content between two different lines of text. The line height is a little bigger than the font-size by default (about 20% bigger)

A26.) With the `@font-face` rule we can instruct the browser to download and use custom fonts.

A27.) FOUT is when a web page tries to load custom fonts but when it will take a long time to load there is an instance where the browser default font styles appear briefly. This causes a distraction. Using the `font-display` property we can control that behaviour.

---

{{< header title="Resources for further reading" >}}

* [**A Complete Guide to Grid**](https://css-tricks.com/snippets/css/complete-guide-grid/)

* [**CSS Positioning**](https://css-tricks.com/almanac/properties/p/position/)

* [**KSS**](https://warpspire.com/kss/)

* [**font-display**](https://css-tricks.com/font-display-masses/)

* [**font-face**](https://css-tricks.com/snippets/css/using-font-face/)
