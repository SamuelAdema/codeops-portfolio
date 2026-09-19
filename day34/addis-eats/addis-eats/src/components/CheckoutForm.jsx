import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters.';
  
  const phoneRegex = /^(09|07)\d{8}$/;
  if (!form.phone.trim()) errors.phone = 'TeleBirr phone number is required.';
  else if (!phoneRegex.test(form.phone.trim())) errors.phone = 'Enter a valid TeleBirr number.';
  
  if (!form.area.trim()) errors.area = 'Delivery area is required.';
  return errors;
}

export function CheckoutForm() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({ name: '', phone: '', area: '', notes: '' });
  const [touched, setTouched] = useState({ name: false, phone: false, area: false, notes: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const inputRefs = { name: useRef(null), phone: useRef(null), area: useRef(null) };
  const errors = validate(form);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, area: true, notes: true });

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      const firstInvalid = Object.keys(currentErrors)[0];
      if (inputRefs[firstInvalid]?.current) inputRefs[firstInvalid].current.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.phone.endsWith('0000')) reject(new Error('Network timeout. Please try again.'));
          else resolve();
        }, 1500);
      });
      
      clearCart();
      navigate('/receipt'); // Redirect to lazy-loaded receipt page on success
    } catch (err) {
      setSubmitError(err.message);
      if (inputRefs.name?.current) inputRefs.name.current.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
      <h2>Checkout</h2>
      {submitError && <div role="alert" style={{ background: '#fce8e6', color: '#c5221f', padding: '1rem', marginBottom: '1rem' }}>{submitError}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>Full Name *</label>
          <input ref={inputRefs.name} id="name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={touched.name && Boolean(errors.name)} aria-describedby={touched.name && errors.name ? 'name-error' : undefined} style={{ width: '100%', padding: '0.5rem' }} />
          {touched.name && errors.name && <span id="name-error" role="alert" style={{ color: '#c5221f' }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ display: 'block', fontWeight: 'bold' }}>TeleBirr Phone *</label>
          <input ref={inputRefs.phone} id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} aria-invalid={touched.phone && Boolean(errors.phone)} aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined} style={{ width: '100%', padding: '0.5rem' }} />
          {touched.phone && errors.phone && <span id="phone-error" role="alert" style={{ color: '#c5221f' }}>{errors.phone}</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="area" style={{ display: 'block', fontWeight: 'bold' }}>Delivery Area *</label>
          <input ref={inputRefs.area} id="area" name="area" type="text" value={form.area} onChange={handleChange} onBlur={handleBlur} aria-invalid={touched.area && Boolean(errors.area)} aria-describedby={touched.area && errors.area ? 'area-error' : undefined} style={{ width: '100%', padding: '0.5rem' }} />
          {touched.area && errors.area && <span id="area-error" role="alert" style={{ color: '#c5221f' }}>{errors.area}</span>}
        </div>
        <button type="submit" disabled={isSubmitting || items.length === 0} style={{ width: '100%', padding: '0.75rem', background: isSubmitting || items.length === 0 ? '#ccc' : '#1976d2', color: '#fff', border: 'none' }}>
          {isSubmitting ? 'Processing...' : `Pay ${cartTotal} ETB`}
        </button>
      </form>
    </div>
  );
}