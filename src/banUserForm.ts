// src/banUserForm.ts
import { Devvit, Form, FormFunction } from "@devvit/public-api";
import { handleBanUserMenuItemPress } from "./handleBanUserMenuItemPress.js";

const createBanUserForm: FormFunction = (data: any): Form => {
  const subredditRulesOptions = [
    { label: '#1 Reddit Sitewide Rules', value: 'Violation of Reddit content policy (e.g., off-topic, spam, dox, harassment).' },
    { label: '#2 Trolling, Bad Faith Participation', value: 'No trolling or bad faith participation tolerated.' },
    { label: '#3 Racism and Anti-Semitism', value: 'Racism and Anti-Semitism are not tolerated.' },
    { label: '#4 Doxing and Screenshots', value: 'No doxing or unauthorized screenshots. Censor user/sub names.' },
    { label: '#5 Vote Manipulation / Brigading', value: 'No vote manipulation or brigading allowed.' },
    { label: '#6 Ban Appeals, Suggestions, Concerns', value: 'Appeal bans or voice concerns via mod team, not PMs.' },
    { label: '#7 Threats towards Government Officials', value: 'No threats to officials. Report violence to FBI with evidence.' },
    { label: '#8 Karma Requirement', value: 'No trolling. Karma requirements apply.' },
    { label: '#9 We are Not Your Personal Army', value: 'Sub not for political recruiting or actions against individuals/groups.' },
    { label: '#10 Do not be Anti-Trump', value: 'Anti-Trump content may lead to a ban.' },
    { label: '#11 No Spam', value: 'No spam, including unauthorized merchandise links.' },
    { label: '#12 No Direct Links To Other subs', value: 'Use crosspost function for sharing. Limit 2 crossposts/day.' },
    { label: '#13 No Off-Topic post', value: 'Off-topic posts removed at moderator discretion.' },
    { label: '#14 Ban Evasion', value: 'Ban evasion will result in a ban.' }
  ];
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
