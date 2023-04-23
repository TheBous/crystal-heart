import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => (
    <MainCard secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />} title="Basic Typography">
        <Grid spacing={gridSpacing} container>
            <Grid sm={6} xs={12} item>
                <SubCard title="Heading">
                    <Grid direction="column" spacing={1} container>
                        <Grid item>
                            <MuiTypography variant="h1" gutterBottom>
                                h1. Heading
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                h2. Heading
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h3" gutterBottom>
                                h3. Heading
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h4" gutterBottom>
                                h4. Heading
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h5" gutterBottom>
                                h5. Heading
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h6" gutterBottom>
                                h6. Heading
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid sm={6} xs={12} item>
                <SubCard title="Sub title">
                    <Grid direction="column" spacing={1} container>
                        <Grid item>
                            <MuiTypography variant="subtitle1" gutterBottom>
                                subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="subtitle2" gutterBottom>
                                subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid sm={6} xs={12} item>
                <SubCard title="Body">
                    <Grid direction="column" spacing={1} container>
                        <Grid item>
                            <MuiTypography variant="body1" gutterBottom>
                                body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam
                                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
                                Eum quasi quidem quibusdam.
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="body2" gutterBottom>
                                body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam
                                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
                                Eum quasi quidem quibusdam.
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid sm={6} xs={12} item>
                <SubCard title="Extra">
                    <Grid direction="column" spacing={1} container>
                        <Grid item>
                            <MuiTypography display="block" variant="button" gutterBottom>
                                button text
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography display="block" variant="caption" gutterBottom>
                                caption text
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography display="block" variant="overline" gutterBottom>
                                overline text
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography
                                color="primary"
                                component={Link}
                                display="block"
                                href="https://crystal-heart.ai"
                                target="_blank"
                                underline="hover"
                                variant="body2"
                                gutterBottom
                            >
                                https://crystal-heart.ai
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </MainCard>
);

export default Typography;
