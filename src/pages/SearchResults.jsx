import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useAction, getSearch, deleteSearch } from 'wasp/client/operations';

const SearchResultsPage = () => {
  const { searchId } = useParams();
  const { data: search, isLoading, error } = useQuery(getSearch, { id: parseInt(searchId) });
  const deleteSearchFn = useAction(deleteSearch);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeleteSearch = () => {
    deleteSearchFn({ searchId: parseInt(searchId) });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Search Results</h1>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div className='mb-2'>Query: {search.query}</div>
        <div className='mb-2'>Results: {search.results}</div>
        <button
          onClick={handleDeleteSearch}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Delete Search
        </button>
      </div>
    </div>
  );
}

export default SearchResultsPage;