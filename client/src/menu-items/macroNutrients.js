// assets
import { IconApple, IconHelp } from '@tabler/icons';

// constant
const icons = { IconApple, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const macroNutrients = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'macro',
            title: 'Macronutrients',
            type: 'item',
            url: '/macro',
            icon: icons.IconApple,
            breadcrumbs: false
        }
    ]
};

export default macroNutrients;
