import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import { storage } from '../../../../config/firebase';
import BarLoader from "react-spinners/BarLoader";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

import EditIcon from '@mui/icons-material/Edit';
import './Styles/PetTable.style.css';
import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const PetTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
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



  // edit
  const [editModalPetId, setEditModalPetId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (id) => {
    const selectedPet = pets.find((pet) => pet.id === id);
    if (selectedPet) {
      setPetName(selectedPet.pet_name);
      setPetGender(selectedPet.pet_gender_id);
      setPetAge(selectedPet.pet_age);
      setPetBreed(selectedPet.pet_breed);
      setPathImage(selectedPet.pet_img);
      setPetDesc(selectedPet.pet_description);
      setPetMedi(selectedPet.pet_status);
      setPetCate(selectedPet.pet_cate_id);
      // Set other state values as needed
      setEditModalPetId(id);
      setIsEditModalOpen(true);
      console.log(selectedPet);
      
    } else {
      console.error(`Pet with ID ${id} not found`);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // delete modal
  const [deleteModalPetId, setDeleteModalPetId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalPetId(id); // Save the current id in state
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // validation
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidGender, setIsInvalidGender] = useState(false);
  const [isInvalidAge, setIsInvalidAge] = useState(false);
  const [isInvalidBreed, setIsInvalidBreed] = useState(false);
  const [isInvalidDesc, setIsInvalidDesc] = useState(false);
  const [isInvalidMedi, setIsInvalidMedi] = useState(false);
  const [isInvalidCate, setIsInvalidCate] = useState(false);

  const [petName, setPetName] = useState('');
  const [petCate, setPetCate] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petDesc, setPetDesc] = useState('');
  const [petMedi, setPetMedi] = useState('');
  const [pathImage, setPathImage] = useState('');

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
  
    // Update the state based on the input name
    switch (name) {
      case 'petName':
        setPetName(value);
        setIsInvalidName(value.trim() === '');
        break;
      case 'petGender':
        setPetGender(value);
        setIsInvalidGender(value.trim() === '');
        break;
      case 'petCate':
        const categoryId = parseInt(value); 
        setPetCate(categoryId);
        setIsInvalidCate(isNaN(categoryId)); 
        try {
          const response = await axios.get(`https://attendance.rd-lab.work/api/breeds`);
          const filteredBreeds = response.data.breeds.filter((breed) => breed.cate_id === categoryId);
          setBreeds(filteredBreeds);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'petAge':
        setPetAge(value);
        setIsInvalidAge(value.trim() === '');
        break;
      case 'petBreed':
        setPetBreed(value); // Correctly set petBreed
        setIsInvalidBreed(value.trim() === '');
        break;
      case 'petDesc':
        setPetDesc(value);
        setIsInvalidDesc(value.trim() === '');
        break;
      case 'petMedi':
        setPetMedi(value);
        setIsInvalidMedi(value.trim() === '');
        break;
      default:
        break;
    }
  };
  
  
  

  const handleButtonAdd = (e) => {
    e.preventDefault(); // Prevent form submission
  
    // Validate each input and set the corresponding state
    setIsInvalidName(petName.trim() === '');
    setIsInvalidAge(petAge.trim() === '');
    setIsInvalidGender(petGender.trim() === '');
    setIsInvalidBreed(petBreed.trim() === ''); // Ensure petBreed is a string
    setIsInvalidDesc(petDesc.trim() === '');
    setIsInvalidMedi(petMedi.trim() === '');
    setIsInvalidCate(String(petCate).trim() === ''); // Ensure petCate is treated as a string
  
    // Check if any input is invalid
    if (
      String(petCate).trim() === '' ||
      petName.trim() === '' ||
      petAge.trim() === '' ||
      petGender.trim() === '' ||
      petBreed.trim() === '' || // Check if petBreed is empty
      petDesc.trim() === '' ||
      petMedi.trim() === ''
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      addPet();
      closeAddModal();
    }
  };
  
  

  // CRUD Controller
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


  const addPet = () => {
    const newPet = {
      pet_cate_id: petCate,
      pet_name: petName,
      pet_gender_id: petGender, // Assuming petGender represents the gender ID
      pet_age: petAge,
      pet_breed: petBreed,
      pet_img: pathImage || "NULL", // Use provided image path or default to "NULL" if not provided
      pet_description: petDesc,
      pet_status: petMedi // Assuming petMedi represents the medical status
    };
    console.log(newPet)
  
    axios
      .post('https://attendance.rd-lab.work/api/pets', newPet)
      .then((response) => {
        setPets((prevPets) => [...prevPets, response.data]);
        // closeAddModal();
        fetchPets();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const editPet = (id) => {
    const updatedPet = {
      pet_cate_id: petCate,
      pet_name: petName,
      pet_gender_id: petGender, 
      pet_age: petAge,
      pet_breed: petBreed,
      pet_img: pathImage || "NULL", 
      pet_description: petDesc,
      pet_status: petMedi 
    };

    axios
      .put(`https://attendance.rd-lab.work/api/pets/${id}`, updatedPet) // Use editModalPetId here
      .then((response) => {
        setPets((prevPets) => prevPets.map((pets) => (pets.id === id ? response.data : pets)));
        fetchPets();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setNewPetData = (pet) => {
    setSelectedPet(pet);
  };
  const [selectedPet, setSelectedPet] = useState(null);
  const deletePet = (id) => {
    if (selectedPet) {
      
      axios
        .delete(`https://attendance.rd-lab.work/api/pets/${id}`)
        .then((response) => {
          console.log('Pet removed successfully:', response.data);
          closeAddModal();
          fetchPets();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };



  const [breeds, setBreeds] = useState([]);
  


  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get('https://attendance.rd-lab.work/api/categories')
      .then((response) => {
        setCategory(response.data.category);
      })
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
  

  const fetchPets = () => {
    axios
      .get('https://attendance.rd-lab.work/api/pets')
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  };


  
   
    const [selectedCategory, setSelectedCategory] = useState(null);

   
    const handleCategoryClick = (category) => {
      setSelectedCategory(category === selectedCategory ? null : category);
    };
    const handleCategoryClickAll = () => {
      setSelectedCategory(null);
    };
        // Filter pets based on selected category
      const filteredPets = selectedCategory
      ? pets.filter(pet => pet.pet_cate_id  === selectedCategory.id)
      : pets;const itemsPerPage = 10;
      const [currentPage, setCurrentPage] = useState(1);
      // Example initialization of pets, assuming it's an array of objects

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;

      // Ensure pets is an array before calling slice
      const currentItems = Array.isArray(filteredPets) ? filteredPets.slice(indexOfFirstItem, indexOfLastItem) : [];
      const totalPages = Math.ceil(pets.length / itemsPerPage);


      const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };


  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>

      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
        
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total pets {pets.length}
          </div>
        </div>

        
      </div>

      <div className='flex flex-row justify-start items-center w-full'>
                {/* "Show All" button */}
                <div
                    className={`p-2 font-raleway px-4 bg-white text-blue-dark hover:bg-blue-dark hover:text-white border border-blue-dark rounded-lg m-2 md:mt-0 lg:mt-0 ${
                        !selectedCategory && 'bg-blue-dark text-white'
                    }`}
                    onClick={handleCategoryClickAll}
                >
                    All
                </div>
                {/* Render category buttons */}
                {category.map((category) => (
                    <div
                        key={category.id}
                        className={`p-2 font-raleway px-4 bg-white text-blue-dark hover:bg-blue-dark hover:text-white border border-blue-dark rounded-lg m-2 md:mt-0 lg:mt-0 ${
                            selectedCategory && selectedCategory.id === category.id ? 'bg-blue-dark text-white' : ''
                        }`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.cate_name}
                    </div>
                ))}
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        
        <table className='font-raleway w-full p-2 rounded-lg overflow-x-auto'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Name</td>
              <td className='p-2'>Gender</td>
              <td className='p-2'>Breed</td>
              <td className='p-2'>Age</td>
              <td className='p-2'>Description</td>
              <td className='p-2'>Medical Status</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
                {currentItems.map((pet) => {
                    // Ensure both pet_breed and breed.id are numbers
                    const petBreedId = Number(pet.pet_breed);
                    const breed = shownBreeds.find(breed => breed.id === petBreedId);

                

                    return (
                        <tr key={pet.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                            <td className='p-2'>{pet.id}</td>
                            <td className='p-2'>
                                <div className='pf flex flex-row items-center'>
                                    <img src={pet.pet_img} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                                    <p>{pet.pet_name}</p>
                                </div>
                            </td>
                            <td className='p-2'>{pet.pet_gender_id === 2 ? 'Female' : 'Male'}</td>
                            <td className='p-2'>
                                {breed ? breed.breed_name : 'Unknown Breed'}
                            </td>
                            <td className='p-2'>{pet.pet_age} month(s)</td>
                            <td className='p-2'>{pet.pet_description}</td>
                            <td className='p-2'>{pet.pet_status}</td>
                            <td className='p-2 text-center'>
                                <div className='flex flex-row justify-center items-center'>
                                    <button className='mr-2 p-1 rounded-full hover:bg-blue' onClick={() => openEditModal(pet.id)}>
                                        <EditIcon />
                                    </button>
                                    <button className='p-1 rounded-full hover:bg-red' onClick={() =>{ openDeleteModal(pet.id); setNewPetData(pet) }}>
                                  
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>

        </table>
      </div>


          {/* edit */}
          <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel='Profile Modal'
          className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-start w-full'>
            <div className='w-full flex flex-row justify-center items-center p-4'>
              <h1 className='text-blue-dark text-4xl font-bold'>Update Pet</h1>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4' />

            <div className="flex flex-row justify-center items-start w-full">
              <div className="w-1/2">


                <div className='text-blue-dark p-2 w-full text-start'>

                  <p className='mb-2 font-bold'>Update Pet Category</p>
                  <select
                    onChange={(e) => setPetCate(e.target.value)}
                    value={petCate}
                    className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                    name='petCate'
                  >
                  <option value='' disabled>Select Category</option>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.cate_name}
                    </option>
                  ))}
                </select>
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Update Name</p>
                  <input
                    type='text'
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                  />
                </div>


                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Update Pet Gender</p>
                  <select
                    name='petGender'
                    value={petGender} // Add this line to bind the selected value
                    onChange={handleInputChange} // Assuming you have an onChange handler for updating the state
                    className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                  >
                    <option value='' disabled>
                      Select Gender
                    </option>
                    <option value='1'>Male</option>
                    <option value='2'>Female</option>
                  </select>
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Update Age ( month* )</p>

                  <input
                    type='text'
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                  />
                </div>


              </div>


              <div className="w-1/2">

                <div className='text-blue-dark p-2 w-full text-start'>
                <p className='mb-2 font-bold'>Update Medical Status</p>
                <input
                  type='text'
                  value={petMedi}
                  onChange={(e) => setPetMedi(e.target.value)}
                  className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                  />
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Update Description</p>
                  <textarea
                    type='text'
                    value={petDesc}
                    onChange={(e) => setPetDesc(e.target.value)}
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
                  editPet(editModalPetId);
                  closeEditModal();
                }}
              >
                <p>Save Changes</p>
              </button>
            </div>
          </form>
        </Modal>


        {/* delete modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel='Profile Modal'
          className='w-96 md:w-1/2 lg:w-1/2 p-2 bg-white text-center text-white rounded-lg font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-center w-full'>
            <div className='w-full flex flex-row justify-between items-center p-4'>
              <h1 className='text-blue-dark font-bold'>Do you want to remove this pet?</h1>
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
                  deletePet(deleteModalPetId);
                  closeDeleteModal();
                }}
              >
                <p>Yes</p>
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
          <p className='hidden md:block lg:block'>Add New Pet</p>
        </button>

        {/* add modal */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel='Profile Modal'
          className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-start w-full'>

            <div className='w-full flex flex-row justify-center items-center p-4'>
              <h1 className='text-blue-dark text-4xl font-bold'>Add New Pet</h1>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4' />

            <div className='flex flex-row justify-center items-start w-full'>
              <div className='w-1/2'>
                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Category</p>
                  <select
                     onChange={handleInputChange}
                   
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidCate ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                    name='petCate'
                  >
                  <option value='' disabled>Select Category</option>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.cate_name}
                    </option>
                  ))}
                </select>
                  {isInvalidCate && <p className='text-red text-left mt-2'>Please select a pet category *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Name</p>
                  <input
                    type='text'
                    placeholder='Name'
                    name='petName'
                    onChange={handleInputChange}
                   
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidName ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidName && <p className='text-red text-left mt-2'>Please enter a pet name *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Gender</p>
                  <select
                    name='petGender'
                    onChange={handleInputChange}
                    
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidGender ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  >
                    <option value='' disabled>
                      Select Gender
                    </option>
                    <option value='1'>Male</option>
                    <option value='2'>Female</option>
                  </select>
                  {isInvalidGender && <p className='text-red text-left mt-2'>Please select a pet gender *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Age (months*)</p>
                  <input
                    type='number'
                    placeholder='Age'
                    name='petAge'
                    onChange={handleInputChange}
                    
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidAge ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidAge && <p className='text-red text-left mt-2'>Please enter a pet age *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Breed</p>
                  <select
                    name='petBreed'
                    onChange={handleInputChange}
                    value={petBreed} // Ensure this value is set correctly
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidBreed ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  >
                    <option value='' disabled>
                      Select Breed
                    </option>
                    {breeds.map((breed) => (
                      <option key={breed.id} value={breed.id}>
                        {breed.breed_name}
                      </option>
                    ))}
                  </select>

                  {isInvalidBreed && <p className='text-red text-left mt-2'>Please enter a pet breed *</p>}
                </div>
              </div>

              <div className='w-1/2'>
                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Medical Status</p>
                  <input
                    type='text'
                    placeholder='Medical Status'
                    name='petMedi'
                    onChange={handleInputChange}
                    
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidMedi ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidMedi && <p className='text-red text-left mt-2'>Please enter a pet medical status *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Description</p>
                  <textarea
                    type='text'
                    placeholder='Description'
                    name='petDesc'
                    onChange={handleInputChange}
                    
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidDesc ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidDesc && <p className='text-red text-left mt-2'>Please enter a pet description *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Image</p>
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
              </div>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4 mt-4' />

            <div className='w-full flex flex-row justify-end items-center p-4'>
              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                <p>Cancel</p>
              </button>
              <button className='p-2 px-4 rounded-md bg-blue-dark hover:bg-blue' onClick={handleButtonAdd}>
                <p>Upload</p>
              </button>
            </div>
          </form>

        </Modal>
      </div>
    </div>
  );
};

export default PetTable;
