import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const closeModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-left">
              <h1 className="logo">
                <span className="logo-text">네모</span>
              </h1>
              <ul className="nav-menu">
                <li className="nav-item">
                  <span className="nav-label-big">상가</span>
                  <span className="nav-label-small">임대차</span>
                </li>
                <li className="nav-item">
                  <span className="nav-label-big">사무실</span>
                  <span className="nav-label-small">임대차</span>
                </li>
                <li className="nav-item">
                  <span className="nav-label-big">수익형</span>
                  <span className="nav-label-small">매매•분양</span>
                </li>
                <li className="nav-item">
                  <span className="nav-label-big">빌딩</span>
                  <span className="nav-label-small">임대차</span>
                </li>
                <li className="nav-item">
                  <span className="nav-label-big">지역분석</span>
                  <span className="nav-label-small">임대•매매</span>
                  <span className="new-badge">NEW</span>
                </li>
              </ul>
            </div>
            <div className="nav-right">
              <ul className="right-menu gap-2">
                <li className="font-bold-14 text-gray-80">
                  <a className="pr-4" href="/agent/home">관리홈</a>
                  <a className="px-4 border-x border-gray-20" href="/register/store">매물등록</a>
                  <a className="pl-4" href="/user/article">매물관리</a>
                </li>
                <li>
                  <a className="header-btn mx-3" href="/ads/guide">중개사 가입/광고 안내</a>
                </li>
                <li className="login">
                  <button id="profileButton" onClick={handleProfileClick}>
                    <p>박건웅님</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{rotate: '180deg'}}>
                      <path d="M12.9016 15.3011C13.2182 15.6178 13.5806 15.6888 13.9886 15.5141C14.3966 15.3395 14.6009 15.0268 14.6016 14.5761V9.42613C14.6016 8.97613 14.3972 8.66346 13.9886 8.48813C13.5799 8.3128 13.2176 8.3838 12.9016 8.70113L10.3016 11.3011C10.2016 11.4011 10.1266 11.5095 10.0766 11.6261C10.0266 11.7428 10.0016 11.8678 10.0016 12.0011C10.0016 12.1345 10.0266 12.2595 10.0766 12.3761C10.1266 12.4928 10.2016 12.6011 10.3016 12.7011L12.9016 15.3011Z" fill="#777d83"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <nav className="sub-nav">
          <ul className="sub-nav-list">
            <li className="sub-nav-item active">
              <a href="#guide">중개사 가입 안내</a>
            </li>
            <li className="sub-nav-item">
              <a href="#premium">프리미엄 광고</a>
            </li>
            <li className="sub-nav-item">
              <a href="#basic">일반 광고</a>
            </li>
            <li className="sub-nav-item">
              <a href="#notice" target="_blank">공지사항</a>
            </li>
            <li className="sub-nav-item">
              <a href="#guide-doc" target="_blank">이용가이드</a>
            </li>
          </ul>
        </nav>
      </header>

      <ProfileModal isOpen={isProfileModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;