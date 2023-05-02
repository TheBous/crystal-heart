import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import withAuth from './withAuth';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const ECG = Loadable(lazy(() => import('views/ECG/ECG')));
const Stats = Loadable(lazy(() => import('views/Stats/Stats')));
const Macronutrients = Loadable(lazy(() => import('views/macronutrients/Macronutrients')));

const AuthDashboard = withAuth(DashboardDefault);
const AuthECG = withAuth(ECG);
const AuthStats = withAuth(Stats);

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element:
                (
                    <AuthDashboard />
                )
        },
        {
            path: 'fridge',
            element:
                (
                    <UtilsTypography />
                )
        },
        {
            path: 'ecg',
            element:
                (
                    <AuthECG />
                )
        },
        {
            path: 'stats',
            element:
                (
                    <AuthStats />
                )
        },
        {
            path: 'macro',
            element:
                (
                    <Macronutrients />
                )
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: (
                        <AuthDashboard />
                    )
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
