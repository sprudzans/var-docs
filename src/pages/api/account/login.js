import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "../../../utils/dbconnect";
import {signToken} from "../../../utils/auth";
import Account from "../../../models/Account";

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const account = await Account.findOne({username: req.body.username});
    await db.disconnect();

    if(account && bcrypt.compareSync(req.body.password, account.password)){
        const token = signToken(account);
        res.send({
            token,
            _id: account._id,
            username: account.username,
            isAdmin: account.isAdmin
        });
    } else {
        res.status(401).send({message: 'Invalid username or password'});
    }
    res.send(account)
})

export default handler;