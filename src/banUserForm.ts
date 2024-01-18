import { Devvit } from "@devvit/public-api";
import { banUserFormHandler } from "./banUserFormHandler.js";



Devvit.configure({
  redis: true,
  redditAPI: true,
});

/**
* Create the form using Devvit.createForm
*/
export const banUserForm = Devvit.createForm(() => ({
  fields: [
    { name: 'reason', label: 'Ban Reason', type: 'string' },
    { name: 'modNote', label: 'Mod Note', type: 'string' },
    { name: 'banDays', label: 'Number of Days', type: 'number' },
    { name: 'customMessage', label: 'Message User', type: 'string' },
  ],
  title: 'Ban User Form',
  acceptLabel: 'Ban User',
}), banUserFormHandler);