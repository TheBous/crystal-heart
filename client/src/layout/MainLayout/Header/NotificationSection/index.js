import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        ref={anchorRef}
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        variant="rounded"
                        onClick={handleToggle}
                    >
                        <IconBell size="1.3rem" stroke={1.5} />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                anchorEl={anchorRef.current}
                open={open}
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
                role={undefined}
                disablePortal
                transition
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} position={matchesXs ? 'top' : 'top-right'} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} content={false} elevation={16} shadow={theme.shadows[16]} boxShadow>
                                    <Grid direction="column" spacing={2} container>
                                        <Grid xs={12} item>
                                            <Grid alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }} container>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>
                                                        <Chip
                                                            label="01"
                                                            size="small"
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography color="primary" component={Link} to="#" variant="subtitle2">
                                                        Mark as all read
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid direction="column" spacing={2} container>
                                                    <Grid xs={12} item>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                                value={value}
                                                                fullWidth
                                                                select
                                                                onChange={handleChange}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid p={0} xs={12} item>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                <NotificationList />
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
