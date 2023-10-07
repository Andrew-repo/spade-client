import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const location = useLocation();

  return user?._id ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: { location } }} />
  );
};

export default PrivateRouter;
