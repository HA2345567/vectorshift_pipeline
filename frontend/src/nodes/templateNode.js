// templateNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ClipboardList } from 'lucide-react';
import { useStore } from '../store';

export const TemplateNode = ({ id, data, selected }) => {
  const [template, setTemplate] = useState(data?.template || 'Hello {{name}}!');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTemplateChange = (e) => {
    const value = e.target.value;
    setTemplate(value);
    updateNodeField(id, 'template', value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-vars`, label: 'variables' },
    { type: 'source', position: Position.Right, id: `${id}-formatted`, label: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      title="Prompt Template"
      icon={ClipboardList}
      handles={handles}
      selected={selected}
      colorTheme="indigo"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>
          Formats string with variables.
        </div>
        <label className="node-label">
          <span>Template</span>
          <textarea
            value={template}
            onChange={handleTemplateChange}
            rows={2}
            className="node-input"
            style={{ resize: 'vertical', fontFamily: 'monospace' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
