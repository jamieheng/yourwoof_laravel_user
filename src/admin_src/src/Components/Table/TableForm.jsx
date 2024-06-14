import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const TableForm = () => {
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get('https://attendance.rd-lab.work/api/adoptions'),
      axios.get('https://attendance.rd-lab.work/api/pets?withTrashed=true'),
      axios.get('https://attendance.rd-lab.work/api/users')
    ])
    .then(axios.spread((adoptionsResponse, petsResponse, usersResponse) => {
      const adoptionsData = adoptionsResponse.data.adoptions;
      const approvedAdoptions = adoptionsData.filter(adoption => adoption.is_approved);

      console.log(approvedAdoptions)
      

      const petsData = petsResponse.data.pets;
      const usersData = usersResponse.data.users;
      
     
      const adoptionsWithPetsAndUsers = approvedAdoptions.map(adoption => {
        const pet = petsData.find(pet => pet.id === adoption.pet_id);
        const user = usersData.find(user => user.id === adoption.user_id);
        return {
          ...adoption,
          pet_name: pet?.pet_name,
          pet_img: pet?.pet_img, 
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          address: user?.address
        };
      });

      setAdoptions(adoptionsWithPetsAndUsers);
      setPets(petsData);
      setUsers(usersData);
    }))
    .catch((error) => {
      console.error(error);
    });
  }, []);




  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adoptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adoptions.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total adoptions {adoptions.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Adopter</td>
              <td className='p-2'>Pet info</td>
            
              <td className='p-2'>Phone number</td>
              <td className='p-2'>Address</td>
             
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((user) => (
              <tr key={user.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{user.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <p className='mr-2'>{user.first_name}</p>
                    <p>{user.last_name}</p>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={user.pet_img} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{user.pet_name}</p>
                  </div>
                </td>

                <td className='p-2'>{user.phone}</td>
                <td className='p-2'>{user.address}</td>
               
                <td>
                  <button className='mr-2 p-1 rounded-full hover:bg-blue text-center items-center' onClick={() => openEditModal()}>
                    <AssignmentTurnedInIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel='Profile Modal'
            className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
            style={modalStyle}
          >
            <form action='' className='flex flex-col justify-center items-center w-full'>
              <div className='w-full flex flex-row justify-between items-center p-4'>
                <h1 className='text-blue-dark font-bold'>Complete adoption</h1>
                <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeEditModal}>
                  <CloseIcon />
                </button>
              </div>
              <hr className='border-1 border-purple ' />

              <div className='w-full flex flex-row justify-end items-center p-4'>
                <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeEditModal}>
                  <p>Cancel</p>
                </button>
                <button
                  className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
                  onClick={() => {
                    closeEditModal();
                  }}
                >
                  <p>Yes</p>
                </button>
              </div>
            </form>
          </Modal>
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

export default TableForm;
