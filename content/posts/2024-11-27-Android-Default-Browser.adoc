---
title: "Android Default Browser"
date: 2024-11-27T23:41:59-05:00
---

It seems across android 10-12, the ability to avoid setting a default browser was removed.
Previously, if the default was unset, a dialog would pop up for links requesting a decision of browser.
That dialog is gone (although the one suggesting you _change_ your default, used by browser to assert themselves, remains).
In lieu of being unset, it now defaults to the first/only browser app.
I tried removing all browser apps, and then reinstalling several concurrently, but it didn't work (the first browser to download won and became the default).

Forcing users to pick a default increases switching costs, entrenching the dominant position (in this case, the Chrome/Android/Google monopoly).
Functionally has been _removed_: users who wanted to avoid switching could always just set a default.
Fuck Google

== Taking back control

I couldn't find any browser switcher apps (similar to https://browserosaurus.com/[browsersaurus for macos]) to restore the lost functionality.
I vaguely remembered using a browser called Chromer with some minor switching feature, and there were competitors at the time (when I was in high school).
Seems they're all gone.
I was able to find the https://github.com/arunkumar9t2/lynket-browser[Chromer source and old builds], seems it was renamed and then abandoned.
Such is the nature of OSS, free projects languish.

== Links

* https://www.reddit.com/r/GooglePixel/comments/qc02y1/android_12_forces_you_to_choose_a_default_browser/
* https://forum.sailfishos.org/t/android-reset-which-app-is-used-to-open-links/14165
* https://forums.androidcentral.com/threads/default-browser.1043199/
