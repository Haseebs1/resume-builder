import React from 'react';
import Input from '../UI/Input.js';
import Button from '../UI/Button.js';
import './FormSection.css';

const Experience = ({ data, onAdd, onRemove, onUpdate, onMove }) => {
  const addExperience = () => {
    onAdd('experience', {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    });
  };

  const handleExperienceChange = (index, field, value) => {
    onUpdate('experience', index, { [field]: value });
  };

  const addAchievement = (expIndex) => {
    const currentExp = data.experience[expIndex];
    const achievements = [...(currentExp.achievements || []), ''];
    onUpdate('experience', expIndex, { achievements });
  };

  const updateAchievement = (expIndex, achievementIndex, value) => {
    const currentExp = data.experience[expIndex];
    const achievements = currentExp.achievements?.map((ach, i) => 
      i === achievementIndex ? value : ach
    ) || [];
    onUpdate('experience', expIndex, { achievements });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>💼 Work Experience</h2>
        <p className="section-subtitle">Showcase your professional journey and achievements</p>
      </div>

      <div className="action-buttons">
        <Button onClick={addExperience}>
          + Add Experience
        </Button>
      </div>

      {data.experience.map((exp, index) => (
        <div key={index} className="form-card">
          <div className="card-header">
            <h3>Experience #{index + 1}</h3>
            <div className="card-actions">
              <Button 
                variant="error" 
                size="small"
                onClick={() => onRemove('experience', index)}
              >
                Remove
              </Button>
            </div>
          </div>
          
          <div className="form-grid">
            <Input
              label="Company *"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              placeholder="Google Inc."
              required
            />
            
            <Input
              label="Position *"
              value={exp.position}
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              placeholder="Senior Developer"
              required
            />
            
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
            />
            
            <Input
              label="End Date"
              type="month"
              value={exp.endDate}
              onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              disabled={exp.current}
            />
            
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                />
                I currently work here
              </label>
            </div>
            
            <Input
              label="Description"
              type="textarea"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities, achievements, and key contributions..."
              fullWidth
              rows={4}
            />
          </div>

          <div className="achievements-section">
            <h4>Key Achievements</h4>
            {exp.achievements?.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="achievement-item">
                <Input
                  value={achievement}
                  onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                  placeholder="e.g., Increased revenue by 30% through new feature implementation"
                  fullWidth
                />
              </div>
            ))}
            <Button 
              variant="outline" 
              size="small"
              onClick={() => addAchievement(index)}
            >
              + Add Achievement
            </Button>
          </div>
        </div>
      ))}
      
      {data.experience.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💼</div>
          <h3>No experience added yet</h3>
          <p>Start by adding your first work experience to build your professional story.</p>
          <Button onClick={addExperience}>
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default Experience;