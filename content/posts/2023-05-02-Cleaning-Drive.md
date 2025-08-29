---
title: "Cleaning My Drive"
date: 2023-05-02T12:38:11-04:00
tags: ["diary", "dev"]
description: I get a ego boost by rifling through the trash
---

I clean out my drive every 6 months to 1 year. However, my most recent cleanup was preempted by necessity.

== What I learnt

I'm not a business person or senior developer, so no cheeky life lessons here.

Sometimes I feel like I'm not productive enough. Cleaning out my drive was clear proof this is not the case. I get the same realization when I uninstall unneeded packages.
I should start recording my work in diary entries, so its easier to find this information.

When I manually garbage collect like this, I can be more proactive by deleting large files when I'm done with them. However, "done" might be ill defined.

== What I Removed

NOTE: This list is neither exhaustive nor accurate. I ended up with 120gb /256 gb free.

I installed nix, a combination between a package manager and system configuration tool. I've solely been using it to mention project dependencies (go, python, native dependencies for projects), not systemwide packages / personal tools (ide, epub reader, music player, etc).
The nix store was using ~20gb. I'm using https://github.com/nix-community/nix-direnv[nix-direnv] to manage project dependencies _as I make changes_. Perhaps it failed to mark old versions of these requirements as unneeded. Perhaps I'm using the tool wrong. Either way, manually pruning my nix gc roots was easy. One project asked for a full latex distribution but did not use it.

I realized I still remained uncomfortably close to a full drive, and proceeded to clean further. I removed the following

* Docker for Mac (40-60gb)
** Images, volumes, Virtual Machine
** I was self hosting a number of apps, but that got annoying.

* System images for my old phone (10+ gb)
** I bricked my previous phone whilst flashing an os and failed to repair it.

* Downloaded movies (~4gb)
** Cant all be work and no play

* Compilation caches for go (~5 gb), ocaml, rust projects. I kept the source code around, of course.
** There were dozens of these hanging around. A handful were in the range of 0.5-1 gb!
** Many of these were duplicates of the same school projects from various semesters from my time TA'ing
** Rust caches in particular were larger
** There was one opam switch. I'm using nix for this use case now.

* Misc packages
** Rstudio, Intellij Idea, steam, etc (each > 1gb)
** Rust, go, ocaml: these are managed by nix on a per project level rather than globally.
** https://github.com/avast/retdec[retdec], gcc, pandoc
