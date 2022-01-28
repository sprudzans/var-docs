import {useRouter} from "next/router";
import axios from "axios";
import NextLink from "next/link";
import db from "../../utils/dbconnect";
import Layout from "../../components/Layout";
import Sample from "../../models/Sample";
import {Button, List, ListItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";

export default function Document ({sample}) {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async ({name, text}) => {
        const {data} = await axios.put('/api/sample/' + router.query.id, {name, text});
        if(data.message){
            alert(data.message);
            router.push("/");
        } else {
            alert(data.error);
        }
    }

    const handleDelete = async () => {
        const {data} = await axios.delete('/api/sample/' + router.query.id);
        if(data.message){
            alert(data.message);
            router.push("/");
        } else {
            alert(data.error);
        }
    }

    return (
        <Layout title={sample.name}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={sample.name}
                            rules={{
                                required: true,
                                minLength: 10
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    inputProps={{type: 'text',}}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name
                                        ? errors.name.type === 'minLength'
                                            ? 'Name length is more that 10'
                                            : 'Name is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue={sample.text}
                            rules={{
                                required: true,
                                minLength: 10
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="text"
                                    label="Text"
                                    inputProps={{type: 'text',}}
                                    error={Boolean(errors.text)}
                                    helperText={errors.text
                                        ? errors.text.type === 'minLength'
                                            ? 'Text length is more that 10'
                                            : 'Text is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                </List>
                <Button type="submit" variant="contained">Edit</Button> &nbsp;
                <NextLink href={`/doc/createBySample/?sample=${sample._id}`}>
                    <Button variant="text">Create doc by sample</Button>
                </NextLink>
                <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
            </form>
        </Layout>
    )
}

export async function getServerSideProps ({ query: { id } }) {
    await db.connect();
    const res = await Sample.findById(id).lean();
    await db.disconnect();
    return {
        props: {
            sample: db.convertDocToObj(res)
        }
    }
}
