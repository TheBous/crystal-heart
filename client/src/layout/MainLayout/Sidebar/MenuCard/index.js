import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses
} from '@mui/material';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#fff'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: theme.palette.primary[200],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid direction="column" spacing={1} sx={{ mt: 1.5 }} container>
            <Grid item>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Typography sx={{ color: theme.palette.primary[800] }} variant="h6">
                            Progress
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="inherit" variant="h6">{`${Math.round(value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress value={value} variant="determinate" {...others} />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
    const theme = useTheme();

    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" sx={{ p: 0 }} disableGutters>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: theme.palette.primary.main,
                                    border: 'none',
                                    borderColor: theme.palette.primary.main,
                                    background: '#fff',
                                    marginRight: '12px'
                                }}
                                variant="rounded"
                            >
                                <TableChartOutlinedIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ color: theme.palette.primary[800] }} variant="subtitle1">
                                    Get Extra Space
                                </Typography>
                            }
                            secondary={<Typography variant="caption"> 28/23 GB</Typography>}
                            sx={{ mt: 0 }}
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </CardStyle>
    );
};

export default MenuCard;
