import React, { useState } from 'react';

export default function ConfirmationButton({
  mainButtonText,
  confirmButtonText,
  onConfirm,
  mainButtonStyle,
  confirmButtonStyle,
  onToggleConfirmation, 
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMainButtonClick = () => {
    setShowConfirmation(true);
    onToggleConfirmation?.(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setShowConfirmation(false);
    onToggleConfirmation?.(false); 
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    onToggleConfirmation?.(false); 
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {!showConfirmation ? (
        <button
          style={mainButtonStyle}
          onClick={handleMainButtonClick}
        >
          {mainButtonText}
        </button>
      ) : (
        <>
          <button
            style={confirmButtonStyle}
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </button>
          <button
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}