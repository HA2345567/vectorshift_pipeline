// databaseNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data, selected }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'Postgres');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10;');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDbTypeChange = (e) => {
    const value = e.target.value;
    setDbType(value);
    updateNodeField(id, 'dbType', value);
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    updateNodeField(id, 'query', value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-params`, label: 'params' },
    { type: 'source', position: Position.Right, id: `${id}-results`, label: 'results' }
  ];

  return (
    <BaseNode
      id={id}
      title="Database Query"
      icon={Database}
      handles={handles}
      selected={selected}
      colorTheme="blue"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="node-label">
          <span>Database Type</span>
          <select value={dbType} onChange={handleDbTypeChange} className="node-select">
            <option value="Postgres">Postgres</option>
            <option value="MySQL">MySQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </label>
        <label className="node-label">
          <span>Query</span>
          <textarea
            value={query} 
            onChange={handleQueryChange}
            rows={2}
            className="node-input"
            style={{ resize: 'vertical', fontFamily: 'monospace' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
