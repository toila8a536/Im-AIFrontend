import { useState } from 'react';

const WORKER_URL = 'https://your-worker-name.your-subdomain.workers.dev/compile';

function CodeEditor({ exercise, onCompile }) {
  const [code, setCode] = useState(exercise?.template || '');
  const [inputValue, setInputValue] = useState(exercise?.input || '');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset when exercise changes
  useState(() => {
    if (exercise) {
      setCode(exercise.template);
      setInputValue(exercise.input || '');
      setResult(null);
    }
  });

  const handleCompile = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          input: inputValue,
          language: 'cpp'
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult({
          success: false,
          output: '',
          error: data.error
        });
      } else if (data.stderr && data.stderr.trim() !== '') {
        setResult({
          success: false,
          output: data.stdout || '',
          error: data.stderr
        });
      } else {
        setResult({
          success: true,
          output: data.stdout || '(No output)',
          error: ''
        });
      }
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: `Connection error: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!exercise) {
    return null;
  }

  return (
    <div className="exercise-section">
      <h3>💻 Bài tập thực hành</h3>
      
      <div className="exercise-card">
        <div className="exercise-title">{exercise.title}</div>
        <div className="exercise-description">{exercise.description}</div>
        
        {exercise.note && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'rgba(224, 175, 104, 0.1)', 
            borderLeft: '3px solid var(--warning-color)',
            marginBottom: '15px',
            fontSize: '0.9rem',
            color: 'var(--warning-color)'
          }}>
            ⚠️ {exercise.note}
          </div>
        )}

        <div className="code-editor-container">
          <label className="editor-label">Source Code (C++)</label>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="input-section">
          <label className="input-label">Input (Dữ liệu đầu vào - nếu có)</label>
          <textarea
            className="input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows="3"
            placeholder="Nhập dữ liệu đầu vào cho chương trình..."
          />
        </div>

        <button 
          className="compile-btn" 
          onClick={handleCompile}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Đang compile...
            </>
          ) : (
            <>
              ▶️ Compile & Run
            </>
          )}
        </button>

        {result && (
          <div className="result-section">
            <div className="result-header">
              <span className="result-title">Kết quả:</span>
              <span className={`result-status ${result.success ? 'success' : 'error'}`}>
                {result.success ? '✓ Success' : '✗ Error'}
              </span>
            </div>
            
            {result.output && (
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Output:</strong>
                <pre className="result-output">{result.output}</pre>
              </div>
            )}
            
            {result.error && (
              <div>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Error:</strong>
                <pre className="result-error">{result.error}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
