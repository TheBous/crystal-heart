// assets
import { IconHeart, IconHelp } from '@tabler/icons';

// constant
const icons = { IconHeart, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const microNutrients = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'ecg',
            title: 'ECG',
            type: 'item',
            url: '/ecg',
            icon: icons.IconHeart,
            breadcrumbs: false
        }
    ]
};

export default microNutrients;
