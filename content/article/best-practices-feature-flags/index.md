---
author: "Theo"
date: 2019-06-16
title: "Best Practices for using Feature Flags"
summary: "What are feature flags and how they can help delivering functionality in practice."
weight: -40
draft: true
tags: [
    "best-practices"
]
categories: [
   "development",
]
---

[Read the original article](https://sweetcode.io/best-practices-using-feature-flags/)

When it comes to developing software, especially at the enterprise level, there are tons of hidden risk factors. In order to tackle this problem, software architects employ a variety of techniques and patterns to make sure that everything that a customer faces is not subject to catastrophe.

One of the techniques they use is **Feature Toggles, Feature Flags or Feature Switches**. In general terms, these are statements placed in a strategic location in the codebase that allow for the system to behave differently—without changing or deploying anything. The information is usually requested or pushed from an external API on demand, and is used to expose or hide features of the application.

Feature flags play a key part in a CI scheme where features are constantly being deployed but not necessarily “released” into production. In the remainder of this article, we are going to discuss the best ways to apply them in practice.

{{< header title="Using Feature Flags in Production">}}

In its very simple form, a feature flag is just a conditional check that switches the code based on a provided value. Here is one example:

{{< code-block go >}}
 if featureFlagService.isEnabled("PUSH-NOTIFICATIONS") {
  fmt.Println(“Push notifications are enabled”)
} else {
  fmt.Println(“Push notifications are not enabled”)
}
{{< /code-block >}}

Of course there is more to this than meets the eye. Here are the six most important things you need to consider when using feature flags:

**1. Use dependency inversion**.
One very important technique when developing software (that is useful when adding feature toggles in your app) is to apply the dependency inversion principle. Instead of arbitrarily importing the featureFlag object and using it in various places, you provide it at the constructor so it can be assigned in a private property. See an example below:

{{< code-block javascript >}}
 // featureFlagService method
launchMissileToTarget(payload) {
   if (this.featureFlagService.isEnabled(“EXPERIMENTAL_TECHNOLOGY”) {
       // guide missile with advanced targeting algorithms
    } else {
       // guide missile with common targeting algorithms
    }
}
class ImportantDecisions
  constructor(featureFlagService) {
    this.featureFlagService = featureFlagService;
  }
  launchMissileToTarget(payload) {
    // do something with payload param
    this.featureFlagService.lanuchMissileToTarget(payload);
  }
}
{{< /code-block >}}

The control over handling of the flags has been transferred from the `ImportantDecisions` class to the `featureFlagService`.This way, you can also make your code easier to test as you pass a different configuration to the caller and verify the results.

**2. Add metadata in your feature bundles.**
For each version of the software you deploy, there could be one or more features that need to be flagged on or off. Some features could be added and some others could be removed. In order to keep track of what is where, it’s important to have additional metadata related to each feature block. For example, you may need to add tags or labels to mark specific features with extra information. This is useful when you are creating or updating flags via a management dashboard where you can have overviews of different groups. When you roll out flags, you can see which tags are applied. And in case you have multiple tags, you can see for different targets whether a feature is enabled or not. This will also give fine-grained control over feature management.

**3. Make them data-driven and not knowledge-driven.**
Would it be better if you could control the flow of data instead of controlling where you should place the if and else statements in your codebase? In that case, you can make your applications more reactive to changes without actually adding or removing code sections based on the feature state. For example, you could have your clients subscribe to events based on a unique namespace and receive data while the subscription is active. One practical application is trading platforms, where the clients can receive events based on trading symbols. Then in your dashboard, you could control whether or not the symbols are subscribable with the flip of a button. If you disable some of them, then the clients would not receive updates, and thus will not show anything on the screen. If you design your applications to be more reactive to events (via data-driven switches), then the control is inverted and easier to safeguard.

**4. Use a feature flag management dashboard.**
You should not ignore the operations team in terms of providing incremental feature rollouts, or hitting the panic button when something goes wrong. Having a good, easy-to-use feature flag management dashboard will prove very helpful, especially when the application grows, and there are many stakeholders requesting features. You could start with a simple page of on-and-off checkboxes, but later on, you will have trouble if there are a lot of features with different statuses and you need to monitor them properly. So it pays to invest in developing—or grabbing from the shelf—a more sophisticated solution in order to accommodate those extra factors.

**5. Make sure when the flag changes, the whole system knows about it.**
One important implication when some features are turned on or off is that they alter the behavior of a running system in real time. In order to have better visibility and alertness, you can send notifications when feature flags are created/updated, or turned on/off. One good solution here is to use ChatOps, so interested parties can receive messages through a common medium like the company chat rooms. This ultimately can serve as a good communication pattern for cross-department teams in order to coordinate releases with each other.

**6. Clean up unused flags**
Feature flags do increase technical debt and the complexity of the application overall. They are liable for mistakes, as some flags can be left behind in the codebase and will be forgotten. It’s recommended to prefix, or better, annotate the flags for better readability and discoverability. For example, in some languages like Python, you could create an @feature decorator with an optional status parameter that can be easily searched in the workspace. This will also help with monitoring, as you can attach reporting tools for each feature usage. Later on, you can mark them as @deprecated-feature so you can inform any developers reading the code about the feature lifecycle status.

{{< header title="Frameworks to get you started">}}

There are some good frameworks to help you implement feature tags. [LaunchDarkly](https://launchdarkly.com/) is a commercial feature-flag-as-a-service framework with lots of client libraries. [Togglz](https://www.togglz.org/) is an open source feature flag framework for Java. [Rollout](https://github.com/fetlife/rollout) is also an open source feature flag framework for Ruby.

Feature flags are a good way to roll out functionality, but they are also a way to keep up with application quality when releases and new functionality are created frequently.