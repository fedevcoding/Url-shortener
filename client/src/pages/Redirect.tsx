import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Redirect = () => {
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const resolvedUrlJson: {
        resolvedUrl: string;
      } = await (
        await fetch(`http://localhost:3000/solveUrl?url=${url}`)
      ).json();
      const { resolvedUrl } = resolvedUrlJson;

      window.location.replace(resolvedUrl);
    })();
  }, [url, navigate]);
  return <div></div>;
};

export default Redirect;
