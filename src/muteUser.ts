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
    console.log('Mute User function called.');
  
    const author = await getAuthor(event, context);
    const { ui, reddit, scheduler } = context;
  
    console.log('Muting user:', author.username);
  
    // Mute the user
    const subreddit = await reddit.getCurrentSubreddit();
    const currentUser = await reddit.getCurrentUser();
  
    console.log('Subreddit:', subreddit.name);
    console.log('Current user:', currentUser.username);
  
    try {
      await reddit.muteUser({
        subredditName: subreddit.name,
        username: author.username,
        note: `Muted by ${currentUser.username} via Devvit`,
      });
    
      ui.showToast(`u/${author.username} has been muted for 28 days.`);
      console.log(`u/${author.username} has been muted for 28 days.`);
    } catch (error) {
      console.error('Error muting user:', error);
      ui.showToast(`Error muting u/${author.username}. Check the console for details.`);
    }
  }
  
  /**
   * Unmute the user and display a toast
   */
  export async function unmuteUser(event: MenuItemOnPressEvent, context: Devvit.Context) {
    console.log('Unmute User function called.');
  
    const author = await getAuthor(event, context);
    const { ui, reddit } = context;
  
    console.log('Unmuting user:', author.username);
  
    // Unmute the user
    const subreddit = await reddit.getCurrentSubreddit();
    const currentUser = await reddit.getCurrentUser();
  
    console.log('Subreddit:', subreddit.name);
    console.log('Current user:', currentUser.username);
  
    try {
      await reddit.unmuteUser(author.username, subreddit.name);
  
      ui.showToast(`u/${author.username} has been unmuted.`);
      console.log(`u/${author.username} has been unmuted.`);
    } catch (error) {
      console.error('Error unmuting user:', error);
      ui.showToast(`Error unmuting u/${author.username}. Check the console for details.`);
    }
  }