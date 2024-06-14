import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';
import { storage } from '../../../../config/firebase';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BarLoader from "react-spinners/BarLoader";

import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const TipsListiongTable = () => {
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

  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  
  // image handler
  const onHandleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please input the file');

      return;
    }

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending(true);
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setPathImage(getUrl);
      setIsPending(false);
      console.log(imagePath);

      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

  const [tipTitle, setTipTitle] = useState('');
  const [tipDesc, setTipDesc] = useState('');
  const [pathImage, setPathImage] = useState('');


  



  const [selectedTipsId, setSelectedTipsId] = useState(null);

  
  const deleteTip = (id) => {

      axios
        .delete(`https://attendance.rd-lab.work/api/tips/${id}`)
        .then((response) => {
          console.log('Post deleted successfully:', response.data);
          closeDeleteModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    
   
  };

  const editTip = (id) => {
    const updatedTip = {
      tip_title: tipTitle,
      tip_description: tipDesc,
      tip_img: pathImage, 
    };

    console.log(updatedTip);

    axios
      .put(`https://attendance.rd-lab.work/api/tips/${id}`, updatedTip) 
      .then((response) => {
        setTips((prevTip) => prevTip.map((tip) => (tip.id === id ? response.data : tip)));
        fetchTips(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (id) => {
    const selectedTip =tips.find((tip) => tip.id === id);
      if (selectedTip) {
        setTipTitle(selectedTip.tip_title); // Corrected property name
        setTipDesc(selectedTip.tip_description); // Corrected property name
        setPathImage(selectedTip.tip_img);

        
        setSelectedTipsId(id);
        setIsEditModalOpen(true);
        console.log(id)
        
      }
     
       else {
      console.error(`tip with ID ${id} not found`);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };



  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (id) => {
   
    setIsAddModalOpen(true);
    console.log(id)
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddTip = () => {
    addTip();
  };

  const addTip = () => {
    const newTip = {
      tip_title: tipTitle,
      tip_description: tipDesc,
      tip_img: pathImage || "NULL", 
    };

    console.log(newTip);
  
    axios
      .post('https://attendance.rd-lab.work/api/tips', newTip)
      .then((response) => {
        setTips((prevTips) => [...prevTips, response.data]);
        fetchTips(); 
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  const fetchTips = () => {
    axios
      .get('https://attendance.rd-lab.work/api/tips')
      .then((response) => {
        setTips(response.data.tips);
      })
      .catch((error) => {
        console.error('Error fetching tips:', error);
      });
  };
  
  useEffect(() => {
    fetchTips();
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setSelectedTipsId(id);
    setIsDeleteModalOpen(true);
    console.log(id)
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  

  const [tips, setTips] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/tips')
      .then((response) => {
        
        setTips(response.data.tips);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tips.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total tips {tips.length}
          </div>
        </div>
      </div>


    {/* Edit */}
   



    {/* Add */}
      <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel='Profile Modal'
          className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-start w-full'>

            <div className='w-full flex flex-row justify-center items-center p-4'>
              <h1 className='text-blue-dark text-4xl font-bold'>Add New Tip</h1>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4' />

            <div className='flex flex-row justify-center items-start w-full'>
              <div className='w-1/2'>
                

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Tips Title</p>
                  <input
                    type='text'
 
                    onChange={(e) => setTipTitle(e.target.value)}
                   
                    className={`w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                 
                </div>

                

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Tips Image</p>
                  <input
                    type='file'
                    onChange={(e) => {
                      onHandleChange(e);
                    }}
                    name='pathImage'
                    className={`w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />

                   {isPending && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
                  
                </div>


                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Tips Description</p>
                  <textarea
                    type='text'
 
                    onChange={(e) => setTipDesc(e.target.value)}
                    
                    className={`w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                 
                </div>
              </div>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4 mt-4' />

            <div className='w-full flex flex-row justify-end items-center p-4'>
              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                <p>Cancel</p>
              </button>
              <button
               onClick={(e) =>{handleAddTip(); closeAddModal();}}
               className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'>
                <p>Upload</p>
              </button>
            </div>
          </form>

      </Modal>


      {/* Delete */}
      <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            contentLabel='Profile Modal'
            className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
            style={modalStyle}
          >
            <form action='' className='flex flex-col justify-center items-center w-full'>
              <div className='w-full flex flex-row justify-between items-center p-4'>
                <div className="flex flex-row text-blue-dark justify-start items-center">
                <ErrorOutlineIcon/>
                <h1 className=' ml-2 font-bold'>Delete Post?</h1>
                </div>
                
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
                    deleteTip(selectedTipsId);
                    closeDeleteModal();
                  }}
                >
                  <p>Yes</p>
                </button>
              </div>
            </form>
      </Modal>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Image</td>
              <td className='p-2'>Tip Title</td>
              <td className='p-2'>Tip Description</td>
             
             
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((tip) => (
              <tr key={tip.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{tip.id}</td>
                <td className='p-2'>
                    <img src={tip.tip_img} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                </td>
                <td className='p-2'>
                  <p>{tip.tip_title}</p>
                </td>
                <td className='p-2'>
                  <p>{tip.tip_description}</p>
                </td>
               
                <td>
                  <div className='pf flex flex-row justify-center items-center'>
                  
                  <button className='mr-2 p-1 rounded-full hover:bg-blue' onClick={() => {openEditModal(tip.id)}}>
                     <EditIcon />
                  </button>

                  <button className='mr-2 p-1 rounded-full hover:bg-red text-center items-center' onClick={() => {openDeleteModal(tip.id)}}>
                    <DeleteIcon />
                  </button>

                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>


         
        </table>
      </div>

{/* edit */}
      <Modal
      isOpen={isEditModalOpen}
      onRequestClose={closeEditModal}
      contentLabel='Profile Modal'
      className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway'
      style={modalStyle}
    >
      <form action='' className='flex flex-col justify-center items-start w-full'>
        <div className='w-full flex flex-row justify-center items-center p-4'>
          <h1 className='text-blue-dark text-4xl font-bold'>Update Tip</h1>
        </div>

        <hr className='border-1 border-blue-dark w-full mb-4' />

        <div className="flex flex-row justify-center items-start w-full">
          <div className="w-1/2">
            <div className='text-blue-dark p-2 w-full text-start'>
              <p className='mb-2 font-bold'>Update Tip Title</p>
              <input
                type='text'
                value={tipTitle}
                onChange={(e) => setTipTitle(e.target.value)}
                className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
              />
            </div>

            <div className='text-blue-dark p-2 w-full text-start'>
              <p className='mb-2 font-bold'>Update Tips Image</p>
              <input
                type='file'
                onChange={onHandleChange}
                name='pathImage'
                className={`w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
              />
              {isPending && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>}
            </div>

            <div className='text-blue-dark p-2 w-full text-start'>
              <p className='mb-2 font-bold'>Update Tip Description</p>
              <textarea
                type='text'
                value={tipDesc}
                onChange={(e) => setTipDesc(e.target.value)}
                className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
              />
            </div>
          </div>
        </div>

        <hr className='border-1 border-blue-dark w-full mt-4 mb-4' />
        <div className='w-full flex flex-row justify-end items-center p-4'>
          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeEditModal}>
            <p>Cancel</p>
          </button>
          <button
            className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
            onClick={() => {
              editTip(selectedTipsId);
              closeEditModal();
            }}
          >
            <p>Save Changes</p>
          </button>
        </div>
      </form>
    </Modal>


      <div className='sidebar m-4 w-full text-right flex flex-row justify-between items-center'>
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


        <button
          className='bg-purple text-white hover:bg-blue-dark p-2 px-4 rounded-lg flex flex-row items-center text-right'
          onClick={openAddModal}
        >
          <AddIcon />
          <p className='hidden md:block lg:block'>Add New Tip</p>
        </button>

      </div>
    </div>
  );
};

export default TipsListiongTable;
