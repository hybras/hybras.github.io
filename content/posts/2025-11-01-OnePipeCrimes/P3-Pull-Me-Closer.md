---
title: "Part 3 - Pull Me Closer"
date: 2025-11-03T21:40:07-05:00
tags: ['dev', 'diary']
---

Our operations org has its own PR review bot, a truly nifty utility.
It is very useful to have a standardized review process across our various repositories.

## Our Relationship is Beyond Labels

Its key feature is the ability to oversee a "permitted" label.
Our operations org does not have (meaningful) QA copies of any resources, neither our CI/CD nodes nor the logic that runs on them.
In lieu of a proper staging environment, PRs to our pipeline logic may have this label applied by an engineer/Review bot to permit integration testing.
Our CI/CD nodes will check that this label is applied (technically, the pipeline logic checks itself) before executing non-production pipeline logic.

The label can only be applied synchronously after the PR is green, but tests can take upwards of half an hour to complete (with occasional flakiness).
Updates to the PR (which are frequently required due to our rapid release schedule) will invalidate the label, ensuring that contributors spend a minimum of 1-2 hours babysitting their pull requests.

## Take Me to Your Leader

I mentioned to the senior engineer responsible for the review bot (how did they come to this role?), that the label could be applied asynchronously. This would require our CI/CD nodes to check that _all_ PR requirements are met (under the new assumption that they could happen in any order), rather than just the final one (under the current assumption that requirements are met sequentially).

They said "Cool" and it was never raised again.

## Testing Testing 1-2-3

Where do I fit into all this? Why do I complain so much? [What master do I serve](https://www.youtube.com/watch?v=jQoNILVFFvs&t=102s)?

I was assigned to write some tests for our PR review bot.
I decided I'd take a look under the hood of my favorite piece of software here at work!
Selfishly, I might also fix some stuff while I was here.

### Day 1

As any good little girl does, I started with my friend `main` (some rude people call her by her deadname lambda.handler).

```
def main(input)
    log(input)
    check_If_Repo_In_SupportedList(input)
```

I nodded along politely. It was only good manners to log everything.

But could it be, I wondered?
Surely, we'd only install the bot on supported repos.
Surely, the LIST to end all LISTS didn't exist?
I'd repeatedly complained to my colleagues that I didn't understand how everything within out department fit together, only to be brushed off.
"You'll figure it out"
"Focus on what you need"
I opened the function and was greeted with Operations in its full sprawl.
A few dozen repo's across 4-5 different GitHub organizations.
I'd only knew of a third of these.
I made a mental bookmark of this list.

But wait .... we'd recently had a re-org.
Teams had been assigned components and repositories all willy nilly.
The division of labor seemed funny to me at the time, but I was too new to ask about it.
Some components had been forgotten about, as I rudely found out with a 5am page.
Could it be, I wondered (again)?
I checked the list, to find those repositories missing.

Was this list the source of truth for the re-org?
No, no one would be so silly ...
But wait again!
The senior engineer (the one who owns this bot) made out quite handsomely in this re-org.
They received a promotion, relocation, and a new team to lead.
Was this list the source of truth for the re-org?

I realized I hadn't written any tests yet, so I stomached these treasonous thoughts and moved on.

```
ProcessInput(input)
```

A little vaguely named, but seemed like a good start. Let's finally take a real peek.

```
def processInput(input)
   Input.a = Input.inner.a
   Input.b = Input.elsewhere.b
```

Oh no.

```
   If (input.a)
	input.c = something_completely_made_up
```

Oh No Oh No.

I tried to make sense of it, but this morass continued across functions, files, and folders.
I checked the git history for The Last Person Who Actually Added Something (not bug fixes).
Hey, it's someone I trust.
I can ask them for help.

"Oh yeah, this repo sucks. It took us way too long to add anything".
Well shoot, I've spent a day reading the codebase with nothing to show for it.

### Day 2

Reading the code hadn't helped, but I can at least look at the tests.
Surely, I can "borrow" some test cases (whilst also gaining some clarity).
I gather my strength.

```
mock(filesystem) { myFile = mockText }
assert(read(myFile) == mockText)
```

Wait a minute.
I literally just got here.
Please Don't do this to me.
_Cue 5 more test cases like this._
I check that they don't call any code, delete the pointless tests, and move on.

The rest are also unhelpful.
None of the functions that are tested receive any meaningful inputs, or return anything.
I only have the function names to go off of, but they also call each other in a tangled web.

Well shoot, I've spent a day reading the tests with nothing to show for it.

### Day 3

There's one folder I've been deliberately avoiding.
It's a mix of several different languages, and references to it from elsewhere have all been commented out.
Based on the name, it might unfortunately be exactly what I need.

I try my harder to ignore all the derelict config files.
No dice, anything that looks like code doesn't do anything.
I read a few ... still nothing.
Finally, I find one giant file ... describing test cases!
But there's only one?
And its a hello world test?
A few hundred lines for this?

Now I'm furious.
I read the entire commit history from start to finish.
The whole thing is like this.
Its not clear, but I get the sense this may have started as an intern project (or similar).

I give up.
Not my monkey, not my circus.
The blame game won't save me from writing tests!

### Day 4

It's the fourth day of this and I haven't written a single line.
But now I know ... that I know nothing about anything.

I turn the gnarled, disabled test cases into something readable, add the pipeline configuration needed to run them, and get the PR merged.

My manager asks me what took me so long.
I have no reply.

## Holler come High Hell or High Water

Our PR review bot has a sibling, the Assign Reviewers bot.
Once Assign-er ... er ... assigns reviewers, Review-bot will notify them.
This one is also broken most of the time.
