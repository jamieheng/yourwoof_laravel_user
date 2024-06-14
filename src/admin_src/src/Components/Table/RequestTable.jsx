import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root'); // Replace '#root' with your root element ID or selector

const RequestTable = () => {
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

  // DeleteModal
  const [deleteModalUserId, setDeleteModalUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalUserId(id);
    console.log(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // add modal
  const [addModalUserId, setAddModalUserId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (id) => {
    setIsAddModalOpen(true);
    setAddModalUserId(id);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [userRequest, setUserRequest] = useState([]);

  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/users')
      .then((response) => {
        const data = response.data.users;
        // Assuming `data` is an array of users, and each user has an `is_verified` property
        const unverifiedUsers = data.filter(user => user.is_verified === 0 && user.role_id !== 1);
        setUserRequest(unverifiedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to run effect only once on component mount

  // Function to set new user data
  const setNewUserData = (user) => {
    setSelectedUser(user);
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const addUserRequest = (id) => {
    if (selectedUser) {
      axios
        .put(`https://attendance.rd-lab.work/api/users/verified/${id}`, selectedUser)
        .then((response) => {
          console.log('User added successfully:', response.data);
          closeAddModal();
          // fetchUserRequest();
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  const deleteUserRequest = (id) => {
    axios
      .delete(`https://attendance.rd-lab.work/api/users/${id}`)
      .then((response) => {
        const updatedUsers = userRequest.filter((user) => user.id !== id);
        setUserRequest(updatedUsers);
        console.log(id);
        // fetchUserRequest();
      })
      .catch((error) => {
        console.error('Error deleting user:', error.message);
      });
  };

  // const fetchUserRequest = () => {
  //   axios
  //     .get('https://attendance.rd-lab.work/api/tips')
  //     .then((response) => {
  //       setUserRequest(response.data.users);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching users:', error);
  //     });
  // };

  // useEffect(() => {
  //   fetchUserRequest();
  // }, []);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userRequest.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userRequest.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total user request {userRequest.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Firstname</td>
              <td className='p-2'>Lastname</td>
              <td className='p-2'>Phone Number</td>
              <td className='p-2'>Address</td>
              <td className='p-2'>Register date</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((userRequest) => (
              <tr key={userRequest.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{userRequest.id}</td>
                <td className='p-2'>{userRequest.first_name}</td>
                <td className='p-2'>{userRequest.last_name}</td>
                <td className='p-2'>{userRequest.phone}</td>
                <td className='p-2'>{userRequest.address}</td>
                <td className='p-2'>{userRequest.created_at}</td>
                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button
                      className='mr-2 p-1 rounded-full hover:bg-blue'
                      onClick={() => {
                        openAddModal(userRequest.id);
                        setNewUserData(userRequest);
                      }}
                    >
                      <DoneIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(userRequest.id);
                      }}
                    >
                      <DeleteIcon />
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
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <div className='title flex flex-row justify-around p-2 w-16'>
            <span>{currentPage}</span> of <span>{totalPages}</span>
          </div>
          <button
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel='Add User Modal'
        className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway'
        style={modalStyle}
      >
        <form action='' className='flex flex-col justify-center items-center w-full'>
          
          <div className='w-full flex flex-row justify-between items-center p-4'>
          <h1 className='text-blue-dark font-bold'>Do you want to add this user?</h1>
          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeAddModal}>
            <CloseIcon />
          </button>
        </div>
        <hr className='border-1 border-purple' />

        <div className='w-full flex flex-row justify-end items-center p-4'>
          <button className='mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
            <p>Cancel</p>
          </button>
          <button
            className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
            onClick={() => {
              addUserRequest(addModalUserId);
              closeAddModal();
            }}
          >
            <p>Yes</p>
          </button>
        </div>
      </form>
    </Modal>

    {/* Delete User Modal */}
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={closeDeleteModal}
      contentLabel='Delete User Modal'
      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway'
      style={modalStyle}
    >
      <form action='' className='flex flex-col justify-center items-center w-full'>
        <div className='w-full flex flex-row justify-between items-center p-4'>
          <h1 className='text-blue-dark font-bold'>Do you want to remove this user?</h1>
          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeDeleteModal}>
            <CloseIcon />
          </button>
        </div>
        <hr className='border-1 border-purple' />

        <div className='w-full flex flex-row justify-end items-center p-4'>
          <button className='mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeDeleteModal}>
            <p>Cancel</p>
          </button>
          <button
            className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
            onClick={() => {
              deleteUserRequest(deleteModalUserId);
              closeDeleteModal();
            }}
          >
            <p>Yes</p>
          </button>
        </div>
      </form>
    </Modal>
  </div>
);
};

export default RequestTable;
