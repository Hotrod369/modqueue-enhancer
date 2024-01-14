import { Devvit } from "@devvit/public-api";
import { handleBanUserMenuItemPress } from "./handleBanUserMenuItemPress.js";
import { muteUser, unmuteUser } from "./muteUser.js";
import { unbanUser } from "./unbanUser.js";


Devvit.configure({
    redis: true,
    redditAPI: true,
  });

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