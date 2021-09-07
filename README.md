# Rotten Tomatoes API clone

## Summary

<p>This is a RESTful API that allows CRUD operations 
on Movie documents, using the structure:</p>

    Movie {
        title: string,
        plotSummary: string,
        duration: number
    }
        
## Setup Project

<p>Open the project folder in console and run</p>
    
    npm install

<p>Create a .env file in the project folder and add the following parameters</p>

    PORT="Port number"
    MONGO_URI="The connection URI for your MongoDB Database"

## Run Project
<p>You can start project or run the different tests using respectively</p>
    
    npm start
    npm run test