import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  activeSection, 
  onSectionChange, 
  savedResumes = [], 
  onLoadResume, 
  onDeleteResume, 
  onDuplicateResume,
  progress,
  stats 
}) => {
  const [expandedSection, setExpandedSection] = useState('sections');

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤', color: '#667eea' },
    { id: 'summary', label: 'Summary', icon: '📝', color: '#f093fb' },
    { id: 'experience', label: 'Experience', icon: '💼', color: '#4CAF50' },
    { id: 'education', label: 'Education', icon: '🎓', color: '#FF9800' },
    { id: 'skills', label: 'Skills', icon: '🛠️', color: '#2196F3' },
    { id: 'projects', label: 'Projects', icon: '🚀', color: '#9C27B0' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getCompletionIcon = (sectionId) => {
    const isComplete = checkSectionCompletion(sectionId);
    return isComplete ? '✅' : '⭕';
  };

  const checkSectionCompletion = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return !!savedResumes[0]?.resumeData?.personalInfo?.firstName;
      case 'summary':
        return !!savedResumes[0]?.resumeData?.summary;
      case 'experience':
        return savedResumes[0]?.resumeData?.experience?.length > 0;
      case 'education':
        return savedResumes[0]?.resumeData?.education?.length > 0;
      case 'skills':
        return savedResumes[0]?.resumeData?.skills?.length >= 3;
      case 'projects':
        return savedResumes[0]?.resumeData?.projects?.length > 0;
      default:
        return false;
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        {/* Quick Stats */}
        <div className="sidebar-section stats-section">
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{progress}%</div>
                <div className="stat-label">Complete</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-info">
                <div className="stat-value">{stats.experienceCount}</div>
                <div className="stat-label">Jobs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="sidebar-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('sections')}
          >
            <h3>🎯 Build Your Resume</h3>
            <span className="toggle-icon">
              {expandedSection === 'sections' ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedSection === 'sections' && (
            <div className="section-list">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(section.id)}
                  style={{ '--accent-color': section.color }}
                >
                  <span className="section-icon">{section.icon}</span>
                  <span className="section-label">{section.label}</span>
                  <span className="completion-icon">
                    {getCompletionIcon(section.id)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Saved Resumes */}
        <div className="sidebar-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('saved')}
          >
            <h3>💾 Saved Resumes</h3>
            <span className="toggle-icon">
              {expandedSection === 'saved' ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedSection === 'saved' && (
            <div className="saved-resumes-list">
              {savedResumes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📁</div>
                  <p>No saved resumes yet</p>
                  <small>Your work is auto-saved as you type!</small>
                </div>
              ) : (
                savedResumes.map((resume, index) => (
                  <div key={resume.id} className="saved-resume-item">
                    <div className="resume-preview">
                      <div className="resume-title">
                        {resume.title || 'Untitled Resume'}
                      </div>
                      <div className="resume-meta">
                        <span className="resume-date">
                          {new Date(resume.savedAt).toLocaleDateString()}
                        </span>
                        {index === 0 && <span className="current-badge">Current</span>}
                      </div>
                    </div>
                    <div className="resume-actions">
                      <button 
                        className="action-btn load-btn"
                        onClick={() => onLoadResume(resume)}
                        title="Load resume"
                      >
                        📂
                      </button>
                      <button 
                        className="action-btn duplicate-btn"
                        onClick={() => onDuplicateResume(resume)}
                        title="Duplicate resume"
                      >
                        📋
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => onDeleteResume(resume.id)}
                        title="Delete resume"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Tips & Guidance */}
        <div className="sidebar-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('tips')}
          >
            <h3>💡 Pro Tips</h3>
            <span className="toggle-icon">
              {expandedSection === 'tips' ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedSection === 'tips' && (
            <div className="tips-list">
              <div className="tip-item">
                <span className="tip-icon">🎯</span>
                <div className="tip-content">
                  <strong>Use Action Verbs</strong>
                  <p>Start bullet points with words like "Developed", "Managed", "Improved"</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📏</span>
                <div className="tip-content">
                  <strong>Keep it Concise</strong>
                  <p>Limit your resume to 1-2 pages for best results</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🎨</span>
                <div className="tip-content">
                  <strong>Choose the Right Template</strong>
                  <p>Modern templates work best for tech roles</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🔍</span>
                <div className="tip-content">
                  <strong>Quantify Achievements</strong>
                  <p>Use numbers to show impact (e.g., "Increased revenue by 30%")</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="sidebar-section">
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.print()}>
              🖨️ Print
            </button>
            <button className="quick-action-btn" onClick={() => window.location.reload()}>
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;