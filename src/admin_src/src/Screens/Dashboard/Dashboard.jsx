import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Dashboard.style.css';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import { useSelector } from 'react-redux';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


import { PieChart } from '@mui/x-charts/PieChart';




import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/pets')
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const countMalePets = pets.filter((pet) => pet.pet_gender_id === 1).length;
  const countFemalePets = pets.filter((pet) => pet.pet_gender_id === 2).length;

  

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/users')
      .then((response) => {
        const normalUser = response.data.users.filter((user) => user.role_id === 2);
        setUsers(normalUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const userCount = users.length;

  const [userVerified, setUserVerified] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/users')
      .then((response) => {
        const data = response.data.users;
        const normalUser = data.filter((user) => user.role_id === 2 && user.is_verified);
        setUserVerified(normalUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const userVerifiedCount = userVerified.length;

  const [userRequest, setUserRequest] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/users')
      .then((response) => {
        const normalUser = response.data.users.filter((user) => user.role_id === 2 && !user.is_verified);
        setUserRequest(normalUser);
        console.log(userRequest);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const userRequestCount = userRequest.length;

  const [tracking, setTracking] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/trackings')
      .then((response) => {
        const normalUser = response.data.trackings;
        setTracking(normalUser);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totaltracking = tracking.length;


  const [completedTracking, setCompletedTracking] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/trackings')
      .then((response) => {
        const normalUser = response.data.trackings.filter((tracking) => tracking.is_completed);
        setCompletedTracking(normalUser);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const completedTrackingCount = completedTracking.length;

  const [pendingTracking, setPendingTracking] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/trackings')
      .then((response) => {
        const normalUser = response.data.trackings.filter((tracking) => !tracking.is_completed);
        setPendingTracking(normalUser);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const pendingTrackingCount = pendingTracking.length;

  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/adoptions')
      .then((response) => {
        setAdoptions(response.data.adoptions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const adoptCount = adoptions.length;
  const [adoptionRequest, setAdoptionRequest] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/adoptions')
      .then((response) => {
       const adoptRequest = response.data.adoptions.filter((adoption) => !adoption.is_approved);
        setAdoptionRequest(adoptRequest);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const countCompletedAdoption = adoptions.filter((adoption) => adoption.is_approved).length;
  const adoptionRequestCount = adoptionRequest.length;

  
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/posts')
      .then((response) => {
        setPost(response.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [donations, setDonations] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/donations')
      .then((response) => {
        setDonations(response.data.donations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const calculateTotalDonationAmount = (items) => {
    return items.reduce((total, donation) => {
      return total + donation.donation_amount;
    }, 0);
  };

  const totalDonationAmount = calculateTotalDonationAmount(donations);
  const { user } = useSelector((state) => state.user);

  

  return (
    <div className='pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden '>
      <h1 className='title font-raleway-bold text-4xl color-blue-dark pt-4'>Dashboard</h1>

      <div className='main-content flex flex-col lg:flex-row justify-center mt-4 ml-1'>
        <div className='content bg-white rounded-lg w-full '>
          <div className='header-box-wrapper h-32 lg:h-64 flex flex-row justify-around items-center bg-blue-dark rounded-lg p-4 drop-shadow-2xl'>
            <div className='text-wrapper font-raleway text-white'>
              <h1 className='text-lg lg:text-3xl'>Hello! {user.last_name}</h1>
              <p className='text-sm lg:text-lg'>It's good to see you again</p>
            </div>
            <img src={require('../../assets/images/admin.png')} alt='Logo' className='w-32 lg:w-64' />
          </div>

          {/* pets section */}
          <div className='pets-section'>
            <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Pet Overview</h1>

            <div className='card-wrapper flex flex-col justify-between items-center'>
              <div className=' flex flex-col lg:flex-row justify-center items-center w-full py-2 '>
                <div className='card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
                  <div className='w-full flex flex-row justify-around mt-6'>
                    <p className='text-3xl font-bold'>Total pets</p>
                    <PetsIcon />
                  </div>

                  <p className='text-8xl font-bold'>{pets.length}</p>

                  <NavLink to={'/pets'}>
                    <p className='text-xl mt-6'>View table</p>
                  </NavLink>
                </div>

                <div className='card-box flex flex-col w-full h-64  '>
                <div className='card-box bg-white w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark justify-center'>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: countMalePets, label: 'Male', color: '#3944BC', fontFamily: 'Ral'},
                          { id: 1, value: countFemalePets, label: 'Female', color: '#FC8EAC' },
                        ],
                      },
                    ]}
                   
                    className={`font-raleway mx-auto`} 
                  />
                </div>

                </div>
              </div>
            </div>

            <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>User Overview</h1>

            <div className='card-wrapper flex flex-col justify-start items-center'>
              <div className=' flex flex-col lg:flex-row justify-center items-center w-full py-2 '>
                <div className='card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
                  <div className='w-full flex flex-row justify-around mt-6'>
                    <p className='text-3xl font-bold'>Total users</p>
                    <PersonIcon />
                  </div>

                  <p className='text-8xl font-bold'>{userCount}</p>

                  <NavLink to={'/user'}>
                    <p className='text-xl mt-6'>View table</p>
                  </NavLink>
                </div>

                <div className='card-box flex flex-col w-full h-64  '>
                  <div className='card-box bg-white w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark'>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value:  userVerifiedCount, label: 'Verified' },
                          { id: 1, value: userRequestCount, label: 'Request' },
                        ],
                      },
                    ]}
                   
                    className={`font-raleway mx-auto`} 
                  />
                   
                  </div>
                </div>
              </div>
              
            </div>

            <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Tracking Overview</h1>

            <div className='card-wrapper flex flex-col justify-start items-center'>
              <div className=' flex flex-col lg:flex-row justify-center items-center w-full py-2 '>
              <div className='card-box flex flex-col w-full h-64  '>
                  <div className='card-box bg-white w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark'>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value:  completedTrackingCount, label: 'Completed' },
                          { id: 1, value: pendingTrackingCount, label: 'Pending' },
                        ],
                      },
                    ]}
                   
                    className={`font-raleway mx-auto`} 
                  />                   
                  </div>
                </div>
                <div className='card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
                  <div className='w-full flex flex-row justify-around mt-6'>
                    <p className='text-3xl font-bold'>Total tracking</p>
                    <PersonIcon />
                  </div>

                  <p className='text-8xl font-bold'>{totaltracking}</p>

                  <NavLink to={'/tracking'}>
                    <p className='text-xl mt-6'>View table</p>
                  </NavLink>
                </div>

                
              </div>
              
            </div>

            
          </div>
        </div>

        <div className='content min-h-screen rounded-lg w-full mx-1 '>
          <div className='header-box-wrapper bg-white justify-center items-center rounded-lg drop-shadow-lg '>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>

          <div className=' flex flex-col lg:flex-row justify-center items-center w-full py-2 '>
            <div className='card-box bg-pink w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
              <div className='w-full flex flex-row justify-around mt-6'>
                <p className='text-3xl font-bold'>Total post</p>
                <BookIcon />
              </div>

              <p className='text-8xl font-bold'>{post.length}</p>

             
            </div>
            <div className='card-box bg-blue w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
              <div className='w-full flex flex-row justify-around mt-6'>
                <p className='text-3xl font-bold'>Total donation</p>
                $
              </div>

              <p className='text-8xl font-bold'>  {totalDonationAmount}</p>

              
            </div>
          </div>

          <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Adoption Overview</h1>

          <div className=' flex flex-col lg:flex-row justify-center items-center w-full py-2 '>
            <div className='card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark '>
              <div className='w-full flex flex-row justify-around mt-6'>
                <p className='text-3xl font-bold'>Total adoptions</p>
                <BookIcon />
              </div>

              <p className='text-8xl font-bold'>{ countCompletedAdoption}</p>

              <NavLink to={'/adoption'}>
                <p className='text-xl mt-6'>View table</p>
              </NavLink>
            </div>
            <div className='card-box flex flex-col w-full h-64  '>
              <div className='card-box bg-white w-full h-full p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark items-center'>
               
                <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value:  countCompletedAdoption, label: 'Adopted', color: 'primary'},
                          { id: 1, value: adoptionRequestCount, label: 'Request'  },
                        ],
                      },
                    ]}
                   
                    className={`font-raleway mx-auto`} 
                />
                   
              </div>
            </div>
          </div>

          <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>User</h1>

          <div className='header-box-wrapper bg-white justify-center items-center rounded-lg drop-shadow-lg '>
            <div className='table-wrapper p-4 w-full overflow-x-auto'>
              <table className='font-raleway w-full p-2 rounded-lg'>
                <thead className='text-start font-bold'>
                  <tr>
                    <td className='p-2'>Username</td>
                   
                    <td className='p-2'>Phone number</td>
                    
                    <td className='p-2'>Address</td>
                  </tr>
                </thead>

                <tbody className='text-start'>
                  {users.map((user) => (
                    <tr key={user.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                      <td className='p-2'>
                        <div className='pf flex flex-row items-center'>
                         
                          <p>{user.first_name} {user.last_name}</p>
                        </div>
                      </td>

                      
                      <td className='p-2'>{user.phone}</td>
                     
                      <td className='p-2'>{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
