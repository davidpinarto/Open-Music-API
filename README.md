# Open-Music-API
this is an api application to serve requests for managing albums, songs, playlists which has many functions such as being able to collaborate playlists with other users, and being able to export playlists.

## Tools that used to build this applications
- Javascript as programming language.
- Nodejs as JavaScript runtime environment.
- Hapijs as Nodejs framework to create web server.
- Postgresql as database.
- Rabbitmq as message broker.
- Redis for caching.

## Documentation
Please visit this website for how to use this API:
[Open-Music-API-Documentation](https://openmusic-api-docs.dapi.my.id)

## How to deploy Open-Music-API
> [!NOTE]
> Please before trying to deploy this API make sure You already install Nodejs (v14.xxx above), Postgresql, Rabbitmq, and Redis. 
- The first thing You need to do is clone this repository first:
  ```
  git clone https://github.com/davidpinarto/Open-Music-API.git
  ```
- Go to Open-Music-API directory.
- Create `.env` file.
- Fill the file configuration with the following configuration:
  ```
  HOST=<<SERVER HOST>>
  PORT=5000
  
  PGUSER=<<POSTGRES USERNAME>>
  PGHOST=<<POSTGRES HOST>>
  PGPASSWORD=<<POSTGRES PASSWORD>>
  PGDATABASE=openmusic
  PGPORT=5432
  
  ACCESS_TOKEN_KEY=<<ACCESS TOKEN KEY>>
  REFRESH_TOKEN_KEY=<<REFRESH TOKEN KEY>>
  ACCESS_TOKEN_AGE=30
  
  RABBITMQ_SERVER=amqp://<<RABBITMQ HOST>>
  
  REDIS_SERVER=<<REDIS HOST>>
  ```
> [!NOTE]
> Before You continue, please make sure You already create openmusic database on You'r Postgresql database  
- After create environtment configuration run:
  ```
  npm run migrate up
  ```
- It will create needed table for the API on Postgresql.
- Then to start the server run:
  ```
  npm run start-prod
  ```
- The server will run and that's it!
