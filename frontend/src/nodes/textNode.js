// textNode.js
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { FileText } from 'lucide-react';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Helper to extract variables wrapped in double curly braces, e.g. {{ variable_name }}
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!vars.includes(match[1])) {
        vars.push(match[1]);
      }
    }
    return vars;
  };

  // Sync state with Zustand store and parse variables
  useEffect(() => {
    updateNodeField(id, 'text', currText);
    const parsedVars = extractVariables(currText);
    setVariables(parsedVars);
  }, [currText, id, updateNodeField]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate dynamic dimensions
  const lines = currText.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length), 15);
  
  // Calculate dynamic width and height with boundary constraints
  const nodeWidth = Math.min(500, Math.max(220, maxLineLength * 7.5 + 32));
  const nodeHeight = Math.min(400, Math.max(90, lines.length * 19 + 75));

  // Output handle on the right
  const baseHandles = [
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  // Dynamic variable input handles on the left
  const variableHandles = variables.map((varName, index) => {
    const topPosition = `${(index + 1) * 100 / (variables.length + 1)}%`;
    return {
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { top: topPosition },
      label: varName
    };
  });

  const handles = [...baseHandles, ...variableHandles];

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={FileText}
      handles={handles}
      selected={selected}
      colorTheme="orange"
      style={{
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '6px' }}>
        <span style={{ color: '#777169', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
          Text Input (use `{"{{var}}"}` to create inputs)
        </span>
        <textarea 
          value={currText} 
          onChange={handleTextChange}
          style={{
            width: '100%',
            flexGrow: 1,
            background: '#fafafa',
            border: '1px solid #d6d3d1',
            borderRadius: '8px',
            color: '#0c0a09',
            fontSize: '11px',
            padding: '8px 10px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            lineHeight: '1.4',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#0c0a09';
            e.target.style.boxShadow = '0 0 0 1px #0c0a09';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d6d3d1';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </BaseNode>
  );
}
