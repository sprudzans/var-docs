import axios from "axios";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import db from "../../utils/dbconnect";
import Sample from "../../models/Sample";
import {Button, List, ListItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";

export default function Create({account, sample}) {
    const [variables, setVariables] = useState({})
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async({title}) => {
        const {data} = await axios.post('/api/doc/', {
            author: account._id,
            title: title,
            description: sample.text,
            variables
        });

        if (data.message) {
            alert(data.message);
            router.push("/");
        } else {
            alert(data.error);
        }
    }

    function handleChange (e) {
        setVariables({...variables, [e.target.name]: e.target.value});
        console.log(variables);
    }

    return (
        <Layout title="Create document by sample">
            <h1>Create document by sample</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue="Please add a title"
                            rules={{
                                required: true,
                                minLength: 10
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    inputProps={{type: 'text',}}
                                    error={Boolean(errors.title)}
                                    helperText={errors.title
                                        ? errors.title.type === 'minLength'
                                            ? 'Title length is more that 10'
                                            : 'Title is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <p>{sample.text}</p>
                    </ListItem>
                    {sample.variables ? sample.variables.map((elem, index) => (
                        <ListItem key={index}>
                            <TextField name={elem} type="text" placeholder={elem} onChange={handleChange}/>
                        </ListItem>
                    )) : ''}
                </List>
                <Button type="submit" variant="contained">Create a doc</Button>
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
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

}