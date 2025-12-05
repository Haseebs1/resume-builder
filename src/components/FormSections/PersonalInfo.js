import React from 'react';
import Input from '../UI/Input.js';
import Button from '../UI/Button.js';
import './FormSection.css';

const PersonalInfo = ({ data, onChange, onAdd, onRemove, onUpdate, onMove }) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  const socialLinks = [
    {
      field: 'linkedin',
      icon: '💼',
      placeholder: 'https://linkedin.com/in/yourname',
      label: 'LinkedIn'
    },
    {
      field: 'github',
      icon: '💻',
      placeholder: 'https://github.com/username',
      label: 'GitHub'
    },
    {
      field: 'website',
      icon: '🌐',
      placeholder: 'https://yourportfolio.com',
      label: 'Portfolio'
    }
  ];

  return (
    <div className="form-section personal-info-section">
      <div className="section-header">
        <h2>👤 Personal Information</h2>
        <p className="section-subtitle">Tell employers who you are and how to contact you</p>
      </div>

      <div className="form-grid">
        <Input
          label="First Name *"
          value={data.personalInfo.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder="John"
          required
          icon="👤"
        />
        
        <Input
          label="Last Name *"
          value={data.personalInfo.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="Doe"
          required
          icon="👤"
        />
        
        
        <Input
          label="Email *"
          type="email"
          value={data.personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@email.com"
          required
          icon="📧"
        />
        
        <Input
          label="Phone"
          type="tel"
          value={data.personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          icon="📞"
        />
        
        <Input
          label="Location"
          value={data.personalInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="San Francisco, CA"
          icon="📍"
          helperText="City, State, or Remote"
        />
      </div>

      {/* Social Links */}
      <div className="subsection">
        <h3>🌐 Social & Portfolio Links</h3>
        <div className="social-links-grid">
          {socialLinks.map(link => (
            <Input
              key={link.field}
              label={link.label}
              type="url"
              value={data.personalInfo[link.field]}
              onChange={(e) => handleChange(link.field, e.target.value)}
              placeholder={link.placeholder}
              icon={link.icon}
              fullWidth
            />
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="tips-card">
        <h4>💡 Pro Tips</h4>
        <ul>
          <li>Use a professional email address</li>
          <li>Include your city/state or "Remote" for location</li>
          <li>Add relevant social profiles (LinkedIn is a must!)</li>
          <li>Keep your job title clear and industry-standard</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfo;