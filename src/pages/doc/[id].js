import {useRouter} from "next/router";
import axios from "axios";
import db from "../../utils/dbconnect";
import Layout from "../../components/Layout";
import Doc from "../../models/Doc";
import {Button, Link, List, ListItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";

export default function Document({doc}) {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async ({title, description}) => {
        const {data} = await axios.put('/api/doc/' + router.query.id, {
            title,
            description
        });

        if (data.message) {
            alert(data.message);
            router.push("/");
        } else {
            alert(data.error);
        }
    }

    const handleDelete = async () => {
        const {data} = await axios.delete('/api/doc/' + router.query.id);
        if (data.message) {
            alert(data.message);
            router.push("/");
        } else {
            alert(data.error);
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={doc.title}
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
                        <Controller
                            name="description"
                            control={control}
                            defaultValue={doc.description}
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
                                    id="description"
                                    label="Description"
                                    inputProps={{type: 'text',}}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description
                                        ? errors.description.type === 'minLength'
                                            ? 'Description length is more that 10'
                                            : 'Description is required'
                                        : ''}
                                    {...field}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Link download href={`/upload/${doc._id}.pdf`}>Скачать pdf</Link>
                    </ListItem>
                </List>
                <Button type="submit" variant="contained">Edit</Button> &nbsp;
                <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
            </form>
        </Layout>
    )
}

export async function getServerSideProps({query: {id}}) {
    await db.connect();
    const res = await Doc.findById(id).lean();
    await db.disconnect();
    return {
        props: {
            doc: db.convertDocToObj(res)
        }
    }
}
