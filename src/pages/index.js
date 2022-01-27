import NextLink from "next/link";
import db from "../utils/dbconnect";
import Doc from "../models/Doc";
import {Link} from '@mui/material';
import Layout from "../components/Layout";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Index({account, docs}) {
    const router = useRouter();

    useEffect(() => {
        if (!account) {
            router.push('/login')
        }
        console.log(account);
    })

    return (
        <Layout>
            <h1>Welcome {account.username}</h1>
            <p>Choice your document or sample</p>
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


export async function getServerSideProps(ctx) {
    // Данные пользователя и его документы
    if (ctx.req.cookies.accountInfo) {
        const account = JSON.parse(ctx.req.cookies.accountInfo);
        await db.connect();
        const docs = await Doc.find({author: account._id}).lean();
        await db.disconnect()
        return {
            props: {
                docs: docs.map(db.convertDocToObj),
                account
            }
        }
    } else {
        return {
            props: {
                docs: [],
                account: false
            }
        }
    }

}