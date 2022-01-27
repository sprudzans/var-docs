import Head from "next/head";
import NextLink from "next/link";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, AppBar, Toolbar, Typography, Container, Link} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


const theme = createTheme();

export default function Layout({children}) {
    return (
        <div>
            <Head>
                <title>Author&Docs</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <HistoryEduIcon sx={{ mr: 2 }} />
                        <NextLink  href="/" passHref>
                            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                <Link color="inherit">Author&Docs</Link>
                            </Typography>
                        </NextLink>
                        <NextLink  href="/login" passHref>
                            <Typography color="inherit">
                                <Link color="inherit">Login</Link>
                            </Typography>
                        </NextLink>
                    </Toolbar>
                </AppBar>
                <Container>
                    {children}
                </Container>
            </ThemeProvider>
        </div>
    )
}