---
title: "Asciicast Hugo Shortcodes"
date: 2021-01-18T21:02:53-05:00
subtitle: "Hugo shortcodes for asciinema"
asciinema: true
---
This article assumes you know what [Asciinema](https://asciinema.org) is, how to embed its [player widgets](https://asciinema.org/docs/embedding) (and widgets in general), and how to [self host asciinema](https://github.com/asciinema/asciinema-player/tree/master#self-hosting-quick-start) (ie use the `<asciinema-player>` tag). It also assumes you know how to create [hugo shortcodes](https://gohugo.io/templates/shortcode-templates)

I found a [blog post](https://www.tonylykke.com/posts/2018/06/20/embedding-asciinema-casts-in-hugo/) which describes how to integrate self hosted asciicasts into your hugo site. It includes a shortcode. This shortcode has a couple of shortcomings: it expects all parameters to be named (i.e. the shortcode is not [_flexible_](https://gohugo.io/templates/shortcode-templates/#positional-vs-named-parameters)), and it resets known default values. I found [another shortcode](https://github.com/laozhu/hugo-nuo/blob/master/layouts/shortcodes/asciinema.html). This one is well documented and flexible. Unfortunately, it only supports the remote player, and is too flexible (it allows all parameters to be positional). So what do I want from my shortcode?

1. 1 positional parameter for the source cast XOR named parameters
   1. Build Error when the above is violated
2. Self hosted casts
3. Don't redundantly set parameters / No default values / use asciicasts defaults
4. Attributes that accept urls should be marked safe (`safeURL`)

Which leads to something like this:

```html
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
{{ end }}></asciinema-player>
```

You may find the defaults undesirable (like rows and columns). Tony's shortcode maps id to `/casts/${id}.cast`. I instead take a url to it. You may like this grouping assets by filetype, and/or omitting file extension. His also gives default rows x columns. The default number of columns should come from the width of article. I don't know how to find this.

I include the asciinema css and js with the following in my template's  `<head>`. My hugo theme has partials for users to add whatever they want. You may need create your own partials and include them in your theme, or edit your theme directly. Note that I am defying the docs, placing the `defer`red script in `<head>`, instead of at the end of `<body>`.

```html
{{ if .Param "asciinema" }}
<link rel="stylesheet" type="text/css" href="{{ .Site.BaseURL }}/asciinema-player.css" />
<script src="{{ .Site.BaseURL }}/asciinema-player.js" defer></script>
{{ end }}
```

Here's an example. Note that it resizes upon loading, and doesn't preload.

```html
{{</* asciinema src="cast.cast" font-size="medium" */>}}
```

{{< asciinema src="cast.cast" font-size="medium" >}}
