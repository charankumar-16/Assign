import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import LoadingSpinner from './components/LoadingSpinner';
import './style.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');

  const fetchImages = async (query, page = 1) => {
    if(query.length===0){
      alert("please enter the text");          
    }else{
    setLoading(true);
    setQuery(query);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=5LioQbyWJMNK4x6Ily8b9p7iWEFNqFeal_0VOglsrnc`
    );
    const data = await response.json();
    setImages(data.results);
    setTotalPages(data.total_pages);
    setTotalResults(data.total);
    setCurrentPage(page);
    setLoading(false);
  }
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      fetchImages(query, currentPage + 1);
    } else if (direction === 'prev') {
      fetchImages(query, currentPage - 1);
    }
  };

  const handleSearchKeyClick = (key) => {
    fetchImages(key);
  };

  return (
    <div className="App">
      <h1>Image Search App</h1>
      <SearchBar onSearch={fetchImages} />
      <div className="search-keys">
        {['mountains', 'flowers', 'beaches', 'cities'].map((key) => (
          <button key={key} onClick={() => handleSearchKeyClick(key)}>
            {key}
          </button>
        ))}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ImageList images={images} />
          {totalResults > 10 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <button onClick={() => onPageChange('prev')}>Previous</button>
      ) : (
        <span>This is the first page</span>
      )}
      {currentPage < totalPages ? (
        <button onClick={() => onPageChange('next')}>Next</button>
      ) : (
        <span>This is the final page</span>
      )}
    </div>
  );
};

export default App;
