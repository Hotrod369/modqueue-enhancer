import { Message } from "@devvit/protos";
import { Comment, Devvit, FormOnSubmitEvent, Post, User } from "@devvit/public-api";
import { getAuthor } from './redditUtils.js';


Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * Form handler for banning the user with additional options
 */
async function banUserFormHandler(event: FormOnSubmitEvent & { post?: Post; comment?: Comment }, context: Devvit.Context) {  // Log the entire event object for debugging
  console.log('banUserFormHandlerEvent:', JSON.stringify(event, null, 2));

  let author: User | undefined;
  let target: Post | Comment | undefined;
  let targetId: string | undefined;
  let commentId = event.comment?.id && `t1_${event.comment.id}`;
  let postId = event.post?.id && `t3_${event.post.id}`;
  
  let formEvent: FormOnSubmitEvent & { post: Post } & { comment: Comment } | undefined; // Initialize with a default value

  // Use a type guard to check if 'event' is a MenuItemOnPressEvent
  if ('targetId' in event && typeof event.targetId === 'string') {
    // It's a MenuItemOnPressEvent and targetId is a string
    targetId = event.targetId;

  } else {
    // It's a FormOnSubmitEvent
    formEvent = event as FormOnSubmitEvent & { post: Post } & { comment: Comment }; // Narrow down the type with a type assertion
    // Access 'values' to get 'targetId' if it exists
    targetId = formEvent.values?.targetId || undefined;
  }

  // Make sure targetId is defined before proceeding
  if (!targetId) {
    console.error('Error: targetId is undefined.');
    return; // or handle the error accordingly
  }

  // Use targetId to retrieve the post or comment object
  if (commentId && targetId.startsWith("t1")) {
    target = await context.reddit.getCommentById(targetId);
  } else if (postId && targetId.startsWith("t3")) {
    target = await context.reddit.getPostById(targetId);
  }

  // Check if targetId starts with "t1" (comment) or "t3" (post)
  if (commentId && targetId.startsWith("t1")) {
    // Handle comment logic...
  } else if (postId && targetId.startsWith("t3")) {
    // Handle post logic...
  }

  // Include the target in the data passed to the form
  const formData = {
    target: targetId,
  };

  // Check if formEvent is defined before using it
  if (formEvent) {
    // Get the author using the getAuthor function
    author = await getAuthor(formEvent, context);
  }

  if ('values' in event) {
    // It's a FormOnSubmitEvent
    const { ui, reddit } = context;
    const { reason, modNote, banDays, customMessage } = event.values;

    try {
      // Get the subreddit name dynamically
      const subredditName = (await context.reddit.getSubredditById(context.subredditId)).name;

      await reddit.banUser({
        subredditName: subredditName,
        username: author?.username || '', // Use optional chaining to handle the case when author is undefined
        duration: parseInt(banDays, 10) || 1,
        context: '',
        reason: `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit: ${reason}`,
        note: `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit: ${modNote}`,
        message: `Banned by ${(await context.reddit.getCurrentUser()).username} via Devvit: ${Message}`,
      });

      // Show toast after banning the user
      context.ui.showToast(`u/${author?.username} has been banned.`);
      console.log(`u/${author?.username} has been banned.`);
    } catch (error) {
      console.error('Error banning user:', error);

      // Show error toast
      context.ui.showToast(`Error banning u/${author?.username}. Check the console for details.`);
    }
  }
}

export default banUserFormHandler;