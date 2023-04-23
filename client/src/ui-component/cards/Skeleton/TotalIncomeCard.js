// material-ui
import { Card, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

// ==============================|| SKELETON - TOTAL INCOME DARK/LIGHT CARD ||============================== //

const TotalIncomeCard = () => (
    <Card sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
            <ListItem alignItems="center" sx={{ py: 0 }} disableGutters>
                <ListItemAvatar>
                    <Skeleton height={44} variant="rectangular" width={44} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Skeleton height={20} variant="rectangular" />}
                    secondary={<Skeleton variant="text" />}
                    sx={{ py: 0 }}
                />
            </ListItem>
        </List>
    </Card>
);

export default TotalIncomeCard;
