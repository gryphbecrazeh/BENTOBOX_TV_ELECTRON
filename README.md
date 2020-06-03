## To Do

<!-- - Add search bar to search through episodes -->

- Add custom menu for electron to change open and close options
- Add transitions [Started]
- Develop Login/Register page and components
- Develop dashboard
- Develop series catalog page to show all series
- Set counter for reload, if it exceeds a couple reload attempts, display an error instead of continuing to attempt to pull
- Discover and set timeout for when the cdn episode link has expired
- ### Features
- Add download button, and add file system check for downloaded episodes to stream those instead of scraping
- Add download series button where it goes through every episode in the series that is not already downloaded, and downloads them
- Use Canvas and media api to generate gifs / take screenshots
- Use Media api to change watch speed
- Add 'flag filler' button to episodes / add option to skip filler based on episodes you've flagged as filler, as well as overall user feedback on the episode (if a majority of people flag an episode as filler, the episode is then flagged as filler by default)
- Add filler warning to episodes marked as filler by the majority with a skip episode button that takes you to when the filler arc ends (if many episodes in a row are flagged as filler, skip filler button will skip every filler episode in between where it starts and ends)
- Add 'spoiler-free' mode to black out the next episode button to prevent cover art from spoiling the next episode
- Add 'Custom Channel' feature where you add multiple series you like, and it plays all the series mixed together, like 1-2 episodes of naruto followed by 1-2 episodes of bleach, etc
- Add 'Custom Playlist' feature where you can add episodes to your playlist as you see fit
- Add 'Watch with friends' feature using socket.io (create chat, add friends, kick friends, pause, change watch speed, etc)

## Bugs

<!-- - Sometimes nextVideoLoaded doesn't get switched or the ternary operator doesn't pick it up -->

- Loading page has weird html animation
  <!-- - Videos scrape twice -->
  <!-- - Chromium Path doesn't work the first time an attempted episode -->
  - Changing to the next episode sometimes glitches out and loads the previous episode, might be an issue with async reloading
    <!-- - Adding a return statement to useEffect and navigating back to the catalog page breaks the program -->
      <!-- -Adding return specifically to the asynchronous calls causes it to break, adding it to the state updates helps keep the program from running multiple times -->
