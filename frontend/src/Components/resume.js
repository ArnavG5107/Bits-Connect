import React, { useState } from 'react';
import '../Resume.css';

const Resume = () => {
  console.log("✅ Resume Component Loaded Successfully!");

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ 
    position: '', 
    company: '', 
    location: '', 
    startDate: '', 
    endDate: '', 
    isCurrentPosition: false,
    description: '' 
  });
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startYear: '', endYear: '', activities: '' });
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [contact, setContact] = useState({ email: '', phone: '', location: '' });
  
  // Updated skills state management
  const [skillsList, setSkillsList] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillForm, setShowSkillForm] = useState(false);
  
  // Updated tools state management
  const [toolsList, setToolsList] = useState([]);
  const [newTool, setNewTool] = useState('');
  const [showToolForm, setShowToolForm] = useState(false);
  
  // Updated languages state management
  const [languagesList, setLanguagesList] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  
  // Added missing social state and toggle function
  const [social, setSocial] = useState({ linkedin: '', github: '', website: '' });
  const [showSocialForm, setShowSocialForm] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewExperience({ ...newExperience, [e.target.name]: value });
  };

  const handleEducationChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Added missing social change handler
  const handleSocialChange = (e) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    if (!date) return '';
    // Format: "Mon YYYY"
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  };

  const getDuration = (startDate, endDate, isCurrentPosition) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = isCurrentPosition ? new Date() : new Date(endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} mos`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} yr${years > 1 ? 's' : ''}`;
      } else {
        return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mos`;
      }
    }
  };

  const addExperience = () => {
    if (newExperience.position && newExperience.company) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ 
        position: '', 
        company: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        isCurrentPosition: false,
        description: '' 
      });
      setShowExperienceForm(false);
    }
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setEducations([...educations, newEducation]);
      setNewEducation({ institution: '', degree: '', startYear: '', endYear: '', activities: '' });
      setShowEducationForm(false);
    }
  };

  // Add skill function
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill('');
      setShowSkillForm(false);
    }
  };

  // Add tool function
  const addTool = () => {
    if (newTool.trim()) {
      setToolsList([...toolsList, newTool.trim()]);
      setNewTool('');
      setShowToolForm(false);
    }
  };

  // Add language function
  const addLanguage = () => {
    if (newLanguage.trim()) {
      setLanguagesList([...languagesList, newLanguage.trim()]);
      setNewLanguage('');
      setShowLanguageForm(false);
    }
  };

  const verticalStyle = {
    position: 'fixed',
    right: '-40px',
    top: '40%', // Moved up to avoid footer
    transform: 'rotate(90deg)',
    fontSize: '90px',
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 1000, // Lower z-index so it won't overlap important elements
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    letterSpacing: '5px',
    pointerEvents: 'none' // Ensures it doesn't interfere with clicking elements
  };


  const toggleExperienceForm = () => {
    setShowExperienceForm(!showExperienceForm);
  };

  const toggleEducationForm = () => {
    setShowEducationForm(!showEducationForm);
  };

  // Toggle skill form
  const toggleSkillForm = () => {
    setShowSkillForm(!showSkillForm);
  };

  // Toggle tool form
  const toggleToolForm = () => {
    setShowToolForm(!showToolForm);
  };

  // Toggle language form
  const toggleLanguageForm = () => {
    setShowLanguageForm(!showLanguageForm);
  };

  // Added missing social form toggle
  const toggleSocialForm = () => {
    setShowSocialForm(!showSocialForm);
  };

  const editExperience = (index) => {
    setNewExperience(experiences[index]);
    setShowExperienceForm(true);
    // Remove the experience that's being edited
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const editEducation = (index) => {
    setNewEducation(educations[index]);
    setShowEducationForm(true);
    // Remove the education that's being edited
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  // Edit skill function
  const editSkill = (index) => {
    setNewSkill(skillsList[index]);
    setShowSkillForm(true);
    // Remove the skill that's being edited
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedSkills);
  };

  // Edit tool function
  const editTool = (index) => {
    setNewTool(toolsList[index]);
    setShowToolForm(true);
    // Remove the tool that's being edited
    const updatedTools = toolsList.filter((_, i) => i !== index);
    setToolsList(updatedTools);
  };

  // Edit language function
  const editLanguage = (index) => {
    setNewLanguage(languagesList[index]);
    setShowLanguageForm(true);
    // Remove the language that's being edited
    const updatedLanguages = languagesList.filter((_, i) => i !== index);
    setLanguagesList(updatedLanguages);
  };

  // Delete skill function
  const deleteSkill = (index) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedSkills);
  };

  // Delete tool function
  const deleteTool = (index) => {
    const updatedTools = toolsList.filter((_, i) => i !== index);
    setToolsList(updatedTools);
  };

  // Delete language function
  const deleteLanguage = (index) => {
    const updatedLanguages = languagesList.filter((_, i) => i !== index);
    setLanguagesList(updatedLanguages);
  };


  return (
    
    <div className="resume-container">
      <div className="resume-header"></div>

      <div style={verticalStyle}>
      RESUME
    </div>

      <div className="resume-content">
        {/* Left Section */}
        <div className="resume-left">
          <div className="header-section">
            <h1>
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            </h1>
            <h2>
              <input type="text" placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </h2>
          </div>

          <div className="experience-section">
            <div className="section-header">
              <h2 className="section-title">Experience</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleExperienceForm}>+</button>
                {experiences.length > 0 && <button className="edit-button" onClick={() => editExperience(experiences.length - 1)}>✏️</button>}
              </div>
            </div>

            {experiences.map((job, index) => (
              <div className="job-card" key={index}>
                <div className="job-header">
                  <div className="company-logo">
                    {/* Placeholder for company logo */}
                    <div className="logo-placeholder"></div>
                  </div>
                  <div className="job-details">
                    <h3 className="position-title">{job.position}</h3>
                    <p className="company-name">{job.company}</p>
                    <p className="job-duration">
                      {formatDate(job.startDate)} - {job.isCurrentPosition ? 'Present' : formatDate(job.endDate)} · {getDuration(job.startDate, job.endDate, job.isCurrentPosition)}
                    </p>
                    <p className="job-location">{job.location}</p>
                    {job.description && <p className="job-description">{job.description}</p>}
                  </div>
                </div>
                <button className="edit-item-button" onClick={() => editExperience(index)}>Edit</button>
              </div>
            ))}

            {/* Experience Input Form */}
            {showExperienceForm && (
              <div className="experience-form">
                <h3>Add Experience</h3>
                <div className="form-group">
                  <label>Title*</label>
                  <input type="text" name="position" placeholder="Ex: Software engineer" value={newExperience.position} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Company*</label>
                  <input type="text" name="company" placeholder="Ex: Microsoft" value={newExperience.company} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" placeholder="Ex: Hyderabad" value={newExperience.location} onChange={handleChange} />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date*</label>
                    <input type="date" name="startDate" value={newExperience.startDate} onChange={handleChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>End Date</label>
                    <input 
                      type="date" 
                      name="endDate" 
                      value={newExperience.endDate} 
                      onChange={handleChange} 
                      disabled={newExperience.isCurrentPosition} 
                    />
                  </div>
                </div>

                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="isCurrentPosition" 
                    name="isCurrentPosition" 
                    checked={newExperience.isCurrentPosition} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="isCurrentPosition">I am currently working in this role</label>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description" 
                    placeholder="Describe your responsibilities and achievements" 
                    value={newExperience.description} 
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleExperienceForm}>Cancel</button>
                  <button className="save-button" onClick={addExperience}>Save</button>
                </div>
              </div>
            )}
          </div>

          <div className="education-section">
            <div className="section-header">
              <h2 className="section-title">Education</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleEducationForm}>+</button>
                {educations.length > 0 && <button className="edit-button" onClick={() => editEducation(educations.length - 1)}>✏️</button>}
              </div>
            </div>

            {educations.map((edu, index) => (
              <div className="education-card" key={index}>
                <div className="education-header">
                  <div className="institution-logo">
                    {/* Placeholder for institution logo */}
                    <div className="logo-placeholder"></div>
                  </div>
                  <div className="education-details">
                    <h3 className="institution-name">{edu.institution}</h3>
                    <p className="degree-name">{edu.degree}</p>
                    <p className="education-years">{edu.startYear} - {edu.endYear}</p>
                    {edu.activities && <p className="activities">Activities and societies: {edu.activities}</p>}
                  </div>
                </div>
                <button className="edit-item-button" onClick={() => editEducation(index)}>Edit</button>
              </div>
            ))}

            {/* Education Input Form */}
            {showEducationForm && (
              <div className="education-form">
                <h3>Add Education</h3>
                <div className="form-group">
                  <label>School*</label>
                  <input type="text" name="institution" placeholder="Ex: University of California" value={newEducation.institution} onChange={handleEducationChange} required />
                </div>
                
                <div className="form-group">
                  <label>Degree*</label>
                  <input type="text" name="degree" placeholder="Ex: Bachelor of Science, Computer Science" value={newEducation.degree} onChange={handleEducationChange} required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Year*</label>
                    <input type="text" name="startYear" placeholder="Ex: 2018" value={newEducation.startYear} onChange={handleEducationChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>End Year*</label>
                    <input type="text" name="endYear" placeholder="Ex: 2022" value={newEducation.endYear} onChange={handleEducationChange} required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Activities and Societies</label>
                  <textarea 
                    name="activities" 
                    placeholder="Ex: Student Council, Debate Team, Hackathons" 
                    value={newEducation.activities} 
                    onChange={handleEducationChange}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleEducationForm}>Cancel</button>
                  <button className="save-button" onClick={addEducation}>Save</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="resume-right">
          <div className="contact-section">
            <div className="section-header">
              <h2 className="section-title">Contact</h2>
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  value={contact.email} 
                  onChange={handleContactChange} 
                />
              </div>
              
              <div className="contact-item">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91" 
                  value={contact.phone} 
                  onChange={handleContactChange} 
                />
              </div>
              
              <div className="contact-item">
                <label>Location</label>
                <input 
                  type="text" 
                  name="location" 
                  placeholder="City, Country" 
                  value={contact.location} 
                  onChange={handleContactChange} 
                />
              </div>
            </div>
          </div>

          <div className="social-section">
            <div className="section-header">
              <h2 className="section-title">Social</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleSocialForm}>+</button>
              </div>
            </div>

            <div className="social-links">
              {social.linkedin && (
                <div className="social-item">
                  <span className="social-icon">LinkedIn</span>
                  <span className="social-value">{social.linkedin}</span>
                </div>
              )}
              
              {social.github && (
                <div className="social-item">
                  <span className="social-icon">GitHub</span>
                  <span className="social-value">{social.github}</span>
                </div>
              )}
              
              {social.website && (
                <div className="social-item">
                  <span className="social-icon">Website</span>
                  <span className="social-value">{social.website}</span>
                </div>
              )}
            </div>

            {/* Social Links Form */}
            {showSocialForm && (
              <div className="social-form">
                <h3>Add Social Links</h3>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input 
                    type="text" 
                    name="linkedin" 
                    placeholder="LinkedIn profile URL" 
                    value={social.linkedin} 
                    onChange={handleSocialChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label>GitHub</label>
                  <input 
                    type="text" 
                    name="github" 
                    placeholder="GitHub profile URL" 
                    value={social.github} 
                    onChange={handleSocialChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Personal Website</label>
                  <input 
                    type="text" 
                    name="website" 
                    placeholder="Website URL" 
                    value={social.website} 
                    onChange={handleSocialChange} 
                  />
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleSocialForm}>Cancel</button>
                  <button className="save-button" onClick={toggleSocialForm}>Save</button>
                </div>
              </div>
            )}
          </div>

          <div className="skills-section">
            <div className="section-header">
              <h2 className="section-title">Skills</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleSkillForm}>+</button>
              </div>
            </div>

            <div className="skills-list">
              {skillsList.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <span className="skill-name">{skill}</span>
                  <div className="skill-actions">
                    <button className="edit-button" onClick={() => editSkill(index)}>✏️</button>
                    <button className="delete-button" onClick={() => deleteSkill(index)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Input Form */}
            {showSkillForm && (
              <div className="skill-form">
                <h3>Add Skill</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Ex: JavaScript, Project Management, UX Design" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                  />
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleSkillForm}>Cancel</button>
                  <button className="save-button" onClick={addSkill}>Save</button>
                </div>
              </div>
            )}
          </div>

          <div className="tools-section">
            <div className="section-header">
              <h2 className="section-title">Tools</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleToolForm}>+</button>
              </div>
            </div>

            <div className="tools-list">
              {toolsList.map((tool, index) => (
                <div className="tool-item" key={index}>
                  <span className="tool-name">{tool}</span>
                  <div className="tool-actions">
                    <button className="edit-button" onClick={() => editTool(index)}>✏️</button>
                    <button className="delete-button" onClick={() => deleteTool(index)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tools Input Form */}
            {showToolForm && (
              <div className="tool-form">
                <h3>Add Tool</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Ex: Figma, VS Code, Adobe Photoshop" 
                    value={newTool} 
                    onChange={(e) => setNewTool(e.target.value)} 
                  />
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleToolForm}>Cancel</button>
                  <button className="save-button" onClick={addTool}>Save</button>
                </div>
              </div>
            )}
          </div>

          <div className="languages-section">
            <div className="section-header">
              <h2 className="section-title">Languages</h2>
              <div className="section-actions">
                <button className="add-button" onClick={toggleLanguageForm}>+</button>
              </div>
            </div>

            <div className="languages-list">
              {languagesList.map((language, index) => (
                <div className="language-item" key={index}>
                  <span className="language-name">{language}</span>
                  <div className="language-actions">
                    <button className="edit-button" onClick={() => editLanguage(index)}>✏️</button>
                    <button className="delete-button" onClick={() => deleteLanguage(index)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages Input Form */}
            {showLanguageForm && (
              <div className="language-form">
                <h3>Add Language</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Ex: English (Native), Spanish (Intermediate)" 
                    value={newLanguage} 
                    onChange={(e) => setNewLanguage(e.target.value)} 
                  />
                </div>
                
                <div className="form-actions">
                  <button className="cancel-button" onClick={toggleLanguageForm}>Cancel</button>
                  <button className="save-button" onClick={addLanguage}>Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
