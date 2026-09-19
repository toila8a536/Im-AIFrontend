import { useState, useEffect } from 'react';

// Replace this with your actual Cloudflare Worker URL after deployment
const WORKER_URL = 'https://cpp-compiler.YOUR-SUBDOMAIN.workers.dev/compile';

function CodeEditor({ exercise, onCompile }) {
  const [code, setCode] = useState(exercise?.template || '');
  const [inputValue, setInputValue] = useState(exercise?.input || '');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset when exercise changes
  useEffect(() => {
    if (exercise) {
      setCode(exercise.template);
      setInputValue(exercise.input || '');
      setResult(null);
    }
  }, [exercise]);

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
        }),
      });

      const data = await response.json();

      // Handle API response from OnlineCompiler
      if (data.error) {
        // Compilation or runtime error
        setResult({
          success: false,
          output: data.output || '',
          error: data.error,
          exit_code: data.exit_code,
          time: data.time,
          memory: data.memory
        });
      } else if (data.status === 'error' || data.exit_code !== 0) {
        // Runtime error or non-zero exit code
        setResult({
          success: false,
          output: data.output || '',
          error: data.error || `Exit code: ${data.exit_code}`,
          exit_code: data.exit_code,
          time: data.time,
          memory: data.memory
        });
      } else {
        // Success
        setResult({
          success: true,
          output: data.output || '(No output)',
          error: '',
          exit_code: data.exit_code,
          time: data.time,
          memory: data.memory
        });
      }
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: `Connection error: ${error.message}. Make sure your Worker URL is correct.`,
        exit_code: null,
        time: null,
        memory: null
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
            placeholder="// Viết code C++ của bạn vào đây..."
          />
        </div>

        <div className="input-section">
          <label className="input-label">Input (Dữ liệu đầu vào - nếu có)</label>
          <textarea
            className="input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows="3"
            placeholder="Nhập dữ liệu đầu vào cho chương trình (stdin)..."
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
            
            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginBottom: '15px', 
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              {result.time && (
                <span>⏱ Time: {result.time}s</span>
              )}
              {result.memory && (
                <span>💾 Memory: {result.memory} KB</span>
              )}
              {result.exit_code !== null && result.exit_code !== undefined && (
                <span>Exit Code: {result.exit_code}</span>
              )}
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
