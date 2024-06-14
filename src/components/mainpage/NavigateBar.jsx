import React, { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CottageIcon from '@mui/icons-material/Cottage';
import InfoIcon from '@mui/icons-material/Info';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import axios from 'axios';

export function NavigateBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPetListPage = location.pathname === '/petlist';
  const isAboutUsPage = location.pathname === '/aboutus';
  const isContactUsPage = location.pathname === '/contactus';
  const isTrackingPage = location.pathname === '/tracking';
  const isCommunityPage = location.pathname === '/community';
  const isDonationPage = location.pathname === '/donation';

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 1280 && setOpenNav(false));
  }, []);

  const onLogOut = () => {
    dispatch(logOut());
  };

  

  const [tracking, setTracking] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/trackings')
      .then((response) => {
        const data = response.data.trackings;
        const completedTracking = data.filter((tracking) => !tracking.is_completed);
        setTracking(completedTracking);

        console.log(response.data.trackings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  useEffect(() => {
    const checkIfUserIdExists = () => {
      if (user && user.id) {
        const userId = user.id;
        const isExisted = tracking.some((tracking) => tracking.user_id === userId);

        if (isExisted) {
          console.log('User ID already exists.');
          setIsVerified(true);
        } else {
          console.log(tracking.user_id)
          console.log(userId)
          console.log('User ID does not exist.');
          setIsVerified(false);
        }
      } else {
        console.log('User is not logged in.');
      }
    };

    checkIfUserIdExists();
  }, [tracking, user]);


  const navList = (
    <ul className='flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center'>
      <div className='flex p-4 flex-row items-center justify-center lg:hidden'>
        {user && (
          <p className='text-darkpurple mr-3 font-raleway'>
            <span className='font-bold'>Welcome,</span> {user.fisrt_name} {user.last_name} {user.is_verified ? < VerifiedIcon className=' ml-2 w-2 h-2'/> : null} 
          </p>
        )}
        {user && (
          <Button
            className='hover:text-darkpurple hidden lg:block'
            variant='filled'
            size='sm'
            style={{ backgroundColor: '#BF94E4' }}
            onClick={onLogOut}
          >
            Log Out
          </Button>
        )}

        {!user && (
          <Button
            variant='filled'
            size='sm'
            className='hover:text-darkpurple hidden lg:block'
            style={{ backgroundColor: '#BF94E4' }}
          >
            <Link to='/' className='flex items-center '>
              Sign in
            </Link>
          </Button>
        )}
      </div>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isHomePage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <CottageIcon/>
        </div>

        <Link to='/' className='flex text-bold items-center ml-2'>
          HOME
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isPetListPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <PetsOutlinedIcon/>
        </div>

        <Link to='/petlist' className='flex text-bold items-center ml-2 '>
          ADOPT
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isAboutUsPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <InfoIcon/>
        </div>

        <Link to='/aboutus' className='flex text-bold items-center ml-2 '>
          ABOUT US
        </Link>
      </Typography>


      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isCommunityPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
        <PublicOutlinedIcon/>
        </div>

        <Link to='/community' className='flex text-bold items-center ml-2 '>
         COMMUNITY
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isDonationPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
       <VolunteerActivismIcon/>

        </div>

        <Link to='/donation' className='flex text-bold items-center ml-2 '>
          DONATION
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isContactUsPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <ContactSupportIcon/>
        </div>

        <Link to='/contactus' className='flex text-bold items-center ml-2 '>
          CONTACT US
        </Link>
      </Typography>

      <div className={`${isVerified ? 'block' : 'hidden'}`}>
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
            isTrackingPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
          }`}
        >
          <div className={`hidden lg:block `}>
            <TrackChangesIcon/>
          </div>

          <Link to='/tracking' className='flex items-center ml-2 '>
            TRACKING
          </Link>
        </Typography>

        {/* mobile login */}
      </div>
      <div className='p-4  lg:hidden'>
      

        {!user && (
          <Button variant='filled' size='sm' className='hover:text-darkpurple ' style={{ backgroundColor: '#BF94E4' }}>
            <Link to='/' className='flex items-center '>
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </ul>
  );

  return user ? (
    <Navbar className='fixed top-0 bg-white z-40 w-screen h-auto' style={{ maxWidth: '100%' }}>
      <div
        style={{ maxWidth: '100%' }}
        className='w-full container p-2 flex flex-row items-center justify-between text-blue-gray-900'
      >
        <div>
          <img src='../images/logo.svg' alt='logo' className='dog-logo w-40 h-30' />
        </div>

        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </IconButton>

        <div className='hidden lg:block'>{navList}</div>

        <div className='flex flex-row items-center justify-center ml-auto lg:block '>
          <div className='flex flex-row items-center justify-center'>
            {user && (
              <p className='text-darkpurple mr-3 font-raleway flex flex-row items-center justify-start'>
              <img src="https://www.svgrepo.com/show/452956/dog-head-profile.svg" alt="" className="w-12 h-12 rounded-full border border-darkpurple" />
              <div className='flex flex-col items-start text-left ml-2 '>
                <p className='font-bold flex flex-row justify-start items-center'>
                  {user.first_name} {user.last_name} {user.is_verified ? < VerifiedIcon className=' ml-2 w-2 h-2'/> : null} 
                </p>
                <div className='flex flex-row items-center justify-start hover:text-purple'>
                 
                  <p className='text-sm font-raleway'>
                  <Link to='/profile' >
                    View profile
                    </Link>
                  </p> <ArrowDropDownIcon/>
                 
                 
                </div>
              </div>
            </p>
            
            )}
            {/* {user && (
              <Button
                className='hover:text-darkpurple hidden lg:block'
                variant='filled'
                size='sm'
                style={{ backgroundColor: '#BF94E4' }}
                onClick={onLogOut}
              >
                Log Out
              </Button>
            )} */}

            {!user && (
              <Button
                variant='filled'
                size='sm'
                className='hover:text-darkpurple hidden lg:block'
                style={{ backgroundColor: '#BF94E4' }}
              >
                <Link to='/' className='flex items-center '>
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <MobileNav open={openNav} className=''>
        <div className='container mx-auto'>{navList}</div>
      </MobileNav>
    </Navbar>
  ) : null;
}
