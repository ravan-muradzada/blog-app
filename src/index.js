const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./db/mongoose');

// Router importing
const authRouter = require('./router/auth-router');
const userRouter = require('./router/user-router');
const postRouter = require('./router/post-router');
const commentRouter = require('./router/comment-router');

// Express middleware
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-app',
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: { secure: false }
}));
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started at localhost: http://localhost:${port}`))
