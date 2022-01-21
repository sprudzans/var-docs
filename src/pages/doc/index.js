import db from "../../utils/dbconnect";
import Layout from "../../components/Layout";
import Doc from "../../models/Doc";

export default function Docs({docs}) {
    return (
        <Layout>
            <ul>
                {docs.length === 0 ? (<li>Create some <a href="/doc/create/">documents</a></li>) : true}
                {docs.map((doc) => (
                    <li key={doc._id}><a href={`/doc/${doc._id}`}>{doc.title}</a></li>
                ))}
            </ul>
        </Layout>
    )
}


export async function getServerSideProps () {
    await db.connect();
    const docs = await Doc.find({}).lean();
    await db.disconnect()
    return {
        props: {
            docs: docs.map(db.convertDocToObj),
        }
    }
}

