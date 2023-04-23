import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useGoogleLogin } from '@react-oauth/google';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { SET_USER } from 'store/actions';
import { useNavigate } from 'react-router';
import internalFetch from 'utils/fetch';

// ============================|| AuthLogin - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const response = await internalFetch(`auth/google`, {
                method: 'POST',
                includeCredentials: true,
                body: {
                    code,
                }
            });
            const { name, surname, email, picture, _id: id } = response.data;
            setUserDataAndNavigate(name, surname, email, picture, id);
        },
        flow: 'auth-code',
    });
    const googleHandler = async () => googleLogin();

    const signin = async (_email, _pwd) => {
        const response = await internalFetch(`auth/login`, {
            method: 'POST',
            includeCredentials: true,
            body: {
                email: _email,
                password: _pwd
            }
        });
        const { name, surname, email, picture, _id: id } = response.data;
        setUserDataAndNavigate(name, surname, email, picture, id);
    };

    const setUserDataAndNavigate = (name, surname, email, picture, id) => {
        dispatch({ type: SET_USER, name, surname, email, avatar: picture, id });
        navigate("/");
    };

    return (
        <>
            <Grid direction="column" justifyContent="center" spacing={2} container>
                <Grid xs={12} item>
                    <AnimateButton>
                        <Button
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                            variant="outlined"
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img alt="google" height={16} src={Google} style={{ marginRight: matchDownSM ? 8 : 16 }} width={16} />
                            </Box>
                            Sign in with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid xs={12} item>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider orientation="horizontal" sx={{ flexGrow: 1 }} />

                        <Button
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            variant="outlined"
                            disabled
                            disableRipple
                        >
                            OR
                        </Button>

                        <Divider orientation="horizontal" sx={{ flexGrow: 1 }} />
                    </Box>
                </Grid>
                <Grid alignItems="center" justifyContent="center" xs={12} container item>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            signin(values.email, values.password);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }} fullWidth>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                inputProps={{}}
                                label="Email Address / Username"
                                name="email"
                                type="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText id="standard-weight-helper-text-email-login" error>
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            size="large"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                id="outlined-adornment-password-login"
                                inputProps={{}}
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText id="standard-weight-helper-text-password-login" error>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        color="primary"
                                        name="checked"
                                        onChange={(event) => setChecked(event.target.checked)}
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }} variant="subtitle1">
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    color="secondary"
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    disableElevation
                                    fullWidth
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
