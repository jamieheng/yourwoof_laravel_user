import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Card } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authentication } from '../features/auth/authSlice';

function Login() {
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const [loggedPhone, setLoggedPhone] = useState('');
  const [loggedPassword, setLoggedPassword] = useState('');
  const [authData, setAuthData] = useState([]);
  const [loginFailMessage, setLoginFailMessage] = useState('');
  const dispatch = useDispatch();

 
  
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users`);
        if (response.status === 200) {
          setAuthData(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching authentication data:', error.message);
      }
    };
    fetchAuth();
  }, []);

  const handleSubmitFunc = async (e) => {
    e.preventDefault();
  
    try {
      // Convert loggedPhone to string explicitly
      const formattedPhone = `+855${loggedPhone}`;
  
      // Find user by comparing formattedPhone with stored phone numbers
      const checkPhone = authData.find((user) => user.phone === formattedPhone);
  
      if (!checkPhone) {
        setLoginFailMessage('User not found.');
       
      } else {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${checkPhone.id}`);
        if (response.status === 200) {
          dispatch(authentication(response.data.users));
        }
      }
    } catch (err) {
      console.error('An error occurred:', err.message);
      // Handle specific error cases if needed
    }
  };
  

  return (
    <div className='bg-container flex flex-col justify-start lg:flex-row lg:justify-center h-screen w-screen '>
      <div
        className='welcome-image bg-blue-dark w-full lg:w-1/2 h-64 lg:h-full'
        style={{
          backgroundImage: `url(../images/dogbg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div className='logo-header flex flex-col justify-start items-center mt-4'>
          <div className='welcome-logo flex flex-row items-start'>
            <h1 className='hidden lg:block welcome-title font-raleway color-purple text-2xl md:text-4xl text-white lg:mt-24 lg:ml-24'>
              Welcome to
            </h1>
            <img src='../images/logo.svg' alt='logo' className='dog-logo w-40 h-30 md:w-60 md:h-45 lg:mt-12' />
          </div>
        </div>
      </div>

      <div className='login-form flex flex-col justify-center  items-center w-1/2 bg-gradient-to-b from-white rounded-lg'>
        <div className='mb-6'>
          <p className='text-3xl font-bold mt-8 '>LOG IN</p>
        </div>

        <div className='flex flex-col items-center  font-raleway w-full'>
          <Card
            color='transparent'
            shadow={false}
            className='flex flex-col justify-start items-center mt-4 font-raleway w-full '
          >
            <form onSubmit={handleSubmitFunc}>
              <div className='form-group w-full'>
                <label>Phone Number</label>
                <div className='relative phone-input-container'>
                  <p className='absolute top-1/2 left-2 transform -translate-y-1/2'>🇰🇭+855</p>
                  <input
                    onChange={(e) => setLoggedPhone(e.target.value)}
                    name='phone'
                    type='tel' // Use type='tel' for telephone numbers
                    pattern='^\d{8,9}$' // Optional: HTML5 pattern for validation (accepts only 8-9 digits)
                    required
                    className='form-control w-full bg-transparent pl-14'
                    value={loggedPhone} // Bind value to state
                  />
                </div>
              </div>

              <div className='form-group w-full'>
                <label>Password</label>
                <div className='relative'>
                  <input
                    value={loggedPassword}
                    onChange={(e) => setLoggedPassword(e.target.value)}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    className='form-control w-full bg-transparent'
                  />
                  <button
                    type='button'
                    className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 px-2 py-1 text-sm rounded'
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className='text-red px-4 lg:p-2 w-full text-start mt-2'>
                  {loginFailMessage && <p>{loginFailMessage}</p>}
                </div>
              </div>

              <div className='form-group text-center'>
                <button
                  type='submit'
                  className='btn btn-primary bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 px-8 py-3 text-lg rounded-lg mb-3'
                >
                  Login
                </button>

                <p>Don't have an account? </p>
                <p>
                  <Link to='/WelcomePage' className='font-bold text-lavender hover:text-darkpurple'>
                    Sign Up
                  </Link>{' '}
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
