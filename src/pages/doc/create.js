import axios from "axios";
import Layout from "../../components/Layout";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Create(props) {
    const {account} = props;
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        let title = e.target.title.value, description = e.target.description.value;
        try {
            const doc = await axios.post('/api/doc/', {author: account._id, title, description});
            doc ? router.push('/account') : console.log('Something is broken');
        } catch (e) { alert('Something is broken') }

    }

    useEffect(() => {
        console.log(account);
    })

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
    return {
        props : {
            account: JSON.parse(ctx.req.cookies.accountInfo)
        }
    }
}