import {Router} from "express";
import {connect} from "../utils/dbUtils.js";
import {dbRequest} from "../utils/responseUtils.js";

const router = Router();
const collectionName = 'clients'

router.get('/:id?', async function (req, res) {
    await dbRequest(async () => {
        const db = await connect();
        if (req.params.id)
            res.json(await db.collection(collectionName).findOne({_id: Number(req.params.id)}));
        else
            res.json(await db.collection(collectionName).find().toArray());
    });
})

router.post('', async function (req, res) {
    await dbRequest(async () => {
        const {_id, name, email, age, sex} = req.body;
        const db = await connect();
        res.json(await db.collection(collectionName).insertOne({_id, name, email, age, sex}));
    });
})

router.put('/:id', async function (req, res) {
    await dbRequest(async () => {
        const {name, email, age, sex} = req.body;
        const db = await connect();
        res.json(await db.collection(collectionName).updateOne({_id: Number(req.params.id)}, {
            $set: {
                name,
                email,
                age,
                sex
            }
        }));
    });
})

router.delete('/:id', async function (req, res) {
    await dbRequest(async () => {
        const db = await connect();
        res.json(await db.collection(collectionName).deleteOne({_id: Number(req.params.id)}));
    })
})


export const clientRouter = router
