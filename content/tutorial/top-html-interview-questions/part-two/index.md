---
author: "Theo"
date: 2019-08-24
title: "Top HTML Interview Questions with detailed answers 🌺🌴😃🤽🏨🏖️ Part II"
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

This is part 2 of the Top HTML Interview Questions. Today we review some interesting topics like canvas, location API, FileReader API and more.

Let's start 💫

### What is the purpose of the `beforeunload` event?

The `beforeunload` files just before the user tries to navigate to another page or close the window. It is used to perform some final checks or to prompt the user for some side effects that will happen if the user does that.

### What is the `location.hash` value in the following page:

`http://www.example.com/index.html#part1`

The `location.hash` returns the anchor part of a URL. So in that case it will return `#part1`


### Which event triggers when the `location.hash` changes?

The `hashchange` event triggers when fragment identifier of the URL has changed.

### What will happen if the browser executes the following command for the first time?

`navigator.geolocation.getCurrentPosition(function(pos) {})`

The first time it will will request the user’s permission to enable  querying the current position of the device.

### How can we use the FileReader object to read the contents of a file?

We need to have an `input type=file` where the user selects one or more files from the file system or from a drag and drop zone. Then we need to have a handler for the `onchange` event that will pass the list of File objects. Then to read the contents we need to use:

{{< code-block javascript >}}
const reader = new FileReader();
reader.onload = function(e) {
// e.target.result will contain the image data
}
reader.readAsDataURL(file);
{{< /code-block >}}

### We initiate a drag event by dragging some files from our desktop to a designated area. How can we access those files inside the the `drop` event handler?

If the user is dragging files, these will reside in the events `dataTransfer` object for example: `e.dataTransfer.files`;

### What is the difference between Server-sent events (SSE) and Websockets?

With Websockets, the server and the browser establish a bidirectional communication (send and receive). With SSE only the server can push data to the browser and not vice versa.

### How can we get the context for a 2d Canvas?

We need to invoke the Canvas getContext API:

`let ctx = canvas.getContext('2d');`

### Does the `<canvas>` element adhere to the Box Model?

No. `<canvas>` does not use CSS box model. If you draw something on canvas it may overflow the container.

### What happens when you zoom in an SVG image and a JPG image?

The JPG will pixelate and it will look blurry. The SVG will maintain its sharpness and quality.

### How can we directly manipulate the Mouse Pointer inside a `<canvas>` element?

By using the Pointer Lock API we can show/hide the pointer, lock it in one place or control it's movement.

### We want to display a loader when a `<video>` element is loading the first frames to stream it. How can we find that information?

As the `<video>` element is a `HTMLMediaElement` we can use the `networkState` or the `readyState` properties to retrieve information about the state of the video element.

### What is the purpose of the multiple `<source>` children elements in a `<video>` element?

For each `<source>` element we specifies a video, so that the browser tries each one in turn and uses the first video format it can support.

### What is the difference between those two script tags?:

{{< code-block javascript >}}
<script src="app.js" defer></script>
<script src="app.js" async></script>
{{< /code-block >}}

The `defer` specifies that the script is executed when the page has finished parsing. On the other hand the `async` specifies that the script is executed asynchronously with the rest of the page, for example when it loads it will be executed immediately.


{{< header title="Resources for further reading">}}

* [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)
* [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
