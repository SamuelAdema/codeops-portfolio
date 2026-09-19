import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function DishModal({ dish, onClose }) {
  const previousFocusRef = useRef(document.activeElement);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current) previousFocusRef.current.focus();
    };
  }, [onClose]);

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div role="dialog" aria-modal="true" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <h2>{dish.name}</h2>
        <p>Prepared with authentic Ethiopian spices.</p>
        <button onClick={onClose} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Close (Esc)</button>
      </div>
    </div>,
    document.body
  );
}