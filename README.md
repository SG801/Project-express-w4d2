
User Story 1: Set up basic Express application.

Description:


As Klara, a Full Stack Engineer at TrackIt I want to be able to use a framework so I can focus on building code that actually delivers the features I need to build.



As John, a project manager at TrackIt I want our engineers to use modern frameworks that that they can ship features quickly and safely.




Acceptance Criteria:

Given I am a new developer joining the team,
When I clone down the backend repo,
Then I should see a clear README that details how to install and run the application using Node through a command line. The application is an Express API.


Given I am a developer who has just followed the instructions to run and install the application (our Express APP),
When I make a GET request to “http://localhost:3000/”,
Then I should get back a response with status code of 200 and text saying “Hello World!”
Then I should also see that the Node API has also logged the request in the terminal (console.log)


