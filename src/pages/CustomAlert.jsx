import React, { useEffect } from 'react';

/**
 * CustomAlert — replaces browser alert() with a beautiful modal.
 *
 * Props:
 *  - isOpen       {boolean}   show/hide the modal
 *  - type         {string}    'success' | 'error' | 'warning' | 'info'
 *  - title        {string}    bold heading text
 *  - message      {string}    subtitle / body text
 *  - onClose      {function}  called when OK is clicked
 *  - onConfirm    {function}  (optional) if provided, shows Cancel + Confirm buttons
 *  - confirmText  {string}    (optional) label for confirm button, default 'OK'
 *  - cancelText   {string}    (optional) label for cancel button, default 'Cancel'
 */
export default function CustomAlert({
  isOpen,
  type = 'success',
  title = '',
  message = '',
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const icons = {
    success: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52px', height: '52px' }}>
        <circle cx="26" cy="26" r="25" stroke="#22c55e" strokeWidth="2" fill="none" />
        <path d="M14 26l9 9 15-15" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52px', height: '52px' }}>
        <circle cx="26" cy="26" r="25" stroke="#ef4444" strokeWidth="2" fill="none" />
        <path d="M17 17l18 18M35 17L17 35" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52px', height: '52px' }}>
        <circle cx="26" cy="26" r="25" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <path d="M26 16v12" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="26" cy="35" r="1.5" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '52px', height: '52px' }}>
        <circle cx="26" cy="26" r="25" stroke="#3b82f6" strokeWidth="2" fill="none" />
        <path d="M26 24v12" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="26" cy="18" r="1.5" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1" />
      </svg>
    ),
  };

  const confirmColors = {
    success: '#3b82f6',
    error:   '#ef4444',
    warning: '#f59e0b',
    info:    '#3b82f6',
  };

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.15s ease',
      }}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '1.25rem',
          padding: '2.5rem 2rem 2rem',
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.75rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.2s ease',
        }}
      >
        {/* Icon */}
        <div style={{ marginBottom: '0.5rem' }}>
          {icons[type] || icons.success}
        </div>

        {/* Title */}
        {title && (
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {title}
          </h2>
        )}

        {/* Message */}
        {message && (
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
            lineHeight: 1.5,
          }}>
            {message}
          </p>
        )}

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1rem',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
          {onConfirm && (
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                background: '#fff',
                color: '#374151',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm ? onConfirm : onClose}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: confirmColors[type] || '#3b82f6',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              minWidth: '4rem',
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
