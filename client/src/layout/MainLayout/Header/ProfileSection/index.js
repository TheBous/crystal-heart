import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { DELETE_USER } from 'store/actions';
import internalFetch from 'utils/fetch';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const avatar = useSelector((state) => state.user.avatar);

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        await internalFetch(`auth/logout`, {
            method: 'POST',
            includeCredentials: true,
        });
        dispatch({ type: DELETE_USER });
        navigate('/login');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="primary"
                icon={
                    <Avatar
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        ref={anchorRef}
                        src={avatar}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                    />
                }
                label={<IconSettings color={theme.palette.primary.main} size="1.5rem" stroke={1.5} />}
                ref={anchorRef}
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                variant="outlined"
                onClick={handleToggle}
            />
            <Popper
                anchorEl={anchorRef.current}
                open={open}
                placement="bottom-end"
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
                role={undefined}
                disablePortal
                transition
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} content={false} elevation={16} shadow={theme.shadows[16]} boxShadow>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack alignItems="center" direction="row" spacing={0.5}>
                                                <Typography variant="h4">Good Morning,</Typography>
                                                <Typography component="span" sx={{ fontWeight: 400 }} variant="h4">
                                                    Johne Doe
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">Project Admin</Typography>
                                        </Stack>
                                        <OutlinedInput
                                            aria-describedby="search-helper-text"
                                            id="input-search-profile"
                                            inputProps={{
                                                'aria-label': 'weight'
                                            }}
                                            placeholder="Search profile options"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconSearch color={theme.palette.grey[500]} size="1rem" stroke={1.5} />
                                                </InputAdornment>
                                            }
                                            sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        <Divider />
                                    </Box>
                                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>
                                            <UpgradePlanCard />
                                            <Divider />
                                            <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2
                                                }}
                                            >
                                                <CardContent>
                                                    <Grid direction="column" spacing={3} container>
                                                        <Grid item>
                                                            <Grid alignItems="center" justifyContent="space-between" container item>
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={sdm}
                                                                        color="primary"
                                                                        name="sdm"
                                                                        size="small"
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid alignItems="center" justifyContent="space-between" container item>
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        name="sdm"
                                                                        size="small"
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Divider />
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    selected={selectedIndex === 0}
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings size="1.3rem" stroke={1.5} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                </ListItemButton>
                                                <ListItemButton
                                                    selected={selectedIndex === 1}
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                >
                                                    <ListItemIcon>
                                                        <IconUser size="1.3rem" stroke={1.5} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid justifyContent="space-between" spacing={1} container>
                                                                <Grid item>
                                                                    <Typography variant="body2">Social Profile</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Chip
                                                                        label="02"
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: theme.palette.warning.dark,
                                                                            color: theme.palette.background.default
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    selected={selectedIndex === 4}
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout size="1.3rem" stroke={1.5} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
