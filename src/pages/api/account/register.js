import nc from "next-connect";
import bcrypt from "bcryptjs";
import Account from "../../../models/Account";
import db from "../../../utils/dbconnect";
import {signToken} from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const accountCheck =  await Account.find({email: req.body.email}).exec();

    if (!accountCheck.length) {
        const newAccount = new Account({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            isAdmin: false,
        })
        const account = await newAccount.save();

        const token = signToken(account);
        res.send({
            token,
            _id: account._id,
            username: account.username,
            email: account.email,
            isAdmin: account.isAdmin
        });
    } else {
        res.send({error: `${req.body.email} is already in use`});
    }
    await db.disconnect();
})

export default handler;