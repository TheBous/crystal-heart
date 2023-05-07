import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGoogleLogin } from '@react-oauth/google';
import { SET_USER } from 'store/actions';
import internalFetch from 'utils/fetch';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

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

    const setUserDataAndNavigate = (name, surname, email, picture, id) => {
        dispatch({ type: SET_USER, name, surname, email, avatar: picture, id });
        navigate("/");
    };

    const googleHandler = async () => {
        googleLogin();
        dispatch({ type: SET_USER, fontFamily: "" });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const signUp = async (name, surname, email, password) => {
        try {
            await internalFetch(`auth/signup`, {
                method: 'POST',
                body: {
                    name,
                    surname,
                    email,
                    password,
                }
            });
            navigate("/login");
        } catch (e) {
            console.error(e);
            throw e;
        }
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
                            fullWidth
                            onClick={googleHandler}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img alt="google" height={16} src={Google} style={{ marginRight: matchDownSM ? 8 : 16 }} width={16} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid xs={12} item>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: '',
                    surname: '',
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
                            const { name, surname, email, password } = values;
                            await signUp(name, surname, email, password);
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
                        <Grid spacing={matchDownSM ? 0 : 2} container>
                            <Grid sm={6} xs={12} item>
                                <TextField
                                    defaultValue=""
                                    label="First Name"
                                    margin="normal"
                                    name="name"
                                    sx={{ ...theme.typography.customInput }}
                                    type="text"
                                    value={values.name}
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid sm={6} xs={12} item>
                                <TextField
                                    defaultValue=""
                                    label="Last Name"
                                    margin="normal"
                                    name="surname"
                                    sx={{ ...theme.typography.customInput }}
                                    type="text"
                                    value={values.surname}
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <FormControl error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }} fullWidth>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                inputProps={{}}
                                name="email"
                                type="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText id="standard-weight-helper-text--register" error>
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
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
                                id="outlined-adornment-password-register"
                                inputProps={{}}
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText id="standard-weight-helper-text-password-register" error>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid alignItems="center" spacing={2} container>
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography fontSize="0.75rem" variant="subtitle1">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid alignItems="center" justifyContent="space-between" container>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            color="primary"
                                            name="checked"
                                            onChange={(event) => setChecked(event.target.checked)}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography component={Link} to="#" variant="subtitle1">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
