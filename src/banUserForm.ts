// src/banUserForm.ts
import { Devvit, Form, FormFunction } from "@devvit/public-api";
import { handleBanUserMenuItemPress } from "./handleBanUserMenuItemPress.js";
import { subredditRules } from "./main.js"; // Import the updated rules array

// Configuring Devvit with required plugins
Devvit.configure({
  redditAPI: true,
});

/**
 * Create the Ban User Form
*/
const createBanUserForm: FormFunction = (formData: any): Form => {
  // Use the pre-loaded subredditRules here
  const subredditRulesOptions = subredditRules.map((rule: any) => ({ label: rule, value: rule }));

/**
 * Define the Ban User form fields here
*/
  return {
    fields: [
      { name: 'username', label: 'Enter Username', type: 'string' },
      { name: 'reason', label: 'Ban Reason', type: 'select', 
        options: subredditRulesOptions.length > 0 ? subredditRulesOptions : [{ value: 'default', label: 'Other' }] },
      { name: 'modNote', label: 'Mod Note', type: 'string' },
      { name: 'banDays', label: 'Number of Days: Leave at 0 to permanently ban', type: 'number' },
      { name: 'customMessage', label: 'Message User', type: 'string' },
    ],
    title: 'Ban User Form',
    acceptLabel: 'Ban User',
  };
};

export const banUserForm = Devvit.createForm(createBanUserForm, handleBanUserMenuItemPress);
