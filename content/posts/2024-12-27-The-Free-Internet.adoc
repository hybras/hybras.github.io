---
title: "The Free Internet"
date: 2024-12-27T09:19:47-05:00
tags: ["dev", "diary"]
---

A couple years ago, there was surge in interest in building "proxies" for the most popular online services. They were all inspired by each other.

* Youtube => Invidious 
* Reddit => Teddit and Libreddit
* Twitter => Nitter
* Bibliogram => Instagram

All of these services were popular, with dozens of public instances.
Public instances were often slow, but I enjoyed browsing with user-friendly ui's with no bloat ((unnecessary) javascript, ads, animations, etc).

Public instances were plagued with abuse, implementing rate-limiting, disabling features, going offline, and asking for donations.
Private instances didn't have this problem, obviously.

Many of the code bases were licensed under the GPL, promoting collaboration as people shared their customizations (usually just css/ui changes).

At a certain point, seemingly all at once, all these proxy services stopped working as more stringent rate limiting was implemented (neutering public instances), and newer client checks were added (which the community seemed unwilling to address given the lack of public instances).

Perhaps it was unrealistic to expect public instances to survive, given rate-limiting.
But I was surprised that once public instances went down, so did the community.
I guess there was a symbiotic relationship between those hosting and those developing, and these two groups didn't intersect enough to keep things going.

I took down my https://github.com/hybras/home[private instances] (link:{{< ref "/posts/2023-05-02-Cleaning-Drive.adoc" >}}[I was "self-hosting" on my laptop]).

It seems only the 3rd party youtube clients survive, though not invidious (and youtube clients predate this proxy fad).
What a loss.

== Links

* https://cadence.moe/blog/2022-09-01-discontinuing-bibliogram[Discontinuing Bibliogram
]
* https://github.com/libreddit/libreddit/issues/840[ Libreddit's Public Instances are Shutting Down]
* https://github.com/iv-org/invidious/issues/4734[Invidious public instances are blocked]

