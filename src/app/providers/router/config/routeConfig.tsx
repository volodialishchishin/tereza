import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteForbidden,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
    getRouteSettings, getRouterCreateRoad, getRideCreate, getRouterSaveRide, getRouteChat, getRouteMyRides,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { SettingsPage } from '@/pages/SettingsPage';
import { RoadCreatePage } from '@/pages/RoadCreatePage';
import { CreateRidePage } from '@/pages/RideCreatePage';
import { SaveRidePage } from '@/pages/RideSavePage';
import { Chat } from '@/pages/ChatPage';
import { MyRides } from '@/pages/MyRides';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ROAD_CREATE]: {
        path: getRouterCreateRoad(),
        element: <RoadCreatePage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
    [AppRoutes.RIDE_CREATE]: {
        path: getRideCreate(),
        element: <CreateRidePage />,
    },
    [AppRoutes.RIDE_SAVE]: {
        path: getRouterSaveRide(':id'),
        element: <SaveRidePage />,
    },
    [AppRoutes.RIDE_CHAT]: {
        path: getRouteChat(':id'),
        element: <Chat />,
    },
    [AppRoutes.MY_RIDES]: {
        path: getRouteMyRides(),
        element: <MyRides />,
    },
};
