import { useState } from 'react';

export default function OrderForm({ total }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validation: TeleBirr numbers typically start with 09 or 07 and are 10 digits long
  const isPhoneValid = /^0[79]\d{8}$/.test(formData.phone);
  const isFormValid = formData.name.trim() !== '' && formData.area.trim() !== '' && isPhoneValid && total > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order successful! \nName: ${formData.name}\nTotal: ${total} ETB\nPaid via TeleBirr`);
    // Reset form or total here if needed
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', borderTop: '2px solid #eee' }}>
      <h2>Checkout</h2>
      <p>Total to pay: <strong>{total} ETB</strong></p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        
        <input 
          type="text" 
          name="phone" 
          placeholder="TeleBirr Number (e.g. 09...)" 
          value={formData.phone} 
          onChange={handleChange} 
        />
        {!isPhoneValid && formData.phone.length > 0 && (
          <small style={{ color: 'red' }}>Must be a valid 10-digit number starting with 09 or 07.</small>
        )}

        <input 
          type="text" 
          name="area" 
          placeholder="Delivery Area (e.g. Bole)" 
          value={formData.area} 
          onChange={handleChange} 
        />

        <button type="submit" disabled={!isFormValid}>
          Pay with TeleBirr
        </button>
      </div>
    </form>
  );
}