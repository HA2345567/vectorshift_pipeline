// llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Sparkles } from 'lucide-react';

export const LLMNode = ({ id, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100/3}%` }, label: 'system' },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200/3}%` }, label: 'prompt' },
    { type: 'source', position: Position.Right, id: `${id}-response`, label: 'response' }
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={Sparkles}
      handles={handles}
      selected={selected}
      colorTheme="purple"
    >
      <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', lineHeight: '1.4' }}>
        Executes a LLM completion with system & prompt instructions.
      </div>
    </BaseNode>
  );
}
