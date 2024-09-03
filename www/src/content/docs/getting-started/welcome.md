---
title: Introduction
description: ATMX was built to help stop you from rewriting the same code again and again.
sidebar:
  order: 0
---

This is **NOT** a JavaScript library. It's a collection of re-usable code snippets that you can copy and paste into your apps.

*Wait – why does that sound familiar?*

You might be thinking of [shadcn](https://ui.shadcn.com), a UI component framework that lets you *vendor* (copy) code into your project via a CLI as opposed to installing a separate NPM package.

**atmx is similar, yet different.**

Like shadcn, atmx lets you copy code into your project either via copy-and-paste or via a convenient CLI you can run via `npx`. 

However, whereas shadcn strives to be a very opinionated library with a focus on sharable UI components built on React, Radix UI, and Tailwind, atmx aims to take a generalist approach, allowing you to install helpful utility functions, React hooks, Svelte actions, and more, regardless of your project or its structure. 

Currently, atmx features Lodash-inspired functions such as [`group`](/helpers/group), [`mapValues`](/helpers/mapValues), and [`get`](/helpers/get).

## FAQs

<details>
<summary>Is this really needed now that we have ES2020/2021/etc.?</summary>

While a tremendous amount of Lodash's features have found their way into standard JavaScript (such as `Object.groupBy`), there are still several niche functions which will likely never *need* to become part of the language. 

Take [`alphabetical`](/helpers/alphabetical) for example, which simply leverages the JavaScript `.sort()` function. Yet in order to write this code, you still need to remember how `.sort()` actually works. atmx avoids that.

</details>

<details>
<summary>Why wouldn't I just install an NPM package?</summary>

It's a valid question. Unlike UI components, utility functions and hooks don't require much tweaking. However, believe it or not, using a NPM package does have its own risks, leading most larger companies to minimize the dependencies they install. 

In 2016, a breach of the `left-pad` NPM package [broke half the internet](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code) and Bitcoin mining has been known to [find its way](https://therecord.media/crypto-miner-found-hidden-inside-three-npm-libraries) into popular packages. 

Not to mention that relying on dependencies often entails waiting for upstream fixes, worrying about future maintenance, and whether or not the code will be compatible with your app.

</details>

<details>
<summary>How else does this differ from shadcn?</summary>

As previously mentioned, while shadcn focuses primarily on UI component distribution, atmx focuses on distributing general-purpose utility methods. shadcn recently [updated their CLI](https://ui.shadcn.com/docs/cli) to add support for external registries, so in the near future atmx's registry may be updated for shadcn-compatibility so shadcn users can leverage atmx without relying on the atmx CLI.

</details>