import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);
  // const navigate = useNavigate();
  
  // useEffect(() => {

  //   navigate('/login', {state: {isNavigated: true}})
  
  // },)
  

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      
      {/* <Navigate to="/login" state={ isNavigated : true } replace /> */}
    </div>
  );
}
