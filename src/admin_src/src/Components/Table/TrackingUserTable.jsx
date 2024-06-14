import React, { useState, useEffect } from 'react';
import './Styles/Tracking.style.css';
import moment from 'moment';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';

import SearchBar from '../SearchBar/SearchBar';

import axios from 'axios';

import Modal from 'react-modal';
Modal.setAppElement('#root');


const TrackingtrackingTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  
 


  const [tracking, setTracking] = useState([]);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get('https://attendance.rd-lab.work/api/trackings'),
      axios.get('https://attendance.rd-lab.work/api/pets?withTrashed=true'),
      axios.get('https://attendance.rd-lab.work/api/users')
    ])
    .then(axios.spread((trackingResponse, petsResponse, usersResponse) => {
      const trackingData = trackingResponse.data.trackings;
      const petsData = petsResponse.data.pets;
      const usersData = usersResponse.data.users;
      
     
      const trackingWithPetsAndUsers = trackingData.map(tracking => {
        const pet = petsData.find(pet => pet.id === tracking.pet_id);
        const user = usersData.find(user => user.id === tracking.user_id );
        return {
          ...tracking,
          pet_name: pet?.pet_name,
          pet_img: pet?.pet_img, 
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          address: user?.address
          
        };

       
      });
   

      setTracking(trackingWithPetsAndUsers);
     
      setPets(petsData);
      setUsers(usersData);
      
    }))
    .catch((error) => {
      console.error(error);
    });
  }, []);

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

  // delete modal
  const [deleteModalTrackingId, setDeleteModalTrackingId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalTrackingId(id); // Save the current id in state
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  const setNewTrackingData = (tracking) => {
    setSelectedTracking(tracking);
  };

  const [selectedTracking, setSelectedTracking] = useState(null);

  const completedTracking = (id) => {
    if (selectedTracking) {
      
      axios
        .put(`https://attendance.rd-lab.work/api/trackings/completed/${id}`, selectedTracking)
        .then((response) => {
          console.log('User added successfully:', response.data);
          closeDeleteModal()
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };
  
  
  


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tracking.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tracking.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full text-right flex flex-col md:flex-row lg:flex-row justify-between items-center overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />

        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-lg'>Total trackings {tracking.length}</div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Adopter</td>
              <td className='p-2'>Pet info</td>
              <td className='p-2'>Phone Number</td>
              <td className='p-2'>Adoption Date</td>
              <td className='p-2'>Week 1</td>
              <td className='p-2'>Week 2</td>
              <td className='p-2'>Week 3</td>
              <td className='p-2'>Week 4</td>
              <td className='p-2'>Status</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((tracking) => (
              <tr key={tracking.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{tracking.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                  
                    <p>{tracking.first_name} {tracking.last_name}</p>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={tracking.pet_img} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{tracking.pet_gender} {tracking.pet_name}</p>
                  </div>
                </td>
                <td className='p-2'>{tracking.phone}</td>
                <td className='p-2'>{moment(tracking.created_at).format('DD MMMM YYYY')}</td>
                <td className='p-2 '>
                  <img src={tracking.pet_img_week1} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                </td>
                <td className='p-2'>
                  <img src={tracking.pet_img_week2} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                </td>
                <td className='p-2'>
                  <img src={tracking.pet_img_week3} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                </td>
                <td className='p-2'>
                  <img src={tracking.pet_img_week4} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                </td>

                <td className='p-2'>
                  {tracking.is_completed ? 'Completed' : 'Pending'}
                </td>

                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button className=' mr-2 p-1 rounded-full hover:bg-blue'
                   
                      onClick={() => {
                      openDeleteModal(tracking.id);
                      setNewTrackingData(tracking);
                    }}
                    >
                      <VerifiedIcon />
                    </button>

                   
                    <Modal
                      isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal}
                      contentLabel='Profile Modal'
                      className='w-96 md:w-1/2 lg:w-1/2 p-2 bg-white text-center text-white rounded-lg font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to confirm this tracking?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeDeleteModal}>
                            <CloseIcon />
                          </button>
                        </div>
                        <hr className='border-1 border-purple ' />

                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeDeleteModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
                            onClick={() => {
                              completedTracking(tracking.id);
                              closeDeleteModal();
                            
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>

                    <button className='p-1 rounded-full hover:bg-red'>
                      <ReportProblemIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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

export default TrackingtrackingTable;
