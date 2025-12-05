import React from 'react';
import Button from '../UI/Button.js';
import './FormSection.css';

const Skills = ({ data, onAdd, onRemove, onSuggestSkills }) => {
  const addSkill = () => {
    const skill = prompt('Enter a skill:');
    if (skill && skill.trim()) {
      onAdd('skills', skill.trim());
    }
  };

  const skillCategories = [
    {
      name: 'Technical',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'HTML/CSS', 'Git']
    },
    {
      name: 'Design',
      skills: ['Figma', 'UI/UX Design', 'Prototyping', 'Adobe Creative Suite']
    },
    {
      name: 'Business',
      skills: ['Project Management', 'Agile', 'Team Leadership', 'Strategic Planning']
    }
  ];

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>🛠️ Skills</h2>
        <p className="section-subtitle">Highlight your technical and professional abilities</p>
      </div>

      <div className="action-buttons">
        <Button onClick={addSkill}>
          + Add Skill
        </Button>
        <Button variant="outline" onClick={onSuggestSkills}>
          💡 Suggest Skills
        </Button>
      </div>

      {/* Current Skills */}
      <div className="skills-container">
        {data.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span>{skill}</span>
            <button 
              className="remove-skill"
              onClick={() => onRemove('skills', index)}
              title="Remove skill"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {data.skills.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🛠️</div>
          <h3>No skills added yet</h3>
          <p>Add your skills to showcase your capabilities to employers.</p>
        </div>
      )}

      {/* Skill Suggestions */}
      <div className="skill-suggestions">
        <h4>💡 Popular Skill Categories</h4>
        <div className="skill-categories">
          {skillCategories.map(category => (
            <div key={category.name} className="skill-category">
              <h5>{category.name}</h5>
              <div className="category-skills">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="suggested-skill"
                    onClick={() => onAdd('skills', skill)}
                  >
                    {skill} +
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tips-card">
        <h4>🎯 Skill Tips</h4>
        <ul>
          <li>Include both technical and soft skills</li>
          <li>List skills relevant to your target job</li>
          <li>Group similar skills together</li>
          <li>Be honest about your proficiency level</li>
          <li>Update skills regularly as you learn new technologies</li>
        </ul>
      </div>
    </div>
  );
};

export default Skills;