// scriptNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Code } from 'lucide-react';
import { useStore } from '../store';

export const ScriptNode = ({ id, data, selected }) => {
  const [language, setLanguage] = useState(data?.language || 'JavaScript');
  const [code, setCode] = useState(data?.code || 'return input * 2;');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleLanguageChange = (e) => {
    const val = e.target.value;
    setLanguage(val);
    updateNodeField(id, 'language', val);
  };

  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    updateNodeField(id, 'code', val);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input`, label: 'input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      title="Code Script"
      icon={Code}
      handles={handles}
      selected={selected}
      colorTheme="pink"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="node-label">
          <span>Language</span>
          <select value={language} onChange={handleLanguageChange} className="node-select">
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </label>
        <label className="node-label">
          <span>Script Code</span>
          <textarea
            value={code} 
            onChange={handleCodeChange}
            rows={2}
            className="node-input"
            style={{ resize: 'vertical', fontFamily: 'monospace' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
