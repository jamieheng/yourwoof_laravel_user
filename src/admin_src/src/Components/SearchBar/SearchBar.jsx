import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import './Styles/SearchBar.style.css'
const SearchBar = ({ onSearch }) => {
const [searchTerm, setSearchTerm] = useState('');

const handleChange = (event) => {
    setSearchTerm(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the search term to the parent component or handle the search in this component
    onSearch(searchTerm);
};

return (
    <form onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center"
    >
      <input
        className='p-2 px-4 rounded-lg w-64 md:w-128 lg:512 font-raleway bg-blue-dark text-white border border-blue-dark focus:border-blue-dark focus:bg-white focus:text-blue-dark focus:outline-none'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className='p-2 hover:bg-blue-dark hover:text-white rounded-lg ml-2'>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
