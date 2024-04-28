import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

import MainIcon from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRideCreate,
    getRouteAbout,
    getRouteArticles,
    getRouteMain, getRouteMyRides,
    getRouteProfile, getRouterCreateRoad,
} from '@/shared/const/router';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Головна',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'Про Сайт',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Профіль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticleIcon,
                text: 'Новини',
                authOnly: true,
            },
            {
                path: getRouterCreateRoad(),
                Icon: MainIcon,
                text: 'Cтворити Маршут',
                authOnly: true,
            },
            {
                path: getRideCreate(),
                Icon: MainIcon,
                text: 'Cтворити Поїздку',
                authOnly: true,
            },
            {
                path: getRouteMyRides(),
                Icon: MainIcon,
                text: 'Мої поїздки',
                authOnly: true,
            },

        );
    }

    return sidebarItemsList;
};
