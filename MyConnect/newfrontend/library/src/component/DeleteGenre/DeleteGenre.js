import React from 'react';
import { useUpdateGenreStatusMutation } from '@/rtk/genreApi';
import ConfirmationButton from '@/component/ConfirmationButton/ConfirmationButton'; 

export default function DeleteGenre({ genreId, genreName, onDeleteSuccess }) {
  const [updateStatus, { isLoading }] = useUpdateGenreStatusMutation();

  const handleDelete = async () => {
    try {
      await updateStatus({
        id: genreId,
        status: 'REMOVED'
      }).unwrap();
      alert(`"${genreName}" has been successfully deleted!`);
      onDeleteSuccess?.();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete genre. Please try again.');
    }
  };

  return (
    <ConfirmationButton
      mainButtonText="Delete"
      confirmButtonText="Confirm Delete"
      onConfirm={handleDelete}
      mainButtonStyle={{ backgroundColor: 'red', color: 'white' }}
      confirmButtonStyle={{ backgroundColor: 'darkred', color: 'white' }}
    />
  );
}