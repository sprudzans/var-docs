import nc from "next-connect";
import Sample from "../../../models/Sample"
import db from "../../../utils/dbconnect";

const handler = nc();

// CREATE
handler.post(async (req, res) => {
    await db.connect();

    const newSample = new Sample({
        author: req.body.author,
        name: req.body.name,
        text: req.body.text,
        variables: req.body.variables
    })
    const sample = await newSample.save();

    await db.disconnect();

    console.log("Sample is saved.");
    res.send(sample);
})

export default handler;