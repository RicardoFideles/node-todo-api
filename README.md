npm install

npm run test-watch

json config :

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


if deploy to heroku
heroku config:set JWT_SECRET: yoursecretkey
