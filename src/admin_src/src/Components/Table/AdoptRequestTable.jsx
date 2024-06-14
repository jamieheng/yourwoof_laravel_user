import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../SearchBar/SearchBar';

import axios from 'axios';

import Modal from 'react-modal';
Modal.setAppElement('#root'); // Replace '#root' with your root element ID or selector

const AdoptRequestTable = () => {

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

  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  // DeleteModal
  const [deleteModalAdoptionId, setDeleteModalAdoptionId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalAdoptionId(id);
    console.log(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // add modal
  const [addModalAdoptionId, setAddModalAdoptionId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (id) => {
    setIsAddModalOpen(true);
    setAddModalAdoptionId(id);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // CRUD Controller
  const deletePet = (id) => {
   
      axios
        .delete(`https://attendance.rd-lab.work/api/pets/${id}`)
        .then((response) => {
          console.log('Pet removed successfully:', response.data);
      
      
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
   
  };
 
  
  const [adoptionRequest, setAdoptionRequest] = useState([]);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get('https://attendance.rd-lab.work/api/adoptions'),
      axios.get('https://attendance.rd-lab.work/api/pets'),
      axios.get('https://attendance.rd-lab.work/api/users')
    ])
    .then(axios.spread((adoptionsResponse, petsResponse, usersResponse) => {
      const adoptionsData = adoptionsResponse.data.adoptions;
      const approvedAdoptions = adoptionsData.filter(adoption => !adoption.is_approved);

      
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

      setAdoptionRequest(adoptionsWithPetsAndUsers);
      setPets(petsData);
      setUsers(usersData);
    }))
    .catch((error) => {
      console.error(error);
    });
  }, []);
  

// Function to set new user data
const setNewAdoptionData = (adoption) => {
  setSelectedAdoption(adoption);
 
};
const [selectedAdoption, setSelectedAdoption] = useState(null);


const  approvedAoption = (id) => {
  if (selectedAdoption) {
    console.log(selectedAdoption);

    axios
      .put(`https://attendance.rd-lab.work/api/adoptions/approved/${id}`, selectedAdoption)
      .then((response) => {
        console.log('Adoption approved successfully:', response.data);

        // Prepare tracking data
        const trackingData = {
          user_id: selectedAdoption.user_id,
          pet_id: selectedAdoption.pet_id,
        };

        // Send tracking data
        axios
          .post('https://attendance.rd-lab.work/api/trackings', trackingData)
          .then((trackingResponse) => {
            console.log('Tracking data added successfully:', trackingResponse.data);
            closeAddModal();
          })
          .catch((trackingError) => {
            console.error('Error adding tracking data:', trackingError);
          });

          
      })
      .catch((error) => {
        console.error('Error approving adoption:', error);
      });
  }
};




  const deleteAdoptionRequest = (id) => {
    axios
      .delete(`https://attendance.rd-lab.work/api/adoptions/${id}`)
      .then((response) => {
        const updatedAdoptions = adoptionRequest.filter((adoption) => adoption.id !== id);
        setAdoptionRequest(updatedAdoptions);
        console.log(id);
      })
      .catch((error) => {
        console.error('Error deleting pet:', error.message);
      });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adoptionRequest.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(adoptionRequest.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total adoptors {adoptionRequest.length}
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

                

                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button
                      className=' mr-2 p-1 rounded-full hover:bg-blue'
                      onClick={() => {
                        openAddModal(user.id);
                        setNewAdoptionData(user);
                        console.log(user);
                        console.log(user.id)
                      }}
                    >
                      <DoneIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(user.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>

                    {/* check modal */}
                    <Modal
                      isOpen={isAddModalOpen}
                      onRequestClose={closeAddModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to confirm this request?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeAddModal}>
                            <CloseIcon />
                          </button>
                        </div>
                        <hr className='border-1 border-purple ' />

                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark  hover:bg-blue'
                            onClick={() => {
                              approvedAoption(addModalAdoptionId);
                              deletePet(selectedAdoption.pet_id)
                              console.log(selectedAdoption.pet_id)
                              
                              closeAddModal();
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>

                    {/* delete modal */}
                    <Modal
                      isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this request?</h1>
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
                            className='p-2 px-4 rounded-md bg-blue-dark  hover:bg-blue'
                            onClick={() => {
                              deleteAdoptionRequest(deleteModalAdoptionId);
                              closeDeleteModal();
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>
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

export default AdoptRequestTable;
