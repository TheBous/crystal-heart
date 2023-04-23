// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const EarningCard = () => (
    <Card>
        <CardContent>
            <Grid direction="column" container>
                <Grid item>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <Skeleton height={44} variant="rectangular" width={44} />
                        </Grid>
                        <Grid item>
                            <Skeleton height={34} variant="rectangular" width={34} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Skeleton height={40} sx={{ my: 2 }} variant="rectangular" />
                </Grid>
                <Grid item>
                    <Skeleton height={30} variant="rectangular" />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default EarningCard;
