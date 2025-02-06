# Film Friendly Airports Website

## Introduction
The purpose of this site is to provide a simple interface for interacting with the Film Friendly Airports backend.

## Development 
The site uses a React front end, and is setup as a single page application.

### Authenticated Features
The site restricts unauthorized users to simply searching for airports and reading the received airport, terminal and review content. Any endpoints that add or update, for example reviews or reports, the user will be required to login, to receive an access token. If they do not have an account, they are required to enter an email and password. Once logged in, an account page can be accessed to logout.

### Building and Running website
Clone or download the project files, and open up the project in code editor of choice.

The website must be linked to its backend using a URL stored in a json config file.

In the src folder create a text file called **config.json** and added the following text, replacing X with the URL of the backend.

```
{
    "PROD_API_URL": "X" 
}
```
