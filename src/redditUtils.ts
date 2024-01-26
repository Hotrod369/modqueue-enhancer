// src/redditUtils.ts
import { Comment, Devvit, MenuItemOnPressEvent, Post } from "@devvit/public-api";


  Devvit.configure({
    redis: true,
    redditAPI: true,
  });
/**
 * Get the offending post or comment
 */
  export async function getThing(event: MenuItemOnPressEvent, context: Devvit.Context): Promise<Post | Comment> {
    const { location, targetId } = event;
    const { reddit } = context;
    let thing;
    if (location === 'post') {
      thing = await reddit.getPostById(targetId);
    } else if (location === 'comment') {
      thing = await reddit.getCommentById(targetId);
    } else {
      throw 'Cannot find a post or comment with that ID';
    }
    return thing;
  }

/**
 * Get the author of the post or comment
 */  
  export async function getAuthor(event: MenuItemOnPressEvent, context: Devvit.Context) {
    const { reddit } = context;
    const thing = await getThing(event, context);
    const user = (await reddit.getUserById(thing.authorId!));
    return user;
  }
