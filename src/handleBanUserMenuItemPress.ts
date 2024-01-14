import { Comment, Devvit, FormOnSubmitEvent, MenuItemOnPressEvent, Post } from "@devvit/public-api";
import { banUserForm } from "./banUserForm.js";

Devvit.configure({
  redis: true,
  redditAPI: true,
});

// Function to handle menu item press
export async function handleBanUserMenuItemPress(event: MenuItemOnPressEvent | FormOnSubmitEvent, context: Devvit.Context) {
  // Log the entire event object for debugging
  console.log('handleBanUserMenuItemPressEvent:', JSON.stringify(event, null, 2));
  
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

  // Show the banUserForm with the form data
  await context.ui.showForm(banUserForm, { data: formData });
  // Log the entire formEvent object
  console.log('banUserForm:', JSON.stringify(banUserForm, null, 2));
  console.log('formData:', JSON.stringify(formData, null, 2));
}