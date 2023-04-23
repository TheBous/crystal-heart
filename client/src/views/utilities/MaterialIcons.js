import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
    height: 'calc(100vh - 210px)',
    border: '1px solid',
    borderColor: theme.palette.primary.light
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
    <MainCard secondary={<SecondaryAction link="https://next.material-ui.com/components/material-icons/" />} title="Material Icons">
        <Card sx={{ overflow: 'hidden' }}>
            <IFrameWrapper src="https://material-ui.com/components/material-icons/" title="Material Icon" width="100%" />
        </Card>
    </MainCard>
);

export default MaterialIcons;
