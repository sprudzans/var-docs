import axios from "axios";
import Cookies from "js-cookie";
import Router from 'next/router'
import Layout from "../components/Layout";
import {Button, List, ListItem, Switch, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";

export default function Auth() {
    const [page, setPage] = useState('Login');

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();


    const submitHandler = async ({username, email, password, confirmPassword}) => {
        if (page === "Login"){
            try {
                const {data} = await axios.post('/api/account/login', {email, password});
                if (data.error) {
                    alert(data.error)
                } else {
                    Cookies.set('accountInfo', JSON.stringify(data), {expires: 7});
                    Router.push('/')
                }
            } catch (e) {
                alert('Something is broken')
            }
        } else {
            if(password !== confirmPassword){
                alert('password dont match');
                return;
            }
            const {data} = await axios.post('/api/account/register', {username, email, password});
            if ( data.error ){
                alert(data.error)
            } else{
                Cookies.set('accountInfo', JSON.stringify(data), { expires: 7 });
                Router.push('/')
            }
        }

    }

    const switchHandler = (event, data) => {
        data ? setPage('Login') : setPage('Register');
    }

    return (
        <Layout title={page} isAuthPage={true}>
            <form onSubmit={handleSubmit(submitHandler)} className="form">
                <Typography component="h1" variant="h1">
                    {page}
                </Typography>
                <List>
                    <ListItem>
                        <Typography>Register</Typography>
                        <Controller
                            control={control}
                            name="type"
                            render={() => (
                                <Switch
                                    id="type"
                                    label="Type"
                                    onChange={switchHandler}
                                    defaultChecked/>
                            )}
                        />
                        <Typography>Login</Typography>
                    </ListItem>
                    {page === "Register" ? (
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
                    ) : ""}
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
                    {page === "Register" ? (
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
                    ) : ""}
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            {page}
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}