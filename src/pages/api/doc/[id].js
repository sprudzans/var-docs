import nc from "next-connect";
import db from "../../../utils/dbconnect";
import Doc from '../../../models/Doc';
import fs from 'fs';

const handler = nc();

// UPDATE
handler.put(async (req, res) => {
    await db.connect();
    await Doc.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    await db.disconnect();
    res.send({message: "Doc is updated."});
})

// DELETE
handler.delete(async (req, res) => {
    await db.connect();
    await Doc.deleteOne({_id: req.query.id});
    await db.disconnect();

    // DELETE PDF FILE
    fs.unlink(`public/upload/${req.query.id}.pdf`, (err) => {
        if (err) {
            throw err;
        }
    });

    res.send({message: "Doc is deleted."});
})
export default handler;