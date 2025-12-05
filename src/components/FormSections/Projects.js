import React from 'react';
import Input from '../UI/Input.js';
import Button from '../UI/Button.js';
import './FormSection.css';

const Projects = ({ data, onAdd, onRemove, onUpdate }) => {
  const addProject = () => {
    onAdd('projects', {
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleProjectChange = (index, field, value) => {
    onUpdate('projects', index, { [field]: value });
  };

  const addTechnology = (projectIndex, tech) => {
    const currentProject = data.projects[projectIndex];
    const technologies = [...(currentProject.technologies || []), tech];
    onUpdate('projects', projectIndex, { technologies });
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const currentProject = data.projects[projectIndex];
    const technologies = currentProject.technologies?.filter((_, i) => i !== techIndex) || [];
    onUpdate('projects', projectIndex, { technologies });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>🚀 Projects</h2>
        <p className="section-subtitle">Showcase your personal and professional projects</p>
      </div>

      <div className="action-buttons">
        <Button onClick={addProject}>
          + Add Project
        </Button>
      </div>

      {data.projects.map((project, index) => (
        <div key={index} className="form-card">
          <div className="card-header">
            <h3>Project #{index + 1}</h3>
            <div className="card-actions">
              <Button 
                variant="error" 
                size="small"
                onClick={() => onRemove('projects', index)}
              >
                Remove
              </Button>
            </div>
          </div>
          
          <div className="form-grid">
            <Input
              label="Project Name *"
              value={project.name}
              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              placeholder="E-commerce Website"
              required
              fullWidth
            />
            
            <Input
              label="Description"
              type="textarea"
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              placeholder="Describe the project, your role, technologies used, and key achievements..."
              fullWidth
              rows={4}
            />
            
            <Input
              label="Project URL"
              type="url"
              value={project.link}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
              placeholder="https://github.com/username/project"
              fullWidth
            />
          </div>

          {/* Technologies */}
          <div className="technologies-section">
            <h4>Technologies Used</h4>
            <div className="technologies-input">
              <input
                type="text"
                placeholder="Add a technology and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addTechnology(index, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="technologies-list">
              {project.technologies?.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">
                  {tech}
                  <button onClick={() => removeTechnology(index, techIndex)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {data.projects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <h3>No projects added yet</h3>
          <p>Showcase your work with personal or professional projects.</p>
          <Button onClick={addProject}>
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;