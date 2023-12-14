import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import admin from 'firebase-admin'

import users from './users';       // Import users routes
import birds from './birds';       // Import birds routes
import posts from './posts';       // Import posts routes
import comments from './comments'; // Import comments routes

const router = Router();

admin.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
})

// Basic Authentication Middleware
const authMiddleware = basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
});

const checkFirebaseToken = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).send('Unauthorized');
    return;
  }

  const idToken = req.headers.authorization.split('Bearer ')[1];

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return next();
    })
    .catch((error) => {
      // Handle error
      res.status(401).send('Unauthorized');
    });
};

// Allow GET requests without authentication
router.use((req, res, next) => {
  if (req.method != 'GET') 
    return checkFirebaseToken(req, res, next);
  else
    next();
});

// Root endpoint message
router.get('/', (req, res) => {
  res.send({ msg: 'Inside API Endpoints' });
});

// Route configurations
router.use('/users', users);       // Use users routes
router.use('/birds', birds);       // Use birds routes
router.use('/posts', posts);       // Use posts routes
router.use('/comments', comments); // Use comments routes

export default router;
