import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ===============================|| SHADOW BOX ||=============================== //

const ShadowBox = ({ shadow }) => (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4.5,
                bgcolor: 'primary.light',
                color: 'grey.800'
            }}
        >
            <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
        </Box>
    </Card>
);

ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
};

// ============================|| UTILITIES SHADOW ||============================ //

const UtilitiesShadow = () => (
    <MainCard secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />} title="Basic Shadow">
        <Grid spacing={gridSpacing} container>
            <Grid xs={12} item>
                <SubCard title="Basic Shadow">
                    <Grid spacing={gridSpacing} container>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="0" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="1" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="2" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="3" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="4" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="5" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="6" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="7" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="8" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="9" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="10" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="11" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="12" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="13" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="14" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="15" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="16" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="17" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="18" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="19" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="20" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="21" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="22" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="23" />
                        </Grid>
                        <Grid lg={3} md={4} sm={6} xs={12} item>
                            <ShadowBox shadow="24" />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </MainCard>
);

export default UtilitiesShadow;
