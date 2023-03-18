# Requirement 1
For requirement one, the way I would go about this is to first set up my express app, make a postgres server and database, and establish a connection to my database using sequelize. Then, I can create a User model with the attributes name, email, and password; as well as a Posts model with the attributes title, description, and photoURL. The photoURL attribute will just contain a URL to the photo stored using AWS S3, since it is more suited for storing larger data such as photos, videos, or audio files; and postgres is more suited for structured data. Users and posts will have a one to many relationship, one user can have many posts. I also need to create a register route if the user clicks on register, which will check our database for the inputted email to make sure the user doesn't already exist. If it is in fact a new user, we can post the name, email, and encrypted password to our database. I am also going to create a login route, which checks to see if the inputted password is equal to the given users hashed password stored in our DB. If it is, I can send a JWT token. As for posts, I will make a route to get all posts, which returns all posts in our DB; and a route to add a post to our DB.

Here is a diagram of how my app and files will interact at this stage in the requirements:
![diagram](https://user-images.githubusercontent.com/103616900/225867982-dfd78105-05de-48fa-aabd-571c184d99fc.jpg)

# Requirement 2
To make a post have an attribute when it was created, I can add "createdAt" column to my posts table, and store a current date/time in it. I can use a library to use "createdAt" to calculate how long ago the post was made. As for a post being able to have multiple photos, I am going to have to create a new table, "photos." It will have a one to many relationship with posts, where one post can contain many (at most 5) photos. I will also add an "update" route and function which allows users to edit a post.

Here is an updated diagram to match these requirements:
![diagram2](https://user-images.githubusercontent.com/103616900/226065389-4efd426e-aac7-40e9-89d1-d2b9549c29c0.jpg)

# Requirement 3
In order for a post to now have multiple comments, I will make a "comments" table. Comments will have a one to many relationship to Posts, where one Post can have many comments. Comments will also have a one to many relationship to Users, where one User can have many comments, since we also need to keep track of the user that made the comment. I will need to add a create comment route/function, and a get comments function that deals with pagination. In order for users to have the option to create a username, I can add a "username" column to my users table and allow for null values since it is optional. I can add the option to input a username in the register function.


here are some api calls from requirement1:
![api calls](https://user-images.githubusercontent.com/103616900/226082172-69aaafb9-7259-43d3-805c-d1e50bb8ccac.png)



