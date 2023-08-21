import {useQuery} from "@tanstack/react-query";
import {apiClient} from "../configs/api-client";
import {AxiosResponse} from "axios";
import {MovieSearchResponse} from "@/types/movie.ts";

type UseMovieSearchProps = {
    query?: string;
    page?: number;
}

export const useMovieSearch = ({query, page}:UseMovieSearchProps) => {
    return useQuery<AxiosResponse<MovieSearchResponse>>(
        ['movieSearch', query, page],
        () => apiClient.get(
            '',
            {
                params: {
                    s: query,
                    page,
                }
            }
        ),
        {
            enabled: !!query,
        })
}
