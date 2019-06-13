---
author: "Theo"
date: 2019-02-02
title: "Vue Performance Optimizations"
summary: "Practical Tips and tricks on how to optimize Vue applications"
weight: 40
tags: [
    "vue",
    "performance",
]
categories: [
   "development",
   "javascript"
]
---

[**Read the original article**](https://sweetcode.io/vue-performance-optimization/)

So you’re developing an app with Vue, and you want to make sure it performs well. Good for you — 
Performance optimization is a key consideration for any kind of programming (or it should be, at least).

On the other hand, if you take the wrong approach to performance optimization by trying to optimize your code at the 
wrong stage of development, or focusing on the wrong optimization strategies, you could end up shooting yourself in the foot. 
That’s the risk that Donald Knuth had in mind when he [famously said](https://en.wikiquote.org/wiki/Donald_Knuth) that 
“premature optimization is the root of all evil.”

When approached with the right mindset, performance optimization doesn’t have to be a drag. In this article, I highlight 
several effective strategies that you can use to optimize Vue apps without getting your feet stuck in the mud by worrying 
about the wrong things.

In order to ground this discussion of Vue performance optimization and limit its scope, we’ll focus specifically on 
optimization tools and strategies for single-page Vue apps.

{{< header title="Vue performance optimization tools" >}}

Before we explore some strategies related to Vue performance optimization, 
we need to enable some special tools that measure performance metrics and give important information about possible 
unoptimized paths. We enable those tools in the beginning of our experiments to gauge the first or baseline performance 
score of our apps. Then, for later runs, we run them again to see if there are any sufficient improvements. 
We do that to make a record of the changes and compare the differences.

Currently, there are two important tools that we can use to measure the performance characteristics of our Web applications:

* **Lighthouse**: an auditing tool that comes bundled in Chrome and as a CI tool. 
It consists of a series of tests and steps that assess application performance. 
To run it in Chrome, just navigate to Developer `Tools-> Audits` and click on the Run audits button at the bottom. 
It will produce a report with a score. For example, here is a report after a brand-new Vue.js project was created 
from the vue-cli tool:

{{< img src="images/Lighthouse-1.png" >}}

All the important performance metrics together with their documentation are shown in the first section for reference.

* **Vue-perf-devtool:** a browser extension for inspecting the performance of Vue components. 
It uses the [Window.performance API](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance), which is the recommended way to measure latency-related performance information — It provides sub-millisecond resolution. Just install the extension and enable it via the Vue config.

{{< code-block javascript >}}
//before `new Vue`
Vue.config.devtools = true
Vue.config.performance = true
{{< /code-block >}}

If you open the developer tools panel and navigate to the Vue performance tab, you will see the following report:

{{< img src="images/page-1.png" alt="vue performance tab" >}}

You can use the metrics to pinpoint delays or bottlenecks that occur in your Vue component lifecycle.

{{< header title="Vue performance strategies" >}}

There are several ways we can improve the performance of Vue applications. Some of the techniques do not require 
changing anything real in our code — only to revisit some key points of our application build and runtime phases. 
As a general suggestion, we should always take any performance strategies with a pinch of salt and always verify the 
outcomes based on the audit reports.

1. **Choosing the right Vue build**: First and foremost, we need to understand the different builds that Vue comes with. 
The combined table is depicted below, taken from the official Vue Documentation:

{{< img src="images/vue-builds.png" alt="vue builds" >}}

It makes sense to use the runtime-only build option, as it’s about 30% lighter, meaning loading and parsing is faster 
than the full build. This will improve the [Time-to-Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) metric in your Lighthouse metrics. 
If you use a modern bundling tool like Webpack, by default, it uses the runtime build, as all the templates are 
precompiled during the build phase to render functions. If you don’t use a build system, it is recommended to 
convert any string templates to render functions via a plugin like [babel-plugin-transform-vue-template](https://github.com/egoist/babel-plugin-transform-vue-template) to avoid the 
cost of loading the compiler.

2. **Splitting bundles and lazy loading**: Subsequently, if you optimize the size of your application code, 
then you can further improve the Time-to-Interactive score of your audit report. 
If you are using a modern toolbox like vue-cli and Webpack 4, you can leverage some advanced optimization 
techniques enforced during runtime, such as dynamic imports. Instead of loading all the components beforehand, 
you load what is now requested in the page and delay the rest of the components until they are actually needed.
For example, below is the request log for our app without dynamic imports:

{{< img src="images/dev-tools.png" alt="dev tools" >}}

The app.js contains the client-side code for all components — even that which is not visible on the screen.

When we enable dynamic imports, we only have to reformat our import code to look like this:

{{< code-block javascript >}}
// before
import Home from './views/Home.vue'
import About from './views/About.vue'
// after
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
{{< /code-block >}}

Then, the request payload will look like this:

{{< img src="images/dev-tools-2.png" alt="dev tools" >}}

For every dynamic import statement we declare, Webpack will create a new chunk with that name and load it on demand. 
If we were to switch routes and load another page, the components would load only for that route. 
In practice, when we have a lot of routes, this saves a lot of transmission bytes over the network. (It’s worth a look.)

Below is the same Lighthouse report after using dynamic imports — We gained 7 points in the performance tab!

{{< img src="images/Lighthouse-2.png" alt="lighthouse report" >}}

3. **Prerendering and SSR**: We can earn another quick win by using a technique that renders some templates to HTML 
that is ready to use when the application loads. Depending on the stage this process happens in, we can differentiate 
between client-side and server-side. Prerendering happens on the client side during building of the assets. 
When a request happens, a basic HTML file renders quickly, and the rest of the content is rendered when the JavaScript 
loads. Depending on the initial size of the base HTML, it can improve the First-Content-Paint metric. SSR, on the other 
hand, works in the server, as the backend will render an initial template and then let the client side handle the rest. 
Of course, there has to be a compatible server implementation of the Vue template system for this to work, and it’s a bit 
trickier to optimize. However, it has some advantages.

To enable prerendering in your Vue.js app (for example), you need to install the [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin) and add it to 
vue.config.js specifying the paths you want to prerender as HTML.

{{< code-block javascript >}}
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
module.exports = {
 configureWebpack: {
   devtool: 'source-map',
   plugins: [
   new PrerenderSPAPlugin({
     staticDir: path.join(__dirname, 'dist'),
     routes: [
       '/',
       '/about',
       '/contact',
     ],
   }),
 ],
 }
}
{{< /code-block >}}

This, for example, will create the following assets containing basic HTML that will load the rest of the resources:

{{< img src="images/assets.png" alt="assets" >}}

4. **Rendering large lists using virtual scrolling**. Whether we are using React, Vue, Angular or plain JavaScript, 
rendering big lists at once can hamper our applications enough to make them unresponsive. 
This is because the fundamental diffing algorithms that all those frameworks use work based on some assumptions. 
If we fail to meet those assumptions, then performance will degrade substantially. 
In these cases, we can be more efficient by making sure we render only the visible items on the screen, 
and recycle the old ones. For example, instead of rendering 1,000 items, we render only the first 20 visible ones. 
As the user scrolls, we replace the old items that are not yet visible. For example, this is what the [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 
library does effectively (as you can see in the demo below):

{{< gif-player src="images/virtual-scroll.gif" alt="virtual scroll video" >}}

The advantage of this approach is that there are no wasted cycles on re-rendering when users interact with the list.

5. **Disabling reactivity**: The Vue.js reactivity system is great, but in cases when you don’t want your properties to 
be watched for changes, or those properties never change, it’s best if you opt out from that feature. Currently, 
there are two ways we can do that:

    * Assign properties in the `beforeCreate` lifecycle hook, as they will be considered static.
    * Use `Object.freeze` to essentially make the objects immutable. For example:
{{< code-block javascript >}}
data: function () {
      return {
        items: Object.freeze(messagesService.getMessages())
      }
    },
{{< /code-block >}}

If you want to enable it again, you have to remove that modifier.

One last thing to mention is the importance of YAGNI (or You Ain’t Gonna Need It). 
It’s very easy to also go overboard and apply every technique you find in the wild. 
Sometimes the best advice is to simplify your code, pinpoint any inefficiencies in the code, and offer a better 
alternative. Above all, you need to keep the codebase consistent, readable, and easy to change, allowing only absolutely 
necessary tweaks and refinements.

{{< header title="Final thoughts" >}}

Having an interactive Vue.js application that behaves like a well-oiled machine is a good thing. 
After all, you will have to deliver Web applications that are faster to load, faster to run, 
and have no obvious bottlenecks. This transition will not happen in one night. 
By taking small incremental steps that improve the overall interaction performance of your applications, 
you can enable a better experience for your end-users that will deliver real value.
