import React, { useState } from 'react';
import Header from './components/Header/Header.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import PersonalInfo from './components/FormSections/PersonalInfo.js';
import Summary from './components/FormSections/Summary.js';
import Experience from './components/FormSections/Experience.js';
import Education from './components/FormSections/Education.js';
import Skills from './components/FormSections/Skills.js';
import Projects from './components/FormSections/Projects.js';
import ResumePreview from './components/Preview/ResumePreview.js';
import TemplateSelector from './components/Templates/TemplateSelector.js';
import Modal from './components/UI/Modal.js';
import Toast from './components/UI/Toast.js';
import { useResumeData } from './hooks/useResumeData.js';
import './App.css';

function App() {
  const { 
    resumeData, 
    savedResumes,
    currentTemplate,
    isDirty,
    updateResumeData,
    updatePersonalInfo,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    moveItem,
    saveResume,
    loadResume,
    deleteSavedResume,
    duplicateResume,
    resetForm,
    suggestSkills,
    generateSummary,
    autoFillSample,
    exportToPDF,
    calculateProgress,
    getStats,
    setCurrentTemplate,
    deleteCurrentResume
  } = useResumeData();
  
  const [activeSection, setActiveSection] = useState('personal');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    const result = saveResume(customTitle || undefined);
    showToast(result.message, result.success ? 'success' : 'error');
    setShowSaveModal(false);
    setCustomTitle('');
  };

  const handleLoadResume = (resume) => {
    const result = loadResume(resume);
    showToast(result.message);
    setShowSavedModal(false);
  };

  const handleDeleteResume = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const result = deleteSavedResume(id);
      showToast(result.message);
    }
  };

  const handleDuplicateResume = (resume) => {
    const result = duplicateResume(resume);
    showToast(result.message);
  };

  const handleDownloadPDF = async () => {
    showToast('🔄 Generating PDF download...', 'info');

    try {
      const result = await exportToPDF();
      showToast(result.message, result.success ? 'success' : 'error');
    } catch (error) {
      console.error('PDF download error:', error);
      showToast('❌ Failed to download PDF', 'error');
    }
  };

  const handleSuggestSkills = () => {
    const result = suggestSkills();
    showToast(result.message, result.success ? 'success' : 'warning');
  };

  const handleGenerateSummary = () => {
    const result = generateSummary();
    showToast(result.message);
  };

  const handleAutoFill = () => {
    const result = autoFillSample();
    showToast(result.message);
  };

  const handleReset = () => {
    const result = resetForm();
    if (result.success) {
      showToast(result.message);
    }
  };

  const handleDeleteCurrentResume = () => {
    const result = deleteCurrentResume();
    if (result.success) {
      showToast(result.message);
    }
  };

  const handleShowSavedResumes = () => {
    setShowSavedModal(true);
  };

  const progress = calculateProgress();
  const stats = getStats();

  const renderFormSection = () => {
    const commonProps = {
      data: resumeData,
      onAdd: addItem,
      onRemove: removeItem,
      onUpdate: updateItem,
      onMove: moveItem
    };

    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfo 
            {...commonProps}
            onChange={updatePersonalInfo}
          />
        );
      case 'summary':
        return (
          <Summary 
            {...commonProps}
            onChange={updateSummary}
            onGenerateSummary={handleGenerateSummary}
          />
        );
      case 'experience':
        return (
          <Experience 
            {...commonProps}
            onChange={updateItem}
          />
        );
      case 'education':
        return (
          <Education 
            {...commonProps}
            onChange={updateItem}
          />
        );
      case 'skills':
        return (
          <Skills 
            {...commonProps}
            onSuggestSkills={handleSuggestSkills}
          />
        );
      case 'projects':
        return (
          <Projects 
            {...commonProps}
            onChange={updateItem}
          />
        );
      default:
        return <PersonalInfo {...commonProps} onChange={updatePersonalInfo} />;
    }
  };

  return (
    <div className="app">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Header 
        onSave={handleSave}
        onReset={handleReset}
        onExportPDF={handleDownloadPDF}
        onShowTemplates={() => setShowTemplates(true)}
        onShowSavedResumes={handleShowSavedResumes}
        onAutoFill={handleAutoFill}
        onDeleteResume={handleDeleteCurrentResume}
        progress={progress}
        stats={stats}
        isDirty={isDirty}
        currentTemplate={currentTemplate}
      />
      
      <div className="main-container">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          savedResumes={savedResumes}
          onLoadResume={handleLoadResume}
          onDeleteResume={handleDeleteResume}
          onDuplicateResume={handleDuplicateResume}
          progress={progress}
          stats={stats}
        />
        
        <div className="content-area">
          <div className="form-container">
            {renderFormSection()}
          </div>
          
          <div className="preview-container">
            <ResumePreview 
              data={resumeData} 
              template={currentTemplate}
            />
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      <Modal 
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        title="🎨 Choose a Template"
      >
        <TemplateSelector 
          currentTemplate={currentTemplate}
          onSelectTemplate={setCurrentTemplate}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>

      {/* Save Modal */}
      <Modal 
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="💾 Save Resume"
      >
        <div className="save-modal-content">
          <p>Give your resume a name:</p>
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder={`${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`}
            className="title-input"
            onKeyPress={(e) => e.key === 'Enter' && confirmSave()}
          />
          <div className="modal-actions">
            <button 
              className="btn btn-outline"
              onClick={() => setShowSaveModal(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={confirmSave}
              disabled={!customTitle.trim()}
            >
              Save Resume
            </button>
          </div>
        </div>
      </Modal>

      {/* Saved Resumes Modal */}
      <Modal 
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        title="💾 Saved Resumes"
        size="large"
      >
        <div className="saved-resumes-modal">
          {savedResumes.length === 0 ? (
            <p className="no-resumes">No saved resumes yet.</p>
          ) : (
            <div className="saved-resumes-list">
              {savedResumes.map((resume) => (
                <div key={resume.id} className="saved-resume-item">
                  <div className="resume-info">
                    <h4>{resume.title}</h4>
                    <p className="resume-date">
                      Saved on {new Date(resume.savedAt).toLocaleDateString()}
                    </p>
                    <p className="resume-preview">
                      {resume.personalInfo?.firstName} {resume.personalInfo?.lastName} - {resume.personalInfo?.title}
                    </p>
                  </div>
                  <div className="resume-actions">
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleLoadResume(resume)}
                    >
                      Load
                    </button>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDuplicateResume(resume)}
                    >
                      Duplicate
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;