import nc from "next-connect";
import db from "../../../utils/dbconnect";
import Sample from '../../../models/Sample';

const handler = nc();

// UPDATE
handler.put(async (req, res) => {
    await db.connect();
    await Sample.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    await db.disconnect();

    res.send({message: "Sample is updated"});
})

// DELETE
handler.delete(async (req, res) => {
    await db.connect();
    await Sample.deleteOne({_id: req.query.id});
    await db.disconnect();

    res.send({message: "Sample is deleted"});
})

export default handler;