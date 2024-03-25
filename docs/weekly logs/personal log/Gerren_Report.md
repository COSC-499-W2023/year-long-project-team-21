# Gerren Hunter Personal Weekly Log

02/18 -> 03/03

Username: CookiedOutMonster

## My Features For This Week

Sorry I crashed really hard last week. This week I fixed up bugs and finished the categories PR. This PR included work relying on the backend implementation as well as the frontend specifically lying in how the request is being called. It was a tad more complicated than I originally expcted due to state and prop drilling in React Native since I am bassically creating different GET requests on the fly and handing them down to a child component. 

The bugs I fixed are: 
  - able to view posts on profile with no issues
  - Range bar set to "None" retrieves all the posts

The backed work I did was: 
  - Sten had a good basis for the categories but I couldn't use it unfortiantely. I had to refactor it because users could select more than one category. This meant retrieving all the GET requests parameters from the request and building a query around that.

The front end work I did was: 
  - Bug fixes above 
  - Dyynamically creating requests based on what the user has selected. E.g. if they have location turned off and a category like peantu-free selected, then I will build a query mirroring that ask. 

I will likely add a search bar to this PR since I kind of found my groove here and I don't expect this to be difficult now that I know how this will work. 

## Completed Features For This Week
- Bug fixes
- Categories, front end and back end. 

## Types of Tasks Worked On

![asddfg](https://github.com/COSC-499-W2023/year-long-project-team-21/assets/44909431/3340aa84-03ec-4cc7-b196-1a11b680e682)

