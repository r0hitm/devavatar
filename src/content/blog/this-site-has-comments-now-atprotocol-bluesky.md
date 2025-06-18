---
pubDatetime: 2025-03-28T14:11:43.187Z
modDatetime: 2025-05-16T07:03:38.171Z
title: "This site has comments now using AT Protocol and Bluesky"
description: "I integrated the decentralized AT Protocol from Bluesky to add a commenting system to my personal website."
tags:
  - devlog
  - bluesky
  - at-protocol
---

**Update**: This is not working at the moment, because Bluesky removed public API search. Details are in [this issue](https://github.com/czue/bluesky-comments/issues/26).

I always wanted to add comments to my blog posts, but seeing most of the 3rd party solutions are not free or a privacy nightmare,
I never did. Until I discovered about Bluesky and its open [AT protocol](https://atproto.com). Bluesky is built on this protocol. (I recommend reading [Benefits of an open network](https://emilyliu.me/blog/open-network) to understand what this means). Tldr; because of the way the protocol works, we can use it as a comment system for any blog!

The comments are hosted on the network itself! And I am pulling from the post that links to this blogpost for the likes, reposts, replies. My implementation uses [Cory's component](https://github.com/czue/bluesky-comments), and initialized with author name.

My site is built using Astrojs, and there was a missing type declaration for the `bluesky-comments` package, and linters were screaming at my face. If you face something similar put the following in a new `.d.ts` file:

```ts
// env.d.ts
declare module "bluesky-comments";
```

Obviously, you won't get any nice type hintings and autocomplete on the component with this, but it will stop your editor from screaming.

Since, I have to create a post on bluesky linking the post for it to show up, the comments will only be available on posts going forward from this post. I do not really wanna retroactively go back to share old posts, well not yet, but most likely if I update them or go back during my procrastination time.

That's it! Comments should be working now on this very post. Also consider following me on bluesky [@devavatar.com](https://bsky.app/profile/devavatar.com).
