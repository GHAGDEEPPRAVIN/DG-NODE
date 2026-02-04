import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignupRolePage() {
    const navigate = useNavigate();

    function navigatetoSellerPage() {
        navigate("/signup-seller");
    }
    function navigatetoUserPage() {
       navigate("/signup-user");
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
                <div style={{ width: "60%", height: "500px" }} className='container d-flex justify-content-center align-items-center shadow p-0'>
                    <div style={{ height: "100%", width: "40%" }} className='bg-primary p-5 d-flex flex-column justify-content-center align-items-center'>
                        <div className='vh-100 w-100'>
                            <h2 className='text-white mb-3'>Looks like you're new here!</h2>
                            <span className='text-light'>Sign up as User or Seller and get started</span>
                        </div>
                        <div className='mt-3 vh-100 w-100'>
                            <img className='w-100' src="/image/login/loginImage.png" alt="" />
                        </div>
                    </div>
                    <div style={{ width: "60%", height: "100%" }} className='d-flex flex-column justify-content-between align-items-between p-5'>
                        <div>
                            <form>
                                <div>
                                    <h1 style={{fontSize:"35px"}} className='text-center fw-bold mb-5'>Register as</h1>    
                                </div>  
                               <div>
                                 <div className='d-flex justify-content-center align-items-center my-5'>
                                    <button onClick={navigatetoUserPage} style={{ fontSize:"20px", height:"100px", border:"3px solid #FB641B", color:"#FB641B"}} className="fw-bold text-center fw-bold btn w-50 shadow">User</button>
                                </div>
                                 <div className='d-flex justify-content-center align-items-center my-5'>
                                    <button onClick={navigatetoSellerPage} style={{ fontSize:"20px", height:"100px" , border:"3px solid #FB641B", color:"#FB641B"}} className="fw-bold text-center fw-bold btn w-50 shadow">Seller</button>
                                </div>
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  )
}
