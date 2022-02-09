import Head from "next/head";
import NextLink from "next/link"
import {AppBar, Toolbar, Typography, Container, Link, Button} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useUser } from '../lib/hooks'

export default function Layout({title, description, children}) {
    const [user, { mutate }] = useUser()

    async function handleLogout() {
        await fetch('/api/logout')
        mutate({ user: null })
    }

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Author&Docs` : 'Author&Docs'}</title>
                {description && <meta name="description" content={description}/>}
            </Head>
            <AppBar position="relative">
                <Toolbar>
                    <HistoryEduIcon sx={{mr: 2}}/>
                    <NextLink href="/" passHref>
                        <Typography variant="h6" color="inherit" noWrap
                                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                            <Link color="inherit">Author&Docs</Link>
                        </Typography>
                    </NextLink>
                    {user ? "" : (
                        <Typography color="inherit">
                            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
            <footer>
                <Container>
                    <h6>You can find source of application code here <NextLink
                        href="https://github.com/sprudzans/var-docs">var-docs</NextLink></h6>
                </Container>
            </footer>
        </div>
    )
}