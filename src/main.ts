// modqueue-enhancer
import {
  Comment,
  Devvit,
  FormOnSubmitEvent,
  MenuItemOnPressEvent,
  Post,
  User,
} from '@devvit/public-api';

Devvit.configure({
  redis: true,
  redditAPI: true,
});

// Types
type Thing = {
  // Define the properties of Thing here
  authorId: string;
  // ... other properties
};

async function getAuthor(event: MenuItemOnPressEvent | (FormOnSubmitEvent & { post: Post }), context: Devvit.Context): Promise<User> {
  const { reddit } = context;
  const thing = await getThing(event, context);
  return await reddit.getUserById(thing.authorId!);
}

async function getThing(event: MenuItemOnPressEvent | (FormOnSubmitEvent & { post: Post }), context: Devvit.Context): Promise<Thing> {
  if ('location' in event) {
  const { reddit } = context;
  const { location, targetId } = event as MenuItemOnPressEvent;  }
  else {
  // TypeScript knows event is FormOnSubmitEvent & { post: Post }
  const { post } = event as FormOnSubmitEvent & { post: Post };
  // ... rest of your logic for FormOnSubmitEvent
}
  throw 'Cannot find a post or comment with that ID';
}

/**
 * Form handler for banning the user with additional options
 */
async function banUserFormHandler(event: FormOnSubmitEvent | MenuItemOnPressEvent, context: Devvit.Context) {
  // Log the entire event object for debugging
  console.log('banUserFormHandlerEvent:', JSON.stringify(event, null, 2));

  let author: User;

  if ('location' in event) {
    // It's a MenuItemOnPressEvent
    const menuItemEvent = event as MenuItemOnPressEvent;
    // Handle MenuItemOnPressEvent logic...
    // ...
  } else {
    // It's a FormOnSubmitEvent
    const formEvent = event as FormOnSubmitEvent & { post: Post }; // Ensure 'post' is always present

    // Extract the post ID
    const postId = formEvent.post.id;
    if (postId) {
      // Log the post or comment ID
      console.log('Post or Comment ID:', postId);
    }

    let targetId: string | undefined;
    let target: Post | Comment | undefined;

  // Use a type guard to check if 'event' is a MenuItemOnPressEvent
  if ('targetId' in event && typeof event.targetId === 'string') {
    // It's a MenuItemOnPressEvent and targetId is a string
    targetId = event.targetId;
  } else {
    // It's a FormOnSubmitEvent
    // Access 'values' to get 'targetId' if it exists
    targetId = event.values?.targetId;
  }

  // Make sure targetId is defined before proceeding
  if (!targetId) {
    console.error('Error: targetId is undefined.');
    return; // or handle the error accordingly
  }

    // Use targetId to retrieve the post or comment object
    if (targetId && targetId.startsWith("t1")) {
      target = await context.reddit.getCommentById(targetId);
    } else if (targetId && targetId.startsWith("t3")) {
      target = await context.reddit.getPostById(targetId);
    }

    // Check if targetId starts with "t1" (comment) or "t3" (post)
    if (targetId && targetId.startsWith("t1")) {
      // Handle comment logic...
    } else if (targetId && targetId.startsWith("t3")) {
      // Handle post logic...
    }

    // Include the target in the data passed to the form
    const formData = {
      target: target,
    };

    // Get the author using the getAuthor function
    author = await getAuthor(formEvent, context);

    if ('values' in event) {
      // It's a FormOnSubmitEvent
      const { ui, reddit } = context;
      const { reason, modNote, banDays, customMessage } = event.values;

      try {
        // Get the subreddit name dynamically
        const subredditName = (await context.reddit.getSubredditById(context.subredditId)).name;

        await reddit.banUser({
          subredditName: subredditName,
          username: author.username,
          duration: parseInt(banDays, 10) || 1,
          context: '',
          reason: `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit: ${reason}`,
          note: `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit: ${modNote}`,
        });

        // Show toast after banning the user
        context.ui.showToast(`u/${author.username} has been banned.`);
        console.log(`u/${author.username} has been banned.`);
      } catch (error) {
        console.error('Error banning user:', error);

        // Show error toast
        context.ui.showToast(`Error banning u/${author.username}. Check the console for details.`);
      }
    }
  }
}



// Function to handle menu item press
async function handleBanUserMenuItemPress(event: MenuItemOnPressEvent | FormOnSubmitEvent, context: Devvit.Context) {
  let targetId: string | undefined;

  // Log the entire event object for debugging
  console.log('handleBanUserMenuItemPressEvent:', JSON.stringify(event, null, 2));

  let target: Post | Comment | undefined; // Add explicit type declaration for target

  if ('targetId' in event) {
    // It's a MenuItemOnPressEvent
    targetId = event.targetId;
  } else {
    // It's a FormOnSubmitEvent
    const formEvent = event as FormOnSubmitEvent;
    targetId = formEvent.values?.targetId || undefined;
    console.log('formEvent:', JSON.stringify(formEvent, null, 2));
  }

  // Use targetId to retrieve the post or comment object
  if (targetId && targetId.startsWith("t1")) {
    target = await context.reddit.getCommentById(targetId);
  } else if (targetId && targetId.startsWith("t3")) {
    target = await context.reddit.getPostById(targetId);
  }

  // Check if targetId starts with "t1" (comment) or "t3" (post)
  if (targetId && targetId.startsWith("t1")) {
    // Handle comment logic...
  } else if (targetId && targetId.startsWith("t3")) {
  }

  // Include the target in the data passed to the form
  const formData = {
    target: target, // Include the target
  };

  // Show the banUserForm with the form data
  await context.ui.showForm(banUserForm, { data: formData });
// Log the entire formEvent object
console.log('banUserForm:', JSON.stringify(banUserForm, null, 2));
console.log('formData:', JSON.stringify(formData, null, 2));
}

/**
* Create the form using Devvit.createForm
*/
const banUserForm = Devvit.createForm(() => ({
  fields: [
    { name: 'reason', label: 'Ban Reason', type: 'string' },
    { name: 'modNote', label: 'Mod Note', type: 'string' },
    { name: 'banDays', label: 'Number of Days', type: 'number' },
    { name: 'customMessage', label: 'Custom Message', type: 'string' },
  ],
  title: 'Ban User Form',
  acceptLabel: 'Ban User',
}), banUserFormHandler);


/**
 * Unban the user and display a toast
 */
async function unbanUser(event: MenuItemOnPressEvent, context: Devvit.Context) {
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

/**
 * Mute the user for 28 days and display a toast
 */
async function muteUser(event: MenuItemOnPressEvent, context: Devvit.Context) {
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
async function unmuteUser(event: MenuItemOnPressEvent, context: Devvit.Context) {
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

/**
 * Add Ban, Unban, Mute, and Unmute User options to the overflow menu
 */
Devvit.addMenuItem({
  label: 'Ban User',
  location: ['post', 'comment'],
  forUserType: 'moderator',
  onPress: handleBanUserMenuItemPress,
});

/**
 * Add Unban User option to the overflow menu
 */
Devvit.addMenuItem({
  label: 'Unban User',
  location: ['post', 'comment'],
  forUserType: 'moderator',
  onPress: unbanUser,
});

Devvit.addMenuItem({
  label: 'Mute User',
  location: ['post', 'comment'],
  forUserType: 'moderator',
  onPress: muteUser,
});

Devvit.addMenuItem({
  label: 'Unmute User',
  location: ['post', 'comment'],
  forUserType: 'moderator',
  onPress: unmuteUser,
});

export default Devvit;