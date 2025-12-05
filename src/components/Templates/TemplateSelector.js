import React from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ currentTemplate, onSelectTemplate, onClose }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, professional design with gradient accents',
      colors: ['#667eea', '#764ba2'],
      preview: 'modern-preview'
    },
    {
      id: 'professional',
      name: 'Professional', 
      description: 'Traditional layout perfect for corporate roles',
      colors: ['#2c3e50', '#34495e'],
      preview: 'professional-preview'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and colorful for design and creative roles',
      colors: ['#ff6b6b', '#ffa726'],
      preview: 'creative-preview'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple, clean, and focused on content',
      colors: ['#2d3436', '#636e72'],
      preview: 'minimal-preview'
    }
  ];

  return (
    <div className="template-selector">
      <div className="templates-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${currentTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div 
              className="template-preview"
              style={{ 
                background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` 
              }}
            >
              <div className="preview-header"></div>
              <div className="preview-content">
                <div className="preview-line short"></div>
                <div className="preview-line medium"></div>
                <div className="preview-line long"></div>
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
            {currentTemplate === template.id && (
              <div className="selected-badge">Selected</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="template-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Apply Template
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;