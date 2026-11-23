import React from 'react';

const PrimaryButton = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-button ${className}`}
      style={{
        backgroundColor: 'var(--primary-color)',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: 'var(--radius-full)',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 0.2s ease-in-out',
        boxShadow: 'var(--shadow-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.65 : 1,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.target.style.backgroundColor = 'var(--primary-hover)';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.target.style.backgroundColor = 'var(--primary-color)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'var(--shadow-sm)';
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.target.style.transform = 'translateY(1px)';
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
