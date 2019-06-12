---
author: "Theo"
date: 2018-02-1T14:15:59-06:00
title: "Resource Pool Design Pattern"
summary: "Learn what a Resource Pool is by coding one."
weight: -10
tags: [
    "go",
]
categories: [
   "go",
   "data structures",
   "design patterns"
]
levels: "medium"
series: ["Advanced Design Patterns"]
series_weight: -10
---

This series is about exploring some [Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern) but not 
the ones you know from the original [Gang Of 4 Book](https://en.wikipedia.org/wiki/Design_Patterns). 
I don’t want to be rude, but the original articles have been thoroughly dissected and analyzed over the years and a 
lot of articles and opinions have been expressed on them. I don’t simply want to repeat the whole thing again and again.

As I said, I want to focus on some of the other less Popular Patterns that they are most often present in many software 
solutions as the most suitable design decision for a particular problem. Those are the patterns that also I have 
the most experience with. There are of course other useful patterns that I don’t know but I wouldn’t be able to give 
you any help other than a link to their description.

Bellow is the list of selected design patterns:

* **Lazy Loading Pattern**
* **Model-View-Controller Pattern**
* **Interceptor Pattern**
* **Publish-Subscribe Pattern**
* **Active Record Pattern**
* **Resource Pool Pattern**

Each one of them is a beast of its own so I will try to describe them is simple steps and with simple code examples.

Off we go then with the **Resource Pool Pattern**.

{{< header title="Resource Pool Pattern" >}}

>If the cost of initializing an object instance is high, rather than constructing new objects, prefer reusable objects that are retrieved from, and released to a pool as required.

The main idea behind this Pattern is that in cases that you have to use an object that it's just too expensive to create, for example, a database connection, why not having **Manager** that will handle all the dirty details for you.

Most of the times you don’t want to manage the lifetime of a database connection too explicitly as quite a lot of things may go wrong. **Ideally, you would like things ready to be used immediately**.

The Resource Pool will handle the whole process of reserving those objects in advance for a client and when they finish working with them they release them back, ready for the next client that asks the same object. The Resource Pool may go the extra mile and handle re-connections or eager disposal of the objects in order to keep the memory footprint low.

All you need to do is provide specific ways of creating and disposing of the objects that the Resource Pool require in its interface definition.

Some examples of “**expensive**” objects are:

* A TCP connection from a database for example
* An object that needs initialize some data before use.
* An object that has references to a remote connection that may close at any time.
* A block of memory.

So let’s see how we can do it in Code.

{{< header title="Implementation" >}}

In its basic form, a Resource Pool is just an object containing **2 lists**. The first list includes the objects that are available to be used immediately. The second list contains the objects that are already in-use by the clients. We need to have this list in order to keep track of what is the usage of the pool and more importantly to prevent memory leaks in cases the clients forget to return them back.

Let’s start with some definitions.

{{< code-block go >}}
type PooledObject interface {
   Reset()
}

// All pooled object factories must satisfy this interface
type PooledObjectFactory interface {
   Create() (PooledObject, error)
}

// All pool implementations must satisfy this interface
type Pool interface {
   Get() (PooledObject, error)
   Return(obj PooledObject) error
}
{{< /code-block >}}

The `PooledObject` is any object that implements the `Reset` method. This is to provide a way to reset the resource into an initial state.

The `PooledObjectFactory` is just a **Factory** object that it will be used by the Pool to create new PooledObjects.

The Pool must implement only 2 methods `Get` and `Return`.

So let's try to satisfy those interface definitions first with the Pool implementation.

For this example we would like to create a **Fixed size Pool** that permits up to a certain number of Objects specified by a `capacity` variable

{{< code-block go >}}
/**
 * Fixed size Object pool
 */
type FixedPool struct {
   // List of available objects to share
   available []PooledObject
   // List of in-use objects that are currently reserved
   inUse []PooledObject
   // Maximum size permitted
   capacity int
   // For protecting updates
   mu *sync.Mutex
   // For creating the Objects
   factory PooledObjectFactory
}
{{< /code-block >}}

Here we define the 2 PooledObject lists, the **capacity** and the PooledObjectFactory.

Now when what needs to do when we request an Object from the Pool is check if the **available** list is empty or not. If it’s empty just use the factory to create a new Object and push it to the **inUse** list, making sure we do not exceed the capacity. If it’s not empty, we just return the first available from the list.

{{< code-block go >}}
func (p *FixedPool) Get() (PooledObject, error) {
   p.mu.Lock()

   var obj PooledObject
   var err error

   if len(p.available) == 0 {
      // Make sure we don't exceed capacity
      if len(p.inUse) == p.capacity {
         err = errors.New("fixed Pool reached maximum capacity")
      } else {
         obj, _ = p.factory.Create()
         p.inUse = append(p.inUse, obj)
      }
   } else {
      // pop
      obj, p.available = p.available[0], p.available[1:]
      err = nil
      p.inUse = append(p.inUse, obj)
   }

   p.mu.Unlock()

   return obj, err
}
{{< /code-block >}}

For the `Return` method, we do the opposite. We call the `Reset` method so the resource is properly returned to an initial state and then we try to find the object reference in the inUse list. If it’s found we just remove it from there and push it to the available list, ready for the next client. In case we haven’t found the object we return an error as we couldn’t determine where this object was originated from.

{{< code-block go >}}
func (p *FixedPool) Return(obj PooledObject) error {
   obj.Reset()

   p.mu.Lock()
   if idx := findIndex(obj, p.inUse); idx != -1 {
      // Delete at index
      p.inUse = append(p.inUse[:idx], p.inUse[idx+1:]...)
      p.available = append(p.available, obj)
      err = nil
   } else {
      err = errors.New("unrecognized pooled object returned")
   }
   p.mu.Unlock()

   return err
}

func findIndex(target PooledObject, slice []PooledObject) int {
   for idx, obj := range slice {
      if target == obj {
         return idx
      }
   }

   return -1
}
{{< /code-block >}}

As you can see from this simple example it’s not difficult to expand on this pool and add extra features, 
like pool stats, timeouts or removing the capacity restriction. It’s up to you to extend it.

You can find example usage of this pattern in my repo here:

[**theodesp/go-object-pool**](https://github.com/theodesp/go-object-pool)

	
{{< header title="Caveats" >}}

Resource pools are not without issues. It is very **important** that the objects should be released by the client when 
it no longer is using them. There are plenty of examples when the client ”**forget**” to release all the resources, — 
that would introduce memory leaks or degraded performance issues. For really short lived objects you may find that there 
is too much overhead on creating many objects in advance so the Resource pool needs to be configured to have the right 
size or to have a creation policy.

{{< header title="Conclusion" >}}

Resource pools are a nice thing to have as they provide a good platform of reusable objects that can be reserved in 
advance, thus it can help with the performance of the application when used correctly. 
I hope you understood their usefulness and their long-term benefits.

{{< header title="Exercises" >}}

* Provide a way that we can properly close the resource pool. Thus we need to add an additional interface method to the 
PooledObject called `Close` so that the resource is closed. For example, you could use this to close an individual Database Connection.

* Provide a new method called `TimedGet(d time.Duration)` that will try to Get an object within the provided duration.
If this time limit is exceeded then return an error. This method should block the client calling it during the timeout.

{{< header title="References" >}}

You can find more information about Resource pools on the following sites:

* [**Wiki Article**](https://en.wikipedia.org/wiki/Object_pool_pattern): A nice overview of the Object Pool pattern
* [**Source Making Article**](https://sourcemaking.com/design_patterns/object_pool): Section on Resource Pool
* [**OODesign Article**](http://www.oodesign.com/object-pool-pattern.html): Traditional Site about OO Design Principles

**Coming up is the Lazy Loading Pattern.**
