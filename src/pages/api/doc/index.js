import nc from "next-connect";
import Doc from "../../../models/Doc";
import db from "../../../utils/dbconnect";
import { jsPDF } from "jspdf";
import fs from 'fs';

const handler = nc();

// CREATE
handler.post(async (req, res) => {
    await db.connect();
    const newDoc = new Doc({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
    })
    const doc = await newDoc.save();
    await db.disconnect();

    const pdf = new jsPDF();
    pdf.text(req.body.description, 10, 10);
    const file = pdf.output();
    fs.writeFile(`public/upload/${doc._id}.pdf`, file, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    console.log("Doc is created.");
    res.send(doc);
})

export default handler;