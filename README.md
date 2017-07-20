# Instructions

npm install
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
### heroku
if deploy to 
heroku config:set JWT_SECRET: yoursecretkey
