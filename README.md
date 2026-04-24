## The change I wanted in my application

Creating responsive user-facing errors that both easy to parse but not so obtrusive that they frustrate the user can be difficult, rendering some red text with an error message or spending a bunch of time crafting an elegant error handler middleware can be time consuming and unnecessary for small apps like this.

## The tool I implemented

The tool I chose is Sonner which is a library that handles toasts. This allows for elegant, easy to read errors or success messages, and could also be used for many different types of notifications that are easy for the user to read and parse, even when there are multiple notifications.

## How this affects the user experience

This enables the user to look to one place when the application behaves in an unexpected way, and if the application was more full featured, it could be used to create spaces within the application where the user could quickly look and receive reactive feedback based on what they're doing in the application at a glance. In applications where reactivity is critical in ensuring that the app is behaving as it should, notification systems like this can be really useful.

## How this affects my understanding of the app

Something I've learned after building a full React application for this course is that when creating a user interface, receiving consistent, clear feedback is paramount in the app feeling responsive and nice to use. It also means that when the app doesn't behave as expected and the feedback isn't clear or is hard to find, it can make the app frustrating. At first it seemed silly to me to use a library for something as simple as a notification, but when I tried to do it on my own for a personal project, I realized that creating something that both feels good, is easy to reuse throughout the app, and is configurable for the job it needs to do is quite difficult, so I chose to use this library and it had an instant impact on how the app felt to interact with. As it turns out, React apps are supposed to feel... reactive.