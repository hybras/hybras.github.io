---
title: "Rust Cross Compilation"
date: 2024-05-20T00:13:21-04:00
tags: ["rust", "llm"]
draft: true
---
:disclaimer: footnote:disclaimer[and not the terrible hacked together design and user interface lmfao]
:cache: footnote:tool-cache:[which is different from the regular cache]
:zig: https://zig.guide/build-system/cross-compilation/
:go: https://pkg.go.dev/github.com/ctdk/gox
:cmake: https://cmake.org/cmake/help/book/mastering-cmake/chapter/Cross%20Compiling%20With%20CMake.html
:rust: https://rust-lang.github.io/rustup/cross-compilation.html
:hyperfine: https://github.com/sharkdp/hyperfine/blob/e8ff88dad130d4b4bc2362be92aa8dfedc35074a/.github/workflows/CICD.yml
:just: https://github.com/casey/just/blob/587843f09cadcf9668c33a11e65d58d4a62ba2d0/.github/workflows/release.yaml

> TLDR: Here's the repo: https://github.com/hybras/actions-rust-cross

So I decided to finally setup a CICD pipeline for https://github.com/hybras/asciidoctor-server[asciidoctor-server].
I felt the lack of automated testing/releases held me back{disclaimer} from promoting it to others.

Lets set up a GitHub actions workflow (or two) that runs the nonexistent test suite and publishes artifacts upon creating git tags!

And since the year is 2024, we will do it using github copilot (henceforth known as "the llm") and shameless theft (from other open source projects)!

== Publishing the Server

This was so easy I didn't even need to cheat (with copilot's help) or steal.
Since the server is written in ruby, I used the provided https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-ruby#publishing-gems[github actions template for ruby projects].
It is dead simple.
I've used portions of it for my blog's publishing.
It boils down to:
. https://github.com/ruby/setup-ruby[Install Ruby]
. Test (if you want)
. Publish (`gem build` & `gem publish`)

The https://github.com/ruby/setup-ruby[ruby/setup-ruby] github action is a standard to which all actions should aspire.
It will cache downloaded ruby toolchains (using github action's tool cache{cache}) to avoid repeated downloads.
Your project's dependencies can also be cached (using github action's cache).
Getting up and running from cache takes seconds which is very nice.

== Publishing the Client

The client is written in rust.
I'd like to distribute executables, so now I need to worry about providing executables for various os/arch/libc combos ("platforms" or "targets").

Like {go}[go], {zig}[zig], and {cmake}[c], {rust}[rust] makes cross compilation as easy as pie.
You pass the platform you want and cross compilation just works:tm: (you'll need to specify a c toolchain / linker)
As usual however, the shoddy c/cpp devex means you must often summon cthulu (which is no different from regular builds).

=== What I won't do

Now here lies my first problem... it appears the most popular option for rust cross compilation is to ignore all this and instead https://github.com/cross-rs/cross[run the compiler in a container/emulator].
Logically, this makes sense.
You can now build _and_ test your executables (thanks to emulation), containers make it easy to manage compiler toolchains, and together they allow you to easily compile for (almost) every platform rust supports.
But I will be damned if I need this much docker bloat just to compile.

An emulator inside a container inside a vm has got to be a violation of the geneva convention.
The thought of this running in CI made me shudder.

=== Researching alternatives

A good 60% solution would be to install the necessary toolchains and specify the requisite linker for only the platforms I need.
Should be easy (famous last words), since debian considers this https://wiki.debian.org/Multiarch[a valid usecase] (github actions run on ubuntu, a debian derivative).

=== Round 1

Github actions supports basic text processing, so my first iteration took advantage of this.
Look at the required toolchain, and install the necessary rust and c toolchain support.
Unfortunately, many of the forum and blog posts I found on what I needed to install were out-of-date.

One post suggested I compile my own c toolchain.
Most other online resources were more tame in their trespasses, suggesting only part of what I needed, or using old dependency names (the necessary debian packages have since been renamed/split/merged).

The key insight was when I looked for a real world example and found {hyperfine}[hyperfine's pipeline] and {just}[just's pipeline].
Armed with their example, I knew what to search for in debian's package repos.
Strangely, hyperfine does not use the "native" cross compilation support for linux platforms, instead using cross.
This is despite a half baked attempt to {hyperfine}#L91-L97[set it up].

The llm was ok-ish here.
It knew how to write github actions workflows (I don't know all the yaml properties), and it knew about the most popular actions for many tasks.
Unfortunately, it bungled syntax and variable names a few times (getting yaml property nesting, indentation, and the templating syntax wrong).
My IDE caught https://marketplace.visualstudio.com/items?itemName=me-dutour-mathieu.vscode-github-actions[some of this], but not all.
Very frustrating adding functionality, and seeing "workflow failed to start" with no debug info.
I had to google to realize syntax errors could cause this.

== Round 2

By now I'd gotten ambitious and decided to publish binaries for {x86, i686, aarch64, armv6} X {glibc, musl libc}, a full 8 targets (I'm considering adding armv7). I decided to abandon actions' basic text processing and write a shell script.

LLM was decently helpful here scaffolding out the script and adding key sections in response to comments.
It was fairly hit or miss.
Syntax would be missing, and some things it didn't understand / generate.
It was very useful for duplicating code with minor variations (for all of the platforms).
It wasn't the best code, but llm mostly understood what I was going for.

== Round 3 (Abandoned)

I had another "great idea": the best github actions are written in javascript.
JS has access to the actions api!
This must be more efficient!

The quality of llm's javascript was just subpar (compared to shell).
Missing imports, syntax, and plenty of things that would be caught by a type system.
Not to mention, I couldn't test anything now because I couldn't mock that fancy api (that I wasn't really using).
In the shell, some of the more basic actions stuff is available with handy shell idioms.
I got caught by the js hype.

Not saying "JS Bad", just that I made a bad decision and the llm exacerbated it.
For the kinds of stuff I needed (managing env vars, stdio, text munging), shell is just better.
I threw the js port away.

== Testing

The only way for me to test all (across the various architectures) this was to setup CI for my new action. This wasn't too bad

It helped that the "test" is simply compiling hello world. I'm not even running the executable, since I don't want to setup emulator.
