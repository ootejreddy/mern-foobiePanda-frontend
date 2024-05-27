import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  /*
   * here we are using useRef hook to stop multiple running of useEffect on multiple renders
   * this is because once the user login and comes back to home page, in such cases no need of running this useEffect again
   * because useEffect runs when the page reloads.
   */
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");

    return () => {
      <>Loading...</>;
    };
  }, [createUser, navigate, user]);

  return <div>AuthCallbackPage</div>;
};

export default AuthCallbackPage;
