import React, { useState, useEffect } from 'react';
import './Styles/Login.style.css';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authentication } from '../../features/auth/authSlice';

const Login = () => {
  const [loggedpassword, setLoggedPassword] = useState('');
  const [loggedemail, setLoggedEmail] = useState('');
  const [loggedrole, setLoggedRole] = useState('');

  const [authData, setAuthData] = useState([]);
  const dispatch = useDispatch();

  const [loginFailMessage, setLoginFailMessage] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await axios.get(`https://yourwoof-server.onrender.com/admin`);
      if (response.status === 200) {
        setAuthData(response.data);
      }
    };
    fetchAuth();
  }, []);

  const handleSubmitFunc = async (e) => {
    e.preventDefault();

    try {
      // Find user based on email and password
      const user =
        loggedemail !== '' &&
        loggedpassword !== '' &&
        authData.find(
          (val) => val.adminEmail.toLowerCase() === loggedemail.toLowerCase() && val.adminPassword === loggedpassword
        );

      // Check user role
      const checkRole = user && user.role === loggedrole;

      if (!user || !checkRole) {
        setLoginFailMessage('Invalid email, password, or role. Please check your credentials.');
      } else {
        const response = await axios.get(`https://yourwoof-server.onrender.com/admin/${user.id}`);
        if (response.status === 200) {
          dispatch(authentication(response.data));
        }
      }
    } catch (err) {
      console.log('An error occurred:', err.message);
      // Handle specific error cases if needed
    }
  };

  return (
    <div className='min-h-screen w-screen bg-white flex flex-col lg:flex-row overflow-hidden  '>
      <div className='table-container w-full h-screen lg:w-1/2 p-2 flex flex-col justify-start  lg:justify-center items-center bg-purple hidden lg:block'>
        <img src={require('./../../assets/images/logo.png')} alt='logo' className='text-left' />

        <div className='cover-wrapper hidden md:block lg:block flex flex-col justify-center items-center text-center'>
          <h1 className='title font-raleway font-bold text-4xl color-blue-dark pt-4 mb-6'>Welcome back, Admin</h1>
          <img src={require('./images/logo.png')} alt='cover' className=' items-center text-center mx-auto' />
        </div>
      </div>

      <div className='table-container w-full h-screen  lg:w-1/2 p-2 flex flex-col justify-start  lg:justify-center items-center bg-purple'>
        <div className='form-wrapper w-full '>
          <img src={require('./../../assets/images/logo.png')} alt='logo' className='text-left block  lg:hidden mx-auto' />

          <form
            onSubmit={handleSubmitFunc}
            className='flex flex-col justify-center items-center w-full font-raleway bg-gradient-to-r from-white rounded-lg py-16'
          >
            <div className='w-full flex flex-col justify-start items-center p-4'>
              <h1 className='text-blue-dark text-4xl font-bold'>Login</h1>
              <p className='text-blue-dark mt-2'>Login to manage your account</p>
            </div>

            <div className='text-blue-dark px-4 lg:p-2 w-full md:w-1/2 lg:w-1/2 text-start mt-2'>
              <p className=' font-bold'>Email</p>
              <input
                type='email'
                required
                value={loggedemail}
                onChange={(e) => setLoggedEmail(e.target.value)}
                className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
              />
            </div>

            <div className='text-blue-dark px-4 lg:p-2 w-full md:w-1/2 lg:w-1/2 text-start mt-2'>
              <p className='font-bold'>Password</p>
              <div className='relative'>
                <input
                  required
                  type={passwordVisible ? 'text' : 'password'}
                  value={loggedpassword}
                  onChange={(e) => setLoggedPassword(e.target.value)}
                  className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
                />
                <span className='absolute top-0 right-0 pr-3 cursor-pointer' onClick={togglePasswordVisibility}>
                  {passwordVisible ? 'Hide' : 'Show'}
                </span>
              </div>
            </div>

            <div className='text-blue-dark px-4 lg:p-2 w-full md:w-1/2 lg:w-1/2 text-start mt-2'>
              <p className=' font-bold'>Role</p>
              <select
                required
                value={loggedrole}
                onChange={(e) => setLoggedRole(e.target.value)}
                className='w-full p-2 items-center border-sm outline-none border-b border-blue-dark bg-transparent'
              >
                <option value='' disabled>
                  Select role
                </option>
                <option value='Master'>Master</option>
                <option value='Moderator'>Moderator</option>
              </select>
            </div>

            <div className='text-red px-4 lg:p-2 w-full md:w-1/2 lg:w-1/2 text-start mt-2'>
              {loginFailMessage && <p>{loginFailMessage}</p>}
            </div>

            <div className='text-blue-dark p-2 w-full md:w-1/2 lg:w-1/2 text-start'>
              <button
                type='submit'
                className=' w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
              >
                <p className='font-bold'>Login</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
