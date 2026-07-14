// delayNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Clock } from 'lucide-react';
import { useStore } from '../store';

export const DelayNode = ({ id, data, selected }) => {
  const [delay, setDelay] = useState(data?.delay || 5);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDelayChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDelay(value);
    updateNodeField(id, 'delay', value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input`, label: 'input' },
    { type: 'source', position: Position.Right, id: `${id}-output`, label: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon={Clock}
      handles={handles}
      selected={selected}
      colorTheme="teal"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>
          Pauses execution workflow.
        </div>
        <label className="node-label">
          <span>Seconds</span>
          <input 
            type="number" 
            value={delay} 
            onChange={handleDelayChange}
            min="0"
            step="0.5"
            className="node-input"
          />
        </label>
      </div>
    </BaseNode>
  );
}
