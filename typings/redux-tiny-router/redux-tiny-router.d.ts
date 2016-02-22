declare module 'redux-tiny-router' {
    interface RouterParams {
        [param:string]:string;
    }

    interface RouterState {
        params: RouterParams;
        path?:string;
        paths?:string[];
        src?:string;
        splat?:string;
    }

    function applyMiddleware(...props);

    class utils {
        static set(url?:string);

        static setRoutes(urls?:string[]);
    }

    class tinyActions {
        static navigateTo(url?:string, data?:any);
    }
}