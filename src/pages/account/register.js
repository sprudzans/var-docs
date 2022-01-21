import axios from "axios";
import Cookies from "js-cookie";
import Layout from "../../components/Layout";

export default function Register() {
    function handleSubmit(e) {
        e.preventDefault();
        let username = e.target.username.value, password = e.target.password.value;
        try {
            const {data} = axios.post('/api/account/register', {username, password});
            Cookies.set('accountInfo', JSON.stringify(data));
            router.push('/account')
        } catch (e) { alert('Something is broken') }
    }

    return (
        <Layout>
            <h1>Register form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="submit" value="Create an account"/>
            </form>
            <p>Have an account? Please <a href="/account/login">login</a></p>
        </Layout>
    )
}