---
title: "Terpconnect Site"
date: 2021-09-29
tags: ["dev"]
---

It doesn't matter if your mac / win / lin.

When your making a website, it does not Just Work™. All filenames must be exact, all casing must be identical (FILE.JPG and file.jpg are not the same). Everything must be in the right place. Every opening tag/quote needs a closing one. You're used to software handling these things for you, that's ok.

Every piece of technology here has been continuously used longer than you've been alive (in some cases twice as old as you). There are no bugs, no kinks, no errors. Only your mistakes. Own up to them.

== Make a folder

Make a folder *just for your site* You can call it whatever, and keep it wherever, but it should only have ur site's files inside.

== Download the files

. https://www.astro.umd.edu/~peel/ePortfolio[Open peels template dir]
. Right click each file/link and click "save link as" / "download linked file"
. Rename `genericsplashpage.html` -> `index.html`

== Editing your site

You have 2 options. It roughly depends on whether ur a cs/ce/math major / how technical u r. 

. Downloading an editor and editing on your computer. 
.. Pro: work faster
.. Con: download an app you'll prolly never use again.
. Using an html editor website.
.. Pro: Download nothing
.. Con: More limited (usually only supports one page at a time), less features

=== Edit Locally

. Download an editor. Pick one. I use VS Code, but thats because I also use it for other stuff. You can other others
.. https://code.visualstudio.com/[VS Code]
.. https://www.sublimetext.com/[Sublime]
.. https://atom.io/[Atom]
. Open *The Folder* containing ur site in your editor. The folder. The folder. The folder

IMPORTANT: Splash page must be renamed to `index.html`. `index` is special. When you navigate to a folder in a web browser, the `index` page is served. if you imagine a file system as a tree, this means folders and files can both be web pages. If you don't rename it, people will have to remember the exact url to ur site, which is bad.

. Open the page ur editing in a browser (prefer chrome but idc). Reload whenever u make changes to it
. Format the page's source code (google "$MYEDITOR format document"). This indents stuff and makes it easier to read. 

=== Use a website editor

. Go to https://replit.com/[repl.it]
. Make an account
. make an html project / repl
. Upload ur files (not the folder the files are in, just the files).
. When ur done editing, download the files as a zip, unzip them, and replace your original folder with the unzipped copy.

=== Actually Editing

* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img[images]
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption[captioning an image]
* https://developer.mozilla.org/en-US/docs/Web/CSS/color[CSS Colors]
** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool[Color picker]

Remember that most (pretty much all) html <tags> need to be opened and closed </tags>. 

== Uploading

NOTE: Editing and uploading are two separate, independent steps. Your site will look exactly the same no matter where it is. If ur site doesn't work on ur computer, it wont work on terpconnect.

Install nothing. All upload/download software ever is a deception.

* macOS finder can connect to terpconnect ("Using your operating system")
* Everyone (including mac ppl) can use webdav ("Using a Web Browser
")
** Their guide says don't use chrome, ignore that its outdated

https://www.geol.umd.edu/sgc/resources/uploadguide.html[SGC Upload Guide]
