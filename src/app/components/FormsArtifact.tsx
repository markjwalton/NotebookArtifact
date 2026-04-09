import { useState } from 'react';

// Field types supported by FormsArtifact
type FieldType = 'text' | 'textarea' | 'select' | 'checklist' | 'file' | 'rating';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  aiEnhance?: boolean;
}

interface FormSchema {
  id: string;
  title: string;
  fields: FormField[];
}

interface FormsArtifactProps {
  schema: FormSchema;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function FormsArtifact({ schema, onSubmit, onCancel, submitLabel = 'Submit' }: FormsArtifactProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [enhancing, setEnhancing] = useState<string | null>(null);

  const setValue = (id: string, value: unknown) => {
    setValues(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    schema.fields.forEach(field => {
      if (field.required && !values[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(values);
  };

  const handleAiEnhance = async (fieldId: string) => {
    setEnhancing(fieldId);
    await new Promise(r => setTimeout(r, 1200));
    const current = values[fieldId] as string || '';
    setValue(fieldId, current.trim() + ' [AI enhanced — clearer and more specific]');
    setEnhancing(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {schema.fields.map(field => (
        <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--nb-text-muted)' }}>
            {field.label}{field.required && <span style={{ color: 'var(--nb-coral)', marginLeft: 2 }}>*</span>}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              value={(values[field.id] as string) || ''}
              onChange={e => setValue(field.id, e.target.value)}
              placeholder={field.placeholder}
              style={{ background: 'var(--nb-bg2)', border: `1px solid ${errors[field.id] ? 'var(--nb-coral)' : 'var(--nb-border)'}`, borderRadius: 8, padding: '8px 12px', color: 'var(--nb-text)', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
          )}

          {field.type === 'textarea' && (
            <div style={{ position: 'relative' }}>
              <textarea
                value={(values[field.id] as string) || ''}
                onChange={e => setValue(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                style={{ background: 'var(--nb-bg2)', border: `1px solid ${errors[field.id] ? 'var(--nb-coral)' : 'var(--nb-border)'}`, borderRadius: 8, padding: '8px 12px', color: 'var(--nb-text)', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
              />
              {field.aiEnhance && (
                <button
                  onClick={() => handleAiEnhance(field.id)}
                  disabled={enhancing === field.id}
                  style={{ position: 'absolute', bottom: 8, right: 8, background: 'var(--nb-accent-dim)', border: '1px solid var(--nb-accent)', borderRadius: 6, padding: '3px 10px', color: 'var(--nb-accent)', fontSize: 11, cursor: 'pointer', fontWeight: 500 }}
                >
                  {enhancing === field.id ? 'Enhancing...' : '✦ AI Enhance'}
                </button>
              )}
            </div>
          )}

          {field.type === 'select' && (
            <select
              value={(values[field.id] as string) || ''}
              onChange={e => setValue(field.id, e.target.value)}
              style={{ background: 'var(--nb-bg2)', border: `1px solid ${errors[field.id] ? 'var(--nb-coral)' : 'var(--nb-border)'}`, borderRadius: 8, padding: '8px 12px', color: (values[field.id]) ? 'var(--nb-text)' : 'var(--nb-text-muted)', fontSize: 14, outline: 'none', width: '100%', appearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select {field.label}...</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value} style={{ background: 'var(--nb-bg2)' }}>{opt.label}</option>
              ))}
            </select>
          )}

          {errors[field.id] && (
            <span style={{ fontSize: 11, color: 'var(--nb-coral)' }}>{errors[field.id]}</span>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button
          onClick={handleSubmit}
          style={{ flex: 1, background: 'var(--nb-accent)', border: 'none', borderRadius: 8, padding: '10px 0', color: 'var(--nb-bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            style={{ flex: 1, background: 'transparent', border: '1px solid var(--nb-border)', borderRadius: 8, padding: '10px 0', color: 'var(--nb-text-muted)', fontSize: 14, cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// Issue form schema — used by NotebookArtifact
export const issueFormSchema: FormSchema = {
  id: 'issue-form',
  title: 'Log Issue',
  fields: [
    { id: 'title', type: 'text', label: 'Title', placeholder: 'Brief description of the issue', required: true },
    { id: 'type', type: 'select', label: 'Type', required: true, options: [
      { value: 'Bug', label: '🐛 Bug' },
      { value: 'Change', label: '🔄 Change Request' },
      { value: 'Question', label: '❓ Question' },
      { value: 'New Feature', label: '✨ New Feature' },
      { value: 'Action', label: '⚡ Action' },
    ]},
    { id: 'severity', type: 'select', label: 'Severity', required: true, options: [
      { value: 'Critical', label: '🔴 Critical' },
      { value: 'High', label: '🟠 High' },
      { value: 'Medium', label: '🟡 Medium' },
      { value: 'Low', label: '🟢 Low' },
    ]},
    { id: 'description', type: 'textarea', label: 'Description', placeholder: 'Describe the issue in detail...', required: true, aiEnhance: true },
  ],
};
