---
author: "Theo"
date: 2017-12-12T14:15:59-06:00
title: "Let's Implement a Bloom Filter in Go"
summary: "Learn more about Bloom filters by implementing one"
weight: 30
tags: [
    "go",
    "development",
]
categories: [
   "go",
   "development",
   "data structures"
]
levels: "basic"
---

Today I decided to play with some data structures and I was wondering what should I learn next. 
I remember some time ago while I was reading some articles 
about [Cassandra internals](https://www.google.ie/search?ei=X_U0WsGpIuzfgAaBsqPoCQ&q=cassandra+bloom+filter&oq=Cassandra+blool&gs_l=psy-ab.1.0.0i13k1l10.5647.6751.0.8083.8.7.1.0.0.0.80.468.7.7.0....0...1c.1.64.psy-ab..0.8.478...0j0i67k1j0i20i263k1.0.w0BJKKaKl0A) that it used bloom filters to check if the particular SSTables are likely to have the request partition data. I thought it might be cool to implement one and share my thought process with you. I will try to explain things as simple as possible.

{{< header title="Enter the Bloom" >}}

So what is a Bloom Filter? A detailed explanation is beyond the scope of this article but here’s a summary 
from Wikipedia:

> Bloom Filter: A space-efficient probabilistic data structure that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not; i.e. a query returns either “possibly in set” or “definitely not in set”. Elements can be added to the set, but not removed.
Bloom filters are used in many cases like Cache filtering to prevent “one-hit-wonders” from being stored in its disk caches or in blogs to avoid recommending articles a user has previously read like Medium does.

So let’s try to implement one to see what we can learn.

{{< header title="Enter the Code" >}}

We need a few thing before we can start. As bloom filters are only expanding and we cannot remove items 
from them reliably, let’s define the simplest abstract interface we need to provide.

{{< code-block go >}}
type Interface interface { 
  Add(item []byte)     // Adds the item into the Set 
  Test(item []byte) bool  // Check if items is maybe in the Set
}
{{< /code-block >}}

Based on that let’s define and add the initial constructor, as we need to create one filter before we can use it:

{{< code-block go >}}
// BloomFilter probabilistic data structure definition
type BloomFilter struct { 
  bitset []bool      // The bloom-filter bitset 
  k      uint         // Number of hash values 
  n      uint         // Number of elements in the filter 
  m      uint         // Size of the bloom filter bitset 
  hashFuncs[]hash.Hash64           // The hash functions
}

// Returns a new BloomFilter object,
func New(size) *BloomFilter { 
  return &BloomFilter{  
    bitset: make([]bool, size),  
    k: 3,  // we have 3 hash functions for now
    m: size,  
    n: uint(0),  
    hashfns:[]hash.Hash64{murmur3.New64(),fnv.New64(),fnv.New64a()}, 
  }
}
{{< /code-block >}}

I’ve used 3 different hash functions here which will produce 3 different values for simplicity on each item. 
I’ve used a boolean slice to store the flags.

Now let’s try to implement the interface definitions.

**Adding Items to the Set**: When Adding an item we simply pass it through the hash functions and store the results in an array. Those numbers are the positions that we need to set in the boolean array to mark them as occupied. As the hash positions might be big numbers we mod the positions with the size of the bit-set to prevent index errors.

{{< code-block go >}}
// Adds the item into the bloom filter set by hashing in over the . // hash functions
func (bf *BloomFilter) Add(item []byte) { 
  hashes := bf.hashValues(item) 
  i := uint(0)

  for {  
    if i >= bf.k {   
      break  
    }

    position := uint(hashes[i]) % bf.m  
    bf.bitset[uint(position)] = true

    i+= 1 
  }

  bf.n += 1
}

// Calculates all the hash values by applying in the item over the // hash functions
func (bf *BloomFilter) hashValues(item []byte) []uint64  { 
  var result []uint64
 
  for _, hashFunc := range bf.hashfns {  
    hashFunc.Write(item)  
    result = append(result, hashFunc.Sum64())  
    hashFunc.Reset() 
  }

  return result
}
{{< /code-block >}}

As you can see we only generate the values and set their values as positions into the bit-set.

**Checking if an item is possibly in the Set**: To check if the item is possibly in the set we do the same thing as the Add method but now we check if the hash position is flagged as true in the bit-set. If all positions are been set then we say the item possibly exists. If one of the positions has not been set then we say it definitely does not exist.

{{< code-block go >}}
// Test if the item into the bloom filter is set by hashing in over // the hash functions
func (bf *BloomFilter) Test(item []byte) (exists bool) { 
  hashes := bf.hashValues(item) 
  i := uint(0) 
  exists = true  
  
  for {  
    if i >= bf.k {   
      break  
    }   
 
    position := uint(hashes[i]) % bf.m
    if !bf.bitset[uint(position)] {   
      exists = false   
      break  
    }

    i+= 1 
  }

  return
}
{{< /code-block >}}

{{< header title="Let's write some tests" >}}

We check some values if they exist in the set or not.

{{< code-block go >}}
// Test items if items may exist into the set
func (s *MySuite) TestIfMayExist(c *C)  { 
  bf := New(1024)  
  bf.Add([]byte("hello")) 
  bf.Add([]byte("world")) 
  bf.Add([]byte("sir")) 
  bf.Add([]byte("madam")) 
  bf.Add([]byte("io"))

  c.Assert(bf.Test([]byte("hello")), Equals, true)
  c.Assert(bf.Test([]byte("world")), Equals, true)
  c.Assert(bf.Test([]byte("hi")), Equals, false)
}
{{< /code-block >}}

Testing for existence may give you false Positive when the item is on the set but in reality, it's not. 
That depends on many factors like the size of the bit-set the size of the elements in the set and the quality 
of the hash functions.

{{< header title="Conclusion" >}}

As you can see, implementing bloom filters are not a difficult thing. 
You only need to divide the problem into small pieces and work on them one by one. In that case, 
we started with the abstract representation of the Data Structure and implemented the methods using simple 
conventions. I hope you’ve enjoyed the endeavor and you learned something.

{{< header title="Exercises" >}}

Bloom filter has some mathematical properties for calculating the optimal number of elements such 
as the error rate is within a specific percentage. 
For example from [https://brilliant.org/wiki/bloom-filter/#false-positives-analysis](https://brilliant.org/wiki/bloom-filter/#false-positives-analysis) the best value for k is:

{{< code-block "" >}}
k = ln(2) * m / n
{{< /code-block >}}

Modify the original constructor of the BloomFilter such as it accepts a parameter `e` that will try to 
calculate the optimal `k` such as the invariant holds.

{{< header title="References" >}}

You can find more information about bloom filters in the following sites:

[**Wiki Article**](https://en.wikipedia.org/wiki/Bloom_filter): A nice overview of the bloom filter
[**Original Paper**](http://dmod.eu/deca/ft_gateway.cfm.pdf): The original paper describing Bloom filters
[**Briliant.org article**](https://brilliant.org/wiki/bloom-filter/#_=_): A nice explanation from Briliant.org

Happy coding.
