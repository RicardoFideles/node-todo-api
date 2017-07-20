# Instructions

### Run server
npm install

### Run tests
npm run test-watch

## Json for test and development env
json config :
```
{
    "test" : {
        "PORT" : "",
        "MONGODB_URI" : "",
        "JWT_SECRET" : ""
    },
    "development" : {
        "PORT" : "",
        "MONGODB_URI" : "",
        "JWT_SECRET" : ""
    }
}
```
## Heroku

###if deploy to heroku<br />

heroku create <br />
git push heroku master <br />
heroku config <br />
heroku config:set JWT_SECRET: yoursecretkey
