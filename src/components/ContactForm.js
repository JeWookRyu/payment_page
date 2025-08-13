import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    officeName: '',
    agentName: '',
    phoneNumber: '',
    email: '',
    agreement: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
  };

  const isFormValid = () => {
    return formData.officeName && 
           formData.agentName && 
           formData.phoneNumber && 
           formData.email && 
           formData.agreement;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="officeName" className="form-label">
          중개사무소명 <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="officeName" 
          name="officeName" 
          className="form-input" 
          value={formData.officeName}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="agentName" className="form-label">
          대표자 이름 <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="agentName" 
          name="agentName" 
          className="form-input" 
          value={formData.agentName}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber" className="form-label">
          연락처 <span className="required">*</span>
        </label>
        <input 
          type="tel" 
          id="phoneNumber" 
          name="phoneNumber" 
          className="form-input"
          placeholder="'-' 없이 입력" 
          value={formData.phoneNumber}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          이메일 주소 <span className="required">*</span>
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="form-input" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group checkbox-group">
        <input 
          type="checkbox" 
          id="agreement" 
          name="agreement" 
          className="form-checkbox" 
          checked={formData.agreement}
          onChange={handleChange}
          required 
        />
        <label htmlFor="agreement" className="checkbox-label">
          [필수] 개인정보 수집 및 이용 동의
          <a href="#" className="policy-link">약관보기</a>
        </label>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary form-submit" 
        disabled={!isFormValid()}
      >
        문의하기
      </button>
    </form>
  );
};

export default ContactForm;