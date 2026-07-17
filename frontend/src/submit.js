// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { CheckCircle2, AlertTriangle, X, Play, Loader2 } from 'lucide-react';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const mappedNodes = nodes.map(n => ({
        id: n.id,
        type: n.type,
        data: n.data || {}
      }));

      const mappedEdges = edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target
      }));

      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes: mappedNodes, edges: mappedEdges }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setShowModal(true);
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend server.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Submit Button Footer Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--colors-hairline)',
        zIndex: 10,
        height: '64px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: 'var(--colors-ink)', // primary-action near-black ink pill
            color: 'var(--colors-on-primary)',
            border: 'none',
            borderRadius: '9999px', // rounded.pill
            padding: '10px 28px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: loading ? 0.8 : 1,
            pointerEvents: loading ? 'none' : 'auto',
            fontFamily: "'Inter', sans-serif"
          }}
          className="submit-btn"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Parsing pipeline...
            </>
          ) : (
            <>
              <Play size={13} fill="currentColor" />
              Analyze Pipeline
            </>
          )}
        </button>
      </div>

      {/* Modern Pop-up Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(12, 10, 9, 0.35)', // ink overlay
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div style={{
            background: 'var(--colors-surface-card)',
            border: '1px solid var(--colors-hairline)',
            borderRadius: '16px', // rounded.xl
            width: '90%',
            maxWidth: '380px',
            padding: '28px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
            color: 'var(--colors-ink)',
            position: 'relative',
            animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                color: 'var(--colors-muted-soft)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--colors-ink)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--colors-muted-soft)'}
            >
              <X size={18} />
            </button>

            {error ? (
              // Error Layout
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--colors-error)' }}>
                  <AlertTriangle size={22} />
                  <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 400,
                    fontFamily: "'EB Garamond', serif",
                    letterSpacing: '-0.3px'
                  }}>
                    Connection Error
                  </h3>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--colors-body)', lineHeight: '1.5', marginBottom: '24px' }}>
                  {error}. Please verify the FastAPI server is running at `http://localhost:8000`.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--colors-surface-strong)',
                    color: 'var(--colors-ink)',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 0',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Dismiss
                </button>
              </div>
            ) : (
              // Success Layout
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: 400,
                    fontFamily: "'EB Garamond', serif",
                    letterSpacing: '-0.4px',
                    color: 'var(--colors-ink)'
                  }}>
                    Pipeline Analysis
                  </h3>
                </div>

                {/* Metric Cards Row */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    flex: 1,
                    background: 'var(--colors-canvas-soft)',
                    border: '1px solid var(--colors-hairline-soft)',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: '9px', color: 'var(--colors-muted)', textTransform: 'uppercase', letterSpacing: '0.96px', fontWeight: 600 }}>Nodes</span>
                    <div style={{ fontSize: '26px', fontWeight: 300, fontFamily: "'EB Garamond', serif", marginTop: '4px', color: 'var(--colors-ink)' }}>
                      {response?.num_nodes}
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    background: 'var(--colors-canvas-soft)',
                    border: '1px solid var(--colors-hairline-soft)',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: '9px', color: 'var(--colors-muted)', textTransform: 'uppercase', letterSpacing: '0.96px', fontWeight: 600 }}>Edges</span>
                    <div style={{ fontSize: '26px', fontWeight: 300, fontFamily: "'EB Garamond', serif", marginTop: '4px', color: 'var(--colors-ink)' }}>
                      {response?.num_edges}
                    </div>
                  </div>
                </div>

                {/* DAG Status Box */}
                <div style={{
                  background: response?.is_dag ? 'rgba(22, 163, 74, 0.05)' : 'rgba(220, 38, 38, 0.05)',
                  border: response?.is_dag ? '1px solid rgba(22, 163, 74, 0.15)' : '1px solid rgba(220, 38, 38, 0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '24px',
                }}>
                  {response?.is_dag ? (
                    <CheckCircle2 size={20} color="var(--colors-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <AlertTriangle size={20} color="var(--colors-error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <div>
                    <h4 style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 600,
                      color: response?.is_dag ? 'var(--colors-success)' : 'var(--colors-error)'
                    }}>
                      {response?.is_dag ? 'Directed Acyclic Graph (DAG)' : 'Contains Loop Cycles'}
                    </h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--colors-muted)', lineHeight: '1.45' }}>
                      {response?.is_dag
                        ? 'No cycle loops detected. Ready to execute.'
                        : 'Loops detected. Cyclic workflows cannot be scheduled.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    width: '100%',
                    background: 'var(--colors-ink)',
                    color: 'var(--colors-on-primary)',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 0',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'opacity 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline styles for modal animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .submit-btn:hover {
          background-color: var(--colors-ink-primary-active) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
        }
        .submit-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};
