import React, { useState } from 'react';
import { useAddGenresMutation } from '@/rtk/genreApi';
import ConfirmationButton from '@/component/ConfirmationButton/ConfirmationButton'; 

export default function AddGenre() {
  const [genrename, setGenreName] = useState('');
  const [addGenre, { isLoading }] = useAddGenresMutation();

  const setGenreNameText = (event) => {
    setGenreName(event);
  };

  const handleAddGenre = async () => {
    if (!genrename.trim()) {
      alert('Genre name cannot be empty!'); 
      return;
    }

    const genre = {
      genre_name: genrename,
      status: 'ACTIVE'
    };

    try {
      await addGenre(genre).unwrap();
      alert(`"${genrename}" has been successfully added!`);
      setGenreName(''); 
    } catch (error) {
      console.error('Add failed:', error);
      alert('Failed to add genre. Please try again.'); 
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
      <ConfirmationButton
        mainButtonText="Add"
        confirmButtonText="Confirm Add"
        onConfirm={handleAddGenre}
        mainButtonStyle={{ backgroundColor: 'blue', color: 'white' }}
        confirmButtonStyle={{ backgroundColor: 'darkblue', color: 'white' }}
        disabled={isLoading || !genrename.trim()} 
      />
    </div>
  );
}