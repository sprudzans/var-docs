import nc from "next-connect";
import Sample from "../../../models/Sample"
import db from "../../../utils/dbconnect";

const handler = nc();

// CREATE
handler.post(async (req, res) => {
    await db.connect();
    const sampleCheck = Sample.find({name: req.body.name});

    if(!sampleCheck.length){
        Sample.create({
            author: req.body.author,
            name: req.body.name,
            text: req.body.text,
            variables: req.body.variables
        }, async function (error, ) {
                if (error) res.send({error: error});
            console.log("Sample")
            res.send({message: "Sample is saved."});
        });
    } else {
        res.send({error: `${req.body.name} is already in use`});
    }

    await db.disconnect();
})

export default handler;