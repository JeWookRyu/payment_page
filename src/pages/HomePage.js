import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import FixedBottomBar from '../components/FixedBottomBar';
import NonMemberModal from '../components/NonMemberModal';

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleStartAd = () => {
    navigate('/payment');
  };

  return (
    <>
      <Header />
      
      <main className="main">
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                 상업용 중개는<br />
                  <span className="highlight">수익의 크기</span>가<br />
                  다릅니다!
                </h1>
                <p className="hero-subtitle">
                  지금, 전략적 광고집행으로<br />
                  중개 수익의 차이를 만들어보세요
                </p>
                <div className="hero-cta">
                  <button className="btn btn-cta" onClick={handleStartAd}>지금 광고 시작하기</button>
                </div>
                <div className="hero-buttons">
                  <button className="btn btn-primary hero-btn">문의하기</button>
                  <a href="/payment" className="btn btn-secondary">중개사 회원가입</a>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-placeholder">
                <div className="placeholder-content">
                  <h3>📊 데모 이미지 영역</h3>
                  <p>실제 구현 시 네모 광고 효과 이미지가<br />들어갈 위치입니다</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section benefits">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                광고비 대비 수익률 15배<br />
                연매출 1억 5천, 지금 달성해보세요
              </h2>
              <p className="section-subtitle">
                아직도 원룸, 오피스텔만 취급하시나요?<br />
                평균 수수료 5배 이상 높은 상업용 부동산 시작하세요
              </p>
              <p className="section-note">광고비 30만원, 1건 평균 계약 / 국토교통부 기준</p>
            </div>
            <div className="benefits-image">
              <div className="section-placeholder">
                <div className="placeholder-content">
                  <h4>📈 광고 효과 데이터</h4>
                  <p>• 광고비 대비 수익률 15배<br />• 평균 계약률 통계<br />• ROI 분석 차트</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section retention">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                진짜 거래되는 상업용 부동산, 네모<br />
                상품 재구매율 90% 이상!
              </h2>
              <p className="section-subtitle">
                15,000개 이상의 중개사무소가 선택하고 만족한 플랫폼 네모<br />
                이제 전화만 받는 단순 문의를 넘어, 광고를 연장할 수밖에 없는 이유<br />
                실제 거래로 이어지는 결과를 경험해보세요.
              </p>
              <p className="section-note">내부자료 기준</p>
            </div>
            <div className="retention-image">
              <div className="section-placeholder">
                <div className="placeholder-content">
                  <h4>🔄 재구매율 통계</h4>
                  <p>• 15,000개 중개사무소 현황<br />• 90% 이상 재구매율<br />• 고객 만족도 지표</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section">
          <div className="container">
            <h2 className="section-title">네모의 광고상품 확인해보세요</h2>
            <p className="section-subtitle">수익의 크기가 다른 상업용 중개, 네모로 시작하세요!</p>
            
            <div className="contact-container">
              <div className="contact-info">
                <h3 className="contact-title">중개사 광고문의</h3>
                <p className="contact-desc">
                  문의를 남겨주시면 담당자 확인후 빠르게 회신드리겠습니다. 
                  전화 및 이메일 상담이 필요할 경우 아래 연락처로 문의주세요.
                </p>
                <div className="contact-details">
                  <p className="contact-phone">1599-4385</p>
                  <p className="contact-email">support@sugarhill.co.kr</p>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <FixedBottomBar />
      <NonMemberModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default HomePage;