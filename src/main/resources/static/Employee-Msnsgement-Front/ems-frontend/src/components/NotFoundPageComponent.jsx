import React from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom'

function NotFoundPage() {
  const {id} = useParams();
  const location = useLocation();
  function whatsError(){
    if(id && location.pathname.includes(`${id}/*`)){
        return  <h2 className='text-center'>Employee Not Found </h2>
    }else{
        return   <p className='text-center'>Aradığınız sayfa mevcut değil.</p>
    }
}
  return (
    <div>
      <h1 className="text-center">404</h1>
      {
        whatsError()
      }
    </div>
  );
}

export default NotFoundPage;