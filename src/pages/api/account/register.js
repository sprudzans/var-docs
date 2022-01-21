import nc from "next-connect";
import bcrypt from "bcryptjs";
import Account from "../../../models/Account";
import db from "../../../utils/dbconnect";
import {signToken} from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const newAccount = new Account({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
    })
    const account = await newAccount.save();
    await db.disconnect();

    const token = signToken(account);
    res.send({
        token,
        _id: account._id,
        name: account.username,
        isAdmin: account.isAdmin
    });
})

export default handler;