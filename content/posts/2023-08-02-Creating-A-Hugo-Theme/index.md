---
title: "Creating a Hugo Theme"
date: 2023-08-02
tags: ["dev"]
draft: true
---
:imagesoutdir: content/posts/2023-08-02-Creating-A-Hugo-Theme

== What Do We Want?

So I decided to make my own hugo theme. https://themes.gohugo.io/[Existing ones] were all too much (too much js, too many requests, too many features, too large assets, too complex css).

My requirements:

* No js
* No 3rd party requests
* 1 css file: bundling is ok, upto 3 css files can be bundled in 1)
* No large assets: This rules out fonts and icons.

== When Do We Want It?

Unfortunately, the docs are not helpful. They explain parts, but not how everything works together. Tutorials explain the tools, but only show the simplest examples.

== Terminology

Context:: Global state that is extensively used in templating. Variables like `.Site` and `.Page` contain information about the (whole) website and current page when available.
`layouts`:: This folder contains templates, both reusable (or not), user-facing (or not). The templates for `index.html` and `robots.txt` are placed directly in `layouts`, probably because these pages are one-of-a-kind.
`layouts/_default/baseof.html`:: A master template that is called for almost every page in a site (regardless of type). This template is necessary?
`layouts/_default`:: This folder contains templates that hugo executes whenever a page is built. These _override_ the defaults. Hugo decides which template to use based on the page type. These are rendered side-by-side with `baseof`.
`layouts/_default/_markup`:: Templates to override how markup is rendered. Rarely used.
`layouts/partials`:: These are templates with no parameters passed in. They exclusively use context. These are usually called unconditionally. Html Tags like `<head>`, `<footer>`, `<nav>`, `<header>` (top level tags that occur once per page) are frequently refactored into partials to make the default templates more readable. Notably, this does not include `<body>`.
`layouts/shortcodes`:: These are templates that are meant be reused, usually by the _user_ of a theme. They take parameters and are usually called directly from the site's content. They are frequently used to implement widgets for 3rd party content (youtube videos, twitter tweets, instagram posts, asciinema casts, github gists, etc).
https://gohugo.io/templates/base/[`<body>`]:: By convention, templates handle this tag specially. `baseof` is made to handle all other top-level html tags, while the page-type specific templates are made to handle `<body>`. `Baseof` will declare an empty "main" block inside body, which the type specific templates will override/define. Usually, `<header>` and `<footer>` are handled by `baseof` despite being in `body`.
`content`:: Content files do not have access to templating (but they can call shortcodes). Content is transformed based on its type (markdown is converted to html). The transformed content is at the mercy of the templates.
`static`:: Serve files unmodified.
`assets`:: Files meant to be used by templates. There are template functions meant to work with assets, and assets themselves have access to templating (and therefore, each other). Templates and assets are often combined for ad-hoc css and js bundling. Transformed assets usually end up in the built website. I have never seen an asset refer to templates defined in `layouts`, implying they are meant to stand on their own and not become part of a page.
`data`:: json files which can be read by templates. They do not end up in the built website.

== Basic Example

Here is a least common denominator for most hugo themes. Understanding this structure will help you hack around with other's themes, but you don't have to structure you own theme this way.

// [source, txt]

.Directory Layout
[plantuml, format=svg]
----
skinparam Legend {
	BackgroundColor transparent
	BorderColor transparent
}
legend
Root
|_ layout
  |_ _default
    |_ baseof.html <1>
    |_ list.html <2>
    |_ single.html <2>
  |_ index.html
  |_ robots.txt
  |_ shortcodes <3>
    |_ head.html
    |_ header.html
    |_ nav.html
    |_ footer.html
    |_ custom_head.html <4>
    |_ custom_footer.html <4>
|_ static
  |_ main.css <5>
|_ assets
  |_ main.css <5>
  |_ light.css
  |_ dark.css
  |_ fonts.css
end legend
----
<1> Every hugo theme includes `baseof`, so it seems mandatory.
<2> List and single are the most common page types, and themes usually override how they're rendered (if only to inject css classes). There are other types.
<3> This theme has decides to use shortcodes to render important html tags. They are only called from `baseof`
<4> This theme has also included empty "custom" partials. A theme's user can override these to inject custom content on every page, usually custom js.
<5> We have an option. We could either statically include css. Or, we could also build the css asset ourselves. This css also bundles external fonts and support for dark mode.

.Example baseof.html
[source, html]
----
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode | default "en-us" }}">
{{ partialCached "head" . }}
<body>
	{{ partialCached "header" . }}
	{{ block "main" . }}{{ end }}
	{{ partialCached "footer" . }}
</body>
</html>
----

.Example single.html
[source,html]
----
{{ define "main" }}
	<main>
		<article>
			<h1>{{ .Title }}</h1>
			<div>
				{{ .Content }}
			</div>
		</article>
	</main>
{{ end }}
----

This single page template doesn't do much. It wraps the page content in some semantic html. Notice how it defines a main section that will be included in baseof, instead of generating most of the html itself.