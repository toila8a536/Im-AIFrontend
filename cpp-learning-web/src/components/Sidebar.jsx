import { useState, useEffect } from 'react';
import contentData from '../data/content.json';

function Sidebar({ activeSection, activeExercise, onNavigate }) {
  const [expandedSections, setExpandedSections] = useState(['intro']);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>📚 Học C++</h1>
      </div>
      <ul className="nav-menu">
        {contentData.sections.map((section) => (
          <li key={section.id} className="nav-item">
            <a
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(section.id, null);
                if (!expandedSections.includes(section.id)) {
                  toggleSection(section.id);
                }
              }}
            >
              {section.title}
            </a>
            {section.exercises && section.exercises.length > 0 && (
              <ul className="nav-submenu">
                {section.exercises.map((exercise) => (
                  <li key={exercise.id} className="nav-subitem">
                    <a
                      className={`nav-sublink ${activeExercise === exercise.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(section.id, exercise.id);
                        if (!expandedSections.includes(section.id)) {
                          toggleSection(section.id);
                        }
                      }}
                    >
                      💻 {exercise.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
