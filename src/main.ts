// src/main.ts

import { Devvit, SettingScope } from "@devvit/public-api";
import { handleBanUserMenuItemPress } from "./handleBanUserMenuItemPress.js";
import { muteUser, unmuteUser } from "./muteUser.js";
import { unbanUser } from "./unbanUser.js";

Devvit.configure({
  redditAPI: true,
});

export let subredditRules = [];
/**
* A function to load subreddit rules the user has entered in app settings
*/
export async function loadSettings(context: { settings: { getAll: () => any; }; }) {
  const settings = await context.settings.getAll();
  const rulesString = typeof settings.subredditRules === 'string' ? settings.subredditRules : '';
  subredditRules = rulesString.split(',').map((rule: string) => rule.trim()).filter((rule: string) => rule !== '');
}

// A function to validate the format of the subreddit rules
function isValidRulesFormat(value: string | undefined): boolean {
  // Return false if the value is undefined
  if (value === undefined) return false;

  // Proceed with the rest of the validation for a string value
  const rulesArray = value.split(',');
  return rulesArray.every(rule => rule.trim().length > 0); // Checks if each rule is not just whitespace
}

// Add settings configuration with validation
Devvit.addSettings([
  {
      type: 'string',
      name: 'subredditRules',
      label: 'Enter a comma-separated list of subreddit rules',
      scope: SettingScope.Installation,
      onValidate: ({ value }) => {
          if (!isValidRulesFormat(value)) {
              return 'Please enter rules in a valid comma-separated format.';
          }
      },
  },
]);

/**
 * Add Ban, Unban, Mute, and Unmute User options to the overflow menu
*/
  Devvit.addMenuItem({
    label: 'Ban User',
    location: ['post', 'comment'],
    forUserType: 'moderator',
    onPress:handleBanUserMenuItemPress,
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
  
/**
  * Add Mute User option to the overflow menu
*/
  Devvit.addMenuItem({
    label: 'Mute User',
    location: ['post', 'comment'],
    forUserType: 'moderator',
    onPress: muteUser,
  });
  
/**
 * Add Unmute User option to the overflow menu
*/
  Devvit.addMenuItem({
    label: 'Unmute User',
    location: ['post', 'comment'],
    forUserType: 'moderator',
    onPress: unmuteUser,
  });

  export default Devvit;