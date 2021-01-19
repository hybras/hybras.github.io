---
title: "Hugo shortcodes for asciinema"
date: 2021-01-18T21:02:53-05:00
asciinema: true
tags: ["hugo"]
---
This article assumes you know what [Asciinema](https://asciinema.org) is, how to embed its [player widget script](https://asciinema.org/docs/embedding), and use the [`<asciinema-player>` tag](https://github.com/asciinema/asciinema-player/tree/master#self-hosting-quick-start). It also assumes you know how to create [hugo shortcodes](https://gohugo.io/templates/shortcode-templates).

Shortcodes I already found:

1. In a [blog post from Tony Lykke](https://www.tonylykke.com/posts/2018/06/20/embedding-asciinema-casts-in-hugo/) (which also describes how to self host asciinema in hugo)
   1. con: it expects all parameters to be named (i.e. the shortcode is not [_flexible_](https://gohugo.io/templates/shortcode-templates/#positional-vs-named-parameters))
   2. con: Resets the default params
2. [Shortcode](https://github.com/laozhu/hugo-nuo/blob/master/layouts/shortcodes/asciinema.html) from the [Hugo Nuo theme](https://github.com/laozhu/hugo-nuo)
   1. pro: well documented and flexible
   2. con: only supports the remote player
   3. con: too flexible (it allows all parameters to be positional)

So what do I want from _my_ shortcode?

1. 1 positional parameter for the source cast XOR named parameters
   1. Build Error when the above is violated
2. Self hosted casts
3. Don't redundantly set parameters / No default values / use asciicasts defaults
4. Attributes that accept urls should be marked safe (`safeURL`)

This is the shortcode I came up with:

```html
<p>
    <asciinema-player 
        {{ if .IsNamedParams }} 
            src="{{ with .Get "src" | safeURL}}{{ . }}{{ end }}"
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

Note that I am defying the asciinema docs, placing the `defer`red script in `<head>`, instead of at the end of `<body>`. Because I am checking if `.Param "asciinema"` is set, make to sure to include `asciinema: true` in either your front matter, or site-wide in your config.{toml, yaml, json}. This makes sure the assets are only loaded when needed. I included the css and js in my `<head>` like so:

```html
{{ if .Param "asciinema" }}
<link rel="stylesheet" type="text/css" href="{{ .Site.BaseURL }}/asciinema-player.css" />
<script src="{{ .Site.BaseURL }}/asciinema-player.js" defer></script>
{{ end }}
```

If you find [`<asciinema-player>`'s defaults](https://github.com/asciinema/asciinema-player/tree/master#asciinema-player-element-attributes) unintuitive, you can easily pick more sensible defaults.

Here's an example. Note that it resizes upon loading, and doesn't preload.

```html
{{</* asciinema src="cast.cast" font-size="medium" */>}}
```

{{< asciinema src="cast.cast" font-size="medium" >}}
