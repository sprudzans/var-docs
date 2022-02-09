import Layout from "../../components/Layout";
import {Controller, useForm} from "react-hook-form";
import {List, ListItem, TextField} from "@mui/material";

export default function RoomCreate(){
    const {
        handleSubmit,
        control
    } = useForm();

    const submitHandler = () => {

    }

    return (
        <Layout title={"Добавить комнату"}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name={"title"}
                            control={control}
                            render={() => (
                                <TextField
                                    variant={"outlined"}
                                    id={"title"}
                                    label={"Title"}
                                    inputProps={{type: "text"}}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name={"description"}
                            control={control}
                            render={() => (
                                <TextField
                                    variant={"outlined"}
                                    id={"description"}
                                    label={"Description"}
                                    inputProps={{type: "text"}}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name={"square"}
                            control={control}
                            render={() => (
                                <TextField
                                    variant={"outlined"}
                                    id={"square"}
                                    label={"Square"}
                                    inputProps={{type: "text"}}/>
                            )}/>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name={"address"}
                            control={control}
                            render={() => (
                                <TextField
                                    variant={"outlined"}
                                    id={"address"}
                                    label={"Address"}
                                    inputProps={{type: "text"}}/>
                            )}/>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}