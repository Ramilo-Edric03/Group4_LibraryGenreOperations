import React, { useState } from 'react';
import { useAddGenresMutation } from '@/rtk/genreApi';

export default function AddGenre() {
  const [genrename, setGenreName] = useState('');
  const [addGenre, { isLoading }] = useAddGenresMutation();

  const setGenreNameText = (event) => {
    setGenreName(event);
  };

  const submitGenre = async () => {
    if (!genrename.trim()) {
      alert('Genre name cannot be empty!'); // Validation
      return;
    }

    const genre = {
      genre_name: genrename,
      status: 'ACTIVE'
    };

    try {
      await addGenre(genre).unwrap();
      alert(`"${genrename}" has been successfully added!`); // Success alert
      setGenreName(''); // Clear the input field
    } catch (error) {
      console.error('Add failed:', error);
      alert('Failed to add genre. Please try again.'); // Error alert
    }
  };

  return (
    <div className='genre-form'>
      <input
        type='text'
        placeholder='Enter genre name here'
        value={genrename}
        onChange={(e) => setGenreNameText(e.target.value)}
      />
      <button
        style={{ backgroundColor: 'blue', color: 'white' }}
        onClick={submitGenre}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </div>
  );
}