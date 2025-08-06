import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (isLoggedIn) {
    return children;
  } else {
    const navigate = useNavigate();
    navigate("/login");
    return null;
  }
};

export default ProtectedRoute;
