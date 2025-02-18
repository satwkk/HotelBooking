import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/tokenVerification.js';

const userRouter = express.Router();

/**
userRouter.get('/checkauth', verifyToken, (req, res, next) => {
    res.send("Hello user, you are logged in.");
});

userRouter.get('/checkUser/:id', verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in.");
});

userRouter.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
    res.send("hello admin, you are logged in.");
});
 */

userRouter.put('/:id', verifyUser, updateUser);
userRouter.delete('/:id', verifyAdmin, deleteUser);
userRouter.get('/:id', verifyUser, getUser);
userRouter.get('/', verifyAdmin, getUsers);

export default userRouter;