import { Router } from 'express';
import basicAuth from 'express-basic-auth';

import users from './users';       // Import users routes
import birds from './birds';       // Import birds routes
import posts from './posts';       // Import posts routes
import comments from './comments'; // Import comments routes

const router = Router();

// Basic Authentication Middleware
const authMiddleware = basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
});

// Allow GET requests without authentication
router.use((req, res, next) => {
  if (req.method != 'GET') 
    return authMiddleware(req, res, next);
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
