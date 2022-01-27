import nc from "next-connect";
import db from "../../../utils/dbconnect";
import Sample from '../../../models/Sample';

const handler = nc();

// UPDATE
handler.put(async (req, res) => {
    await db.connect();
    const sample = await Sample.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    await db.disconnect();

    console.log("Sample is updated.");
    res.send(sample);
})

// DELETE
handler.delete(async (req, res) => {
    await db.connect();
    const sample = await Sample.deleteOne({_id: req.query.id});
    await db.disconnect();

    console.log("Sample is deleted.");
    res.send(sample);
})

export default handler;