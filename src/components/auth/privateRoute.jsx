import useAuthStore from "../../store/authStore";
import { NotAuth } from './NotAuth';
import { isProduction } from '../../lib/config';

const PrivateRoute = ({ children}) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      
      
        {isAuthenticated === true || !isProduction ? children
        : <NotAuth />}
     
        
      
    </>
  );
};

export default PrivateRoute;

