---
author: "Theo"
date: 2017-09-11T14:15:59-06:00
title: "How Machine Learning and AI could eventually replace development work"
summary: "The future of development in terms of the Machine learning advances in not so bad"
weight: 40
tags: [
    "AI",
    "Machine learning",
]
categories: [
   "development",
]
---

Recently I’ve been seeing more articles regarding the status of Artificial Intelligence and Machine Learning. Some doomsday prophecies like [the end of code](https://www.wired.com/2016/05/the-end-of-code/) others say that it will make [humans dependant on AI assistants](http://uk.businessinsider.com/google-on-machine-learning-2015-10?r=US&IR=T). 

While I agree with most of the opinions expressed about those topics, I feel that the future will not be just a total dependence or replacement of the human factor in those areas. 

> It will be a transformation phase for sure that will span over the years to come.
 
There will be more and more practical applications of AI and ML that will help replace the dangerous and reckless human factor, for example, [driving vehicles](https://www.wired.com/2015/05/oh-look-evidence-humans-shouldnt-driving/) or [aircrafts](http://nypost.com/2016/10/18/pilots-could-soon-lose-their-jobs-to-robots/). For sure humans will only be observers, only having their minds clear to check if anything will go wrong so they can jump in and correct.

**This is a natural transition as we humans are crafters**. We are used to creating tools to help us perform jobs bigger than ourselves. We started in the ancient times with axes, picks, iron forging, machines, automation tools to make us stronger. Now we are just trying to create something smarter (in theory) from us. It’s unavoidable.

Those tools though however sophisticated though have some limitations and those limitations are expressed in terms of our own limitations of thinking. 

Unless for example, we prove that we can construct a program that is free of all bugs then our tools can only go so far. [See relevant link](http://wiki.c2.com/?ProofsCantProveTheAbsenceOfBugs).

> This is fundamental. If we can construct such a proof then we can train machines to create 100% bug free programs thus making SW Engineers redundant.

How can you prove that with 100% confidence? It turns out that it's impossible within the time limits.

> However, it’s certainly possible to prove the absence many common classes of bugs. Or the code does look sound and has good design characteristics. It doesn’t do anything that will compromise rules within a restricted set of variables.

So with that fact, we can be almost sure that our programs do work as intended maybe 99.99% correct which means that we will still need a human factor to account for the last 0.01%, just make sure that there is no apparent risk.

Thus for the current situation, we might brainstorm the various possible transformations that ML and AI could do to replace certain development work in the near future.

In the rest of the article I will propose some potential transformations.

{{< header title="Transformation 1: Automating Code reviews and Code Checking" >}}

![goku](images/tran-1.jpg)

> ML and AI assistants will perform automated code reviews the moment we push code to repositories. They will comment out unusual code blocks and perform vulnerability and static code analysis. They will correct those issues and do a PR again for review.

Those bot assistants will become more intelligent and they will perform automated code reviews and comment the code in case it makes no sense based on the training data from similar code or codebases. They will perform correcting fixes and push back the changes for PR. A human will only be needed as a second pair of eyes and to do the merge.

{{< header title="Transformation 2: Declarative programming model" >}}

![super goku](images/tran-2.png)

> Instead of writing imperative code we will use a more declarative model for many parts of the system. It such case we will be writing code using a natural language style. We will declare our functional and non functional requirements and our technical requirements and the ML assistant will train models to produce code that abides to those constraints.

More and more blocks of functionality can be moved into this model. For example, http servers, CLI applications, UI applications have a lot of boilerplate. This can be used as a model for training ML assistants to produce code that matches a declaration file. Thus it will be easier to spin up applications without even touching the keyboard.

**You will speak what your application does and it will just be written by itself for you**.

{{< header title="Transformation 3: Automatic Deployment, Orchestration, Configuration, Disaster Recovery and Testing" >}}

![super saya](images/tran-3.jpg)

> Applications will be able to deploy themselves automatically, write test cases in case of an error automatically and push the test cases to the repositories. They will have smart self detection capabilities and join orchestration platforms. In case that the configuration needs to be adjusted the ML assistants can perform those corrections on the fly. In case of disaster they will perform self patching and self healing based on the desired state.

In that case, humans will only play a really small part on this, by the moment you deploy the app. AI and ML assistants will have their own continuous delivery pipelines and they will perform intelligent and autonomous deployments and configuration management in the most efficient manner. 

In case of disaster, they will perform all necessary operations to restore service. Patch systems, offload traffic, rollback etc.

In the future, everything will be deployed as [containers](https://en.wikipedia.org/wiki/Linux_containers) in a more [decentralized](https://en.wikipedia.org/wiki/Decentralization) cloud space. They will be private and public examples of course but it will be more ubiquitous and frictionless.

{{< header title="Transformation 4: Entire Software Development Lifecycle will be only a High-Level Description" >}}

![Over 9000](images/tran-4.jpg)

> From the initial concept to the end product together with the whole lifecycle: product launch running, maintenance product enhancements and product decommission will be declared and controlled in a single file.

In that phase, humans will only be observers both in terms of development and in terms of permissions. They will only express ideas and the rest will be handled by the ML assistants. They will be able to test ideas in terms of factors they add in the project declaration file and possibly some constraints in terms of recourses available. The ML and AI assistants will be able to figure out the rest. 

**Thus the role of the developer will be mostly associated with improving the algorithm to produce the most cost efficient and profitable results.**

The new era of programming will be focused on producing software models that are competing for each other in terms of intelligent solutions and implementations. 

> Everything related to programming will be a smart solution that will enable humanity reduce risk to their everyday life to 99.99% while maximising happiness and longevity to 99.99%.

**The current traditional way of programming will be obsolete, as it will outperform any human made solutions.**

> Everyone will have assistants powered by AI and ML software that will help us turn ideas to real world applications on the fly.

> That will boost entrepreneurship and innovation to the roof. People will be talking about best ways to train algorithmic models to take us to the nearest Earth-like planet or finding a solution to a sustainable environment that will make our lives happier.

Of course, there has to be some sort of control because humans also have the tendency to self-destroy and take advantage of each other. Maybe though we will have assistants that will prevent us from doing harm! Who knows!

{{< header title="Verdict" >}}

Are you ready for the future? It's exciting! 

I reference some links to get started:

1. [Awesome Machine Learning](https://github.com/josephmisiti/awesome-machine-learning)

2. [Awesome Artificial Intelligence](https://github.com/owainlewis/awesome-artificial-intelligence)

3. [Azure Machine Learning](https://azure.microsoft.com/en-us/services/machine-learning/)

4. [Udacity Nanodegree](https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009)

Happy coding.
