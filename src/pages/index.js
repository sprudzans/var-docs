import NextLink from "next/link";
import db from "../utils/dbconnect";
import Doc from "../models/Doc";
import Sample from "../models/Sample";
import {Link, List, ListItem} from '@mui/material';
import Layout from "../components/Layout";

export default function Index({account, docs, samples}) {
    return (
        <Layout title="Home">
            <h1>Welcome, {account.username}!</h1>
            <p>Choice your document</p>
            <List>
                {docs.length ? docs.map(el => (
                    <ListItem key={el._id}>
                        <NextLink href={`/doc/${el._id}`} passHref>
                            <Link color="inherit">{el.title}</Link>
                        </NextLink>
                    </ListItem>
                )) : ""}
                <ListItem>
                    <NextLink href="/doc/create" passHref>
                        <Link>Create a new document</Link>
                    </NextLink>
                </ListItem>
            </List>
            <p>Choice your sample</p>
            <List>
                {samples.length ? samples.map(el => (
                    <ListItem key={el._id}>
                        <NextLink href={`/sample/${el._id}`} passHref>
                            <Link color="inherit">{el.name}</Link>
                        </NextLink>
                    </ListItem>
                )) : ""}
                <ListItem>
                    <NextLink href="/sample/create" passHref>
                        <Link>Create a new sample</Link>
                    </NextLink>
                </ListItem>
            </List>
        </Layout>
    )
}


export async function getServerSideProps(ctx) {
    // Данные пользователя и его документы
    if (ctx.req.cookies.accountInfo) {
        const account = JSON.parse(ctx.req.cookies.accountInfo);
        await db.connect();
        const docs = await Doc.find({author: account._id}).lean();
        const samples = await Sample.find({author: account._id}).lean();

        await db.disconnect()
        return {
            props: {
                docs: docs.map(db.convertDocToObj),
                samples: samples.map(db.convertDocToObj),
                account
            }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

}