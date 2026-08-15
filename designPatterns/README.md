# Design Patterns in JavaScript

## Overview

As software systems become larger, writing code that simply "works" is no longer enough.

Real-world engineering involves questions such as:

* How should objects be created?
* How should different parts of an application communicate?
* How can code be reused without creating unnecessary dependencies?
* How can a system remain flexible when requirements change?
* How can multiple developers work on the same codebase without creating a maintenance nightmare?

This is where **Design Patterns** become useful.

A design pattern is a **general, reusable solution to a commonly occurring software design problem**.

It is not a ready-made piece of code that you copy and paste. Instead, it is a proven way of structuring your code to solve a particular class of problems.

Think of a design pattern as a **blueprint for organizing software**, not as the software itself.

---

# 1. Why Do We Need Design Patterns?

Imagine an engineer building a large application without any established design approach.

Initially, the code may look fine:

```text
Small project
   ↓
Few classes
   ↓
Few dependencies
   ↓
Everything seems manageable
```

But as the application grows:

```text
More features
   ↓
More objects
   ↓
More dependencies
   ↓
More duplicated logic
   ↓
More changes
   ↓
More bugs
   ↓
Harder maintenance
```

Design patterns help engineers deal with these recurring problems using structures that have already been proven useful in software development.

They help improve:

### Maintainability

Code becomes easier to understand and modify.

### Reusability

Common solutions can be applied across different parts of an application.

### Flexibility

The system can adapt more easily when requirements change.

### Communication

Engineers can communicate design ideas using established terminology.

For example, saying:

> "Let's use the Observer pattern here."

is much faster than explaining an entire architecture from scratch.

### Scalability

Patterns can help organize growing systems so that adding features does not require rewriting everything.

---

# 2. Design Patterns Are Not Frameworks

A common misunderstanding is that design patterns are libraries or frameworks.

They are not.

For example:

```text
React
Node.js
Express
Spring
```

are technologies/frameworks.

Patterns are design approaches.

For example:

```text
Observer
Factory
Singleton
Strategy
Adapter
```

are design patterns.

A framework gives you tools and structure.

A design pattern gives you a way of thinking about how components should interact.

---

# 3. When Should Design Patterns Be Used?

Design patterns are useful when you encounter a **recurring design problem**.

For example:

### Problem

You need to create many different types of objects without exposing the creation logic everywhere.

A possible solution:

```text
Factory Pattern
```

### Problem

Multiple parts of your application need to know when some object changes.

A possible solution:

```text
Observer Pattern
```

### Problem

You have multiple interchangeable algorithms and want to switch between them easily.

A possible solution:

```text
Strategy Pattern
```

The important rule is:

> Do not use a design pattern just because it exists.

A pattern should solve a real engineering problem.

Using patterns unnecessarily can make simple code complicated.

---

# 4. Design Patterns vs Good Coding Practices

Design patterns are not a replacement for:

```text
Clean Code
SOLID Principles
Good Naming
Modularity
Testing
Documentation
```

They work together.

A good engineer first understands the problem, then chooses an appropriate design.

The pattern should make the design **simpler**, not more complicated.

---

# 5. Types of Design Patterns

Design patterns are commonly divided into three major categories.

```text
Design Patterns
      |
      ├── Creational
      |
      ├── Structural
      |
      └── Behavioral
```

---

# 6. Creational Design Patterns

Creational patterns deal with:

> **How objects are created.**

Instead of scattering object creation logic throughout the application, these patterns provide structured ways to create objects.

Common Creational Patterns include:

```text
Factory
Abstract Factory
Builder
Prototype
Singleton
```

### Example Problems

You may use a Factory when:

```text
Object creation involves conditions
        ↓
Different objects need to be created
        ↓
Creation logic should remain centralized
```

You may use a Builder when:

```text
An object has many configuration options
        ↓
Constructing it directly becomes difficult
```

---

# 7. Structural Design Patterns

Structural patterns deal with:

> **How objects and classes are composed to form larger structures.**

