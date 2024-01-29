# Team 21 - 01/22 to 01/28

## Overview

This week, our team achieved several milestones:

- Successfully implemented the **ChatList** screen.
- Enabled network requests on the **CreateAd** screen, including image uploads.
- Managed scheduled meetings and effectively led team discussions.
- Provided assistance to Nicholas in overcoming challenges.
- Engaged in thorough code reviews for ongoing projects.

**Authentication Challenges:**
While making progress, we encountered a challenge with authentication. We aimed to allow users access to secure endpoints by implementing a session storage that stores tokens and user information. Currently, we've achieved successful user logins, but the process involves several asynchronous operations. Concerns were raised about potential issues in the event loop due to multiple 'await' keywords. We're exploring solutions, considering options like wrapping requests in promises or utilizing try-catch blocks.

**Navigation Enhancements:**
Additionally, we implemented stack navigation to seamlessly transfer parameters between the **Home** screen and the **View post** screen.

**Frontend Development:**
The frontend development for both the **Home** screen and the **View post** screen has been a focus, involving tasks such as retrieving user profile information, completing the redesign of the login and registration processes, and ensuring a polished user interface.

**Backend Implementation - Ad Retrieval and Frontend Communication:**

In parallel with frontend development, significant progress was made on the backend:

- Implemented robust functionality for retrieving ads from the server.
- Established a seamless communication channel between the backend and frontend to efficiently send ad data.

This backend enhancement ensures that the frontend receives up-to-date ad information, contributing to a cohesive and dynamic user experience. The integration of these features aligns with our goal of creating a fully functional and responsive application.


## Quick reminder for usernames

* CookiedOutMonster - Gerren Hunter
* n3c777 - Nicholas Chamberlain
* Rev-Rok - Sten Korver
* Keizo410 - Keizo Kato
* rogeonee - Egor Bezriadin

## Completed tasks for this week

- Refresh token authentication
- Retrieve user profile from backend
- Store ads with image in database
  
## Tasks in progress

- Frontend & backend connection for Home screen page and View ad page
- View Profile page for frontend
- Design refinement for tab bar, colors, etc.
  

## Burn Up Chart
![スクリーンショット 2024-01-28 182033](https://github.com/COSC-499-W2023/year-long-project-team-21/assets/90278067/9898f13a-c442-4177-bf9d-902a2440c794)


### Test Report

#### Test for modules (frontend)
![スクリーンショット 2024-01-28 183220](https://github.com/COSC-499-W2023/year-long-project-team-21/assets/90278067/5b3f4453-5e9c-47bc-ac01-49590aedba45)

#### Test for modules (backend)
![backend test 16](https://github.com/COSC-499-W2023/year-long-project-team-21/assets/90278067/231822be-f0b9-4ff6-963c-978e72a1404e)


### Project Board
![スクリーンショット 2024-01-28 182626](https://github.com/COSC-499-W2023/year-long-project-team-21/assets/90278067/52d6f48c-35a0-412e-aec9-0eb30437d51e)


## Individual Reports

1. [Nicholas](../personal%20log/Nicholas_Report.md)
2. [Sten](../personal%20log/Sten_Report.md)
3. [Gerren](../personal%20log/Gerren_Report.md)
4. [Keizo](../personal%20log/Keizo_Report.md)
5. [Egor](../personal%20log/Egor_Report.md)
