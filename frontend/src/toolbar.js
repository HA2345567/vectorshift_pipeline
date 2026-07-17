// toolbar.js
import { DraggableNode } from './draggableNode';
import {
  Download,
  Sparkles,
  Upload,
  FileText,
  Clock,
  ClipboardList,
  Database,
  Split,
  Code
} from 'lucide-react';

export const PipelineToolbar = () => {
  return (
    <div style={{
      padding: '18px 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--colors-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      zIndex: 10,
      position: 'relative',
      boxShadow: '0 1px 3px rgba(0,0,0,0.01)'
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 300,
          color: 'var(--colors-ink)',
          margin: 0,
          fontFamily: "'EB Garamond', 'Times New Roman', serif",
          letterSpacing: '-0.6px',
        }}>
          VectorShift Pipeline Editor
        </h1>
        <span style={{
          fontSize: '12px',
          color: 'var(--colors-muted)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.15px'
        }}>
          Drag elements to construct your workspace workflow.
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="toolbar-nodes-list">
        <DraggableNode type='customInput' label='Input' icon={Download} />
        <DraggableNode type='llm' label='LLM' icon={Sparkles} />
        <DraggableNode type='customOutput' label='Output' icon={Upload} />
        <DraggableNode type='text' label='Text' icon={FileText} />
        <DraggableNode type='delay' label='Delay' icon={Clock} />
        <DraggableNode type='promptTemplate' label='Template' icon={ClipboardList} />
        <DraggableNode type='database' label='Database' icon={Database} />
        <DraggableNode type='condition' label='Conditional' icon={Split} />
        <DraggableNode type='script' label='Code Script' icon={Code} />
      </div>
    </div>
  );
};
