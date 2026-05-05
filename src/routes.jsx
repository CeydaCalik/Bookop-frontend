import App from "./App";
import { List } from "./features/Book/List";
import { Home } from "./layout/pages/Home";
import { Register } from './features/auth/pages/Register'
import { Login } from './features/auth/pages/Login'
import { BookPage } from "./features/Book/BookPage";


/**
 * @type {import("react-router").RouteObject[]}
 */

export const routes = [
    {
        path : "/",
        element : <App />,
        children :  [
            {
                index : true,
                element : <Home />
            },
            {
                path : "list",
                element : <List />
            },
            {
                path : "book/:id",
                element : <BookPage />
            },
            {
                path : "auth",
                children  : [
                    {
                        path : 'register',
                        element : <Register />
                    },
                    {
                        path : 'login',
                        element : <Login />
                    }
                ]
            }
        ]
    }
]