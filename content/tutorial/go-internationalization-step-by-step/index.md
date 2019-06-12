---
author: "Theo"
date: 2018-05-18T14:15:59-06:00
title: "A Step-by-Step Guide to Go Internationalization (i18n) & Localization (l10n)"
summary: "The Ultimate Step-by-Step Guide to Go Internationalization (i18n) and Localization (l10n). Learn how to localize Go applications using the latest Go v1.10. We will discuss character encodings, text transformations, and locale-specific text handling."
weight: -20
tags: [
    "go",
    "programming",
    "i18n"
]
categories: [
   "go",
   "i18n",
]
levels: "medium"
---


[**Read the original article**](https://phraseapp.com/blog/posts/internationalization-i18n-go/)

*Go is a statically compiled language that gained a lot of popularity lately due to the fact that is simple, 
performant and fits really well with developing cloud applications. It has a strong, yet poorly documented sub-package 
level base library that deals with a lot of aspects related to internationalization (i18n) and localization (l10n), 
such as character encodings, text transformations, and locale-specific text handling. Let's see what we can do to 
master this library and make our Go applications locale aware.*

The package we are referring to is the `golang.org/x/text` and if utilized correctly you can be pretty much cover a 
lot of parts when it comes to globalizing your apps. It comes with a set of abstractions to make easier to work with 
translatable messages, formatting, plural rules, Unicode and much more.

This article is going to consist of 2 parts. The first part is an overview of the  `golang.org/x/text` package and the 
utilities it provides in terms of formatting and localization. Go excels at building microservice based architectures 
so in the second part, in order not to break this tradition, we are going to make a localization Server microservice 
that will help us understand the big picture of i18n and l10n support in Go.

For the purposes of this tutorial, I will be using the latest **Go v1.10** and the code for this tutorial is 
hosted on [Github](https://github.com/PhraseApp-Blog/go-internationalization).

Let’s get going.

{{< header title="Overview Of The Package" >}}

Most messages in Go programs pass through either the `fmt`  or one of the template packages.
The  `golang.org/x/text` consists of multiple levels of sub-packages that offer lots of utilities and functions to format localized strings using a  fmt style API. Let’s see how we can use it in practice.

{{< header title="Messages And Catalogs" >}}

A **message** is some form of content to be conveyed to the user. Each message is identified by a **key**, which can have many forms. You can create a message printer like that:

{{< code-block go >}}
p := message.NewPrinter(language.BritishEnglish)
 
p.Printf("There are %v flowers in our garden.", 1500)
{{< /code-block >}}

You need to supply a **Language Tag** when you call the NewPrinter function. Language [tags](https://godoc.org/golang.org/x/text/language#Tag) are used whenever you want to specify a language. There are many ways you can create a tag such as:

* Using predefined tags. For example: 

{{< code-block go >}}
language.Greek, language.BrazilianPortuguese
{{< /code-block >}}

The whole list of predefined tags is listed [here](https://godoc.org/golang.org/x/text/language#Tag).

* From a string value. For example: 

{{< code-block go >}}
language.Make("el"), language.Parse("en-UK")
{{< /code-block >}}

* By composing parts of type Tag, Base, Script, Region, Variant, []Variant, Extension, []Extension or error. For example:

{{< code-block go >}}
ja, _ := language.ParseBase("ja") 
jp, _ := language.ParseRegion("JP") 
jpLngTag, _ := language.Compose(ja, jp) 
fmt.Println(jpLngTag) // prints ja-JP
{{< /code-block >}}

If you specify an invalid language tag you will get an instance of the **Und** Tag which denotes an Undefined Tag.

{{< code-block go >}}
fmt.Println(language.Compose(language.ParseRegion("AL"))) // prints Und-AL
{{< /code-block >}}

if you want to learn more about the language API see [this doc here](https://godoc.org/golang.org/x/text/language#pkg-index).

Coming back to our messages we can assign a new printer using a different language and print the formatted strings. The library will take care any localized formatting variants for you:

{{< code-block go >}}
package main
 
import (
 "golang.org/x/text/message"
 "golang.org/x/text/language"
)
 
func main()  {
 p := message.NewPrinter(language.BritishEnglish)
 p.Printf("There are %v flowers in our garden.\n", 1500)
 
 p = message.NewPrinter(language.Greek)
 p.Printf("There are %v flowers in our garden.", 1500)
}
{{< /code-block >}}

If you run this program you will get:

{{< code-block bash >}}
$ go run main.go
There are 1,500 flowers in our garden.
There are 1.500 flowers in our garden.
{{< /code-block >}}

Now in order to print translated messages, we need to add them to the message catalog so that the **Printer** can find them for the right language tag.

A **Catalog** defines collections of translated format strings. Think of it as a set of per-language dictionaries with translations for a set of keys. In order to use catalogs, we need to populate them with translations.

In practice, translations will be automatically injected from a translator-supplied data source. Let’s see how we can do it manually:

{{< code-block go >}}
package main
 
import (
 "golang.org/x/text/message"
 "golang.org/x/text/language"
 "fmt"
)
 
func init()  {
 message.SetString(language.Greek, "%s went to %s.",  "%s πήγε στήν %s.")
 message.SetString(language.AmericanEnglish, "%s went to %s.",  "%s is in %s.")
 message.SetString(language.Greek, "%s has been stolen.",  "%s κλάπηκε.")
 message.SetString(language.AmericanEnglish, "%s has been stolen.",  "%s has been stolen.")
        message.SetString(language.Greek, "How are you?", "Πώς είστε?.")
}
 
func main()  {
 p := message.NewPrinter(language.Greek)
 p.Printf("%s went to %s.", "Ο Πέτρος", "Αγγλία")
 fmt.Println()
 p.Printf("%s has been stolen.", "Η πέτρα")
 fmt.Println()
 
 p = message.NewPrinter(language.AmericanEnglish)
 p.Printf("%s went to %s.", "Peter", "England")
 fmt.Println()
 p.Printf("%s has been stolen.", "The Gem")
}
{{< /code-block >}}

If you run this program you will get the following output:

{{< code-block bash >}}
$ go run main.go
Ο Πέτρος πήγε στήν Αγγλία.
Η πέτρα κλάπηκε.
Peter is in England.
The Gem has been stolen.%
{{< /code-block >}}

**Caution**: The keys you specify when you use the `SetString`  method are case and line sensitive, which means that if you try to use `PrintLn`  or add an end of line char `\n` then it won’t work:

{{< code-block go >}}
p := message.NewPrinter(language.Greek)
 
p.Printf("%s went to %s.\n", "Ο Πέτρος", "Αγγλία") // will print Ο Πέτρος went to Αγγλία.
p.Println("How are you?") // will print How are you?
{{< /code-block >}}

Typically you don’t create catalogs but let the library handle them for you. You can also have the option to build ones programmatically using the [catalog.Builder](https://godoc.org/golang.org/x/text/message/catalog#Builder) function.

{{< header title="Handling Plurals" >}}

For cases when you need to add multiple string translations depending on plural values, you need to add special calls to configure that in your translation catalogs. The sub-package  `golang.org/x/text/feature/plural`  exposes a function called [SelectF](https://godoc.org/golang.org/x/text/feature/plural#Selectf) that is used to define multiple linguistic plurals in a text.

I give below some typical usages of this function:

{{< code-block go >}}
func init() {
        message.Set(language.Greek, "You have %d. problem",
 plural.Selectf(1, "%d",
 "=1", "Έχεις ένα πρόβλημα",
 "=2", "Έχεις %[1]d πρόβληματα",
 "other", "Έχεις πολλά πρόβληματα",
 ))
        message.Set(language.Greek, "You have %d days remaining",
 plural.Selectf(1, "%d",
 "one", "Έχεις μία μέρα ελεύθερη",
 "other", "Έχεις %[1]d μέρες ελεύθερες",
 ))
 
}
 
func main()  {
 p := message.NewPrinter(language.Greek)
 p.Printf("You have %d. problem", 1)
 fmt.Println()
 p.Printf("You have %d. problem", 2)
 fmt.Println()
 p.Printf("You have %d. problem", 5)
 fmt.Println()
 p.Printf("You have %d days remaining", 1)
 fmt.Println()
 p.Printf("You have %d days remaining", 10)
 fmt.Println()
}
{{< /code-block >}}

If you run this program you will get the following output:

{{< code-block bash >}}
$ go run main.go
Έχεις ένα πρόβλημα
Έχεις 2 πρόβληματα
Έχεις πολλά πρόβληματα
Έχεις μία μέρα ελεύθερη
Έχεις 10 μέρες ελεύθερες
{{< /code-block >}}

The cases as provided in this function can support several variations such as `zero` ,  `one` ,  `two` ,  `few` , `many`  and it can also match comparisons such as  `>x`  or `<x`.

{{< header title="String Interpolation In Messages" >}}

In some other cases where you want to handle further possible variants of a message, you can assign placeholder variables that can handle some specific cases of linguistic features. For instance, in the previous example where we used the plural can be written as:

{{< code-block go >}}
func init() {
        message.Set(language.Greek, "You are %d minute(s) late.",
 catalog.Var("minutes", plural.Selectf(1, "%d", "one", "λεπτό", "other", "λεπτά")),
 catalog.String("Αργήσατε %[1]d ${minutes}."))
 
}
 
func main()  {
 p := message.NewPrinter(language.Greek)
 p.Printf("You are %d minute(s) late.", 1) // prints Αργήσατε 1 λεπτό
 fmt.Println()
 p.Printf("You are %d minute(s) late.", 10)// prints Αργήσατε 10 λεπτά
 fmt.Println()
}

{{< /code-block >}}

The  `catalog.Var` assigns a special tag to the first string parameter  `minutes` so it can be substituted with a more relevant translation based on the value of the `%d` parameter.

{{< header title="Formatting Currency" >}}

Package   `golang.org/x/text/currency` deals with currency formatting rules.
For currency, there are some useful functions to print locale-specific strings regarding amounts. For example here are some ways you can format them:

{{< code-block go >}}
package main
 
import (
 "golang.org/x/text/message"
 "golang.org/x/text/language"
 "fmt"
 "golang.org/x/text/currency"
)
 
 
func main()  {
        p := message.NewPrinter(language.English)
        p.Printf("%d", currency.Symbol(currency.USD.Amount(0.1)))
 fmt.Println()
 p.Printf("%d", currency.NarrowSymbol(currency.JPY.Amount(1.6)))
 fmt.Println()
 p.Printf("%d", currency.ISO.Kind(currency.Cash)(currency.EUR.Amount(12.255)))
 fmt.Println()
{{< /code-block >}}

And the result will be:

{{< code-block bash >}}
$ go run main.go  
US$ 0.10
¥ 2
EUR 12.26
{{< /code-block >}}

{{< header title="Loading Messages" >}}

When you work with translations typically you will need to load the translations before so that the application can use them. You can think of those files as static resources. You have a few options on how you deploy those files with the application:

#### Manually Setting The Translation Strings

The simplest way to organize the translations is to have them assigned into the application binary. You will have to manually create an array of entries that will be used on init to load the messages into the default catalog. Then on your application, you only have to switch locale using the `NewPrinter` function.

Bellow is an example application by loading translations on init:

{{< code-block go >}}
package main
 
import (
 "golang.org/x/text/language"
 "golang.org/x/text/feature/plural"
 "golang.org/x/text/message"
 "golang.org/x/text/message/catalog"
)
 
type entry struct {
 tag, key string
 msg      interface{}
}
 
var entries = [...]entry{
 {"en", "Hello World", "Hello World"},
 {"el", "Hello World", "Για Σου Κόσμε"},
 {"en", "%d task(s) remaining!", plural.Selectf(1, "%d",
 "=1", "One task remaining!",
 "=2", "Two tasks remaining!",
 "other", "[1]d tasks remaining!",
 )},
 {"el", "%d task(s) remaining!", plural.Selectf(1, "%d",
 "=1", "Μία εργασία έμεινε!",
 "=2", "Μια-δυο εργασίες έμειναν!",
 "other", "[1]d εργασίες έμειναν!",
 )},
}

func init()  {
 for _, e := range entries {
     tag := language.MustParse(e.tag)
     switch msg := e.msg.(type) {
     case string:
         message.SetString(tag, e.key, msg)
     case catalog.Message:
         message.Set(tag, e.key, msg)
     case []catalog.Message:
         message.Set(tag, e.key, msg...)
     }
 }
}
 
func main()  {
 p := message.NewPrinter(language.Greek)
 
 p.Printf("Hello World")
 p.Println()
 p.Printf("%d task(s) remaining!", 2)
 p.Println()
 
 p = message.NewPrinter(language.English)
 p.Printf("Hello World")
 p.Println()
 p.Printf("%d task(s) remaining!", 2)
 
}
{{< /code-block >}}

If you run this program then it will print:

{{< code-block bash >}}
$ go run examples/static/main.go         
Για Σου Κόσμε
Μια-δυο εργασίες έμειναν!
Hello World
Two tasks remaining!%
{{< /code-block >}}

In practice, while this way is simple to implement, it’s not scalable enough. It works only for small applications with few translations. You will have to manually set the translation strings and it’s tricky to automate. For all other reasons, it’s recommended to automatically load messages where I explain in detail how to do it next.

#### Automatic Loading Of Messages

Traditionally, most localization frameworks have grouped data in per-language dynamically-loaded files. You can distribute those files to translators and have them merged into your app when they are ready.

To assist in this process the authors have included a helper CLI tool called `gotext` that is used for managing text in Go source code.

Let’s start by making sure that you have the latest version:

{{< code-block bash >}}
$ go get -u golang.org/x/text/cmd/gotext
{{< /code-block >}}

Running this tool will only show the options available and the `help`  switch will not show any other info:

{{< code-block bash >}}
$ gotext                        
gotext is a tool for managing text in Go source code.
 
Usage:
 
        gotext command [arguments]
 
The commands are:
 
        update      merge translations and generate catalog
        extract     extracts strings to be translated from code
        rewrite     rewrites fmt functions to use a message Printer
        generate    generates code to insert translated messages

{{< /code-block >}}

For the purposes of this tutorial let’s use the **update** flag which performs a multi-step process of extracting the translation keys to a file and updating the code for loading them into catalogs for ease of use.

Create a file `main.go` and add a few `PrintF`  calls and make sure you include the comment for the `go:generate`  command

{{< code-block bash >}}
$ touch main.go
{{< /code-block >}}

* **File**: main.go
{{< code-block go >}}
package main
 
//go:generate gotext -srclang=en update -out=catalog/catalog.go -lang=en,el
 
import (
 "golang.org/x/text/language"
 "golang.org/x/text/message"
)
 
func main() {
 p := message.NewPrinter(language.Greek)
 p.Printf("Hello world!")
 p.Println()
 
 p.Printf("Hello", "world!")
 p.Println()
 
 person := "Alex"
 place := "Utah"
 
 p.Printf("Hello ", person, " in ", place, "!")
 p.Println()
 
 // Greet everyone.
 p.Printf("Hello world!")
 p.Println()
 
 city := "Munich"
 p.Printf("Hello %s!", city)
 p.Println()
 
 // Person visiting a place.
 p.Printf("%s is visiting %s!",
 person,
 place)
 p.Println()
 
 // Double arguments.
 miles := 1.2345
 p.Printf("%.2[1]f miles traveled (%[1]f)", miles)
}

{{< /code-block >}}

Run the following commands:

{{< code-block bash >}}
$ mkdir catalog
$ go generate
{{< /code-block >}}

Then fix the import to include the **catalog.go** file:

**File*: main.go
{{< code-block go >}}
package main
 
//go:generate gotext -srclang=en update -out=catalog/catalog.go -lang=en,el
 
import (
 "golang.org/x/text/language"
 "golang.org/x/text/message"
      _ "golang.org/x/text/message/catalog"
)
 
...
{{< /code-block >}}

Now if you see the project structure there are some files created:
{{< code-block bash >}}
$ tree .
.
├── catalog
│   └── catalog.go
├── locales
│   ├── el
│   │   └── out.gotext.json
│   └── en
│       └── out.gotext.json
├── main.go
{{< /code-block >}}

The locales folder contain the translation messages in the format that the library supports. Typically you want to provide translations for this. Create a new file named `messages.gotext.json` and provide translations for the Greek language.

{{< code-block bash >}}
$ touch locales/el/messages.gotext.json
{{< /code-block >}}

**File**: locales/el/messages.gotext.json
{{< code-block json >}}
{
  "language": "el",
  "messages": [
    {
      "id": "Hello world!",
      "message": "Hello world!",
      "translation": "Γιά σου Κόσμε!"
    },
    {
      "id": "Hello",
      "message": "Hello",
      "translation": "Γιά σας %[1]v",
      "placeholders": [
        {
          "id": "World",
          "string": "%[1]v",
          "type": "string",
          "underlyingType": "string",
          "argNum": 1,
          "expr": "\"world!\""
        }
      ]
    },
    {
      "id": "Hello {City}!",
      "message": "Hello {City}!",
      "translation": "Γιά σου %[1]s",
      "placeholders": [
        {
          "id": "City",
          "string": "%[1]s",
          "type": "string",
          "underlyingType": "string",
          "argNum": 1,
          "expr": "city"
        }
      ]
    },
    {
      "id": "{Person} is visiting {Place}!",
      "message": "{Person} is visiting {Place}!",
      "translation": "Ο %[1]s επισκέπτεται την %[2]s",
      "placeholders": [
        {
          "id": "Person",
          "string": "%[1]s",
          "type": "string",
          "underlyingType": "string",
          "argNum": 1,
          "expr": "person"
        },
        {
          "id": "Place",
          "string": "%[2]s",
          "type": "string",
          "underlyingType": "string",
          "argNum": 2,
          "expr": "place"
        }
      ]
    },
    {
      "id": "{Miles} miles traveled ({Miles_1})",
      "message": "{Miles} miles traveled ({Miles_1})",
      "translation": "%.2[1]f μίλια ταξίδεψε %[1]f",
      "placeholders": [
        {
          "id": "Miles",
          "string": "%.2[1]f",
          "type": "float64",
          "underlyingType": "float64",
          "argNum": 1,
          "expr": "miles"
        },
        {
          "id": "Miles_1",
          "string": "%[1]f",
          "type": "float64",
          "underlyingType": "float64",
          "argNum": 1,
          "expr": "miles"
        }
      ]
    }
  ]
}
{{< /code-block >}}

Now run the `go generate`  command and the program next and see that the translations are happening:

{{< code-block bash >}}
$ go generate
$ go run main.go
Γιά σου Κόσμε!
Γιά σας world!
 
Γιά σου Κόσμε!
Γιά σου Munich
Ο Alex επισκέπτεται την Utah
1,23 μίλια ταξίδεψε 1,234500%
{{< /code-block >}}

In case you are interested, the `rewrite` flag searches for references to `fmt` in the source code and replaces them with the `p.Print`  functions. For example, let’s say we have the following program:

**File**: main.go
{{< code-block go >}}
func main() {
   p := message.NewPrinter(language.German)
   fmt.Println("Hello world")
   fmt.Printf("Hello world!")
   p.Printf("Hello world!\n")
}

{{< /code-block >}}

If you run the following command:

{{< code-block go >}}
$ gotext rewrite -out main.go
{{< /code-block >}}

Then the main.go will turn into:

{{< code-block go >}}
func main() {
   p := message.NewPrinter(language.German)
   p.Printf("Hello world\n")
   p.Printf("Hello world!")
   p.Printf("Hello world!\n")
}
{{< /code-block >}}

## Example Microservice

This is the second part of the article where we can utilize in practice what we learned about the  `golang/x/text` package. We are going to build a simple HTTP server that will serve an endpoint that will accept a user language parameter. Then It will try to match this parameter with the list of supported languages and then serve a translated response based on the most suitable locale.

First, make sure you have all dependencies installed.

Start by creating an application skeleton:

{{< code-block bash >}}
$ go get -u github.com/golang/dep/cmd/dep
$ dep init
$ touch main.go
{{< /code-block >}}
**File**: main.go
{{< code-block go >}}
package main
 
import (
 "html"
 "log"
 "net/http"
        "fmt"
 "flag"
 "time"
)
 
const (
 httpPort  = "8090"
)
 
func PrintMessage(w http.ResponseWriter, r *http.Request) {
 fmt.Fprintf(w, "Hello, %s", html.EscapeString(r.Host))
}
 
func main() {
 var port string
 flag.StringVar(&port, "port", httpPort, "http port")
 flag.Parse()
 
 server := &http.Server{
 Addr:           ":" + port,
 ReadTimeout:    10 * time.Second,
 WriteTimeout:   10 * time.Second,
 MaxHeaderBytes: 1 << 16,
 Handler:        http.HandlerFunc(PrintMessage)}
 
 log.Fatal(server.ListenAndServe())
}

{{< /code-block >}}

This example HTTP server does not handle translations yet. We can do that by replacing the call to `fmt.FprintF`  with the call to `p.FprintF`

{{< code-block go >}}
func PrintMessage(w http.ResponseWriter, r *http.Request) {
   p := message.NewPrinter(language.English)
   p.Fprintf(w,"Hello, %v", html.EscapeString(r.Host))
{{< /code-block >}}

Add the following line to your source code and run the go generate command:

{{< code-block go >}}
//go:generate gotext -srclang=en update -out=catalog/catalog.go -lang=en,el
{{< /code-block >}}
{{< code-block bash >}}
$ dep ensure -update
$ go generate        
el: Missing entry for "Hello, {Host}".
{{< /code-block >}}

Provide translations for the missing entries:

{{< code-block go >}}
$ cp locales/el/out.gotext.json locales/el/messages.gotext.json
{{< /code-block >}}
**File**: locales/el/messages.gotext.json
{{< code-block json >}}
{
    "language": "el",
    "messages": [
        {
            "id": "Hello, {Host}",
            "message": "Hello, {Host}",
            "translation": "Γιά σου %[1]v",
            "placeholders": [
                {
                    "id": "Host",
                    "string": "%[1]v",
                    "type": "string",
                    "underlyingType": "string",
                    "argNum": 1,
                    "expr": "html.EscapeString(r.Host)"
                }
            ]
        }
    ]
}

{{< /code-block >}}

Run the command  go generate again and add a reference to the catalog package in `main.go` :

{{< code-block bash >}}
$ go generate
{{< /code-block >}}

**File**: main.go
{{< code-block go >}}
package main
 
import (
 "html"
 "log"
 "net/http"
 "flag"
 "time"
 "golang.org/x/text/message"
 "golang.org/x/text/language"
 
 _ "go-internationalization/catalog"
)
...

{{< /code-block >}}
Now in order to determine which language we need to switch when the user requests a resource from the API we need to add a [Matcher](https://godoc.org/golang.org/x/text/language#Matcher) object that will be used to determine the best match out of our supported locales when provided with a list of language tags.
Create a new **Matcher** by providing the list of supported locales from the `message.DefaultCatalog`  that is populated from the `gotext`  tool:

**File**: main.go

{{< code-block go >}}
var matcher = language.NewMatcher(message.DefaultCatalog.Languages())
{{< /code-block >}}
Add your function to match the correct language based on the request parameters:

**File**: main.go
{{< code-block go >}}
package main
 
import (
 "html"
 "log"
 "net/http"
 "flag"
 "time"
        "context"
 "golang.org/x/text/message"
 "golang.org/x/text/language"
 
 _ "go-internationalization/catalog"
 
)
 
//go:generate gotext -srclang=en update -out=catalog/catalog.go -lang=en,el
 
var matcher = language.NewMatcher(message.DefaultCatalog.Languages())
 
type contextKey int
 
const (
 httpPort  = "8090"
 messagePrinterKey contextKey = 1
)
 
func withMessagePrinter(next http.HandlerFunc) http.HandlerFunc {
 return func(w http.ResponseWriter, r *http.Request) {
     lang, ok := r.URL.Query()["lang"]
 
     if !ok || len(lang) < 1 {
         lang = append(lang, language.English.String())
     }
     tag,_, _ := matcher.Match(language.MustParse(lang[0]))
     p := message.NewPrinter(tag)
     ctx := context.WithValue(context.Background(), messagePrinterKey, p)
 
     next.ServeHTTP(w, r.WithContext(ctx))
 }
}
...

{{< /code-block >}}
I only supplied a parameter parsed from the query string. You can mix and match also additional tags parsed from a cookie or an Accept-Language header.

Now you only need to wrap your handler function `PrintMessage`  with the `withMessagePrinter` and grab the printer from the context:

**File**: main.go
{{< code-block go >}}
...
func PrintMessage(w http.ResponseWriter, r *http.Request) {
 p := r.Context().Value(messagePrinterKey).(*message.Printer)
 p.Fprintf(w,"Hello, %v", html.EscapeString(r.Host))
}
 
func main() {
 var port string
 flag.StringVar(&port, "port", httpPort, "http port")
 flag.Parse()
 
 server := &http.Server{
 Addr:           ":" + port,
 ReadTimeout:    10 * time.Second,
 WriteTimeout:   10 * time.Second,
 MaxHeaderBytes: 1 << 16,
 Handler:        http.HandlerFunc(withMessagePrinter(PrintMessage))}
 
 log.Fatal(server.ListenAndServe())
}

{{< /code-block >}}

Start the server and issue some requests to see the translations happening:
{{< code-block bash >}}
$ go run main.go
{{< /code-block >}}

![image](https://thepracticaldev.s3.amazonaws.com/i/j5lbcu7oezgpnyye1431.png)
![image](https://thepracticaldev.s3.amazonaws.com/i/reauiczgico9wugi9dv9.png)

The world is your oyster from now on…

{{< header title="Use Phraseapp" >}}

PhraseApp supports many different languages and frameworks, including Go. 
It allows to easily import and export translations data and search for any missing translations, which is really convenient.
On top of that, you can collaborate with translators as it is much better to have 
[professionally done localization](https://phraseapp.com/blog/posts/translation-management-why-authentic-human-translation-is-still-essential-for-localizing-software/) for your website. 
If you’d like to learn more about PhraseApp, refer to the [Getting Started guide](https://phraseapp.com/docs/guides/setup/getting-started/). 
You can also get a [14-days trial](https://phraseapp.com/signup). So what are you waiting for?

{{< header title="Conclusion" >}}

In this article, we explored how Go manages localization using the `golang/x/text  package` and we implemented an example 
web server that serves translations and explaining how all pieces fit together. As the official documentation lacks 
in terms of practical examples, I hope that this article explained out the principles of adding i18n, in a simple manner, 
to your Go applications and could be used as a good future reference.

This is by no means an exhaustive guide as every application has different needs and scope requirements. 
Please stay put for more detailed articles regarding this subject.



