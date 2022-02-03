import nc from "next-connect";
import Sample from "../../../models/Sample"
import db from "../../../utils/dbconnect";

const handler = nc();

// CREATE
handler.post(async (req, res) => {
    await db.connect();
    const sampleCheck = await Sample.find({name: req.body.name});

    if (!sampleCheck.length) {

        const newSample = new Sample({
            author: req.body.author,
            name: req.body.name,
            text: req.body.text,
            variables: req.body.variables
        })

        const sample = await newSample.save();
        await db.disconnect();

        res.send({message: "Sample is saved.", sample});

    } else {
        res.send({error: `${req.body.name} is already in use`});
    }


})

export default handler;