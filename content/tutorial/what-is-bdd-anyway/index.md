---
author: "Theo"
date: 2017-07-07T14:15:59-06:00
title: "What is BDD anyway?"
summary: "Understand what BDD is, how is it used and how it helps with communication. Practice BDD on a real world example that you can showcase on your CV."
weight: 30
tags: [
    "BDD",
    "TDD",
    "javascript"
]
categories: [
   "javascript",
   "development",
]
levels: "basic"
---

In the modern Software Development world, we have various stakeholders each with its own interest. 
In general, we can divide the stakeholders into 2 groups. 
The first group is the **Internal stakeholders** which include business owners, managers, and employees. 
Their main interest is to drive the company to success as they are directly involved in the running of the organization.

The other group is the **External stakeholders**. They are entities not within a business itself but who care about or 
are affected by its performance (e.g., clients, investors, suppliers, etc).

Now each individual group has its own vocabulary that they use in their everyday operations. 
Often there is a confusion of what actually needs to be done in order to keep all the stakeholders happy with each other.

For the business owners, the business needs being truly able to define the desired outcomes in terms of ROI. 
The employees especially the developers need to have a deep understanding of what needs to be built in order to fulfill the business needs and the users need to use the features in order to satisfy their needs.

In order to have a formal and verifiable way of checking that the business needs align with the actual application features, 
the Software Engineers, QA analysts and Engineering/Product Managers work together and create **User stories**.

A **user story** is a very high-level definition of a requirement, containing just enough information so that the 
developers can produce a reasonable estimate of the effort to implement it and test it.*

