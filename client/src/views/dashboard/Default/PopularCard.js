import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid spacing={gridSpacing} container>
                            <Grid xs={12} item>
                                <Grid alignContent="center" justifyContent="space-between" container>
                                    <Grid item>
                                        <Typography variant="h4">Popular Stocks</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            id="menu-popular-card"
                                            open={Boolean(anchorEl)}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            variant="selectedMenu"
                                            keepMounted
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid sx={{ pt: '16px !important' }} xs={12} item>
                                <BajajAreaChartCard />
                            </Grid>
                            <Grid xs={12} item>
                                <Grid direction="column" container>
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="space-between" container>
                                            <Grid item>
                                                <Typography color="inherit" variant="subtitle1">
                                                    Bajaj Finery
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid alignItems="center" justifyContent="space-between" container>
                                                    <Grid item>
                                                        <Typography color="inherit" variant="subtitle1">
                                                            $1839.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.success.light,
                                                                color: theme.palette.success.dark,
                                                                ml: 2
                                                            }}
                                                            variant="rounded"
                                                        >
                                                            <KeyboardArrowUpOutlinedIcon color="inherit" fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ color: 'success.dark' }} variant="subtitle2">
                                            10% Profit
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid direction="column" container>
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="space-between" container>
                                            <Grid item>
                                                <Typography color="inherit" variant="subtitle1">
                                                    TTML
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid alignItems="center" justifyContent="space-between" container>
                                                    <Grid item>
                                                        <Typography color="inherit" variant="subtitle1">
                                                            $100.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.orange.light,
                                                                color: theme.palette.orange.dark,
                                                                marginLeft: 1.875
                                                            }}
                                                            variant="rounded"
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon color="inherit" fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ color: theme.palette.orange.dark }} variant="subtitle2">
                                            10% loss
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid direction="column" container>
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="space-between" container>
                                            <Grid item>
                                                <Typography color="inherit" variant="subtitle1">
                                                    Reliance
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid alignItems="center" justifyContent="space-between" container>
                                                    <Grid item>
                                                        <Typography color="inherit" variant="subtitle1">
                                                            $200.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.success.light,
                                                                color: theme.palette.success.dark,
                                                                ml: 2
                                                            }}
                                                            variant="rounded"
                                                        >
                                                            <KeyboardArrowUpOutlinedIcon color="inherit" fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ color: theme.palette.success.dark }} variant="subtitle2">
                                            10% Profit
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid direction="column" container>
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="space-between" container>
                                            <Grid item>
                                                <Typography color="inherit" variant="subtitle1">
                                                    TTML
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid alignItems="center" justifyContent="space-between" container>
                                                    <Grid item>
                                                        <Typography color="inherit" variant="subtitle1">
                                                            $189.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.orange.light,
                                                                color: theme.palette.orange.dark,
                                                                ml: 2
                                                            }}
                                                            variant="rounded"
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon color="inherit" fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ color: theme.palette.orange.dark }} variant="subtitle2">
                                            10% loss
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid direction="column" container>
                                    <Grid item>
                                        <Grid alignItems="center" justifyContent="space-between" container>
                                            <Grid item>
                                                <Typography color="inherit" variant="subtitle1">
                                                    Stolon
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid alignItems="center" justifyContent="space-between" container>
                                                    <Grid item>
                                                        <Typography color="inherit" variant="subtitle1">
                                                            $189.00
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '5px',
                                                                backgroundColor: theme.palette.orange.light,
                                                                color: theme.palette.orange.dark,
                                                                ml: 2
                                                            }}
                                                            variant="rounded"
                                                        >
                                                            <KeyboardArrowDownOutlinedIcon color="inherit" fontSize="small" />
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ color: theme.palette.orange.dark }} variant="subtitle2">
                                            10% loss
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
