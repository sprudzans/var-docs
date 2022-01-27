import axios from "axios";
import Layout from "../../components/Layout";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Create({account}) {
    const router = useRouter();

    useEffect(() => {
        if(!account){
            router.push('/login')
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let title = e.target.title.value, description = e.target.description.value;
        const doc = await axios.post('/api/doc/', {author: account._id, title, description});
        doc ? router.push('/account') : console.log('Something is broken');
    }

    return (
        <Layout>
            <h1>Create document</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="title"/>
                <textarea name="description" placeholder="description"/>
                <input type="submit" value="Create a doc"/>
            </form>
        </Layout>
    )
}

export function getServerSideProps (ctx) {
    if(JSON.parse(ctx.req.cookies.accountInfo)){
        return {
            props : {
                account: JSON.parse(ctx.req.cookies.accountInfo)
            }
        }
    } else {
        return {
            props : {
                account: false
            }
        }
    }

}