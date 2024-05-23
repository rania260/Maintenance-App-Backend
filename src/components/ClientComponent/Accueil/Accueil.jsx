import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import Profile from '../Profile/Profile';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
    const { auth } = useContext(AuthContext); 
    const [cookies] = useCookies(["jwt"]); 
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth.accessToken || !cookies.jwt) {
            console.error('Access token or cookie is missing',auth.accessToken);
            navigate('/login', { replace: true });   

          }
          
      }, [auth.accessToken, cookies.jwt]);
      
    


    return <div className='dark:text-white'>

        <Profile/>
    </div>
}

export default Accueil
