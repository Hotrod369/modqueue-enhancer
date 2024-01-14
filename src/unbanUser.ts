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

  console.log('Unbanning user:', author.username);

  // Additional console log to check if the required properties are present
  console.log('Reddit:', reddit);

  try {
    // Additional console log before the ban operation
    console.log('Before Ban Operation');

    await reddit.unbanUser(author.username, 'privateTrump2024');({  // Replace with the actual subreddit name
      username: author.username,
      context: '',
      reason: `Unbanned by ${(await context.reddit.getCurrentUser()).username} via Devvit`,
      note: `Unbanned by ${(await context.reddit.getCurrentUser()).username} via Devvit`,
    });

    console.log('After Ban Operation');

    ui.showToast(`u/${author.username} has been unbanned.`);
    console.log(`u/${author.username} has been unbanned.`);
  } catch (error) {
    console.error('Error unbanning user:', error);
    ui.showToast(`Error unbanning u/${author.username}. Check the console for details.`);
  }
}