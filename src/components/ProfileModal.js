import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCouponClick = () => {
    navigate('/coupon');
    onClose();
  };

  const handleCartClick = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          <svg className="undefined align-top" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0008 13.4008L7.10078 18.3008C6.91745 18.4841 6.68411 18.5758 6.40078 18.5758C6.11745 18.5758 5.88411 18.4841 5.70078 18.3008C5.51745 18.1174 5.42578 17.8841 5.42578 17.6008C5.42578 17.3174 5.51745 17.0841 5.70078 16.9008L10.6008 12.0008L5.70078 7.10078C5.51745 6.91745 5.42578 6.68411 5.42578 6.40078C5.42578 6.11745 5.51745 5.88411 5.70078 5.70078C5.88411 5.51745 6.11745 5.42578 6.40078 5.42578C6.68411 5.42578 6.91745 5.51745 7.10078 5.70078L12.0008 10.6008L16.9008 5.70078C17.0841 5.51745 17.3174 5.42578 17.6008 5.42578C17.8841 5.42578 18.1174 5.51745 18.3008 5.70078C18.4841 5.88411 18.5758 6.11745 18.5758 6.40078C18.5758 6.68411 18.4841 6.91745 18.3008 7.10078L13.4008 12.0008L18.3008 16.9008C18.4841 17.0841 18.5758 17.3174 18.5758 17.6008C18.5758 17.8841 18.4841 18.1174 18.3008 18.3008C18.1174 18.4841 17.8841 18.5758 17.6008 18.5758C17.3174 18.5758 17.0841 18.4841 16.9008 18.3008L12.0008 13.4008Z" fill="#18232d"></path>
          </svg>
        </span>
        
        <div className="header login">
          <div className="profile">
            <div className="profile-photo-placeholder">👤</div>
          </div>
          <div className="user-button profile-title cursor-auto">
            <span className="profile-text">박건웅님, 안녕하세요</span>
            <span className="badge">중개업소</span>
          </div>
          <div className="modal-icons">
            <button className="icon-button" onClick={handleCouponClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 9V7C21.5 5.89543 20.6046 5 19.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V9C3.60457 9 4.5 9.89543 4.5 11C4.5 12.1046 3.60457 13 2.5 13V15C2.5 16.1046 3.39543 17 4.5 17H19.5C20.6046 17 21.5 16.1046 21.5 15V13C20.3954 13 19.5 12.1046 19.5 11C19.5 9.89543 20.3954 9 21.5 9Z" stroke="#777d83" strokeWidth="1.5"/>
                <path d="M9.5 8.5V13.5M14.5 8.5V13.5" stroke="#777d83" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="icon-text">쿠폰함</span>
            </button>
            <button className="icon-button" onClick={handleCartClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="#777d83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="icon-text">장바구니</span>
            </button>
          </div>
        </div>
        
        <div className="scrollable">
          <div className="content">
            <ul>
              <li>
                <a href="/agent/home">
                  <button type="button">
                    <span>관리홈</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                      <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#434c54"></path>
                    </svg>
                  </button>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="content">
            <p className="sub-title">임대차</p>
            <ul>
              <li>
                <a href="/register/store">
                  <button type="button">
                    <span>매물등록</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                      <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#434c54"></path>
                    </svg>
                  </button>
                </a>
              </li>
              <li>
                <a href="/user/article">
                  <button type="button">
                    <span>매물관리</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                      <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#434c54"></path>
                    </svg>
                  </button>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="content">
            <p className="sub-title">매매(수익형 부동산)</p>
            <ul>
              <li>
                <button type="button">
                  <span>매물등록</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                    <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#434c54"></path>
                  </svg>
                </button>
              </li>
              <li>
                <a href="/user/invest">
                  <button type="button">
                    <span>매물관리</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                      <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#434c54"></path>
                    </svg>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="modal-bottom">
          <div className="modal-buttons">
            <div className="flex gap-2">
              <a className="header-btn w-full text-center" href="/ads/guide">중개사 가입/광고 안내</a>
            </div>
            <div className="flex gap-2 mt-2">
              <button type="button" className="header-btn w-full">분양 등록 문의</button>
              <button type="button" className="header-btn w-full">제휴/배너 문의</button>
            </div>
          </div>
          
          <div className="modal-menu-links">
            <div className="menu-column">
              <a href="/cs">고객센터</a>
              <a href="/my/profile">회원 정보 수정</a>
              <a href="#">네이버 블로그</a>
            </div>
            <div className="menu-column">
              <a href="#">공지사항</a>
              <a href="#">로그아웃</a>
            </div>
          </div>
          
          <div className="modal-footer-links">
            <div className="footer-column">
              <a href="#">회사소개</a>
              <a href="#" className="bold">개인정보처리방침</a>
              <a href="#">매물관리정책</a>
            </div>
            <div className="footer-column">
              <a href="#">이용약관</a>
              <a href="#">위치기반서비스이용약관</a>
              <a href="#" className="business-info">
                사업자정보
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" style={{rotate: '-90deg'}}>
                  <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#777d83"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;