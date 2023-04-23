// assets
import { IconSalt, IconHelp } from '@tabler/icons';

// constant
const icons = { IconSalt, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const microNutrients = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'micro',
            title: 'Micronutrients',
            type: 'item',
            url: '/micro',
            icon: icons.IconSalt,
            breadcrumbs: false
        }
    ]
};

export default microNutrients;
