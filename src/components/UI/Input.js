// Input.js
import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  helperText = '',
  icon = null,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'input-field',
    type === 'textarea' && 'input-textarea',
    error && 'input-error',
    disabled && 'input-disabled',
    fullWidth && 'input-full-width'
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'input-group',
    fullWidth && 'input-group-full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <div className="input-header">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        )}
        {icon && <span className="input-icon-top">{icon}</span>}
      </div>
      
      <div className="input-wrapper">
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            className={inputClasses}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={4}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            className={inputClasses}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...props}
          />
        )}
        
        {error && (
          <div className="input-error-icon">⚠️</div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`input-message ${error ? 'input-message-error' : 'input-message-helper'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Input;