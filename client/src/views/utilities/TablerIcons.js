import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// assets
import LinkIcon from '@mui/icons-material/Link';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
    height: 'calc(100vh - 210px)',
    border: '1px solid',
    borderColor: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => (
    <MainCard secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />} title="Tabler Icons">
        <Card sx={{ overflow: 'hidden' }}>
            <IFrameWrapper src="https://tablericons.com/" title="Tabler Icons" width="100%" />
        </Card>
    </MainCard>
);

export default TablerIcons;
