import axios from "axios";
import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import db from "../../utils/dbconnect";
import Sample from "../../models/Sample";

export default function Create({account, sample}) {
    const [variables, setVariables] = useState({})
    const router = useRouter();

    useEffect(() => {
        if(!account){
            router.push('/login')
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const doc = await axios.post('/api/doc/', {
            author: account._id,
            title: e.target.title.value,
            description: sample.text,
            variables
        });
        doc ? router.push('/account') : alert('Something is broken');
    }

    function handleChange (e) {
        setVariables({...variables, [e.target.name]: e.target.value});
        console.log(variables);
    }

    return (
        <Layout>
            <h1>Create document by sample</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="title"/><br/>
                <textarea name="sample" value={sample.text} disabled/>
                <ul>
                    {sample.variables ? sample.variables.map((elem, index) => (
                        <li key={index}>
                            <input name={elem} type="text" placeholder={elem} onChange={handleChange}/>
                        </li>
                    )) : ''}
                </ul>
                <input type="submit" value="Create a doc"/>
            </form>
        </Layout>
    )
}

export async function getServerSideProps (ctx) {
    if(ctx.req.cookies.accountInfo && ctx.query.sample){
        await db.connect();
        const res = await Sample.findById(ctx.query.sample).lean();
        await db.disconnect();

        return {
            props : {
                account: JSON.parse(ctx.req.cookies.accountInfo),
                sample: db.convertDocToObj(res)
            }
        }
    } else {
        return {
            props : {
                account: false,
                sample: false
            }
        }
    }

}