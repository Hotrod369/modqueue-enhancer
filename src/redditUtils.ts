// src/redditUtils.ts
import { Comment, Devvit, MenuItemOnPressEvent, Post } from "@devvit/public-api";


  Devvit.configure({
    redis: true,
    redditAPI: true,
  });

  export async function getThing(event: MenuItemOnPressEvent, context: Devvit.Context): Promise<Post | Comment> {
    console.log('getThing event:', event);
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
    console.log('getThing result:', thing);
    return thing;
  }
  
  export async function getAuthor(event: MenuItemOnPressEvent, context: Devvit.Context) {
    console.log('getAuthor event:', event);
    const { reddit } = context;
    const thing = await getThing(event, context);
    const user = (await reddit.getUserById(thing.authorId!));
    console.log('getAuthor result:', user);
    return user;
  }
