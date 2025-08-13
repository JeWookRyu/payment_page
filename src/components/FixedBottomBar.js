import React, { useState } from 'react';
import NonMemberModal from './NonMemberModal';

const FixedBottomBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleStartAd = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="fixed-bottom">
        <div className="fixed-bottom-container">
          <button className="contact-item cta-item" onClick={handleStartAd}>
            <div className="contact-icon cta-icon">🚀</div>
            <div className="contact-text">
              <p className="contact-number">지금 광고 시작하기</p>
              <p className="contact-time">광고비 대비 15배의 수익!</p>
            </div>
          </button>
          
          <a href="tel:1599-4385" className="contact-item phone-item">
            <div className="contact-icon phone-icon">📞</div>
            <div className="contact-text">
              <p className="contact-number">1599-4385</p>
              <p className="contact-time">평일 10~18시</p>
            </div>
          </a>
        </div>
      </div>

      <NonMemberModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FixedBottomBar;