This article will focus on the **testing** side of the user story. The purpose of testing is to ensure that the system 
that is built is working as expected. The main drive of this is the mere reality that software bugs are all over the 
place and due to the fact that fixing a bug that was not tested and found in production is almost 
[10x more costly](http://blog.celerity.com/the-true-cost-of-a-software-bug) compared to when it was found and fixed in development.

**How we test software you say?** Well, there are various approaches to testing. Let's describe some of them.

There is the *test-last approach* where you write code first and then you write tests to verify that. 
You might have been writing code like that until now.

There is the *test-first approach* where you write tests first and then drive your code by making 
the tests pass. One application of this is **Test Driven Development or TDD**.

Of course, some would write *no tests at all* and rely only on QA testing.

Out of those ways to test we are interested in TDD. The primary disadvantages of writing code driven by tests are:

* When to test?
* What to test?
* How to know if a specification is met?
* Does the code deliver business value?

![what the customer wanter](images/customer-wanted.jpg)

Overcoming those disadvantages is why **BDD** was [born](https://dannorth.net/introducing-bdd/). 
But what exactly is BDD? Bear with me and we will find out by looking into some facts.

{{< header title="What are the Facts" >}}

> Behavior driven development has nothing to do with testing.

[Behavior-driven development, and it has nothing to do with testing](https://www.thoughtworks.com/insights/blog/3-misconceptions-about-bdd). 
Testing is something you can’t do until the software exists. We write tests to verify that our assumptions work as expected. 
On the other hand, BDD is an approach or a different process to develop systems that are focused on delivering what the 
business actually needs while adhering to user requirements.

> BDD helps communication within the team.

By providing a readable and understandable vocabulary BDD helps bridge the communication gap between clients, 
developers and other stakeholders. A shared language ensures everyone (technical or not) has enough understanding of 
the status of the project. This creates a collaborative environment that helps business and technical teams to create software with business value.

> BDD is easy to start with.

BDD utilizes a small DSL called [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) which is so easy and 
readable that even the users can use it to add features or requests. You can even add them to 
their [own language](https://github.com/cucumber/cucumber/wiki/Spoken-languages).

Here is an example of a *.feature* file. We are using Cucumber in that case

{{< code-block cucumber >}}
Feature: Serve coffee
  Coffee should not be served until paid for
  Coffee should not be served until the button has been pressed
  If there is no coffee left then money should be refunded
Scenario: Buy last coffee
  Given there are 1 coffees left in the machine
  And I have deposited 1$
  When I press the coffee button
  Then I should be served a coffee
{{< /code-block >}}

Here is another one with multiple input values to test:

{{< code-block cucumber >}}
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers
  Examples:
    | start | eat | left |
    |  12   |  5  |  7   |
    |  20   |  5  |  15  |
{{< /code-block >}}

Instead of referring to “tests”, in BDD will use the terms “scenario” and “specification”.

In general BDD specifications answer the following questions:
* Where to start in the process
* What to test and what not to test
* How much to test in one go
* What to call the tests
* How to understand why a test fails

This type of DSL is very readable and portable and can be added as part of the development process in the user story tickets. That builds a documentation artifact that is accessible to all internal stakeholders which they can contribute.

{{< header title="Practice" >}}

Ok, I have a really good practice for you. In this section, you are going to understand how to build a real-world application in Javascript using BDD with Cucumber.

The project is similar to [this](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ftbranyen%2Fgithub-viewer) although you can use any framework you like. You are asked to build a simple GitHub viewer. Here is the main user story:

{{< code-block cucumber >}}
As a User I would like to have a Web application that connects to GitHub
Rest API and displays users from organizations. 
I need to be able to search for users and when I clicked on the user 
results I need to be able retrieve their repositories. 
Finally, I need to be able to click a repository so that
all the commits are displayed in order. 
If the project has many commits I would like
the results to be paginated by 50 or 100 commits.
{{< /code-block >}}

This could come from a friend or a customer so it’s important to analyze in detail what are the requirements of the application and what are the main features we need to develop.
So first things first you need to do those tasks:

1. Read carefully the User story. Try to make note some keywords that map to actions. For example, **connects** means accessing or requesting the GitHub API using HTTP.

2. Out of the actions, you noted down to write some simple scenarios for each one. For example:

{{< code-block cucumber >}}
Scenario: Search for user that exists
  Given I have visited the main page
  And I have focused on the search input
  When I enter a name of a user that exists
  And I press enter
  Then I should be able to retrieve the users repositories
{{< /code-block >}}

3. Try to think of edge cases or what can go wrong in your requests or responses. Write down those scenarios also.

4. Create a Project on GitHub and install the required libraries. 
If you don’t want to w8 you can clone/fork [this repo here](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ftheodesp%2Fbdd-javascript.git). Add the scenarios you’ve written down as tickets using the built-in [issue management](https://guides.github.com/features/issues/).

5. For each issue/task, you’ve raised write aÂ [.feature file](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fcucumber%2Fcucumber%2Fwiki%2FFeature-Introduction) and put it into the features folder. Make sure the file has a relevant name.

6. Run your tests with Cucumber. They will all fail of course as you need to start implementing them!

7. For each failing test implement the feature requirements. 
If at any point you think you missed something you can add more scenarios then. Repeat until you finish all the scenarios.

8. While you are working on the tickets don’t forget to update the issue tracker.

9. **Extra Points**: A tool that can help you with running tests is a Continuous Integration Tool or CI. 
What is a CI you say? That’s a topic for another article. I suggest you add [Travis](https://travis-ci.org/) as its free and easy to use. The CI will run your tests after each commit and point you for errors.

10. **FINISHED**: Congratulations. I hope you liked testing with BDD and understood a lot of it. 
Don’t forget to showcase your app to the world, add it to your LinkedIn Projects and also mention your [awesome mentor](https://theodespoudis.com/).

Some links to help you for this task are:

* [GitHub Developers API](https://medium.com/r/?url=https%3A%2F%2Fdeveloper.github.com%2F): For interfacing with GitHub API
* [Cucumber.js](https://github.com/cucumber/cucumber-js): BDD tool
* [Waffle Project Management](https://waffle.io/): Project management tool Alternative to Git Issues.
* [Mocha-Gherkin](https://github.com/mklabs/mocha-gherkin): If you want to use mocha and gherkin.

{{< header title="Summing up" >}}

To sum up, the main idea behind BDD is that it’s driven to prevent communication gaps, that is having everyone in the team communicating more often, better and based on real world examples and not on abstract and imperative requirements. Thus we all end up with meaningful tests that are portable, easy to read and easy to verify.

{{< header title="References" >}}

* [3 misconceptions about bdd](https://www.thoughtworks.com/insights/blog/3-misconceptions-about-bdd)
* [bdd guide](https://inviqa.com/blog/bdd-guide)
* [behavior driven development](https://www.tutorialspoint.com/behavior_driven_development/index.htm)

**Happy coding.**
