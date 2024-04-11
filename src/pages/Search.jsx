import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, createSearch, getSearches } from 'wasp/client/operations';

const SearchPage = () => {
  const { data: searches, isLoading, error } = useQuery(getSearches);
  const createSearchFn = useAction(createSearch);
  const [newSearchQuery, setNewSearchQuery] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateSearch = () => {
    createSearchFn({ query: newSearchQuery });
    setNewSearchQuery('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Enter your search query'
        className='px-1 py-2 border rounded text-lg'
        value={newSearchQuery}
        onChange={(e) => setNewSearchQuery(e.target.value)}
      />
      <button
        onClick={handleCreateSearch}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded mt-2'
      >
        Search
      </button>
      <div className='mt-4'>
        {searches.map((search) => (
          <Link
            key={search.id}
            to={`/search/results/${search.id}`}
            className='block py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 mt-2'
          >
            {search.query}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;