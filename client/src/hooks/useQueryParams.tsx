import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface QueryParams {
    gid: string | null;
    uid: string | null;
    mid: string | null;
    code: string | null
    menu_parent_id: string | null
    name: string | null
    field: string | null
}

export const useQueryParams = () => {
    const { search } = useLocation();
    const [queryParams, setQueryParams] = useState<QueryParams>({
        gid: null, uid: null, code: null, mid: null, menu_parent_id: null, name: null, field: null
    });

    useEffect(() => {
        const params = new URLSearchParams(search);
        const gid = params.get("gid");
        const uid = params.get("uid");
        const mid = params.get("mid");
        const code = params.get("code");
        const menu_parent_id = params.get("menu_parent_id");
        const name = params.get("name");
        const field = params.get("field");

        setQueryParams({
            gid: gid || null,
            uid: uid || null,
            mid: mid || null,
            code: code || null,
            menu_parent_id: menu_parent_id || null,
            name: name || null,
            field: field || null,
        });
    }, [search]);

    return queryParams;
};