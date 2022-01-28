import axios from "axios";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Layout from "../components/Layout";
import NextLink from "next/link";
import {Button, List, ListItem, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";

export default function Login() {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async ({email, password}) => {
        try {
            const {data} = await axios.post('/api/account/login', {email, password});
            if ( data.error ) {
                alert(data.error)
            } else {
                Cookies.set('accountInfo', JSON.stringify(data), { expires: 7 });
                router.push('/')
            }
        } catch (e) { alert('Something is broken') }
    }

    return (
        <Layout title={'Login'} isLoginPage={true}>
            <form onSubmit={handleSubmit(submitHandler)} className="form">
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    inputProps={{type: 'email',}}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email
                                        ? errors.email.type === 'pattern'
                                            ? 'Email is not valid'
                                            : 'Email is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    inputProps={{type: 'password',}}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password
                                        ? errors.password.type === 'minLength'
                                            ? 'Password length is more than 5'
                                            : 'Password is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account? Please&nbsp;<NextLink href="/register">register</NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}