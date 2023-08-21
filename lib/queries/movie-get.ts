import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {Movie} from "@/types/movie";
import {apiClient} from "../configs/api-client";

export const useGetMovie = (imdbID?: string) => {
    return useQuery<AxiosResponse<Movie>>(
        ['get-movie', {imdbID}],
        () => apiClient.get(
            '',
            {
                params: {
                    i: imdbID,
                }
            }
        ),
        {
            keepPreviousData: true,
            enabled: !!imdbID,
        })
}
