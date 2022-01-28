import Head from "next/head";
import NextLink from "next/link";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, AppBar, Toolbar, Typography, Container, Link, Button} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Cookies from "js-cookie";
import {useRouter} from "next/router";


const theme = createTheme();

export default function Layout({title, description, isLoginPage, children}) {
    const router = useRouter();
    const handleDelete = function () {
        Cookies.remove('accountInfo');
        router.push('/');
    }

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Author&Docs` : 'Author&Docs'}</title>
                {description && <meta name="description" content={description}/>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <HistoryEduIcon sx={{mr: 2}}/>
                        <NextLink href="/" passHref>
                            <Typography variant="h6" color="inherit" noWrap
                                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                                <Link color="inherit">Author&Docs</Link>
                            </Typography>
                        </NextLink>
                        {isLoginPage ? "" : (
                            <Typography color="inherit">
                                <Button variant="contained" color="secondary" onClick={handleDelete}>Logout</Button>
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
            </ThemeProvider>
        </div>
    )
}