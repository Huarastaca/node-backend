import {Router} from "express";
import {connect} from "../utils/dbUtils.js";
import {callbackTest} from "../utils/responseUtils.js";

const router = Router();
const collectionName = 'comments'

router.get('/:id?', async function (req, res, next) {
    await callbackTest(async () => {
        const db = await connect();
        if (req.params.id)
            res.json(await db.collection(collectionName).findOne({_id: Number(req.params.id)}));
        else
            res.json(await db.collection(collectionName).find().toArray());
    });
})

router.post('', async function (req, res, next) {
    await callbackTest(async () => {
        const {_id, comment, client, movie, time} = req.body;
        const db = await connect();
        res.json(await db.collection(collectionName).insertOne({_id, comment, client, movie, time}));
    });
})

router.put('/:id', async function (req, res, next) {
    await callbackTest(async () => {
        const {comment, client, movie, time} = req.body;
        const db = await connect();
        res.json(await db.collection(collectionName).updateOne({_id: Number(req.params.id)}, {
            $set: {comment, client, movie, time}
        }));
    });
})

router.delete('/:id', async function (req, res, next) {
    await callbackTest(async () => {
        const db = await connect();
        res.json(await db.collection(collectionName).deleteOne({_id: Number(req.params.id)}));
    })
})


export const movieRouter = router
