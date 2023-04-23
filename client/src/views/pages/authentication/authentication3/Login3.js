import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }} container>
                <Grid xs={12} item>
                    <Grid alignItems="center" justifyContent="center" sx={{ minHeight: 'calc(100vh - 68px)' }} container>
                        <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} item>
                            <AuthCardWrapper>
                                <Grid alignItems="center" justifyContent="center" spacing={2} container>
                                    <Grid sx={{ mb: 3 }} item>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Grid
                                            alignItems="center"
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            justifyContent="center"
                                            container
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                        gutterBottom
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                        variant="caption"
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Divider />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Grid alignItems="center" direction="column" xs={12} container item>
                                            <Typography
                                                component={Link}
                                                sx={{ textDecoration: 'none' }}
                                                to="/register"
                                                variant="subtitle1"
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ m: 3, mt: 1 }} xs={12} item>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
