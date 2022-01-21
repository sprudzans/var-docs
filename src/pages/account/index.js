import NextLink from "next/link";
import db from "../../utils/dbconnect";
import Doc from "../../models/Doc";
import {Link}  from '@mui/material';
import Layout from "../../components/Layout";

export default function Account (props) {
    const {account, docs} = props;

    return (
        <Layout>
            <h1>Welcome {account.username}</h1>
            <p>Choice your document or template</p>
            <ul>
                {docs.map(el => (
                    <li key={el._id}>
                        <NextLink href={`/doc/${el._id}`} passHref>
                            <Link color="inherit">{el.title}</Link>
                        </NextLink>

                    </li>
                ))}
            </ul>
            <NextLink href="/doc/create">Create a new document</NextLink>
        </Layout>
    )
}


export async function getServerSideProps (context) {
    // Данные пользователя и его документы
    const account = JSON.parse(context.req.cookies.accountInfo);
    await db.connect();
    const docs = await Doc.find({author: account._id}).lean();
    await db.disconnect()
    return {
        props: {
            docs: docs.map(db.convertDocToObj),
            account
        }
    }
}