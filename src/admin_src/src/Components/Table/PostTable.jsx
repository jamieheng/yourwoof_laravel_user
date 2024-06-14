import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles/Table.style.css';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const PostTable = () => {
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


  

  const setNewPostData = (post) => {
    setSelectedPost(post);
    console.log(post);
  };

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const validatePost = (id) => {
    console.log(selectedPost);
   
    if (selectedPost) {
      
      axios
        .put(`https://attendance.rd-lab.work/api/posts/valid/${id}`, selectedPost)
        .then((response) => {
          console.log('Post reported successfully:', response.data);
          closeApprovedModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
   
  };

  const unValidatePost = (id) => {
    console.log(selectedPost);
   
    if (selectedPost) {
      
      axios
        .put(`https://attendance.rd-lab.work/api/posts/unvalid/${id}`, selectedPost)
        .then((response) => {
          console.log('Post reported successfully:', response.data);
          closeApprovedModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
   
  };

  const DeletePost = (id) => {
    
     
      axios
        .delete(`https://attendance.rd-lab.work/api/posts/${id}`)
        .then((response) => {
          console.log('Post deleted successfully:', response.data);
          closeDeleteModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    
   
  };


  const approvePost = (id) => {
    console.log(selectedPost);
   
    if (selectedPost) {
      
      axios
        .put(`https://attendance.rd-lab.work/api/posts/approved/${id}`, selectedPost)
        .then((response) => {
          console.log('Post approved successfully:', response.data);
          closeEditModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
   
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (id) => {
    setSelectedPostId(id);
    setIsEditModalOpen(true);
    console.log(id)
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);
  const openApprovedModal = (id) => {
    setSelectedPostId(id);
    setIsApprovedModalOpen(true);
    console.log(id)
  };

  const closeApprovedModal = () => {
    setIsApprovedModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true);
    console.log(id)
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  

  const [post, SetPost] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    axios.all([
      axios.get('https://attendance.rd-lab.work/api/posts'),
      axios.get('https://attendance.rd-lab.work/api/users'),
      
    ])
    .then(axios.spread((postResponse, usersResponse) => {
      const postData = postResponse.data.posts;
      const usersData = usersResponse.data.users;
      
     
      const postsDataWithUsers = postData.map(post => {
       
        const user = usersData.find(user => user.id === post.user_id);
        return {
          ...post,
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          address: user?.address
        };
      });

      SetPost(postsDataWithUsers);
     
      setUser(usersData);
    }))
    .catch((error) => {
      console.error(error);
    });
  }, []);



  const [shownBreeds, setShownBreeds] = useState([]);
  useEffect(() => {
    axios.get('https://attendance.rd-lab.work/api/breeds')
      .then((response) => {
        setShownBreeds(response.data.breeds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [shownCategory, setShownCategory] = useState([]);
  useEffect(() => {
    axios.get('https://attendance.rd-lab.work/api/categories')
      .then((response) => {
        setShownCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(post.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total posts {post.length}
          </div>
        </div>
      </div>


    {/* report */}
      <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel='Profile Modal'
            className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
            style={modalStyle}
          >
            <form action='' className='flex flex-col justify-center items-center w-full'>
              <div className='w-full flex flex-row justify-between items-center p-4'>
                <div className="flex flex-row text-blue-dark justify-start items-center">
                <ErrorOutlineIcon/>
                <h1 className=' ml-2 font-bold'>Invalid Post</h1>
                </div>
                
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
                    {closeEditModal();validatePost(selectedPostId)};
                  }}
                >
                  <p>Yes</p>
                </button>
              </div>
            </form>
      </Modal>

      {/* approve */}

      <Modal
            isOpen={isApprovedModalOpen}
            onRequestClose={closeApprovedModal}
            contentLabel='Profile Modal'
            className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
            style={modalStyle}
          >
            <form action='' className='flex flex-col justify-center items-center w-full'>
              <div className='w-full flex flex-row justify-between items-center p-4'>
                <div className="flex flex-row text-blue-dark justify-start items-center">
                <ErrorOutlineIcon/>
                <h1 className=' ml-2 font-bold'>Approve Post</h1>
                </div>
                
                <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeApprovedModal}>
                  <CloseIcon />
                </button>
              </div>
              <hr className='border-1 border-purple ' />

              <div className='w-full flex flex-row justify-end items-center p-4'>
                <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeApprovedModal}>
                  <p>Cancel</p>
                </button>
                <button
                  className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
                  onClick={() => {
                    {closeApprovedModal();approvePost(selectedPostId); unValidatePost(selectedPostId)};
                  }}
                >
                  <p>Yes</p>
                </button>
              </div>
            </form>
      </Modal>

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
                    {closeDeleteModal();DeletePost(selectedPostId)};
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
              <td className='p-2'>User</td>
              <td className='p-2'>Pet info</td>
              <td className='p-2'></td>
              <td className='p-2'>Pet Description</td>
              
              <td className='p-2'>Phone number</td>
              <td className='p-2'>Address</td>
              <td className='p-2'>Status</td>
             
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((post) => {
              const petBreedId = Number(post.pet_breed);
              const breed = shownBreeds.find(breed => breed.id === petBreedId);
              const petTypeId = Number(post.pet_cate_id);
              const type =shownCategory.find(type => type.id === petTypeId);
              
              return(
                <tr key={post.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{post.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <p className='mr-2'>{post.first_name}</p>
                    <p>{post.last_name}</p>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={post.pet_img} alt='Profile' className='w-16 h-16 rounded-sm mr-2' />
                    <p>{post.pet_name} </p>
                  </div>
                </td>
                <td className='p-2'>

                 <div className='flex flex-row justify-start items-center'>
                  <p className='mr-2 text-bold'>Age: </p>
                  <p >{post.pet_age} month(s)</p> 
  
                 </div>

                 <div className='flex flex-row justify-start items-center'>
                  <p className='mr-2 text-bold'>Gender: </p>
                  <p> {post.pet_gender_id === 2 ? 'Female' : 'Male'}</p>
  
                 </div>
                 <div className='flex flex-row justify-start items-center'>
                  <p className='mr-2 text-bold'>Type: </p>
                  <p>{type ? type.cate_name : 'Unknown'}</p>
  
                 </div>

                 <div className='flex flex-row justify-start items-center'>
                  <p className='mr-2 text-bold'>Breed: </p>
                  {breed ? breed.breed_name : 'Unknown Breed'}
  
                 </div>

                 <div className='flex flex-row justify-start items-center'>
                  <p className='mr-2 text-bold'>Status: </p>
                  {post.pet_status}
  
                 </div>
                 
                 
                 
                 
                 
                </td>

                <td className='p-2'>
                                
                  {post.pet_description}
                 
                </td>


                <td className='p-2'>{post.phone}</td>
                <td className='p-2'>{post.address}</td>
                <td className='p-2'>
                  <p>
                    {!post.is_approved && "Request"}
                    {post.is_approved && !post.is_removed && !post.is_adopted && "Approved"}
                    {post.is_approved && post.is_removed && "Removed"}
                    {post.is_approved && !post.is_removed && post.is_adopted && "Completed"}
                  </p>
                </td>

               
                <td>
                  <di className='pf flex flex-row justify-center items-center'>
                  <button className='mr-2 p-1 rounded-full hover:bg-red text-center items-center' onClick={() => {openEditModal(post.id); setNewPostData(post)}}>
                    <ErrorOutlineIcon />
                  </button>
                  <button className='mr-2 p-1 rounded-full hover:bg-blue text-center items-center' onClick={() => {openApprovedModal(post.id); setNewPostData(post)}}>
                    <CheckIcon />
                  </button>

                  <button className='mr-2 p-1 rounded-full hover:bg-red text-center items-center' onClick={() => {openDeleteModal(post.id)}}>
                    <DeleteIcon />
                  </button>

                  </di>
                  
                </td>
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

export default PostTable;
