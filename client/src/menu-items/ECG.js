// assets
import { IconStatusChange, IconHeart, IconHelp } from '@tabler/icons';

// constant
const icons = { IconStatusChange, IconHeart, IconHelp };

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
        },
        {
            id: 'stats',
            title: 'Stats',
            type: 'item',
            url: '/stats',
            icon: icons.IconStatusChange,
            breadcrumbs: false
        }
    ]
};

export default microNutrients;
