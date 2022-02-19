## AVTAR - Your aviation METAR, anytime, anywhere
This project was created during HackNotts21 (Feb 12th - 13th, 2022) at University of Nottingham.
JS, React components, API data and Twilio integration - Umar Farooq  
Tailwind CSS integration and marketing - Alex Rollin  
CSS and Logo - Cactric

## Inspiration

Pilots require to know the conditions of the airport before making a decision on where they fly, how they fly etc... This could be weather, notams etc... We wanted to create a web app and Twilio app that would make it easier and more accessible to find this information, quick and easy.

## What it does

Upon loading the website, it prompts for permission to your location. Once accepted, lat and lon details are passed along to the API which finds the closest airport to your location. This will then show specific data about the airport (decoded METAR), such as the temperature, dew point, wind speed and direction..... You have the option to type an ICAO for an airport to bring up the data for that airport too. This information is useful to pilots when they are wanting to check flight conditions. We have also incorporated Twilio and Discord.js into our application (for the flight simulation community). You can send a message to our number, currently +447700155872, with the body as the ICAO, e.g "EGCC", and you will receive a text message back with the decoded METAR information.

## How we built it

To build this project we used React.js, a JavaScript framework. For the Twilio server we have used Node.js with express.js. For the discord bot, we used Discord.js.

## Challenges we ran into

One of the issues we faced was related to asynchronous functions. We wanted to use our data after a certain point in the program however, due to the nature of the component, it would render other things before what we wanted, which meant that we had to find a way around it. Twilio would not allow us to take the body of the request and input it back into out API (the users input) We fixed this by making sure express was using urlencoded.

## Accomplishments that we're proud of

It took a while to get the API to respond with any useful information at the start. This is at the core of our web app and took the most time to get working.

## What we learned

To find a way around our async problem, we used .then promises to make sure that we have control over our layout and order of the code. We deliberately did not use async and await functions as we are aiming for the hackiest hack award, therefore using nested .then statements seems like a way to enter into that part of the hackathon.

## What's next for AVTAR

We are thinking that we can expand to multiple different platforms to become more accessible

## Built With
JavaScript, React.js, Express.js, Node.js, Twilio and [AVWX](https://avwx.docs.apiary.io/#)
HTTPS is required for API access