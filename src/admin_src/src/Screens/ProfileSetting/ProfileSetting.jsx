import React from 'react'
import { useState } from 'react';
import './Styles/ProfileSetting.style.css'
import { useSelector } from 'react-redux';


const ProfileSetting = () => {

   const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user } = useSelector((state) => state.user);


   const [userName, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [img, setImg] = useState(null);
   const [role, setRole] = useState('');
   const [password, setPassword] = useState('');
   const [address, setAddress] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   
   
    return (
      <div 
        style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/cute-pets-illustration_53876-112522.jpg')`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',  
                backgroundRepeat: 'no-repeat',
                
            }}
        className="pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden font-raleway ">
        
         <h1 className="title font-bold text-4xl color-blue-dark pt-4">Profile Setting</h1>

         <div className="main-content flex flex-col md:flex-row lg:flex-row justify-center mt-4 ">

            <div 
                
                className="content w-full flex flex-col justify-start items-center">

               <div className='pf-container w-full h-full flex flex-col justify-start items-center p-4'>

               <img  
                    src={user.userImage}
                    alt="Logo"
                    className="w-32 h-32 rounded-full object-cover" 
                />


                  <div className='text-wrapper flex flex-col justify-center items-center m-6' >
                     <p className='text-xl'>{user.first_name}</p>
                     {/* <p>{user.userEmail}</p>
                     <p>{user.role}</p> */}

                  </div>

                  <div className="form-container w-1/2 h-full bg-gradient-to-t from-white rounded-lg">
                    <form action="" className='flex flex-col justify-center items-center w-full font-raleway '>
                            
                            <div className='w-full flex flex-col justify-start items-center p-4'>
                                <h1 className='text-blue-dark text-xl font-bold'>Edit Info</h1>
                                
                            </div>
                                
            
                        
                                <div className='text-blue-dark px-4  lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className=' font-bold'>Username</p>
                                    <input 
                                        type="text"
                                        required
                                        value={user.first_name}
                                        onChange={(e) => setUsername(e.target.value)} 
                                        className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent '
                                    />
                                </div>
            
            
                                <div className='text-blue-dark px-4 lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className=' font-bold'>Email</p>
                                    <input 
                                        type="email"
                                        
                                        value={user.phone}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                                    />
            
                                </div>
            
            
                                <div className='text-blue-dark px-4 lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className='font-bold'>Password</p>
                                    <div className='relative'>
                                        <input
                                            
                                            type={passwordVisible ? 'text' : 'password'}
                                            value={user.password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                                        />
                                        <span
                                            className='absolute top-0 right-0 pr-3 cursor-pointer'
                                            onClick={togglePasswordVisibility}
                                        >
                                        {passwordVisible ? 'Hide' : 'Show'}
                                        </span>
                                    </div>
                                </div>
                                    
                                {/* <div className='text-blue-dark px-4 lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className=' font-bold'>Phone number</p>
                                    <input 
                                        type="text"
                                        value={user.phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                                    />
            
                                </div> */}

                                <div className='text-blue-dark px-4 lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className=' font-bold'>Address</p>
                                    <input 
                                        type="text"
                                        value={user.address}
                                        onChange={(e) => setAddress(e.target.value)} 
                                        className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                                    />
            
                                </div>
                                    
                                {/* <div className='text-blue-dark px-4 lg:p-2 w-full lg:w-1/2 text-start mt-2'>
                                    <p className=' font-bold'>Role</p>
                                    <select
                                    
                                        value={user.role}  
                                        onChange={(e) => setRole(e.target.value)} 
                                        
                                        className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                                    >
                                        <option value='' disabled>Select role</option>
                                        <option value='Master'>Master</option>
                                        <option value='Moderator'>Moderator</option>
                                    </select>
            
                                </div> */}
            
                                    
                                <div className='text-blue-dark p-2 w-full lg:w-1/2 text-start'>
                                    <button className=' w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white' >
                                        <p className='font-bold'>Save Changes</p>
                                    </button>
                                </div>
                                    
                    </form>
                  </div>

               </div>
               

              
            </div>


            <div className="content bg-green min-h-screen rounded-lg w-full ml-1 hidden ">
               <div className="header-box-wrapper bg-white justify-center items-center rounded-large ">
               
                 
               </div>
            </div>

         </div>
         


         
      </div>
    
    )
}

export default ProfileSetting;