import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid spacing={gridSpacing} container>
            <Grid xs={12} item>
                <Grid spacing={gridSpacing} container>
                    <Grid lg={4} md={6} sm={6} xs={12} item>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid lg={4} md={6} sm={6} xs={12} item>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid lg={4} md={12} sm={12} xs={12} item>
                        <Grid spacing={gridSpacing} container>
                            <Grid lg={12} md={6} sm={6} xs={12} item>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid lg={12} md={6} sm={6} xs={12} item>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} item>
                <Grid spacing={gridSpacing} container>
                    <Grid md={8} xs={12} item>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid md={4} xs={12} item>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
