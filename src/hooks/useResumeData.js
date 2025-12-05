import { useState, useEffect } from 'react';
import { generateId, debounce } from '../utilis/helpers.js';
import { SKILL_CATEGORIES, SAMPLE_SUMMARIES, ACHIEVEMENTS_EXAMPLES } from '../utilis/constants.js';
import html2pdf from 'html2pdf.js';

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
      title: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  });

  const [savedResumes, setSavedResumes] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [isDirty, setIsDirty] = useState(false);

  // Load initial data
  useEffect(() => {
    const savedCurrent = localStorage.getItem('resumeCraft_current');
    const savedList = localStorage.getItem('resumeCraft_saved');
    const savedTemplate = localStorage.getItem('resumeCraft_template');
    
    if (savedCurrent) {
      try {
        setResumeData(JSON.parse(savedCurrent));
      } catch (error) {
        console.error('Error loading current resume:', error);
      }
    }
    
    if (savedList) {
      try {
        setSavedResumes(JSON.parse(savedList));
      } catch (error) {
        console.error('Error loading saved resumes:', error);
      }
    }
    
    if (savedTemplate) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    const saveData = debounce(() => {
      localStorage.setItem('resumeCraft_current', JSON.stringify(resumeData));
      localStorage.setItem('resumeCraft_template', currentTemplate);
      setIsDirty(false);
    }, 1000);
    
    if (isDirty) {
      saveData();
    }
    
    return () => saveData.cancel && saveData.cancel();
  }, [resumeData, currentTemplate, isDirty]);

  // Core update functions
  const updateResumeData = (section, updates) => {
    setIsDirty(true);
    setResumeData(prev => ({
      ...prev,
      [section]: typeof updates === 'function' ? updates(prev[section]) : updates
    }));
  };

  const updatePersonalInfo = (updates) => {
    updateResumeData('personalInfo', prev => ({ ...prev, ...updates }));
  };

  const updateSummary = (summary) => {
    updateResumeData('summary', summary);
  };

  const addItem = (arrayName, item) => {
    updateResumeData(arrayName, prev => [...prev, { ...item, id: generateId() }]);
  };

  const updateItem = (arrayName, index, updates) => {
    updateResumeData(arrayName, prev => 
      prev.map((item, i) => i === index ? { ...item, ...updates } : item)
    );
  };

  const removeItem = (arrayName, index) => {
    updateResumeData(arrayName, prev => prev.filter((_, i) => i !== index));
  };

  const moveItem = (arrayName, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    
    updateResumeData(arrayName, prev => {
      const newArray = [...prev];
      const [movedItem] = newArray.splice(fromIndex, 1);
      newArray.splice(toIndex, 0, movedItem);
      return newArray;
    });
  };

  // Save management
  const saveResume = (customTitle = null) => {
    const resumeToSave = {
      ...resumeData,
      id: generateId(),
      title: customTitle || `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume` || 'Untitled Resume',
      savedAt: new Date().toISOString(),
      template: currentTemplate,
      preview: generatePreview()
    };

    const updatedResumes = [
      resumeToSave,
      ...savedResumes.filter(resume => resume.id !== resumeToSave.id)
    ].slice(0, 10); // Keep last 10

    setSavedResumes(updatedResumes);
    localStorage.setItem('resumeCraft_saved', JSON.stringify(updatedResumes));
    setIsDirty(false);

    return { 
      success: true, 
      message: '✨ Resume saved successfully!',
      resume: resumeToSave
    };
  };

  const loadResume = (resume) => {
    setResumeData(resume);
    setCurrentTemplate(resume.template || 'modern');
    setIsDirty(false);
    return { success: true, message: '📂 Resume loaded!' };
  };

  const deleteSavedResume = (id) => {
    const updatedResumes = savedResumes.filter(resume => resume.id !== id);
    setSavedResumes(updatedResumes);
    localStorage.setItem('resumeCraft_saved', JSON.stringify(updatedResumes));
    return { success: true, message: '🗑️ Resume deleted!' };
  };

  const duplicateResume = (resume) => {
    const duplicated = {
      ...resume,
      id: generateId(),
      title: `${resume.title} (Copy)`,
      savedAt: new Date().toISOString()
    };
    
    const updatedResumes = [duplicated, ...savedResumes];
    setSavedResumes(updatedResumes);
    localStorage.setItem('resumeCraft_saved', JSON.stringify(updatedResumes));
    return { success: true, message: '📋 Resume duplicated!' };
  };

  // Smart features
  const suggestSkills = () => {
    const title = resumeData.personalInfo.title?.toLowerCase() || '';
    let suggestedSkills = [];

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
      if (
        (category === 'TECHNICAL' && (title.includes('developer') || title.includes('engineer'))) ||
        (category === 'DESIGN' && title.includes('design')) ||
        (category === 'BUSINESS' && (title.includes('manager') || title.includes('lead'))) ||
        category === 'SOFT_SKILLS'
      ) {
        suggestedSkills = [...suggestedSkills, ...skills];
      }
    });

    const newSkills = suggestedSkills
      .filter(skill => !resumeData.skills.includes(skill))
      .slice(0, 8);

    if (newSkills.length > 0) {
      updateResumeData('skills', prev => [...new Set([...prev, ...newSkills])]);
      return { 
        success: true, 
        message: `🎯 Added ${newSkills.length} relevant skills!`,
        skills: newSkills 
      };
    }
    
    return { success: false, message: 'No new skills to suggest' };
  };

  const generateSummary = () => {
    const { personalInfo, experience, skills } = resumeData;
    const years = experience.length > 0 ? '5+' : 'several';
    const role = personalInfo.title || 'professional';
    const topSkills = skills.slice(0, 3).join(', ');
    
    const summary = `Experienced ${role} with ${years} years in the industry. Specialized in ${topSkills || 'delivering high-quality solutions'}. Proven track record of success in ${experience.length > 0 ? 'various projects' : 'achieving business goals'}.`;
    
    updateSummary(summary);
    return { success: true, message: '📝 Summary generated!' };
  };

  const autoFillSample = () => {
    const sampleData = {
      personalInfo: {
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        github: 'https://github.com/alexjohnson',
        website: 'https://alexjohnson.dev',
        title: 'Senior Full Stack Developer'
      },
      summary: SAMPLE_SUMMARIES[0],
      experience: [
        {
          id: generateId(),
          company: 'Tech Innovations Inc.',
          position: 'Senior Developer',
          startDate: '2020-01',
          endDate: '',
          current: true,
          description: 'Lead development of scalable web applications using React and Node.js. Mentored junior developers and improved team productivity by 25%.'
        }
      ],
      education: [
        {
          id: generateId(),
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2018-05',
          gpa: '3.8'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
      projects: [
        {
          id: generateId(),
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution serving 10,000+ users',
          technologies: ['React', 'Node.js', 'MongoDB'],
          link: 'https://github.com/alexjohnson/ecommerce'
        }
      ]
    };
    
    setResumeData(sampleData);
    setIsDirty(true);
    return { success: true, message: '🎨 Sample data loaded! Customize it to make it yours.' };
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setResumeData({
        personalInfo: {
          firstName: '', lastName: '', email: '', phone: '', 
          address: '', linkedin: '', github: '', website: '', title: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
      setIsDirty(false);
      return { success: true, message: '🔄 Form reset successfully!' };
    }
    return { success: false, message: 'Reset cancelled' };
  };

  // PDF Export function
  // PDF Export function - AUTOMATIC
  const exportToPDF = async () => {
    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        throw new Error('Resume preview not found');
      }

      const options = {
        filename: `resume-${resumeData.personalInfo.firstName || 'my'}-${resumeData.personalInfo.lastName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(options).from(element).save();

      return {
        success: true,
        message: '📄 PDF downloaded successfully!'
      };
    } catch (error) {
      console.error('PDF export error:', error);
      return {
        success: false,
        message: '❌ Failed to generate PDF. Please check the console for details.'
      };
    }
  };

  // Delete current resume data
  const deleteCurrentResume = () => {
    if (window.confirm('Are you sure you want to delete the current resume? This cannot be undone.')) {
      setResumeData({
        personalInfo: {
          firstName: '', lastName: '', email: '', phone: '', 
          address: '', linkedin: '', github: '', website: '', title: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
      });
      localStorage.removeItem('resumeCraft_current');
      setIsDirty(false);
      return { success: true, message: 'Resume deleted successfully!' };
    }
    return { success: false, message: 'Deletion cancelled' };
  };

  // Analytics and progress
  const calculateProgress = () => {
    let progress = 0;
    const weights = {
      personal: 25,
      summary: 15,
      experience: 30,
      education: 15,
      skills: 10,
      projects: 5
    };

    if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName) progress += weights.personal * 0.6;
    if (resumeData.personalInfo.email) progress += weights.personal * 0.4;
    if (resumeData.summary?.length > 50) progress += weights.summary;
    if (resumeData.experience.length > 0) progress += weights.experience * Math.min(resumeData.experience.length / 3, 1);
    if (resumeData.education.length > 0) progress += weights.education;
    if (resumeData.skills.length >= 3) progress += weights.skills;
    if (resumeData.projects.length > 0) progress += weights.projects;

    return Math.min(Math.round(progress), 100);
  };

  const generatePreview = () => {
    const { personalInfo, summary } = resumeData;
    return `${personalInfo.firstName} ${personalInfo.lastName} - ${summary?.substring(0, 50)}...` || 'No preview available';
  };

  const getStats = () => {
    return {
      wordCount: resumeData.summary.split(/\s+/).filter(word => word.length > 0).length,
      experienceCount: resumeData.experience.length,
      skillCount: resumeData.skills.length,
      projectCount: resumeData.projects.length,
      educationCount: resumeData.education.length
    };
  };

  return {
    // State
    resumeData,
    savedResumes,
    currentTemplate,
    isDirty,

    // Core operations
    updateResumeData,
    updatePersonalInfo,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    moveItem,
    
    // Save management
    saveResume,
    loadResume,
    deleteSavedResume,
    duplicateResume,
    resetForm,
    deleteCurrentResume,
    
    // Smart features
    suggestSkills,
    generateSummary,
    autoFillSample,
    
    // Export
    exportToPDF,
    
    // Analytics
    calculateProgress,
    getStats,

    // Template
    setCurrentTemplate
  };
};