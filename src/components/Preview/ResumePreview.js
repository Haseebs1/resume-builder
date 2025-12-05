import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="resume-preview-container" id="resume-preview">
      <div className="preview-content">
        {/* Header */}
        <div className="section-container">
          <header className="preview-header">
            <div className="name-title">
              <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
            </div>
            <div className="contact-info">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>| {personalInfo.phone}</span>}
              {personalInfo.address && <span>| {personalInfo.address}</span>}
              {personalInfo.linkedin && <span>| {personalInfo.linkedin.replace('https://', '')}</span>}
              {personalInfo.github && <span>| {personalInfo.github.replace('https://', '')}</span>}
              {personalInfo.website && <span>| {personalInfo.website.replace('https://', '')}</span>}
            </div>
          </header>
        </div>

        {/* Summary */}
        {summary && (
          <div className="section-container">
            <section className="section">
              <h3>PROFESSIONAL SUMMARY</h3>
              <div className="section-content">
                <p>{summary}</p>
              </div>
            </section>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="section-container">
            <section className="section">
              <h3>EXPERIENCE</h3>
              <div className="section-content">
                {experience.map((exp, index) => (
                  <div key={index} className="item">
                    <div className="item-header">
                      <div className="item-left">
                        <strong>{exp.position}</strong>
                        {exp.company && <span> - {exp.company}</span>}
                      </div>
                      <div className="item-right">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="item-description">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="section-container">
            <section className="section">
              <h3>EDUCATION</h3>
              <div className="section-content">
                {education.map((edu, index) => (
                  <div key={index} className="item">
                    <div className="item-header">
                      <div className="item-left">
                        <strong>{edu.degree}</strong>
                        {edu.field && <span> in {edu.field}</span>}
                      </div>
                      <div className="item-right">
                        {formatDate(edu.endDate)}
                      </div>
                    </div>
                    <div className="item-subtitle">
                      {edu.institution}
                      {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="section-container">
            <section className="section">
              <h3>SKILLS</h3>
              <div className="section-content">
                <div className="skills">
                  {skills.join(' | ')}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="section-container">
            <section className="section">
              <h3>PROJECTS</h3>
              <div className="section-content">
                {projects.map((project, index) => (
                  <div key={index} className="item">
                    <div className="item-header">
                      <strong>{project.name}</strong>
                      {project.link && (
                        <span className="project-link">{project.link.replace('https://', '')}</span>
                      )}
                    </div>
                    {project.description && (
                      <p className="item-description">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
