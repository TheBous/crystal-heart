// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography component={Link} href="https://crystal-heart.ai" target="_blank" underline="hover" variant="subtitle2">
            crystal-heart.ai
        </Typography>
        <Typography component={Link} href="https://crystal-heart.ai" target="_blank" underline="hover" variant="subtitle2">
            &copy; codedthemes.com
        </Typography>
    </Stack>
);

export default AuthFooter;
