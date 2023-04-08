import { useNavigate, useParams } from "react-router-dom";

export type UseNavigatorResult = (
  url: string,
  replace?: boolean,
  preserveQs?: boolean
) => void;
function useNavigator(): UseNavigatorResult {
  const navigate = useNavigate();
  const { search } = useParams();

  return (url: string, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + search : url;
    navigate(targetUrl, { replace });

    window.scrollTo({ behavior: "smooth", top: 0 });
  };
}

export default useNavigator;
