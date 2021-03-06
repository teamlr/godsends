import { uploadAvatar } from "./../utils/uploader";
import path from "path";
import * as express from "express";
import {
    getScreams,
    insertScream,
    insertUser,
    getScream,
    getCommentsByScream,
    insertComment,
    getUserById,
    getUserByEmailAndPassword,
    updateAvator
} from "./../db/queries";
import { Log } from "./../utils/logger";

const router = express.Router();

const enrichScream = async (scream: any) => {
    const user = await getUserById([scream.userId]);
    user.img = path.join("/images", user.img);
    scream.user = user;
    const comments = await getCommentsByScream(scream.id);
    scream.comments = comments;
    return scream;
};

router.get(`/screams`, async (req: any, res) => {
    try {
        let screams = await getScreams();
        screams = await Promise.all(screams.map(async (s) => await enrichScream(s)));
        return res.json(screams);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.get(`/screams/:id`, async (req: any, res: any) => {
    try {
        let scream = await getScream(req.params.id);
        scream = await enrichScream(scream);
        return res.json(scream);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.put(`/screams`, async (req: any, res) => {
    try {
        const screamId = await insertScream([`${req.body.author}`, `${req.body.body}`]);
        res.json({ screamId });
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.post(`/users/:userid/updateAvatar`, uploadAvatar.single("avatar"), async (req: any, res) => {
    try {
        const img = await updateAvator(req.params.userid, `images/avatars/${req.file.filename}`);
        res.json(img);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.post(`/screams/:screamId/comments`, (req: any, res: any) => {
    try {
        //
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.post(`/login`, async (req: any, res: any) => {
    try {
        const users = await getUserByEmailAndPassword(req.body.email, req.body.password);
        if (users && users.length > 0) {
            res.json({ user: users[0] });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.post(`/signup`, async (req: any, res: any) => {
    try {
        const userId = await insertUser(req.body.email, req.body.password, "images/monkey.png");
        if (userId) {
            res.json(userId);
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

router.get(`/users/:userId`, async (req: any, res: any) => {
    try {
        const user = await getUserById([req.params.userId]);
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ message: "Invalid userId: " + req.params.userId });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

export default router;