They help define relationships between different components.

Common Structural Patterns include:

```text
Adapter
Decorator
Facade
Proxy
Composite
Bridge
Flyweight
```

### Example Problem

Suppose two systems have incompatible interfaces:

```text
System A
   ↓
Interface A

System B
   ↓
Interface B
```

An Adapter can allow them to work together:

```text
System A
   ↓
Adapter
   ↓
System B
```

This is particularly useful when integrating legacy systems, third-party APIs, or modules that were designed independently.

---

# 8. Behavioral Design Patterns

Behavioral patterns deal with:

> **How objects communicate and how responsibilities are distributed between them.**

Common Behavioral Patterns include:

```text
Observer
Strategy
Command
State
Iterator
Mediator
Chain of Responsibility
Template Method
Memento
Visitor
```

### Example Problem

Suppose several components need to react when some data changes:

```text
Data changes
    |
    ├── UI updates
    ├── Logger updates
    ├── Analytics updates
    └── Notification updates
```

The **Observer Pattern** can provide a structured way for these components to receive updates.

---

# 9. The Three Categories at a Glance

| Category   | Main Question                   | Examples                               |
| ---------- | ------------------------------- | -------------------------------------- |
| Creational | How should objects be created?  | Factory, Builder, Singleton, Prototype |
| Structural | How should objects be combined? | Adapter, Decorator, Facade, Proxy      |
| Behavioral | How should objects communicate? | Observer, Strategy, Command, State     |

A simple way to remember them:

```text
Creational → Creating things

Structural → Connecting things

Behavioral → Communicating between things
```

---

# 10. Design Patterns in Real Engineering

Design patterns are not limited to academic programming exercises.

They appear throughout real software systems.

For example:

```text
Frontend
   ↓
Component communication
   ↓
Observer / Mediator

Backend
   ↓
Object creation
   ↓
Factory

API Integration
   ↓
Different interfaces
   ↓
Adapter

Payment System
   ↓
Different payment methods
   ↓
Strategy

Logging / Caching
   ↓
Controlled access
   ↓
Proxy

Complex object configuration
   ↓
Builder
```

The exact pattern depends on the problem being solved.

---

# 11. Design Patterns in JavaScript

JavaScript has some characteristics that make design patterns particularly interesting.

JavaScript supports:

* Functions as first-class values
* Closures
* Objects
* Prototypes
* Classes
* Modules
* Higher-order functions
* Callbacks
* Promises
* Event-driven programming

Because of this, some patterns can be implemented differently in JavaScript compared with languages such as Java or C++.

For example, a pattern that traditionally requires classes in a language like Java may sometimes be implemented in JavaScript using:

```text
Functions
Closures
Objects
Modules
Higher-order functions
```

So the **idea of the pattern matters more than the exact syntax**.

---

# 12. A Real Engineering Mindset

The wrong approach is:

```text
Learn 20 patterns
        ↓
Try to use all 20 patterns
        ↓
Make simple code complicated
```

The better approach is:

```text
Understand the problem
        ↓
Identify the recurring design issue
        ↓
Choose an appropriate pattern
        ↓
Implement it
        ↓
Evaluate whether it actually improved the design
```

Patterns are tools.

An engineer should know **when not to use a pattern** just as much as when to use one.

---

# 13. Final Mental Model

Think of design patterns as a collection of proven engineering blueprints:

```text
                 DESIGN PATTERNS
                        |
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
     CREATIONAL     STRUCTURAL    BEHAVIORAL
          |             |             |
       Creation      Composition   Communication
          |             |             |
       Factory        Adapter        Observer
       Builder        Decorator      Strategy
       Singleton      Facade         Command
       Prototype      Proxy          State
```

The fundamental idea is simple:

> **Design patterns are reusable approaches to recurring software design problems.**

They help engineers build systems that are easier to understand, change, extend, and maintain.

But patterns are not magic.

A poorly chosen pattern can make a simple problem worse. The real engineering skill is **recognizing the problem and choosing the simplest design that solves it well**.
