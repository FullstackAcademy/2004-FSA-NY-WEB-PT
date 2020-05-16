## React vs. What we do now

###  Todays Flow
1. Write some html
   - We haven't really discovered whether its better to write html, or build the html in JS, its mostly dealers choice
3. We write some JS that makes the html interactive
4. A user interacts with the html
5. Our JS runs, and likely updates the html
   - `render()` - we normally write a function that 're-renders' the entire web page, and while this is working for us right now, as our applications become more and more complex, this is going to be wildly inefficient

### React Flow
1. We still start with an initial "template" if you will - some initial view for the DOM.
2. We still define JS that describes the interaction between users and the DOM.
3. We still cause the page to change due to the interactions users have with the dom.
4. All of the things mentioned previously are written in the same place. React has a concept of 'components' and components actually own their own html, and js in the same place. (JSX)
5. THE BIG THING - In react, WE NO LONGER SPECIFY WHEN TO CALL RENDER.
