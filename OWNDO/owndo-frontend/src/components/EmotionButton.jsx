import React from 'react';

const EmotionButton = ({ emotion, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(emotion.id)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: isSelected ? 'var(--surface-color)' : 'transparent',
        border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        minWidth: '80px',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.style.borderColor = 'var(--primary-color)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'var(--border-color)';
        }
      }}
    >
      <span style={{ fontSize: '2rem' }}>{emotion.emoji}</span>
      <span
        style={{
          fontSize: '0.9rem',
          fontWeight: isSelected ? '600' : '400',
          color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
        }}
      >
        {emotion.label}
      </span>
    </button>
  );
};

export default EmotionButton;
