import {
  Comment,
  Devvit,
  FormOnSubmitEvent,
  MenuItemOnPressEvent,
  Post,
  User
} from "@devvit/public-api";
import { Thing } from './types.js';


  Devvit.configure({
    redis: true,
    redditAPI: true,
  });

export async function getAuthor(event: MenuItemOnPressEvent | (FormOnSubmitEvent & { post: Post } & { comment: Comment }), context: Devvit.Context): Promise<User> {
  const { reddit } = context;
  const thing = await getThing(event, context);
  return await reddit.getUserById(thing.authorId!);
}

export async function getThing(event: MenuItemOnPressEvent | (FormOnSubmitEvent & { post: Post } & { comment: Comment }), context: Devvit.Context): Promise<Thing> {
  if ('location' in event) {
  const { reddit } = context;
  const { location, targetId } = event as MenuItemOnPressEvent;  }
  else {
  // TypeScript knows event is FormOnSubmitEvent & { post: Post } & { comment: Comment }
  const { post, comment } = event as FormOnSubmitEvent & { post: Post } & { comment: Comment };
}
  throw 'Cannot find a post or comment with that ID';
}