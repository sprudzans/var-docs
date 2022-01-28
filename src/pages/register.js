import axios from "axios";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import {Controller, useForm} from "react-hook-form";
import {Button, List, ListItem, TextField, Typography} from "@mui/material";
import NextLink from "next/link";


export default function Register() {
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async ({username, email, password, confirmPassword}) => {
        if(password !== confirmPassword){
            alert('password dont match');
            return;
        }
        try {
            const {data} = await axios.post('/api/account/register', {username, email, password});
            if ( data.message ){
                alert(data.message)
            } else{
                Cookies.set('accountInfo', JSON.stringify(data), { expires: 7 });
                router.push('/')
            }
        } catch (e) { alert("Something is broken") }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <Typography component="h1" variant="h1">
                        Register
                    </Typography>
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
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    inputProps={{type: 'text',}}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username
                                        ? errors.username.type === 'minLength'
                                            ? 'Username length is more that 1'
                                            : 'Username is required'
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
                        <Controller
                            name="confirmPassword"
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
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    inputProps={{type: 'password',}}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword
                                        ? errors.confirmPassword.type === 'minLength'
                                            ? 'Confirm Password length is more than 5'
                                            : 'Confirm Password is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Create an account
                        </Button>
                    </ListItem>
                    <ListItem>
                        Have an account? Please&nbsp;<NextLink href="/login">login</NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}