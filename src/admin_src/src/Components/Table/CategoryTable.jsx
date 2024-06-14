import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import './Styles/Category.style.css';
import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const CategoryTable = () => {
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const [breedName, setBreedName] = useState('');
  const [isAddBreedModalOpen, setIsAddBreedModalOpen] = useState(false);
  const openAddBreedModal = (e) => {
    e.preventDefault();
    setIsAddBreedModalOpen(true);
  };

  
  const [categoryName, setCategoryName] = useState('');
  const [editModalCategoryId, setEditModalCategoryId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalCategoryId, setModalCategoryId] = useState([]);


  const openEditModal = (id) => {
    const selectedCategory = category.find((category) => category.id === id);
    if (selectedCategory) {
      setCategoryName(selectedCategory.cate_name);
      setEditModalCategoryId(id);
      setModalCategoryId(selectedCategory); 
      setIsEditModalOpen(true);
      console.log(selectedCategory);
    } else {
      console.error(`Category with ID ${id} not found`);
    }
  };
  

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [deleteModalCategoryId, setDeleteModalCategoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalCategoryId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  
  const deleteBreed = (id) => {
  
    axios
      .delete(`http://127.0.0.1:8000/api/breeds/${id}`)
      .then(() => {
        const updatedBreeds = breeds.filter((breed) => breed.id !== id);
        setBreeds(updatedBreeds); // Update the state with filtered breeds
        fetchBreeds();
      })
      .catch((error) => {
        console.error('Error deleting breed:', error.message);
      });
  };


  const [category, setCategory] = useState([]);
  const [breeds, setBreeds] = useState([]);
 

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/breeds')
      .then((response) => {
        setBreeds(response.data.breeds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleAddCategory = () => {
   
    addCategory();
  };

  const addCategory = () => {
   
    const newCategory = {
      cate_name: categoryName,
    };

    axios
      .post('http://127.0.0.1:8000/api/categories', newCategory)
      .then((response) => {
        setCategory((prevCategory) => [...prevCategory, response.data]);
        closeAddModal();
        fetchCategory();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isSelectEditModalOpen, setIsSelectEditModalOpen] = useState(false);
  const [editBreedId, setEditBreedId] = useState(null);
  const [newBreedName, setNewBreedName] = useState('');

  const openEditBreedModal = (id, currentName) => {
    
    setEditBreedId(id);
    setIsSelectEditModalOpen(true);
    setNewBreedName(currentName);
    console.log(currentName, id);
  };


  const editBreedBtn = (id, newBreedName) => {

    const newEditBreed = {
        breed_name: newBreedName,
    };

    console.log(newEditBreed)
    axios
        .put(`http://127.0.0.1:8000/api/breeds/${id}`, newEditBreed)
        .then((response) => {
            setCategory((prevBreed) =>
                prevBreed.map((breed) =>
                    (breed.id === id ? response.data : breed)
                )
            );
            fetchBreeds();
        })
        .catch((error) => {
            console.error('Error updating breed:', error.message);
        });
};

  const handleSaveChange = async () => {

    try {
        await editCategory(editModalCategoryId);
        await editBreedBtn(editBreedId, newBreedName);
        await addBreed()
        closeEditModal();
    } catch (error) {
        console.error('Error saving changes:', error.message);
    }
};


  const addBreed = (id) => {
    const newBreed = {
      cate_id: editModalCategoryId,
      breed_name: breedName,
  };

  axios.post('http://127.0.0.1:8000/api/breeds', newBreed)
      .then((response) => {
          setBreeds((prevBreeds) => [...prevBreeds, response.data]);
          fetchBreeds();
      })
      .catch((error) => {
          console.error('Error creating new breed:', error);
      });
    
  }
  const editCategory = (id) => {
   
    const updatedCategory = {
        cate_name: categoryName,
    };

    axios.put(`http://127.0.0.1:8000/api/categories/${id}`, updatedCategory)
        .then((response) => {
            // Update categories state with the updated category
            setCategory((prevCategories) =>
                prevCategories.map((category) =>
                    (category.id === id ? response.data : category)
                )
            );
            fetchCategory();
        })
        .catch((error) => {
            console.error('Error updating category:', error);
        });
};


  const deleteCategory = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(() => {
        const updatedCategory = category.filter((cat) => cat.id !== id);
        setCategory(updatedCategory);
        fetchCategory();
      })
      .catch((error) => {
        console.error('Error deleting category:', error.message);
      });
  };

  
  const fetchCategory = () => {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then((response) => {
        setCategory(response.data.categories || []); // Ensure an empty array is set if data is undefined
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCategory([]); // Set to an empty array on error
      });
  };
  
  const fetchBreeds = () => {
    axios
      .get('http://127.0.0.1:8000/api/breeds')
      .then((response) => {
        setBreeds(response.data.breeds || []); // Ensure an empty array is set if data is undefined
      })
      .catch((error) => {
        console.error('Error fetching breeds:', error);
        setBreeds([]); // Set to an empty array on error
      });
  };
  

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Array.isArray(category) ? Math.ceil(category.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(category) ? category.slice(indexOfFirstItem, indexOfLastItem) : [];
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total categories {category.length}
          </div>
        </div>
      </div>

     

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg overflow-x-auto'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Category Name</td>
              <td className='p-2'>Breed Name</td>
            
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((category) => (
              <tr key={category.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{category.id}</td>
                <td className='p-2'>{category.cate_name}</td>
                <td className='p-2'>

                <div className='text-blue-dark w-full text-start'>
                    <select className='w-1/2 p-2 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white'>
                      {breeds
                        .filter((breed) => breed.cate_id === category.id)
                        .map((breed) => (
                          <option key={breed.id} value={breed.id}>
                            {breed.breed_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </td>
               
                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button className='mr-2 p-1 rounded-full hover:bg-blue' onClick={() => openEditModal(category.id)}>
                      <EditIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => openDeleteModal(category.id)}
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

      <div className='sidebar m-4 w-full text-right flex flex-row justify-between items-center'>
        <div className='pagination w-64 flex flex-row items-center font-raleway rounded-lg text-blue-dark'>
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
        <button
          className='bg-purple text-white hover:bg-blue-dark p-2 px-4 rounded-lg flex flex-row items-center text-right'
          onClick={openAddModal}
        >
          <AddIcon />
          <p className='hidden md:block lg:block'>Add New Category</p>
        </button>


                    {/* add */}
                    <Modal
                      isOpen={isEditModalOpen}
                      onRequestClose={closeEditModal}
                      contentLabel='Edit Category Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway'
                      style={modalStyle}>
                      <form className='flex flex-col justify-center items-start w-full'>
                        <div className='w-full flex flex-row justify-center items-center p-4'>
                          <h1 className='text-blue-dark text-4xl font-bold'>Update Category</h1>
                        </div>
                        <hr className='border-1 border-blue-dark w-full mb-4' />
                        <div className='flex flex-col justify-center items-center w-full'>
                          <div className='w-1/2 p-4'>
                            <div className='text-blue-dark w-full text-start'>
                                <p className='mb-2 font-bold'>Update Category Name</p>

                                <input
                                  type='text'
                                  value={categoryName}
                                  onChange={(e) => setCategoryName(e.target.value)}
                                  className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                                />
                            </div>
                          </div>

                          <div className='table-wrapper p-2 w-1/2 border border-blue-dark rounded-lg overflow-x-auto'>
                  
                            <table className='font-raleway w-full text-blue-dark rounded-lg overflow-x-auto'>
                              <thead className='text-start font-bold '>
                                <tr>
                                  <td className='p-2'>ID</td>
                                  <td className='p-2'>Breed Name</td>
                                  <td className='p-2 text-center'>Action</td>
                                </tr>
                              </thead>

                              <tbody className='text-start'>
                                {breeds
                                  .filter((breed) => breed.cate_id === modalCategoryId.id) 
                                  .map((breed) => (
                                    <tr key={breed.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                                      <td className='p-2'>{breed.id}</td>
                                      <td className='p-2'>
                                      {editBreedId === breed.id && isSelectEditModalOpen ? (
                                        <>
                                          <input
                                            type='text'
                                            value={newBreedName}
                                            onChange={(e) => setNewBreedName(e.target.value)}
                                            className='p-1 border rounded text-blue-dark'
                                          />
                                        
                                        </>
                                      ) : (
                                        breed.breed_name
                                      )}
                                    </td>

                                      <td className='p-2 text-center'>
                                        <div className='flex flex-row justify-center items-center'>
                                          <button className='mr-2 p-1 rounded-full hover:bg-blue' onClick={(e) => openEditBreedModal(breed.id, breed.breed_name)}>
                                            <EditIcon />
                                          </button>
                                          <button className='p-1 rounded-full hover:bg-red' onClick={(e) => deleteBreed(breed.id)}>
                                            <DeleteIcon />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>

                            </table>

                            
                          </div>

                          {isAddBreedModalOpen && (
                            <div className="w-1/2">
                              <div className='text-blue-dark w-full mt-2 text-start'>
                               

                                <input
                                  placeholder='Enter Breed Name'
                                  type='text'
                                  value={breedName}
                                  onChange={(e) => setBreedName(e.target.value)}
                                  className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                                />
                            </div>

                            </div>
                          )}

                          <div className="flex flex-row justify-center items-center">
                          <button
                            className='bg-purple text-white hover:bg-blue-dark p-2 px-4 mt-2 rounded-lg flex flex-row items-center text-right'
                            onClick={(e) => openAddBreedModal(e)}
                          >
                            <AddIcon />
                            <p className='hidden md:block lg:block'>Add New Breed</p>
                          </button>

                         
                          </div>
                          
                          
                        </div>
                        <hr className='border-1 border-blue-dark w-full mt-4 mb-4' />
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className='mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeEditModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue'
                            onClick={() => {
                               
                              handleSaveChange();
                              
                                closeEditModal();
                            }}
                        >
                            <p>Save Changes</p>
                        </button>

                        </div>
                      </form>
                    </Modal>

                    {/* delete */}
                    <Modal
                      isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal}
                      contentLabel='Delete Category Modal'
                      className='w-96 md:w-1/2 lg:w-1/2 p-2 bg-white text-center text-white rounded-lg font-raleway'
                      style={modalStyle}
                    >
                      <form className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this category?</h1>
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
                              deleteCategory(deleteModalCategoryId);
                              closeDeleteModal();
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>


                    {/*add*/}
                    <Modal
                      isOpen={isAddModalOpen}
                      onRequestClose={closeAddModal}
                      contentLabel='Add Category Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway'
                      style={modalStyle}
                    >
                      <form className='flex flex-col justify-center items-start w-full'>
                        <div className='w-full flex flex-row justify-center items-center p-4'>
                          <h1 className='text-blue-dark text-4xl font-bold'>Add New Category</h1>
                        </div>
                        <hr className='border-1 border-blue-dark w-full mb-4' />
                        <div className='flex flex-col justify-center items-center w-full'>
                          <div className='w-1/2'>
                              <div className='text-blue-dark p-2 w-full text-start'>
                                <p className='mb-2 font-bold'>Category Name</p>

                                  <input
                                    type='text'
                                      value={categoryName}   
                                      onChange={(e) => setCategoryName(e.target.value)}
                                      className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                                  />
                              </div>
                            </div>

                            
                        </div>
                        <hr className='border-1 border-blue-dark w-full mb-4 mt-4' />
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className='mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                            <p>Cancel</p>
                          </button>
                          <button className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue' onClick={() =>{  handleAddCategory(); closeAddModal()}}>
                            <p>Add</p>
                          </button>
                        </div>
                      </form>
                    </Modal>
      </div>

     

      
      
    </div>
  );
};

export default CategoryTable;

                         
