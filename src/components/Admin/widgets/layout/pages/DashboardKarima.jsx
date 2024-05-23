import React, { useContext, useEffect } from 'react'
import Tables from '../../../dashboard/tables'
import { AuthContext } from '../../../../../contexts/AuthContext';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const DashboardKarima = () => {
    const { auth } = useContext(AuthContext); // Get auth from context
    const [cookies] = useCookies(["jwt"]); // Add this line to get cookies
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.accessToken || !cookies.jwt) {
            console.error('Access token or cookie is missing',auth.accessToken);
            navigate('/login', { replace: true });   
             }
          
      }, [auth.accessToken, cookies.jwt]);
      
    


    return <div className='dark:text-white'>

        <Tables/>
    </div>
}

export default DashboardKarima
