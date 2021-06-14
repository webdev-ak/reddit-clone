# Reddit clone using Laravel 6 and Vue.JS

Login demo
  - username : ibrahim
  - password : secret

[App link](http://reddit-clone-dev.herokuapp.com)




## get it up and running.

After you clone this project, do the following:

```bash
# go into the project
cd reddit-clone

# create a .env file
cp .env.example .env

# install composer dependencies
composer update

# install npm dependencies
npm install

# generate a key for your application
php artisan key:generate

# add your database connection config to your .env file
DB_CONNECTION=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

# run the migration files to generate the schema
php artisan migrate

# visit https://pusher.com and create a free app. then copy the keys into your .env file
PUSHER_APP_ID=your_pusher_app_id
PUSHER_APP_KEY=your_pusher_app_key
PUSHER_APP_SECRET=your_pusher_app_secret
PUSHER_APP_CLUSTER=your_pusher_cluster

# change the BROADCAST_DRIVER in your .env to pusher
BROADCAST_DRIVER=pusher

# visit https://mailtrap.io and sign up, create new inbox, go to SMTP Settings. then copy the credentials into your .env file
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password

# change the QUEUE_CONNECION in your .env to database
QUEUE_CONNECTION=database

# seed your database with some users, subscriptions, subreddits, posts and comments
php artisan db:seed

# run webpack and watch for changes
npm run watch

# run the queue worker to process the queued events
php artisan queue:work
```




## Setup pusher

- Visit [Pusher website](https://pusher.com), sign up and create your first app (it's free).
- Next. copy the new keys to your `.env` file.
- Make sure the necessary settings are enabled
![Pusher app settings](https://user-images.githubusercontent.com/17595033/64108972-fb7b8a00-cd86-11e9-97ab-d2a3f7699b71.png)


## Project storage

By default this project use local storage, but it's also set up for Google Drive storage 

## Configure Google Drive Storage

### Create your Google Drive API keys


-   [Getting your Client ID and Secret](https://github.com/ivanvermeyen/laravel-google-drive-demo/blob/master/README/1-getting-your-dlient-id-and-secret.md)
-   [Getting your Refresh Token](https://github.com/ivanvermeyen/laravel-google-drive-demo/blob/master/README/2-getting-your-refresh-token.md)
-   [Getting your Root Folder ID]()
    
    Go to your Google drive, create a root directory and name it whatever you want, in this case is called images. then copy 
    its ID. As shown on the image below, this directory must contain three subdirectories subreddits, profiles and posts.

   ![ Google drive root folder](https://user-images.githubusercontent.com/77994114/111884532-7dabbd80-89c2-11eb-9618-46d07d79a5ee.png )


### Update `.env` file

Set `cloud` as your App Storage Type. then Add the keys you created to your `.env` file and set `google` as your default cloud storage. 

```
APP_STORAGE_TYPE=cloud

FILESYSTEM_CLOUD=google
GOOGLE_DRIVE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=xxx
GOOGLE_DRIVE_REFRESH_TOKEN=xxx
GOOGLE_DRIVE_FOLDER_ID=null
```




