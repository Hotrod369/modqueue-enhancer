// src/handleBanUserMenuItemPress.ts
import { Devvit, FormOnSubmitEvent, MenuItemOnPressEvent } from "@devvit/public-api";
import { banUserForm } from "./banUserForm.js";
import { loadSettings } from "./main.js";
import { getAuthor } from "./redditUtils.js";

// Configuring Devvit with required plugins
Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * This function handles the menu item press event for banning a user.
 * It displays a form for banning and processes the submitted form.
 */
export async function handleBanUserMenuItemPress(event: MenuItemOnPressEvent | FormOnSubmitEvent, context: Devvit.Context) {

  // Check if the event is a MenuItemOnPressEvent (initial menu item click)
  if ('targetId' in event && 'location' in event) {
    // Fetching the author's details based on the menu item event
    const author = await getAuthor(event, context);

        // Load settings before showing the form
        await loadSettings(context);

    // Displaying the form to get ban details from the moderator
    context.ui.showForm(banUserForm, { data: { authorId: author.id } });
  }else if ('values' in event) {
    const { username, reason, modNote, banDays, customMessage } = event.values as any;

    // Ensure 'reason' is a string
    const banReason = Array.isArray(reason) ? reason[0] : reason;
    const shortBanReason = banReason.length > 100 ? banReason.substring(0, 97) + '...' : banReason;

    // Fetching the subreddit name from the context
    const subredditName = (await context.reddit.getSubredditById(context.subredditId)).name;

    try {
      // Execute ban logic using 'banReason'
      await context.reddit.banUser({
        subredditName: subredditName,
        username: username,
        duration: banDays ? parseInt(banDays, 10) : undefined,
        context: '',
        reason: banReason || 'Violation of subreddit rules', // Use 'banReason' here
        note: modNote || `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit`,
        message: ''
      });

        // Send a private message if customMessage is provided
      if (customMessage) {
        await context.reddit.sendPrivateMessage({
          to: username,
          subject: `Notification from ${subredditName}`,
          text: customMessage,
        });
      }
      // Display message the user has been banned
      context.ui.showToast(`u/${username} has been banned.`);
    } catch (error) {
      context.ui.showToast(`Error banning user. Did you enter the username correctly?`);
    }
  }
}

