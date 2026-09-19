import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentViewer from './components/ContentViewer';
import CodeEditor from './components/CodeEditor';
import contentData from './data/content.json';
import './styles/dark-theme.css';

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeExercise, setActiveExercise] = useState(null);
  const [currentSection, setCurrentSection] = useState(contentData.sections[0]);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    window.contentData = contentData;
  }, []);

  const handleNavigate = (sectionId, exerciseId) => {
    setActiveSection(sectionId);
    setActiveExercise(exerciseId);
    
    const section = contentData.sections.find(s => s.id === sectionId);
    setCurrentSection(section);
    
    if (exerciseId && section?.exercises) {
      const exercise = section.exercises.find(e => e.id === exerciseId);
      setCurrentExercise(exercise);
    } else {
      setCurrentExercise(null);
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeSection={activeSection}
        activeExercise={activeExercise}
        onNavigate={handleNavigate}
      />
      
      <ContentViewer 
        section={currentSection}
        exercise={currentExercise}
        onNavigate={handleNavigate}
      />
      
      {currentExercise && (
        <div style={{ marginLeft: '280px', padding: '0 30px 30px' }}>
          <CodeEditor 
            exercise={currentExercise}
          />
        </div>
      )}
    </div>
  );
}

export default App;
