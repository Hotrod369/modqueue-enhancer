import { Devvit, MenuItemOnPressEvent } from "@devvit/public-api";


  Devvit.configure({
    redis: true,
    redditAPI: true,
  });

  export async function getAuthor(event: MenuItemOnPressEvent, context: Devvit.Context) {
    const { reddit } = context;
    const thing = await getThing(event, context);
    console.log('getAuthor - thing:', JSON.stringify(thing, null, 2));
  
    if (thing && 'authorId' in thing) {
      return await reddit.getUserById(thing.authorId!);
    } else {
      console.error('getAuthor - Author ID is undefined or not present in the thing object.');
      return undefined;
    }
  }

async function getThing(event: MenuItemOnPressEvent, context: Devvit.Context) {
  const { location, targetId } = event;
  const { reddit } = context;
  if (location === 'post') {
    return await reddit.getPostById(targetId);
  } else if (location === 'comment') {
    return await reddit.getCommentById(targetId);
  }
  throw 'Cannot find a post or comment with that ID';
}