import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useDebounce} from "@/lib/hooks/useDebounce.tsx";

type PageContextType = {
    page: number;
    search: string;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    debouncedSearch?: string;
};

const PageContext = createContext<PageContextType>({
    page: 1,
    search: '',
    setPage: () => {
    },
    setSearch: () => {
    },
    debouncedSearch: ''
});

type PageProviderProps = {
    children: ReactNode;
}

const PageProvider = ({children}: PageProviderProps) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search, 400)

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch]);

    return (
        <PageContext.Provider value={{page, search, setSearch, setPage, debouncedSearch}}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {

    if(!useContext(PageContext)) throw new Error('usePageContext must be used within a PageProvider');

    return useContext(PageContext);
}

export default PageProvider;
