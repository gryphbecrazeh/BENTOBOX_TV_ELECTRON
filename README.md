## To Do

<!-- - Add search bar to search through episodes -->

- Add custom menu for electron to change open and close options
- Add transitions [Started]
- Develop Login/Register page and components
- Develop dashboard
- Develop series catalog page to show all series
- Set counter for reload, if it exceeds a couple reload attempts, display an error instead of continuing to attempt to pull

## Bugs

<!-- - Sometimes nextVideoLoaded doesn't get switched or the ternary operator doesn't pick it up -->

- Loading page has weird html animation
  <!-- - Videos scrape twice -->
  - Chromium Path doesn't work the first time an attempted episode
    - Changing to the next episode sometimes glitches out and loads the previous episode, might be an issue with async reloading
      <!-- - Adding a return statement to useEffect and navigating back to the catalog page breaks the program -->
        <!-- -Adding return specifically to the asynchronous calls causes it to break, adding it to the state updates helps keep the program from running multiple times -->
