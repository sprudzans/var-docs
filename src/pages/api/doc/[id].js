import nc from "next-connect";
import db from "../../../utils/dbconnect";
import Doc from '../../../models/Doc';
import fs from 'fs';

const handler = nc();

// UPDATE
handler.put(async (req, res) => {
    await db.connect();
    const doc = await Doc.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    await db.disconnect();

    console.log("Doc is updated.");
    res.send(doc);
})

// DELETE
handler.delete(async (req, res) => {
    await db.connect();
    const doc = await Doc.deleteOne({_id: req.query.id});
    await db.disconnect();

    fs.unlink(`public/upload/${req.query.id}.pdf`, (err) => {
        if (err) {
            throw err;
        }

        console.log("File is deleted.");
    });

    console.log("Doc is deleted.");
    res.send(doc);
})
export default handler;