import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = loading ? 'btn-loading' : '';
  const disabledClass = disabled ? 'btn-disabled' : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span className="btn-spinner">
          <div className="spinner"></div>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn-icon left">{icon}</span>
      )}
      
      <span className="btn-content">{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn-icon right">{icon}</span>
      )}
    </button>
  );
};

export default Button;