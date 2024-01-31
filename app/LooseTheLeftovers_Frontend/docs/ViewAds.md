## Home.tsx

Starts at screens/home

home renders PostListRenderer which comes from components

## PostListRenderer

Looks like this component does a few things.

- has some state

  - posts, setPosts => the individual ads I guess
  - isLoading, setisLoading => boolean flag dictating if it's loading. I suppose it'll
    display a spinning wheel of sorts.

- filterData: not really sure the point of this but it takes in a JSON object and maps it to another JSON object. Don't really think this is nec tbh..

- fetchData: This is important.

  - declares setPosts which is state to an empty array
  - calls the api
  - sends the response to filteredPosts
  - updates the state to include the newly fetched data
  - After all that

- renderPostItem:

  - useCallBack hook
  - from what I understand is that it creates a post
  - renders a post component

- handleLoadMore
  - This is where the lazy loading comes in.
  - sets the boolean flag loading to true
  - calls fetchData again to load more data
  - unsure the point of the lastItemIndex

Then it returns a flatList - onEndReached calls handleLoadMore - renderItem? post - data = {posts} - This is the aray of data that the list will display

## Post

This component represents a post card containing information about a post.

Renders the image with this function coming from ../common/postUtils - renderPostImage

assignColor - takes in color from the backend and displays it - calls getCardColors which is from postUtils - getCardColors generates the 3 colors for you

handlePressIn()  
 - makes an animation for pressing in

handleCardClick() - handles navigation to View_Post, sends in a id as the prop

## postUtils

I am not sure where this class is being called

- renderPostImage

  - this is where the hardcoding of the image comes from.
  - takes in imageStyle, size, and source....

- render_Icons
  - This can be fixed so it intakes a string and then will render the icon based on the string I guess

## View_Post

- Lots of work needs to be done here, maybe I'll do this tomorrow.

- renderPostImage

- render_Card_Front
  - this is where the magic happens baby
