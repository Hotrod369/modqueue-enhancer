// src/unbanUser.ts

import { Devvit, MenuItemOnPressEvent } from "@devvit/public-api";
import { getAuthor } from "./redditUtils.js";


Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * Unban the user and display a toast
 */
export async function unbanUser(event: MenuItemOnPressEvent, context: Devvit.Context) {

  const author = await getAuthor(event, context);
  const { ui, reddit } = context;

    // Unban the user
    const subreddit = await reddit.getCurrentSubreddit();
    const currentUser = await reddit.getCurrentUser();
  
    if (author && author.username) {
    try {
      await reddit.unbanUser(currentUser.username, (await context.reddit.getSubredditById(context.subredditId)).name);
      ui.showToast(`u/${author.username} has been unbanned.`);
    } catch (error) {
      ui.showToast(`Error unbanning u/${author.username}. Check the console for details.`);
    }
  } else {
    ui.showToast('Error: Author is undefined or does not have a username.');
  }
}
