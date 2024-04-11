import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getSearches } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: searches, isLoading, error } = useQuery(getSearches);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to BioExplore!</h1>
      <p className='mb-4'>Explore the world while helping the environment. Start searching now and contribute to planting trees in different countries.</p>
      <div className='flex flex-col gap-y-4'>
        <Link to='/search' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</Link>
        <Link to='/account' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Account Settings</Link>
      </div>
      <div className='mt-8'>
        <h2 className='text-lg font-bold mb-4'>Recent Searches:</h2>
        {searches.map((search) => (
          <div key={search.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <p className='font-bold'>{search.query}</p>
            <p>{search.results}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;