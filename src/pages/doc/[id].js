import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import db from "../../utils/dbconnect";
import Layout from "../../components/Layout";
import Doc from "../../models/Doc";

export default function Document ({doc}) {
    const [title, setTitle] = useState(doc.title);
    const [description, setDescription] = useState(doc.description);
    const router = useRouter();

    const handleEdit = async () => {
        try {
            await axios.put('/api/doc/' + router.query.id, {title, description})

            router.push("/");
        } catch (error) { alert('Something is broken') }
    }

    const handleDelete = async () => {
        try {
            await axios.delete('/api/doc/' + router.query.id)

            router.push("/");
        } catch (error) { alert('Something is broken') }
    }

    return (
        <Layout>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea onChange={e => setDescription(e.target.value)} value={description}/>
            <a download href={`/upload/${doc._id}.pdf`}>Скачать pdf</a>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </Layout>
    )
}

export async function getServerSideProps ({ query: { id } }) {
    await db.connect();
    const res = await Doc.findById(id).lean();
    await db.disconnect();
    return {
        props: {
            doc: db.convertDocToObj(res)
        }
    }
}
