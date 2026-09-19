import { useState, useRef } from 'react';
import { useCartStore } from '../store/useCartStore';

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (form.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long.';
  }

  const phoneRegex = /^(09|07)\d{8}$/;
  if (!form.phone.trim()) {
    errors.phone = 'TeleBirr phone number is required.';
  } else if (!phoneRegex.test(form.phone.trim())) {
    errors.phone = 'Enter a valid TeleBirr number (e.g., 0912345678).';
  }

  if (!form.area.trim()) {
    errors.area = 'Delivery area is required.';
  }

  return errors;
}

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({ name: '', phone: '', area: '', notes: '' });
  const [touched, setTouched] = useState({ name: false, phone: false, area: false, notes: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
  };

  const errors = validate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, area: true, notes: true });

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      const firstInvalidField = Object.keys(currentErrors)[0];
      if (inputRefs[firstInvalidField]?.current) {
        inputRefs[firstInvalidField].current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.phone.endsWith('0000')) {
            reject(new Error('Network gateway timeout. Please try again.'));
          } else {
            resolve({ success: true });
          }
        }, 1500);
      });

      setSuccessMessage('Order placed successfully via TeleBirr!');
      clearCart();
      setForm({ name: '', phone: '', area: '', notes: '' });
      setTouched({ name: false, phone: false, area: false, notes: false });
    } catch (err) {
      setSubmitError(err.message);
      if (inputRefs.name?.current) {
        inputRefs.name.current.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', marginTop: '2rem' }}>
      <h2>Checkout Form</h2>

      {successMessage && <div style={{ background: '#e6f4ea', color: '#137333', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>{successMessage}</div>}
      {submitError && <div role="alert" style={{ background: '#fce8e6', color: '#c5221f', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}><strong>Error:</strong> {submitError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>Full Name *</label>
          <input
            ref={inputRefs.name}
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
          {touched.name && errors.name && <span id="name-error" role="alert" style={{ color: '#c5221f', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>TeleBirr Phone Number *</label>
          <input
            ref={inputRefs.phone}
            id="phone"
            name="phone"
            type="tel"
            placeholder="0912345678"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && Boolean(errors.phone)}
            aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
          {touched.phone && errors.phone && <span id="phone-error" role="alert" style={{ color: '#c5221f', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>{errors.phone}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="area" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>Delivery Area *</label>
          <input
            ref={inputRefs.area}
            id="area"
            name="area"
            type="text"
            placeholder="e.g., Bole, Kazanchis"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && Boolean(errors.area)}
            aria-describedby={touched.area && errors.area ? 'area-error' : undefined}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
          {touched.area && errors.area && <span id="area-error" role="alert" style={{ color: '#c5221f', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>{errors.area}</span>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="notes" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>Delivery Notes (Optional)</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} onBlur={handleBlur} rows="3" style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          style={{ width: '100%', padding: '0.75rem', background: isSubmitting || items.length === 0 ? '#ccc' : '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isSubmitting || items.length === 0 ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'Processing Order...' : `Pay ${cartTotal} ETB via TeleBirr`}
        </button>
      </form>
    </div>
  );
}