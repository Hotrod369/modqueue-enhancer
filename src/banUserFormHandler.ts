import {
  Comment,
  Devvit,
  FormOnSubmitEvent,
  MenuItemOnPressEvent,
  Post
} from "@devvit/public-api";

Devvit.configure({
  redis: true,
  redditAPI: true,
});

export async function banUserFormHandler(event: FormOnSubmitEvent, context: Devvit.Context) {
    console.log('banUserFormHandler:', JSON.stringify(event, null, 2));

        // Extract the form values
        const { reason, modNote, banDays, customMessage } = event.values;

async function banUserFormEventHandler(event: MenuItemOnPressEvent, context: Devvit.Context) {
  console.log('banUserFormHandlerEvent:', JSON.stringify(event, null, 2));    

    let targetId: string | undefined;
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
    console.log('formData:', JSON.stringify(formData, null, 2));

    if (!target) {
      console.error('Error: Target not found.');
      context.ui.showToast('Error: Target information is missing.');
      return;
    }

    try {
        // Perform the ban operation using the target details
        await context.reddit.banUser({
          subredditName: target.subredditName,
          username: target.authorName,
          duration: parseInt(banDays, 10) || 1,
          context: target.id,
          reason: reason || 'Violation of subreddit rules',
          note: modNote || 'Banned via Devvit mod tool',
          message: customMessage || '',
        });

        context.ui.showToast(`User ${target.authorName} has been banned.`);
        console.log(`User ${target.authorName} has been banned.`);
    } catch (error) {
        console.error('Error banning user:', error);
        context.ui.showToast(`Error banning user. Check the console for details.`);
      }
    }
  }