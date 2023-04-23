import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid sx={{ p: 2, pb: 0, color: '#fff' }} container>
                <Grid xs={12} item>
                    <Grid alignItems="center" justifyContent="space-between" container>
                        <Grid item>
                            <Typography sx={{ color: theme.palette.secondary.dark }} variant="subtitle1">
                                Bajaj Finery
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ color: theme.palette.grey[800] }} variant="h4">
                                $1839.00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ color: theme.palette.grey[800] }} variant="subtitle2">
                        10% Profit
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};

export default BajajAreaChartCard;
