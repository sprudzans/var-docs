import axios from "axios";
import Layout from "../../components/Layout";
import {Button, List, ListItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";

export default function Create({account}) {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const submitHandler = async ({title, description}) => {
        const {data} = await axios.post('/api/doc/', {
            author: account._id,
            title,
            description
        });

        if (data.message) {
            alert(data.message)
            router.push('/')
        } else alert(data.error);
    }

    return (
        <Layout title="Create document">
            <h1>Create document</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue="Simple title"
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
                            defaultValue="Simple description"
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
                        <Button type="submit" variant="contained">Create a doc</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export function getServerSideProps (ctx) {
    if(JSON.parse(ctx.req.cookies.accountInfo)){
        return {
            props : {
                account: JSON.parse(ctx.req.cookies.accountInfo)
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