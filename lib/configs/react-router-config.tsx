import {createBrowserRouter} from "react-router-dom";
import MovieSearchPage from "@/src/movie-search/page";
import MovieDetailPage from "@/src/movie-quick-detail/page";
import FavoritePage from "@/src/favorite-movie/page";
import {ROUTES} from "@/lib/constants";

export const router = createBrowserRouter([
    {
        path: ROUTES.MOVIE_SEARCH,
        element: <MovieSearchPage/>,
        children: [
            {
                path: ROUTES.MOVIE_DETAILS,
                element: <MovieDetailPage/>
            },
        ]
    },
    {
        path: ROUTES.FAVORITES,
        element: <FavoritePage/>,
        children: [
            {
                path: ROUTES.FAVORITES + ROUTES.MOVIE_DETAILS,
                element: <MovieDetailPage/>
            },
        ]
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <div>404</div>
    }
])

