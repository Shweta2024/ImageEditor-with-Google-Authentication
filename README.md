> Demo Video : [link](https://youtu.be/O-HTfYHEhiY?si=SBz55cXcBG1jZfZT)

## How to run the project on your system?


<h3>Step1: Clone the project</h3>

```
# run the below command in the terminal to clone the project

git clone https://github.com/Shweta2024/oAuth.git
 
```

<H3>Step 2: Set Up the Backend</H3>

- Install all the required dependencies, by executing the below command:

```
npm i

```

- Now start the server by running the command:

```

npm run start

```

NOTE: Make sure to add ``DB_CONNECTION_STRING``,
``CLIENT_ID``, 
``CLIENT_SECRET``, 
``SESSION_SECRET``, in the '.env' file along with their values.


<h3>Logic:</h3>
<hr>

- If the user isn't logged in, then they won't be able to access the ```Editor``` and the ```Gallery```, hence are redirected back to the ```logIn screen``` if unauthorized.

- Once the user successfully log-in, they can access the ```Editor```:- 
        
    - to **``upload``** an image and save it to ```Gallery```.
    - to **``crop``** an image and **``download``** it to their system.

- After successfull login, they can also **``view``** all the images that they ``saved`` to the Gallery.

- User can ``log-out``, by clicking ```LogOut``` on the navbar.


<h3>Tech Stack Used:</h3>
<hr>

- Backend: Node.js, Express.js and Mongoose.
- Database: MongoDB.
- Frontend: HTML, CSS, EJS, and JavaScript.
- Design: Bootstrap.
- Authentication: passport-google-oauth20, passportjs and express-session.
- Cropping Image: Cropperjs
