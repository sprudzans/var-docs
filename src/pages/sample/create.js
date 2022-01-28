import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import axios from "axios";
import {Button, List, ListItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";

export default function Create({account}) {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();

    const getVar = function (text) {
        let arrOfVars = text.replace(/\n/g, " ").split(" ");
        return(
            arrOfVars.filter(elem => elem.includes('$'))
        );
    }

    const submitHandler = async ({name, text}) => {
        const {data} = await axios.post('/api/sample/', {
            author: account._id,
            name,
            text,
            variables: getVar(text)
        });

        if (!data.error) {
            alert(data.message)
            router.push('/')
        } else alert(data.error);
    }



    return (
        <Layout title="Create sample">
            <h1>Create sample with $variables</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue="Sample name"
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
                            defaultValue="Sample text with $variables"
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
                    <ListItem>
                        <Button type="submit" variant="contained">Save a sample</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export function getServerSideProps (ctx) {
    if(ctx.req.cookies.accountInfo){
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