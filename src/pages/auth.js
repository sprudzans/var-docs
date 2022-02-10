import axios from "axios";
import Router from 'next/router'
import Layout from "../components/Layout";
import {Button, List, ListItem, Switch, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useUser} from "../lib/hooks";

export default function Auth() {
    const [page, setPage] = useState('Login');
    const [user, { mutate }] = useUser()
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) Router.push('/')
    }, [user])

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();


    const submitHandler = async ({username, email, password, confirmPassword}) => {
        if (page === "Login"){
            const res = await axios.post('/api/login', {username, email, password});
            if (res.status === 200) {
                const userObj = res.data
                // set user to useSWR state
                mutate(userObj)
            } else {
                setErrorMsg('Incorrect username or password. Try better!')
            }
        } else {
            if(password !== confirmPassword){
                setErrorMsg('password dont match');
                return;
            }
            const res = await axios.post('/api/users', {username, email, password})

            if (res.status === 201) {
                const userObj = res.data
                // set user to useSWR state
                mutate(userObj)
            } else {
                setErrorMsg(res.data)
            }
        }

    }

    const switchHandler = (event, data) => {
        data ? setPage('Login') : setPage('SignUp');
    }

    return (
        <Layout title={page} isAuthPage={true}>
            <form onSubmit={handleSubmit(submitHandler)} className="form">
                <Typography component="h1" variant="h1">
                    {page}
                </Typography>
                <Typography component="h4" variant="h4">
                    {errorMsg}
                </Typography>

                <List>
                    <ListItem>
                        <Typography>SignUp</Typography>
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
                    {page === "SignUp" ? (
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