export enum AppRoutes {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    ROAD_CREATE = 'create_road',
    NOT_FOUND = 'not_found',
    RIDE_CREATE = 'ride_create',
    RIDE_SAVE = 'ride_save',
    RIDE_CHAT = 'ride_chat',
    MY_RIDES = 'my_rides',
}

export const getRouteMain = () => '/';
export const getRideCreate = () => `/ride`;
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouterCreateRoad = () => '/road';
export const getRouterSaveRide = (id:string) => `/ride/${id}`;
export const getRouteChat = (id:string) => `/ride/${id}/chat`;
export const getRouteMyRides = () => `/my-rides`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouterCreateRoad()]: AppRoutes.ROAD_CREATE,
    [getRideCreate()]: AppRoutes.RIDE_CREATE,
    [getRouterSaveRide(':id')]: AppRoutes.RIDE_SAVE,
    [getRouteChat(':id')]: AppRoutes.RIDE_CHAT,
    [getRouteMyRides()]: AppRoutes.MY_RIDES,
};
