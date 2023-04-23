// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = () => (
    <Card>
        <CardContent>
            <Grid spacing={gridSpacing} container>
                <Grid xs={12} item>
                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                        <Grid item xs zeroMinWidth>
                            <Grid spacing={1} container>
                                <Grid xs={12} item>
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid xs={12} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Skeleton height={50} variant="rectangular" width={80} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Skeleton height={530} variant="rectangular" />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TotalGrowthBarChart;
