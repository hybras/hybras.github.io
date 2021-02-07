---
title: "Adventures in Markdown"
author: "hybras"
type: "post"
date: 2021-02-07T14:21:51-05:00
subtitle: "My Love of Open Source"
image: ""
tags:
 - markdown
---

> None of the content here is original.

By now, many of us are familiar with [markdown](https://commonmark.org/) and its *many* flavors and [parsers](https://github.com/commonmark/commonmark-spec/wiki/List-of-CommonMark-Implementations). The most popular parsers include [goldmark](https://pkg.go.dev/github.com/yuin/goldmark) in go, [kramdown](https://kramdown.gettalong.org/) in ruby, and [markdown-it](https://www.npmjs.com/package/markdown-it) in js.

Because we all just love 🤮 javascript, markdown-it is seemingly (I have done *no* research) the most popular parser. Markdown it is an excellent library, being commonmark compliant, supporting syntax extensions, shipping with a number of [first party plugins](https://github.com/markdown-it).

The crowded field of notetaking apps (which usually support markdown), near uniformly use markdown-it with various plugins. This is the case with [stackedit](https://stackedit.io/), for example. The feature set of these apps is invariably: markdown notes (pick your favorite plugins), syncing with the cloud provider of your choice (github, gitlab, drive, and dropbox), a slick UI, some kind of editor (WYSIWYG or WYSIWYM). All of which are appreciated, but not enough.

See, as a developer, I'm guaranteed to have an ide with basic markdown support. I don't want *another* app replicating the above functionality. In my case, I use VS Code which already has all of the aforementioned features implemented by default, *and* supports excellent extensions. Why must I install/use yet another electron app / extension / website? VS Code can do it all.

I began installing various markdown extensions, each containing a syntax extension or a piece of functionality I desired. VS Code uses, you guessed it, markdown-it, and even has a [page on how extensions can extend its functionality](https://code.visualstudio.com/api/extension-guides/markdown-extension). Hats off to VS Code for going out of its way to be so helpful and extensible. However, each extension was only a part of what I want, and I eventually ended up with a couple dozen markdown extensions. I still didn't have everything I wanted, and forked an [existing extension](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji) with the intention of modding it to add subscripts (I already had an extension providing superscripts).

Then I found [an extension](https://marketplace.visualstudio.com/items?itemName=jebbs.markdown-extended) which added nearly every popular markdown-it feature, including keyboard shortcuts for the syntax extensions. From there I added a [linter](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint), mermaid support, [code syntax highlighting](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-shiki), and \\( \KaTeX \\). Unfortunately, only vscode's natively supported syntax extensions render accordingly in the md file (WYSIWYM), which means I need the rendered preview (WYSIWYG). I sure your blood is boiling at this point.

My quest to replicate a note app's features is incomplete. And of course, I want to go beyond that. Nevertheless, I'm satisfied with what I've accomplished and surprised that markdown has been extended so thoroughly. I'm considering switch this site from hugo to [11ty](https://www.11ty.dev/) to take advantage of all this. [Goldmark's syntax extensions](https://github.com/yuin/goldmark#extensions) seem paltry in comparison.
