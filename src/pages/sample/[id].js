import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import db from "../../utils/dbconnect";
import Layout from "../../components/Layout";
import Sample from "../../models/Sample";

export default function Document ({sample}) {
    const [name, setName] = useState(sample.name);
    const [text, setText] = useState(sample.text);
    const router = useRouter();

    const handleEdit = async () => {
        try {
            await axios.put('/api/sample/' + router.query.id, {name, text})
            router.push("/");
        } catch (error) { alert('Something is broken') }
    }

    const handleDelete = async () => {
        try {
            await axios.delete('/api/sample/' + router.query.id)
            router.push("/");
        } catch (error) { alert('Something is broken') }
    }

    return (
        <Layout>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <textarea onChange={e => setText(e.target.value)} value={text}/>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </Layout>
    )
}

export async function getServerSideProps ({ query: { id } }) {
    await db.connect();
    const res = await Sample.findById(id).lean();
    await db.disconnect();
    return {
        props: {
            sample: db.convertDocToObj(res)
        }
    }
}
