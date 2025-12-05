import React from 'react';
import Input from '../UI/Input.js';
import Button from '../UI/Button.js';
import './FormSection.css';

const Summary = ({ data, onChange, onGenerateSummary }) => {
  const sampleSummaries = [
    "Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean code, mentoring junior developers, and creating user-centric solutions that drive business growth.",
    "Results-driven project manager with expertise in agile methodologies. Successfully delivered 50+ projects on time and under budget while improving team productivity by 30%.",
    "Creative UI/UX designer with a keen eye for detail and user experience. Specialized in creating intuitive interfaces that enhance user engagement and satisfaction."
  ];

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>📝 Professional Summary</h2>
        <p className="section-subtitle">Write a compelling overview of your professional background</p>
      </div>

      <div className="action-buttons">
        <Button onClick={onGenerateSummary} variant="outline">
          🪄 Generate Summary
        </Button>
      </div>

      <Input
        label="Professional Summary"
        type="textarea"
        value={data.summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your professional background, key skills, and career achievements..."
        rows={8}
        fullWidth
        helperText="3-5 sentences that highlight your most relevant experience and skills"
      />

      <div className="word-count">
        Words: {data.summary ? data.summary.split(/\s+/).filter(word => word.length > 0).length : 0}
      </div>

      <div className="examples-section">
        <h4>💡 Example Summaries</h4>
        <div className="examples-grid">
          {sampleSummaries.map((example, index) => (
            <div 
              key={index}
              className="example-card"
              onClick={() => onChange(example)}
            >
              <p>{example}</p>
              <button className="use-example-btn">Use this</button>
            </div>
          ))}
        </div>
      </div>

      <div className="tips-card">
        <h4>🎯 Writing Tips</h4>
        <ul>
          <li>Start with your years of experience and specialization</li>
          <li>Highlight 2-3 key achievements or skills</li>
          <li>Use industry-specific keywords</li>
          <li>Keep it concise (50-200 words)</li>
          <li>Focus on what you can offer employers</li>
        </ul>
      </div>
    </div>
  );
};

export default Summary;