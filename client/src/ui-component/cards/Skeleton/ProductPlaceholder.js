// material-ui
import { CardContent, Grid, Skeleton, Stack } from '@mui/material';

// project import
import MainCard from '../MainCard';

// ===========================|| SKELETON TOTAL GROWTH BAR CHART ||=========================== //

const ProductPlaceholder = () => (
    <MainCard content={false} boxShadow>
        <Skeleton height={220} variant="rectangular" />
        <CardContent sx={{ p: 2 }}>
            <Grid spacing={2} container>
                <Grid xs={12} item>
                    <Skeleton height={20} variant="rectangular" />
                </Grid>
                <Grid xs={12} item>
                    <Skeleton height={45} variant="rectangular" />
                </Grid>
                <Grid sx={{ pt: '8px !important' }} xs={12} item>
                    <Stack alignItems="center" direction="row" spacing={1}>
                        <Skeleton height={20} variant="rectangular" width={90} />
                        <Skeleton height={20} variant="rectangular" width={38} />
                    </Stack>
                </Grid>
                <Grid xs={12} item>
                    <Stack alignItems="center" direction="row" justifyContent="space-between">
                        <Grid spacing={1} container>
                            <Grid item>
                                <Skeleton height={20} variant="rectangular" width={40} />
                            </Grid>
                            <Grid item>
                                <Skeleton height={17} variant="rectangular" width={20} />
                            </Grid>
                        </Grid>
                        <Skeleton height={32} variant="rectangular" width={47} />
                    </Stack>
                </Grid>
            </Grid>
        </CardContent>
    </MainCard>
);

export default ProductPlaceholder;
