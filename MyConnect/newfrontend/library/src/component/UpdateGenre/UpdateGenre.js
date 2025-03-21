import React, { useState, useEffect } from 'react';
import { useUpdateGenreMutation, useGetGenreQuery } from '@/rtk/genreApi';
import ConfirmationButton from '@/component/ConfirmationButton/ConfirmationButton';

export default function UpdateGenre(props) {
  const [genrename, setGenreName] = useState('');
  const { data } = useGetGenreQuery(props.genreid);
  const [updateGenre, { isLoading }] = useUpdateGenreMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const setGenreNameText = (event) => {
    setGenreName(event);
  };

  const handleUpdate = async () => {
    try {
      const newGenre = {
        id: data.id,
        genre_name: genrename,
        status: 'ACTIVE'
      };
      await updateGenre(newGenre).unwrap();
      alert('Genre updated successfully!');
      props.handleBack('add'); 
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update genre. Please try again.');
    }
  };

  const handleCancel = () => {
    props.handleBack('add');
  };

  useEffect(() => {
    if (data) {
      setGenreName(data.genre_name);
    }
  }, [data]);

  return (
    <div className='genre-form'>
      <input
        type='text'
        placeholder='Enter genre name here'
        value={genrename}
        onChange={(e) => setGenreNameText(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <ConfirmationButton
          mainButtonText="Update"
          confirmButtonText="Confirm Update"
          onConfirm={handleUpdate}
          mainButtonStyle={{ backgroundColor: 'yellow', color: 'black' }}
          confirmButtonStyle={{ backgroundColor: 'orange', color: 'black' }}
          onToggleConfirmation={(isVisible) => setShowConfirmation(isVisible)} 
        />
        
        {!showConfirmation && (
          <button
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}