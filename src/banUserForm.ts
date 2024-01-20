import { Devvit } from "@devvit/public-api";
import { handleBanUserMenuItemPress } from "./handleBanUserMenuItemPress.js";

Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
 * Create the form using Devvit.createForm
 */
export const banUserForm = Devvit.createForm((data) => {
  console.log('Received data in banUserForm:', JSON.stringify(data, null, 2));
  console.log('banUserForm:', JSON.stringify(banUserForm, null, 2));

  return {
    fields: [
      { name: 'username', label: 'Enter Username', type: 'string' },
      { name: 'reason', label: 'Ban Reason', type: 'string' },
      { name: 'modNote', label: 'Mod Note', type: 'string' },
      { name: 'banDays', label: 'Number of Days', type: 'number' },
      { name: 'customMessage', label: 'Message User', type: 'string' },
    ],
    title: 'Ban User Form',
    acceptLabel: 'Ban User',
  };
}, handleBanUserMenuItemPress);


