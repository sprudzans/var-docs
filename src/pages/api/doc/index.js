import nc from "next-connect";
import Doc from "../../../models/Doc";
import db from "../../../utils/dbconnect";
import { jsPDF } from "jspdf";
import fs from 'fs';

const handler = nc();
const getText = function (text, variables) {
    for (let key in variables){
        text = text.replace(key, variables[key]);
    }
    return text;
}

// CREATE
handler.post(async (req, res) => {
    await db.connect();
    const docCheck = await Doc.find({title: req.body.title});

    if(!docCheck.length){
        const description = req.body.variables
            ? getText(req.body.description, req.body.variables)
            : req.body.description;

        const newDoc = new Doc({
            author: req.body.author,
            title: req.body.title,
            description
        })
        const doc = await newDoc.save();
        await db.disconnect();

        // CREATE PDF FILE
        const pdf = new jsPDF();
        pdf.text(description, 10, 10);
        const file = pdf.output();
        fs.writeFile(`public/upload/${doc._id}.pdf`, file, (error) => {
            if (error) console.log(error); else console.log("File created");
        });

        res.send({message: "Doc is created"});
    } else {
        res.send({error: `${req.body.title} already in use`});
    }

})

export default handler;