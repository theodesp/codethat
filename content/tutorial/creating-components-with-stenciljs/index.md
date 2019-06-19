---
author: "Theo"
date: 2019-06-19
title: "Creating Reusable Web Components with Stencil.js"
summary: "Learn more about the Stencil.js framework and how to create reusable components in a small Todo list app."
weight: -40
tags: [
    "javascript",
    "web-components"
]
categories: [
   "javascript",
   "development"
]
levels: "basic"
---

[From the original article](https://sweetcode.io/reusable-web-components-stencilejs/)

If you think we are going to introduce another Javascript framework, you can keep reading without worry. 
As its creators have clarified, [Stencil.js](https://stenciljs.com/) is not a framework—Instead, it’s a compiler of web components.

Web components are a essentially the future of web development. 
They are basically HTML tags that will work across modern browsers, 
and can be used with any JavaScript library or framework that works with HTML; no more React.js vs. 
Angular vs. Vue.js debates, as they are based on existing web standards, allowing developers to easily 
extend HTML with new elements, encapsulated styling and custom behavior without spending their days debugging 
volatile libraries.

In this post, we are going to create a small to-do list application using Stencil tooling and cover the basics of 
web components. This example assumes that you have a development environment ready. 
You can also find the code for this tutorial on [GitHub](https://github.com/theodesp/todolist-stencil).

Let’s start.

{{< header title="Stencil Project Starter" >}}

Stencil gives us the tools to write web components using TypeScript and JSX and compiles down to 
vanilla web components for any framework to use.

{{< steps >}}

{{<  step "1" "Let’s start by cloning the Stencil starter kit:" >}}
{{< code-block bash >}}
$ git clone https://github.com/ionic-team/stencil-starter.git todolist-stencil
{{< /code-block >}}
{{<  /step >}}

{{<  step "2" "Navigate to the new directory and install the project dependencies:" >}}
{{< code-block bash >}}
 $ cd todolist-stencil && npm install
{{< /code-block >}}
{{<  /step >}}

{{<  step "3" " Delete the app-profile and app-home folders and update the my-app component respectively, because they’re not needed for this demo." >}}
{{< code-block bash >}}
$ rm -rf src/components/app-profile && rm -rf src/components/app-home
$ cat src/components/my-app.tsx

import { Component } from '@stencil/core';
@Component({
 tag: 'my-app',
 styleUrl: 'my-app.css'
})
export class MyApp {
 render() {
   return (
     <div>
       <header>
         <h1 class="heading">Todo List with Stencil</h1>
       </header>
       <main>
         <todo-app>
       </todo-app></main>
     </div>
   );
 }
}
{{< /code-block >}}
As you can see, the component format follows a mixture between Angular and React.js structure using decorators to add 
metadata and a render method to define the HTML. We can also define a CSS file URL that can be used for scoped component styling rules.
{{<  /step >}}

{{<  step "4" "Create the todo-app folder and add the code for our example:" >}}
{{< code-block javascript >}}
import {Component, State} from '@stencil/core';
import {TodoItem} from "../../models/todoItem";

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})
export class TodoApp {
 @State() items: TodoItem[] = [];
 @State() text: string;
 
 render() {
   const handleOnChange = (e) => this.handleOnChange(e);
   const handleSubmit = (e) => this.handleSubmit(e);
   return (
     <div class="todo-app">
       <h1>TODO LIST</h1>
       <todo-list todoitems="{this.items}/">
       <todo-list-form onsubmit="{handleSubmit}" oninputchange="{handleOnChange}" todoitemslength="{this.items.length}/">
     </todo-list-form></todo-list></div>
   );
 }
 private handleSubmit(e) {
   e.preventDefault();
   if (!this.text.length) {
     return;
   }
   const newItem = new TodoItem(this.text);
   this.text = '';
   this.items = [...this.items, newItem];
 }
 private handleOnChange(e) {
   this.text = e.detail;
 }
}
{{< /code-block >}}
{{<  /step >}}

{{< /steps >}}

Here we define a new component that will render our existing list of items 
that we added, and the input form that we use to add the to-do list item. 
Note the usage of the `@State` decorator, as it’s used to assign local 
component state just like React. When we change the value of this property, 
the component render method gets called again.


Let’s see the contents of the todo-list:

{{< code-block javascript >}}
$ mkdir src/components/todo-list && touch  src/components/todo-list/todo-list.tsx
File: src/components/todo-list/todo-list.tsx

import { Component , Prop } from '@stencil/core';
import { TodoItem } from "../../models/todoItem";

@Component({
 tag: 'todo-list'
})
export class TodoList {
 @Prop() todoItems: TodoItem[];
 
 render() {
   return (
     <ul class="todo-list">
       {
         this.todoItems.map((item: TodoItem) => (
           <li>{item.text}</li>
         ))
       }
     </ul>
   );
 }
}

{{< /code-block >}}
In this component, we use the `@Prop()` decorator to receive properties from the 
parent and render them.

Now, let’s see the contents of the todo-list-form:

{{< code-block javascript >}}
import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
 
@Component({
 tag: 'todo-list-form'
})
export class TodoListForm {
 @Prop() todoItemsLength: number;
 @State() value: string = '';
 @Event() inputChange: EventEmitter;
 @Event() submit: EventEmitter;
 
 handleOnChange(e) {
   this.value = e.target.value;
   this.inputChange.emit(this.value)
 }
 handleOnSubmit(e) {
   e.preventDefault();
   this.submit.emit(this.value);
   this.value = '';
 }
 
 render() {
   const handleOnChange = (e) => this.handleOnChange(e);
   const handleOnSubmit = (e) => this.handleOnSubmit(e);
   return (
     <form class="todo-list-form" onsubmit="{handleOnSubmit}">
       <input type="text" oninput="{handleOnChange}" value="{this.value}">
       <button>
         Add #{this.todoItemsLength + 1}
       </button>
     </form>
   );
 }
}
{{< /code-block >}}

Here we show the usage of event handling using the `@Event()` decorator. 
We bind the change and the submit event and emit the contents to the parent element, which is the todo-app component.

Finally, let’s define the `TodoItem` model:

{{< code-block javascript >}}
$ mkdir src/models && touch  src/models/todo-item.ts
File: src/models/todo-item.ts
export class TodoItem {
 text: string;
 constructor(text: string) {
   this.text = text;
 }
}
{{< /code-block >}}

Now we are ready to run our application:

{{< code-block bash >}}
$ npm run dev
{{< /code-block >}}

Next, navigate to `http://localhost:3333` and interact with the page. Here is an example view:

{{< img src="images/todo-list-view.png" >}}

{{< header title="Conclusion" >}}

In this tutorial, we made a demo web application using the Stencil.js component compiler. 
There is not much difference in developing web components with Stencil as compared to React, 
so the transition overhead is small. If you are a web developer who wants standards-based components 
and ease of developing them, then you will benefit from this library. 
As for me, I have to finish my to-do list chores!


{{< header title="Useful Links" >}}

1. [**Official Website**](https://stenciljs.com/): Official website of Stencil.js
2. [**Web Components**](https://www.webcomponents.org/introduction): Short intro about web components
