---
title: "Hugo shortcodes for asciinema"
date: 2021-01-18T21:02:53-05:00
asciicast: true
tags: ["hugo"]
description: "A quick and dirty hugo shortcode for asciinema"
---

> Find the finished theme at [the repo](https://gitlab.com/hybras/hugo-asciinema)

[Asciinema](https://asciinema.org) records and replays your terminal sessions. It makes it easy to share shell scripts and their output, which is a boon for documenting complex workflows. Best of all, it can be easily embedded using a [script](https://asciinema.org/docs/embedding) or the [`<asciinema-player>` tag](https://github.com/asciinema/asciinema-player/tree/master#self-hosting-quick-start). I wanted create a [hugo shortcode](https://gohugo.io/templates/shortcode-templates) (template for the [hugo](https://gohugo.io) static site generator) that makes using and self hosting asciinema easy for hugo users.

Here are some shortcodes I already found:

1. In a [blog post from Tony Lykke](https://www.tonylykke.com/posts/2018/06/20/embedding-asciinema-casts-in-hugo/) (which also describes how to self host asciinema in hugo)
   1. con: it expects all parameters to be named (i.e. the shortcode is not [*flexible*](https://gohugo.io/templates/shortcode-templates/#positional-vs-named-parameters))
   2. con: Resets the default params
2. [Shortcode](https://github.com/laozhu/hugo-nuo/blob/master/layouts/shortcodes/asciinema.html) from the [Hugo Nuo theme](https://github.com/laozhu/hugo-nuo)
   1. pro: well documented and flexible
   2. con: only supports the remote player
   3. con: *too* flexible. It allows *all* parameters to be positional, which I consider bad design when more than a 2 parameters are expected

So what do I want from *my* shortcode?

1. 1 positional parameter XOR named parameters
2. Self hosted casts
3. Use asciicast defaults
4. Attributes that accept urls should be marked safe (`safeURL`)

This is the shortcode I came up with. It checks if named parameters are used, and if so checks for the presence of each of them and includes the corresponding attribute. The `src` parameter is mandatory. Otherwise, it checks that only 1 positional param is present and assigns it to `src`.

```html
<p>
    <asciinema-player 
        {{ if .IsNamedParams }} 
            src="{{ with .Get "src" | safeURL}}{{ . }}{{ else }}{{ errorf "missing value for 'src': %s" .Position }}{{ end }}"
            {{ if .Get "cols" }}cols="{{ .Get "cols" }}"{{ end }} 
            {{ if .Get "rows" }}rows="{{ .Get "rows" }}"{{ end }}
            {{ if .Get "autoplay" }}autoplay="{{ .Get "autoplay" }}"{{ end }}
            {{ if .Get "preload" }}preload="{{ .Get "preload" }}"{{ end }}
            {{ if .Get "loop" }}loop="{{ .Get "loop" }}"{{ end }}
            {{ if .Get "start-at" }}start-at="{{ .Get "start-at" }}"{{ end }}
            {{ if .Get "speed" }}speed="{{ .Get "speed" }}"{{ end }}
            {{ if .Get "idle-time-limit" }}idle-time-limit="{{ .Get "idle-time-limit" }}"{{ end }}
            {{ if .Get "poster" }}poster="{{ .Get "poster" | safeURL }}"{{ end }}
            {{ if .Get "font-size" }}font-size="{{ .Get "font-size" }}"{{ end }}
            {{ if .Get "theme" }}theme="{{ .Get "theme" | safeURL }}"{{ end }}
            {{ if .Get "title" }}title="{{ .Get "title" | safeURL }}"{{ end }}
            {{ if .Get "author" }}author="{{ .Get "author" | safeURL }}"{{ end }}
            {{ if .Get "author-url" }}author-url="{{ .Get "author-url" | safeURL }}"{{ end }}
            {{ if .Get "author-img-url" }}author-img-url="{{ .Get "author-img-url" | safeURL }}"{{ end }}
        {{ else }}
            src="{{ if len .Params | eq 1 }}{{ .Get 0 }}{{ else }}{{ errorf "missing value for positional param '0' (corresponds to 'src'): %s" .Position }}{{ end }}"
        {{ end }}
    />
</p>
```

Note that I am defying the asciinema docs, placing the `defer`red script in `<head>`, instead of at the end of `<body>`. Because I am checking if `.Param "asciicast"` is set, make to sure to include `asciicast: true` in either your front matter, or site-wide in your config. This ensures the assets are only loaded when needed. I included the css and js in my `<head>` like so:

```html
{{ if .Param "asciicast" }}
<link rel="stylesheet" type="text/css" href="{{ .Site.BaseURL }}css/asciinema-player.css" />
<script src="{{ .Site.BaseURL }}js/asciinema-player.js" defer></script>
{{ end }}
```

If you find [`<asciinema-player>`'s defaults](https://github.com/asciinema/asciinema-player/tree/master#asciinema-player-element-attributes) unintuitive, you can easily pick more sensible defaults. All of the parameters can and should be altered to match your site.

Here's an example. Note that it resizes upon loading, and doesn't preload.

```html
{{</* asciicast src="cast.cast" font-size="medium" */>}}
```

{{< asciicast src="cast.cast" font-size="medium" >}}
