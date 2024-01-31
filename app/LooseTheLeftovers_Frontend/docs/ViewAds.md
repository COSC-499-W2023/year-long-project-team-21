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

## Post component

This component represents a post card containing information about a post.

Renders the image with this function coming from ../common/postUtils - renderPostImage

## postUtils

I am not sure where this class is being called

- renderPostImage
  - this is where the hardcoding of the image comes from.
  - takes in imageStyle, size, and source....
