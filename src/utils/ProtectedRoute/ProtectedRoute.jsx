import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const navigate = useNavigate();

  if (isLoggedIn) {
    return children;
  } else {
    navigate("/login");
    return null;
  }
};

export default ProtectedRoute;
