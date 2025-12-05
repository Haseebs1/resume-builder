import React from 'react';
import Input from '../UI/Input.js';
import Button from '../UI/Button.js';
import './FormSection.css';

const Education = ({ data, onAdd, onRemove, onUpdate, onMove }) => {
  const addEducation = () => {
    onAdd('education', {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
  };

  const handleEducationChange = (index, field, value) => {
    onUpdate('education', index, { [field]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>🎓 Education</h2>
        <p className="section-subtitle">Showcase your academic background and achievements</p>
      </div>

      <div className="action-buttons">
        <Button onClick={addEducation}>
          + Add Education
        </Button>
      </div>

      {data.education.map((edu, index) => (
        <div key={index} className="form-card">
          <div className="card-header">
            <h3>Education #{index + 1}</h3>
            <div className="card-actions">
              <Button 
                variant="error" 
                size="small"
                onClick={() => onRemove('education', index)}
              >
                Remove
              </Button>
            </div>
          </div>
          
          <div className="form-grid">
            <Input
              label="Institution *"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              placeholder="Stanford University"
              required
            />
            
            <Input
              label="Degree *"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              placeholder="Bachelor of Science"
              required
            />
            
            <Input
              label="Field of Study"
              value={edu.field}
              onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
              placeholder="Computer Science"
            />
            
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
            />
            
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
            />
            
            <Input
              label="GPA"
              value={edu.gpa}
              onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
              placeholder="3.8"
              helperText="Optional - include if 3.0 or higher"
            />
          </div>
        </div>
      ))}
      
      {data.education.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎓</div>
          <h3>No education added yet</h3>
          <p>Add your educational background to showcase your qualifications.</p>
          <Button onClick={addEducation}>
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};

export default Education;