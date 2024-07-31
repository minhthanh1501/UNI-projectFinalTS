import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface QueryParams {
    gid: string | null;
    uid: string | null;
    mid: string | null;
    code: string | null
}

export const useQueryParams = () => {
    const { search } = useLocation();
    const [queryParams, setQueryParams] = useState<QueryParams>({ gid: null, uid: null, code: null, mid: null });

    useEffect(() => {
        const params = new URLSearchParams(search);
        const gid = params.get("gid");
        const uid = params.get("uid");
        const mid = params.get("mid");
        const code = params.get("code");

        setQueryParams({
            gid: gid || null,
            uid: uid || null,
            mid: mid || null,
            code: code || null,
        });
    }, [search]);

    return queryParams;
};