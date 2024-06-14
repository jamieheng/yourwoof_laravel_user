import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import { NavData } from './NavData';
import '../SideNavBar/Styles/sideBar.style.css';



import { TroubleshootOutlined } from '@mui/icons-material';


Modal.setAppElement('#root'); // Replace '#root' with your root element ID or selector

const SideBar = () => {

  const modalStyle = {
    content: {
      position: 'absolute',
      top: '85%',
      left: '10%', 
      right: 'auto',
      transform: 'translateY(-50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(1px)', 
    },
  };

  const loggoutModalStyle = {
    content: {
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', // Center both vertically and horizontally
     
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(1px)', 
    },
  };



  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(TroubleshootOutlined);



  const [isLoggoutModalOpen, setIsLoggoutModalOpen] = useState(false);
  const openLoggoutModal = () => {
    setIsLoggoutModalOpen(true);
  };

  const closeLoggoutModal = () => {
    setIsLoggoutModalOpen(false);
  };

  const [authData, setAuthData] = useState([]);
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut());
};

  const { user } = useSelector((state) => state.user);

  


  return (
    <div className={`z-40 fixed w-10 md:w-16 lg:w-${isSidebarOpen ? '16' : '64'} md:py-2 lg:py-${isSidebarOpen ? '2' : '0'} lg:p-${isSidebarOpen ? '0' : '2'} h-screen bg-gradient-to-t from-blue-dark to-blue text-white flex flex-col rounded-r-lg`}>

      {/* Sidebar Header */}
      <div className={`pt-4 mb-4 flex flex-col lg:flex-${isSidebarOpen ? 'col' : 'row'}  items-center justify-center`}>
        <img
          src={require('../../assets/images/sm-logo.png')}
          alt="Logo"
          className={`w-6 h-6 md:w-10 md:h-10 lg:w-10 lg:h-10 lg:${isSidebarOpen ? 'block' : 'hidden'} rounded-full`}
        />

        <img
          src={require('../../assets/images/logo.png')}
          alt="Logo"
          className={`w-100 h-20 rounded-full hidden lg:${isSidebarOpen ? 'hidden' : 'block'}`}
        />

        <div className='hidden lg:block hover:bg-purple hover:text-blue-dark rounded-full'>
        <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        
      </div>


      <hr  className='border-1 border-purple '/>

      <div className='navbar-container flex-1 '>
        
        {/* Navigation 1 Links */}
        <nav className="navbar overflow-y-auto">
          <ul>
            {NavData.map((val, key) => (
            
              <li key={key} className="m-1">
                <div className=" hover:text-blue-dark text-3xl lg:text-xl font-raleway  ">

                    <NavLink
                      to={val.link}
                      className={`p-2 md:p-4 lg:p-4 hover:bg-purple flex flex-row justify-center lg:justify-${isSidebarOpen ? 'center' : 'start'} items-center rounded-sm md:rounded-lg lg:rounded-lg `}
                      activeClassName="active"
                      exact
                    >
                      {val.icon}
                      <p className={`hidden lg:${isSidebarOpen ? 'hidden' : 'block'} ml-2`}>{val.title}</p>
                    </NavLink>
                 
                </div>
              </li>
            ))}
          </ul>
        </nav>


        <hr  className='border-1 border-purple '/>
       
      </div>



      
      <hr  className='border-1 border-purple '/>

      {/* User Profile (Optional) */}
      <div className={`p-2 mb-4 justify-center flex flex-col lg:flex-${isSidebarOpen ? 'col' : 'row'}  items-center`}>
        
          <>
          <img
          src={"https://cdn-icons-png.freepik.com/512/9703/9703596.png"}
          alt="Profile"
          className={`w-6 h-6 md:w-10 md:h-10 lg:w-${isSidebarOpen ? '10' : '12'} lg:h-${isSidebarOpen ? '10' : '12'} rounded-full mx-auto object-cover`} /><div className={`hidden lg:${isSidebarOpen ? 'hidden' : 'block'} flex flex-col justify-start object-cover `}>
            <p className="mt-1 font-raleway">{user.first_name}</p>
            {/* <p className="mt-1 font-raleway">{admin.role}</p> */}

          </div>
            <MoreVertIcon
            className={`rotate-90 lg:block text-3xl cursor-pointer mx-auto mt-2 hover:bg-purple hover:text-blue-dark rounded-full`}
            onClick={openModal} />
          </>

        
      </div>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Modal"
        className={`fixed w-10 md:w-16 lg:w-64 md:py-2 bg-blue-dark text-white flex flex-col rounded-r-lg`}
        style={modalStyle}
      >
      <div className="p-2 lg:p-4 flex flex-row items-center ">
        
          <>
          <img
          src={"https://cdn-icons-png.freepik.com/512/9703/9703596.png"}
          alt="Profile"
          className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full mx-auto object-cover" />
          <div className='hidden lg:block flex flex-col lg:flex-row justify-start '>
            <p className="mt-1 font-raleway">@{user.first_name} {user.last_name} </p>
            {/* <p className="mt-1 font-raleway">{admin.role}</p> */}

          </div>
          <div className='text-3xl cursor-pointer mx-auto mt-2 '></div></>
       
      </div>
      <hr  className='border-1 border-purple '/>


        <ul >
         
            <li className="m-1" >
              <NavLink 
                to={'ProfileSetting'}
                activeClassName="active"
                exact
              >
                <div className={`p-2 md:p-4 lg:p-4 hover:bg-purple hover:text-blue-dark flex flex-row justify-center lg:justify-start items-center rounded-sm md:rounded-lg lg:rounded-lg `} onClick={() => closeModal()}>
                  
                  <ManageAccountsIcon  />
                  <p className="hidden lg:block rounded ml-2 text-xl font-raleway">Account setting</p>
                </div>

              </NavLink>
              
            </li>

         
          
         
            <li className="m-1">
              <div className={`p-2 md:p-4 lg:p-4 hover:bg-purple hover:text-blue-dark flex flex-row justify-center lg:justify-start items-center rounded-sm md:rounded-lg lg:rounded-lg ` } onClick={() => openLoggoutModal()} >
                < LogoutIcon />
                <p className="hidden lg:block rounded ml-2 text-xl font-raleway">Logout</p>
              </div>

               {/* loggout modal */}
                <Modal
                  isOpen={isLoggoutModalOpen}
                  onRequestClose={closeLoggoutModal}
                  contentLabel="Profile Modal"
                  className={`p-2 bg-white text-center text-white rounded-lg w-full md:w-1/2 lg:w-1/2 font-raleway`}
                  style={loggoutModalStyle}
                >
                  <form action="" className='flex flex-col justify-center items-center w-full'>
                        
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to loggout?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeLoggoutModal}>
                            <CloseIcon/>
                          </button>

                        </div>
                        <hr  className='border-1 border-purple '/>

                        
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeLoggoutModal} >
                                <p>Cancel</p>
                              </button>

                              <NavLink to='/Login'>
                                <button className='p-2 px-4 bg-blue-dark rounded-full hover:bg-blue' onClick={() => { closeLoggoutModal(); closeModal(); onLogOut()}}>
                                  <p>Yes</p>
                                </button>
                              </NavLink>
                            
                        </div>
                        
                      </form>
      
                </Modal>
                
            </li>

        </ul>
      </Modal>
     
    </div>
  );
};

export default SideBar;
