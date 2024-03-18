import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    retrieveHelloWorldPathVariable(username, authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("CLEANUP"));
  }

  const successfulResponse = (response) => {
    console.log(response);
    setMessage(response.data.message);
  };

  const errorResponse = (error) => {
    console.log(error);
  };

  return (
    <div className="WelcomeComponent">
      <h2>Welcome {username.toUpperCase()}!</h2>
      <div>
        Navigate to Todos <Link to="/listTodos">here..........</Link>
      </div>
      <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
        Call Hello World
      </button>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
