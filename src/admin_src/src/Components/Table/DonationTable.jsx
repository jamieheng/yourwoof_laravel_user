import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const DonationTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  const modalStyle = {
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
  

  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    axios.all([
      axios.get('https://attendance.rd-lab.work/api/donations'),
      axios.get('https://attendance.rd-lab.work/api/users'),
      
    ])
    .then(axios.spread((donationResponse, usersResponse) => {
      const donationData = donationResponse.data.donations;
      const usersData = usersResponse.data.users;
      
     
      const donationsDataWithUsers = donationData.map(post => {
       
        const user = usersData.find(user => user.id === post.user_id);
        return {
          ...post,
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          address: user?.address
        };
      });

      setDonations(donationsDataWithUsers);
     
      setUser(usersData);
    }))
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
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div className='flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total donation {donations.length}
          </div>

          <div className='p-2 ml-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total donation amount $ {totalDonationAmount} 
          </div>
        </div>
      </div>


   

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Donator</td>
              <td className='p-2 text-center'>Donation Type</td>
              <td className='p-2 text-center'>Donation Ammount</td>
              <td className='p-2'>Donation Date</td>
              <td className='p-2'>Phone number</td>
              <td className='p-2'>Address</td>
            
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((donation) => {
              
              return(
                <tr key={donation.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{donation.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <p className='mr-2'>{donation.first_name}</p>
                    <p>{donation.last_name}</p>
                  </div>
                </td>
                <td className='p-2 text-center'>
                  <p>{donation.donation_type === 1 ? 'Visa' : 'KHQR'}</p>
                </td>
                <td className='p-2 text-center'>

                  {donation.donation_amount} $
                </td>

                <td className='p-2'>
                                
                {moment(donation.created_at).format('DD MMMM YYYY')}
                 
                </td>


                <td className='p-2'>{donation.phone}</td>
                <td className='p-2'>{donation.address}</td>
               

               
               
              </tr>

              );
              })}
          </tbody>


         
        </table>
      </div>
      <div className='sidebar m-4 w-full text-right flex flex-row justify-left items-center'>
        <div className='pagination w-64 flex flex-row items-center font-raleway rounded-lg text-blue-dark '>
          <button
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full '
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <div className='title flex flex-row justify-around p-2  w-16'>
            <span>{currentPage}</span> of <span>{totalPages}</span>
          </div>

          <button
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full '
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationTable;
