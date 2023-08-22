import {QueryClientProvider} from "@tanstack/react-query";
import {muiTheme, queryClientConfig, router} from "@/lib/configs";
import {RouterProvider} from "react-router-dom";
import {ReactNode} from "react";
import {ThemeProvider} from "@mui/material";
import {ClientContextProvider, PageProvider} from "@/lib/context";

type ProvidersProps = {
    children?: ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
    return (
        <>
            <ThemeProvider theme={muiTheme}>
                <QueryClientProvider client={queryClientConfig}>
                    <PageProvider>
                        <ClientContextProvider>
                            <RouterProvider router={router}/>
                            {children}
                        </ClientContextProvider>
                    </PageProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    );
};

export default Providers;
