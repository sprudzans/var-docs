import axios from "axios";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";

export default function Login() {
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        let username = e.target.username.value, password = e.target.password.value;
        try {
            const {data} = await axios.post('/api/account/login', {username, password})
            Cookies.set('accountInfo', JSON.stringify(data));
            router.push('/account')
        } catch (e) { alert('Something is broken') }
    }

    return (
        <Layout>
            <h1>Login form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="submit" value="Login"/>
            </form>
            <p>Don't have an account? Please <a href="/account/register">register</a></p>
        </Layout>
    )
}