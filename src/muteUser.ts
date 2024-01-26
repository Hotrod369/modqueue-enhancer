// src/muteUser.ts
import { Devvit, MenuItemOnPressEvent } from "@devvit/public-api";
import { getAuthor } from "./redditUtils.js";


Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * Mute the user for 28 days and display a toast
 */
export async function muteUser(event: MenuItemOnPressEvent, context: Devvit.Context) {

  const author = await getAuthor(event, context);
  const { ui, reddit } = context;

  const subreddit = await reddit.getCurrentSubreddit();
  const currentUser = await reddit.getCurrentUser();

  if (author && author.username) {
    (await context.reddit.getSubredditById(context.subredditId)).name;
    try {
      // Mute the user for 28 days
      await reddit.muteUser({
        subredditName: subreddit.name,
        username: author.username,
        note: `Muted by ${currentUser.username} via Devvit`,
      });

      ui.showToast(`u/${author.username} has been muted for 28 days.`);
    } catch (error) {
      ui.showToast(`Error muting u/${author.username}. Check the console for details.`);
    }
  } else {
    ui.showToast('Error: Author is undefined or does not have a username.');
  }
}

/**
 * Unmute the user and display a toast
 */
export async function unmuteUser(event: MenuItemOnPressEvent, context: Devvit.Context) {

  const author = await getAuthor(event, context);
  const { ui, reddit } = context;

  // Unmute the user
    const subreddit = await reddit.getCurrentSubreddit();
    const currentUser = await reddit.getCurrentUser();

    if (author && author.username) {
      (await context.reddit.getSubredditById(context.subredditId)).name;
    try {
      await reddit.unmuteUser(currentUser.username, (await context.reddit.getSubredditById(context.subredditId)).name);

      ui.showToast(`u/${author.username} has been unmuted.`);
    } catch (error) {
      ui.showToast(`Error unmuting u/${author.username}. Check the console for details.`);
    }
  }
}