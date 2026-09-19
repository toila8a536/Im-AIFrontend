import { useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

function ContentViewer({ section, exercise, onNavigate }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [section, exercise]);

  if (!section) return null;

  const currentIndex = section ? 
    window.contentData?.sections.findIndex(s => s.id === section.id) : -1;
  const prevSection = currentIndex > 0 ? window.contentData?.sections[currentIndex - 1] : null;
  const nextSection = currentIndex < (window.contentData?.sections.length || 0) - 1 ? 
    window.contentData?.sections[currentIndex + 1] : null;

  return (
    <main className="main-content">
      <div className="content-header">
        <div className="breadcrumb">
          Home / {section.title}
        </div>
        <h2>{section.title}</h2>
      </div>

      <div className="markdown-content">
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <pre className={className}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {section.content}
        </Markdown>
      </div>

      {/* Exercise Section */}
      {exercise && (
        <div id="exercise-area">
          {/* CodeEditor will be rendered here by App */}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className={`nav-btn ${!prevSection ? 'disabled' : ''}`}
          onClick={() => prevSection && onNavigate(prevSection.id, null)}
          disabled={!prevSection}
        >
          ← {prevSection ? prevSection.title : 'No previous'}
        </button>
        
        <button
          className={`nav-btn ${!nextSection ? 'disabled' : ''}`}
          onClick={() => nextSection && onNavigate(nextSection.id, null)}
          disabled={!nextSection}
        >
          {nextSection ? nextSection.title : 'No next'} →
        </button>
      </div>
    </main>
  );
}

export default ContentViewer;
