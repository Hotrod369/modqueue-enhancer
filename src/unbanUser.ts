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
  console.log('Ban User function called.');

  // Additional console log to check if the context is valid
  console.log('Context:', context);

  const author = await getAuthor(event, context);
  const { ui, reddit } = context;

  console.log('Unbanning user:', author);

  // Additional console log to check if the required properties are present
  console.log('Reddit:', reddit);

    // Unban the user
    const subreddit = await reddit.getCurrentSubreddit();
    const currentUser = await reddit.getCurrentUser();
  
    console.log('Subreddit:', subreddit.name);
    console.log('Current user:', currentUser.username);

    console.log('Unbanning user:', currentUser.username);
  
    if (author && author.username) {
      console.log('Unbanning user:', author.username);
    
    try {
      console.log('Before Ban Operation');
  
      await reddit.unbanUser(currentUser.username, (await context.reddit.getSubredditById(context.subredditId)).name);
  
      console.log('After Ban Operation');
  
      ui.showToast(`u/${author.username} has been unbanned.`);
      console.log(`u/${author.username} has been unbanned.`);
    } catch (error) {
      console.error('Error unbanning user:', error);
      ui.showToast(`Error unbanning u/${author.username}. Check the console for details.`);
    }
  } else {
    console.error('Author is undefined or does not have a username.');
    ui.showToast('Error: Author is undefined or does not have a username.');
  }
}
