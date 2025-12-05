import React, { useState } from 'react';
import Button from '../UI/Button.js';
import './Header.css';

const Header = ({ 
  onSave, 
  onReset, 
  onExportPDF, 
  onShowTemplates,
  onAutoFill,
  onDeleteResume,
  onShowSavedResumes,
  progress,
  stats,
  isDirty,
  currentTemplate
}) => {
  const [showStats, setShowStats] = useState(false);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete the current resume? This action cannot be undone.')) {
      onDeleteResume();
    }
  };

  return (
    <header className="header">
      <div className="header-background"></div>
      
      <div className="header-content">
        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">📄</span>
            <div className="logo-text">
              <h1>ResumeCraft Pro</h1>
              <p>Build stunning resumes in minutes</p>
            </div>
          </div>
          
          {progress > 0 && (
            <div className="progress-section">
              <div className="progress-info">
                <span className="progress-text">{progress}% Complete</span>
                <button 
                  className="stats-toggle"
                  onClick={() => setShowStats(!showStats)}
                  title="Show stats"
                >
                  📊
                </button>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="header-actions">
          <div className="action-group">
            <Button
              variant="ghost"
              size="small"
              onClick={onAutoFill}
              title="Auto-fill sample data"
            >
              🎨 Auto-fill
            </Button>
            {/*}
            <Button
              variant="ghost"
              size="small"
              onClick={onShowTemplates}
              title="Change template"
            >
              🎨 {currentTemplate}
            </Button>*/}

            <Button
              variant="ghost"
              size="small"
              onClick={onShowSavedResumes}
              title="View saved resumes"
            >
              💾 Saved
            </Button>

            <Button
              variant="ghost"
              size="small"
              onClick={handleDeleteClick}
              title="Delete current resume"
            >
              🗑️ Delete
            </Button>
          </div>

          <div className="action-group">
            {isDirty && <span className="dirty-indicator" title="Unsaved changes">●</span>}
            
            <Button
              variant="outline"
              onClick={onReset}
            >
              🔄 Reset
            </Button>
            
            <Button
              variant="primary"
              onClick={onSave}
            >
              💾 Save
            </Button>
            
            <Button
              variant="gradient"
              onClick={onExportPDF}
            >
              📄 Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Popover */}
      {showStats && (
        <div className="stats-popover">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{stats.wordCount}</span>
              <span className="stat-label">Words</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.experienceCount}</span>
              <span className="stat-label">Experiences</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.skillCount}</span>
              <span className="stat-label">Skills</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.projectCount}</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;