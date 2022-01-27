import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import axios from "axios";


export default function Create({account}) {
    const router = useRouter();
    const getVar = function (text) {
        let arrOfVars = text.replace(/\n/g, " ").split(" ");
        return(
            arrOfVars.filter(elem => elem.includes('$'))
        );
    }

    useEffect(() => {
        if(!account){
            router.push('/login')
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const text = e.target.text.value;

        const sample = await axios.post('/api/sample/', {
            author: account._id,
            name: e.target.name.value,
            text,
            variables: getVar(text)
        });

        sample ? router.push('/') : alert('Something is broken');
    }



    return (
        <Layout>
            <h1>Create sample with $variables</h1>
            <p>like this</p>
            <p>"I have $size $color $item."</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Give name for your sample"/><br/>
                <textarea name="text" cols="50" rows="20"/><br/>
                <input type="submit" value="Save sample"/>
            </form>
        </Layout>
    )
}

export function getServerSideProps (ctx) {
    if(ctx.req.cookies.accountInfo){
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