# Modqueue Enhancer

Modqueue Enhancer is a tool that enhances the modqueue functionality on Reddit by adding options such as Ban, Unban, Mute, and Unmute to the modqueue overflow menu.

## Installing Modqueue Enhancer For Usage

## Usage

To use the Modqueue Enhancer, a subreddit moderator needs to install the app on their subreddit. Follow these steps to install and configure the app:

### Installing the App on Your Subreddit

1. Navigate to Mod Tools:
Log in to Reddit and go to your subreddit. Click on the 'Mod Tools' in the subreddit's sidebar to access the moderator tools dashboard.

2. Access the App Directory:
In the Mod Tools dashboard, find and click on 'Browse Apps' to view the list of available apps.

3. Install Modqueue Enhancer:
From the list of apps, select 'Modqueue Enhancer'. Follow the on-screen instructions to complete the installation process.

### Configuring Subreddit Rules

After installing and running Modqueue Enhancer, you need to set up the subreddit rules to enable the dropdown functionality in the Ban User form. This is done via the app settings in the Reddit Developer platform.

### Setting Up Subreddit Rules

1. Access the App Settings Page:
Go to `https://developers.reddit.com/r/<YourSubredditName>/apps/modqueue-enhance` to access the settings page of the Modqueue Enhancer for your subreddit.

2. Enter Subreddit Rules:
In the 'Subreddit Rules' field, enter a comma-separated list of rules that you want to appear in the dropdown menu. For example:
`No spamming, Be respectful, No personal attacks, No illegal content`
Ensure that each rule is separated by a comma and there is no trailing comma at the end.

3. Save Changes:
After entering the rules, click the 'Save changes' button to update the settings.

### Using the Subreddit Rules in Modqueue Enhancer

Once the subreddit rules are set up and saved, they will appear in the dropdown menu of the Ban User form in the Modqueue Enhancer.
When you select 'Ban User' from the overflow menu, the dropdown in the Ban User form will now contain the rules you've set up for easy selection.

Ensure the Modqueue Enhancer is running.
Open the modqueue on Reddit.
The enhanced options (Ban, Unban, Mute, Unmute) should now be available in the overflow menu.

### Contributing

We welcome contributions to Modqueue Enhancer! To contribute, please follow these guidelines:

- Reporting Bugs: If you find a bug, please report it by creating a new issue and including detailed reproduction steps.
- Feature Requests: Have a suggestion? Open an issue to discuss new features or improvements.
- Pull Requests: For making changes, please fork the repository, make your changes, and submit a pull request. Ensure your code adheres to the coding standards of the project.
- Testing: Add tests for any new features to ensure they work as expected.
- Documentation: Update documentation to reflect any changes or new features.

### License

This project is licensed under the MIT License.
