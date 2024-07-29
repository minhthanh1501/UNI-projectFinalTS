import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface QueryParams {
    gid: string | null;
    uid: string | null;
}

export const useQueryParams = () => {
    const { search } = useLocation();
    const [queryParams, setQueryParams] = useState<QueryParams>({ gid: null, uid: null });

    useEffect(() => {
        const params = new URLSearchParams(search);
        const gid = params.get("gid");
        const uid = params.get("uid");

        setQueryParams({
            gid: gid || null,
            uid: uid || null,
        });
    }, [search]);

    return queryParams;
};