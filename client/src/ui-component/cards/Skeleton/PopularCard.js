// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON - POPULAR CARD ||============================== //

const PopularCard = () => (
    <Card>
        <CardContent>
            <Grid spacing={gridSpacing} container>
                <Grid xs={12} item>
                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                        <Grid item xs zeroMinWidth>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                        <Grid item>
                            <Skeleton height={20} variant="rectangular" width={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Skeleton height={150} variant="rectangular" />
                </Grid>
                <Grid xs={12} item>
                    <Grid spacing={1} container>
                        <Grid xs={12} item>
                            <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                <Grid xs={6} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                                <Grid xs={6} item>
                                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton height={20} variant="rectangular" />
                                        </Grid>
                                        <Grid item>
                                            <Skeleton height={16} variant="rectangular" width={16} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Grid spacing={1} container>
                        <Grid xs={12} item>
                            <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                <Grid xs={6} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                                <Grid xs={6} item>
                                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton height={20} variant="rectangular" />
                                        </Grid>
                                        <Grid item>
                                            <Skeleton height={16} variant="rectangular" width={16} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Grid spacing={1} container>
                        <Grid xs={12} item>
                            <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                <Grid xs={6} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                                <Grid xs={6} item>
                                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton height={20} variant="rectangular" />
                                        </Grid>
                                        <Grid item>
                                            <Skeleton height={16} variant="rectangular" width={16} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Grid spacing={1} container>
                        <Grid xs={12} item>
                            <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                <Grid xs={6} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                                <Grid xs={6} item>
                                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton height={20} variant="rectangular" />
                                        </Grid>
                                        <Grid item>
                                            <Skeleton height={16} variant="rectangular" width={16} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Grid spacing={1} container>
                        <Grid xs={12} item>
                            <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                <Grid xs={6} item>
                                    <Skeleton height={20} variant="rectangular" />
                                </Grid>
                                <Grid xs={6} item>
                                    <Grid alignItems="center" justifyContent="space-between" spacing={gridSpacing} container>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton height={20} variant="rectangular" />
                                        </Grid>
                                        <Grid item>
                                            <Skeleton height={16} variant="rectangular" width={16} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Skeleton height={20} variant="rectangular" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
        <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
            <Skeleton height={25} variant="rectangular" width={75} />
        </CardContent>
    </Card>
);

export default PopularCard;
