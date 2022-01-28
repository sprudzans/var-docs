import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "../../../utils/dbconnect";
import {signToken} from "../../../utils/auth";
import Account from "../../../models/Account";

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const account = await Account.findOne({email: req.body.email});
    await db.disconnect();

    if(account && bcrypt.compareSync(req.body.password, account.password)){
        const token = signToken(account);
        res.send({
            token,
            _id: account._id,
            username: account.username,
            email: account.email,
            isAdmin: account.isAdmin
        });
    } else {
        res.send({error: 'Invalid email or password'});
    }
})

export default handler;