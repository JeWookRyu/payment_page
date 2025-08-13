import React from 'react';
import { useNavigate } from 'react-router-dom';

const NonMemberModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignup = () => {
    navigate('/payment');
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content non-member-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">정확한 견적을 받을 수 없습니다!</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="non-member-content">
            <div className="warning-icon">⚠️</div>
            <div className="warning-message">
              <h4>정확한 견적을 확인하기 위해서는<br />회원가입을 해주세요!</h4>
              <p>회원가입 후 다음과 같은 혜택을 받으실 수 있습니다:</p>
              <ul className="benefit-list">
                <li>✅ 정확한 광고비 견적 확인</li>
                <li>✅ 맞춤형 광고 상품 추천</li>
                <li>✅ 전문 상담사 1:1 상담</li>
                <li>✅ 신규 가입 쿠폰 제공</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="modal-buttons">
            <button className="btn btn-secondary" onClick={onClose}>나중에 하기</button>
            <button className="btn btn-primary" onClick={handleSignup}>회원가입 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonMemberModal;