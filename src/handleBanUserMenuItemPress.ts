// src/handleBanUserMenuItemPress.ts

import { Devvit, FormOnSubmitEvent, MenuItemOnPressEvent } from "@devvit/public-api";
import { banUserForm } from "./banUserForm.js";
import { getAuthor } from "./redditUtils.js";

// Configuring Devvit with required plugins
Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * This function handles the menu item press event for banning a user.
 * It either displays a form for banning or processes the submitted form.
 */
export async function handleBanUserMenuItemPress(event: MenuItemOnPressEvent | FormOnSubmitEvent, context: Devvit.Context) {
  console.log('handleBanUserMenuItemPressEvent:', JSON.stringify(event, null, 2));

  // Check if the event is a MenuItemOnPressEvent (initial menu item click)
  if ('targetId' in event && 'location' in event) {
    // Fetching the author's details based on the menu item event
    const author = await getAuthor(event, context);
    console.log('Called Author:', author.username);

    // Displaying the form to get ban details from the moderator
    context.ui.showForm(banUserForm, { data: { authorId: author.id } });
  } 
  // Check if the event is a FormOnSubmitEvent (form submission)
  else if ('values' in event) {
    // Extracting submitted values from the form
    const formValues = event.values as any; // Casting to 'any' to access form values

    // Extracting the username from the form values, essential for banning
    const username = formValues.username;
    if (!username) {
      console.error('Error: Username not provided in form values');
      return;
    }

    // Fetching the subreddit name from the context
    const subredditName = (await context.reddit.getSubredditById(context.subredditId)).name;

    try {
      // Executing the ban logic with details provided in the form
      await context.reddit.banUser({
        subredditName: subredditName || '',
        username: username,
        duration: formValues.banDays ? parseInt(formValues.banDays, 10) : 1,
        context: '',
        reason: formValues.reason || 'Violation of subreddit rules',
        note: formValues.modNote || `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit`,
        message: formValues.customMessage || ''
      });

      // Displaying a toast message on successful ban
      context.ui.showToast(`u/${username} has been banned.`);
      console.log(`u/${username} has been banned.`);
    } catch (error) {
      // Logging and displaying error if the banning process fails
      console.error('Error banning user:', error);
      context.ui.showToast(`Error banning user. Check the console for details.`);
    }
  } else {
    // Logging an error if the event type is not recognized
    console.error('Event type not recognized');
  }
}

