export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let totalMonths = years * 12 + months;
  if (totalMonths < 0) totalMonths = 0;
  
  const yearsPart = Math.floor(totalMonths / 12);
  const monthsPart = totalMonths % 12;
  
  if (yearsPart === 0) {
    return monthsPart === 1 ? '1 month' : `${monthsPart} months`;
  } else if (monthsPart === 0) {
    return yearsPart === 1 ? '1 year' : `${yearsPart} years`;
  } else {
    return `${yearsPart} yr ${monthsPart} mo`;
  }
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const exportToText = (resumeData) => {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;
  
  let text = `${personalInfo.firstName} ${personalInfo.lastName}\n`;
  text += `${personalInfo.title}\n\n`;
  text += `Contact: ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.address}\n`;
  text += `LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}\n\n`;
  
  text += `SUMMARY\n${summary}\n\n`;
  
  if (experience.length > 0) {
    text += `EXPERIENCE\n`;
    experience.forEach(exp => {
      text += `${exp.position} at ${exp.company}\n`;
      text += `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}\n`;
      text += `${exp.description}\n\n`;
    });
  }
  
  if (education.length > 0) {
    text += `EDUCATION\n`;
    education.forEach(edu => {
      text += `${edu.degree} in ${edu.field}\n`;
      text += `${edu.institution} | ${formatDate(edu.endDate)}\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      text += '\n';
    });
  }
  
  if (skills.length > 0) {
    text += `SKILLS\n${skills.join(', ')}\n\n`;
  }
  
  if (projects.length > 0) {
    text += `PROJECTS\n`;
    projects.forEach(project => {
      text += `${project.name}\n`;
      text += `${project.description}\n`;
      if (project.link) text += `Link: ${project.link}\n`;
      text += '\n';
    });
  }
  
  return text;
};
