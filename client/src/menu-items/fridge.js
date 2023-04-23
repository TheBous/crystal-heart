// assets
import { IconFridge, IconHelp } from '@tabler/icons';

// constant
const icons = { IconFridge, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const microNutrients = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'fridge',
            title: 'Fridge',
            type: 'item',
            url: '/fridge',
            icon: icons.IconFridge,
            breadcrumbs: false
        }
    ]
};

export default microNutrients;
