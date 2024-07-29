import { useLocation } from "react-router-dom";

export const getQueryParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const gid = params.get("gid");

  const uid = params.get("uid");

  const name = params.get("name");

  return {
    gid,
    uid,
    name,
  };
};
