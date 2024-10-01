import Error404Page from './index';

const Error404Config = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false,
                },
                toolbar: {
                    display: false,
                },
                footer: {
                    display: false,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
        }
    },
    routes: [
        {
            path: '404',
            element: <Error404Page />,
        },
    ],
};

export default Error404Config;
