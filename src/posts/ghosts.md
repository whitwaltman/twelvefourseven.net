---
title: Ghosts in the registers
---

Sometimes, when I've selected and copied a chunk of text and haven't pasted it yet, it feels like I've picked something up that I need to put down. The difference here is that I can't always remember the contents of the object I'm holding (on my clipboard).

In vim, I don't really feel the metaphorical *weight* of text I've yanked into a register. Perhaps it's because text manipulation is such a core aspect of the vim way of thinking? Moving objects around inside the buffer is cheap, easy — it's like the text is always fluid, never etched in place. Or maybe I just never learned to use vim idiomatically (for lack of a better term).

This sometimes bites me in the ass when I go to delete some arbitrary line or character, forgetting that I've already yanked something into the default register with the intention of teleporting it to another location. I forget how many actions vim treats with the same significance.

Sometimes I wonder if clipboard actions should *feel* heavier, more deliberate. The desktop metaphor reconstructs the physical experience of holding, moving, destroying objects. But the clipboard stays invisible, weightless. I think it makes me careless in that regard.

It'd be interesting if an editor spawned a tiny ghost of your last yank, hovering in the corner, reminding you: *Hey, you're carrying something fragile*. Maybe it'd fade over time, or grow heavier the longer you carry it around without putting it down. (As an aside, I wish it were easier to display your vim keystrokes visually on your screen. For activities like teaching and pair programming, I think this would be invaluable.)

Of course, I could just be smarter about how I use vim (i.e. use named registers). Maybe writing about it is the impetus I needed all along. I guess I'll find out.