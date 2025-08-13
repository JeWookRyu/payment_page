import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdProductModal from '../components/AdProductModal';
import '../styles/payment.css';
import '../styles/selectedProducts.css';
import nemoLogo from '../assets/nemo-logo.png';

const PaymentPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [selectedCoupon, setSelectedCoupon] = useState('0');
  const [isSubscription, setIsSubscription] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'location'

  // 상품 데이터
  const products = {
    'gangnam-premium': {
      name: '강남역 프리미엄 광고',
      desc: '강남역 근처 상가 임대차 광고',
      location: '서울시 강남구 강남역',
      price: 400000,
      type: '프리미엄'
    },
    'gangnam-basic': {
      name: '강남구 일반 광고',
      desc: '강남구 전체 지역 광고',
      location: '서울시 강남구',
      price: 250000,
      type: '일반'
    },
    'seocho-premium': {
      name: '서초역 프리미엄 광고',
      desc: '서초역 근처 상업지구 광고',
      location: '서울시 서초구 서초역',
      price: 380000,
      type: '프리미엄'
    },
    'sinsa-special': {
      name: '신사동 특화 광고',
      desc: '신사동 가로수길 맛집거리 광고',
      location: '서울시 강남구 신사동',
      price: 450000,
      type: '특화'
    }
  };

  // 쿠폰 데이터
  const coupons = [
    { id: '0', name: '쿠폰 사용 안함', discount: 0, amount: 0, type: 'none' },
    { id: '10', name: '신규 가입 할인 쿠폰 (10%)', discount: 10, amount: 40000, type: 'discount' },
    { id: 'august-promo', name: '8월 매물 10+10 프로모션 쿠폰', discount: 0, amount: 50000, type: 'property-bonus' }
  ];

  // 지역 데이터
  const locationData = {
    '서울특별시': {
      '강남구': ['강남역', '신논현역', '논현역', '압구정역', '신사역', '선릉역'],
      '강동구': ['천호역', '강동역', '길동역', '굽은다리역', '명일역', '고덕역'],
      '강북구': ['수유역', '미아역', '미아사거리역', '북한산우이역'],
      '강서구': ['김포공항역', '개화산역', '방화역', '등촌역', '염창역'],
      '관악구': ['신림역', '봉천역', '사당역', '낙성대역'],
      '광진구': ['건대입구역', '구의역', '강변역', '뚝섬유원지역'],
      '구로구': ['구로역', '신도림역', '구일역', '개봉역'],
      '금천구': ['가산디지털단지역', '독산역', '금천구청역'],
      '노원구': ['노원역', '상계역', '중계역', '하계역'],
      '도봉구': ['도봉역', '도봉산역', '창동역', '방학역'],
      '동대문구': ['동대문역', '동대문역사문화공원역', '신설동역', '제기동역'],
      '동작구': ['사당역', '이수역', '동작역', '총신대입구역'],
      '마포구': ['홍대입구역', '신촌역', '공덕역', '마포역'],
      '서대문구': ['이대역', '홍제역', '독립문역', '무악재역'],
      '서초구': ['서초역', '교대역', '강남역', '양재역', '방배역'],
      '성동구': ['성수역', '뚝섬역', '한양대역', '왕십리역'],
      '성북구': ['성신여대입구역', '한성대입구역', '정릉역'],
      '송파구': ['잠실역', '석촌역', '송파역', '가락시장역', '문정역'],
      '양천구': ['목동역', '오목교역', '양평역', '신정네거리역'],
      '영등포구': ['여의도역', '국회의사당역', '영등포구청역', '신길역'],
      '용산구': ['용산역', '이촌역', '한강진역', '노량진역'],
      '은평구': ['연신내역', '구파발역', '불광역', '응암역'],
      '종로구': ['종로3가역', '안국역', '종각역', '광화문역'],
      '중구': ['명동역', '을지로3가역', '충무로역', '동대문역'],
      '중랑구': ['중화역', '상봉역', '면목역', '사가정역']
    }
  };

  // 기간별 할인율
  const durationDiscounts = {
    '1': 0,
    '3': 5,
    '6': 16.67
  };

  // 매물 건수 계산 (프로모션 적용)
  const calculatePropertyCounts = () => {
    if (selectedProducts.length === 0) {
      return {
        totalProperties: 0,
        normalProperties: 0,
        serviceProperties: 0,
        bonusProperties: 0
      };
    }
    
    const selectedCouponData = coupons.find(c => c.id === selectedCoupon);
    const isAugustPromo = selectedCouponData && selectedCouponData.type === 'property-bonus';
    
    // 기본 매물 수 (상품마다 다를 수 있지만 여기서는 고정값 사용)
    const baseProperties = selectedProducts.length * 50;
    const bonusProperties = isAugustPromo ? baseProperties : 0; // 10+10 프로모션: 기본 매물 수만큼 추가
    const totalProperties = baseProperties + bonusProperties;
    
    // 프리미엄과 일반 상품에 따라 정상/서비스 매물 비율 조정
    const normalProperties = Math.floor(totalProperties * 0.7);
    const serviceProperties = totalProperties - normalProperties;
    
    return {
      totalProperties,
      normalProperties,
      serviceProperties,
      bonusProperties
    };
  };

  // 금액 계산
  const calculateAmount = () => {
    if (selectedProducts.length === 0) {
      return {
        basePrice: 400000,
        months: 1,
        totalBase: 400000,
        durationDiscountAmount: 0,
        couponDiscountAmount: 0,
        subscriptionDiscountAmount: 0,
        finalAmount: 400000
      };
    }
    
    const totalBasePrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const months = parseInt(selectedDuration);
    const totalBase = totalBasePrice * months;
    
    // 기간 할인
    const durationDiscountRate = durationDiscounts[selectedDuration];
    const durationDiscountAmount = Math.floor(totalBase * durationDiscountRate / 100);
    
    // 쿠폰 할인
    const selectedCouponData = coupons.find(c => c.id === selectedCoupon);
    let couponDiscountAmount = 0;
    if (selectedCouponData.type === 'discount' && selectedCouponData.discount > 0) {
      couponDiscountAmount = Math.min(
        Math.floor(totalBase * selectedCouponData.discount / 100),
        selectedCouponData.amount
      );
    } else if (selectedCouponData.type !== 'property-bonus') {
      couponDiscountAmount = selectedCouponData.amount;
    }
    
    // 정기결제 할인 (3%)
    const subscriptionDiscountAmount = isSubscription ? Math.floor((totalBase - durationDiscountAmount - couponDiscountAmount) * 3 / 100) : 0;
    
    const finalAmount = totalBase - durationDiscountAmount - couponDiscountAmount - subscriptionDiscountAmount;
    
    return {
      basePrice: totalBasePrice,
      months,
      totalBase,
      durationDiscountAmount,
      couponDiscountAmount,
      subscriptionDiscountAmount,
      finalAmount: Math.max(finalAmount, 0)
    };
  };

  const amounts = calculateAmount();
  const propertyCounts = calculatePropertyCounts();

  const handleSelectProduct = (productKey) => {
    const product = products[productKey];
    if (product) {
      setSelectedProducts(prev => {
        const isAlreadySelected = prev.some(p => p.id === productKey);
        if (isAlreadySelected) {
          return prev.filter(p => p.id !== productKey);
        } else {
          return [...prev, { ...product, id: productKey }];
        }
      });
    }
  };

  const handleProductSelect = (productId, customProduct = null) => {
    const product = customProduct || products[productId];
    if (product) {
      setSelectedProducts(prev => {
        const isAlreadySelected = prev.some(p => p.id === productId);
        if (isAlreadySelected) {
          return prev.filter(p => p.id !== productId);
        } else {
          return [...prev, { ...product, id: productId }];
        }
      });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleLocationSelect = () => {
    if (selectedCity && selectedDistrict && selectedStation) {
      // 선택된 지역 기반으로 상품 생성
      const locationProduct = {
        name: `${selectedDistrict} ${selectedStation} 프리미엄 광고`,
        desc: `${selectedStation} 근처 상업지구 광고`,
        location: `${selectedCity} ${selectedDistrict} ${selectedStation}`,
        price: 380000,
        type: '프리미엄'
      };
      setSelectedProduct(locationProduct);
      setShowProductModal(false);
      // 선택 초기화
      setSelectedCity('');
      setSelectedDistrict('');
      setSelectedStation('');
    }
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
    
    // 3초 후 결제 완료 모달 표시
    setTimeout(() => {
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    }, 3000);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return '0원';
    }
    return price.toLocaleString() + '원';
  };

  return (
    <div className="payment-page">
      {/* 헤더 */}
      <header className="payment-header">
        <div className="payment-nav">
          <Link to="/" className="logo">
            <img src={nemoLogo} alt="네모" className="logo-image" />
          </Link>
          <div className="payment-header-content">
            <div className="payment-contact">
              <span className="contact-icon">📞</span>
              <span className="contact-label">결제 문의</span>
              <a href="tel:1599-4385" className="contact-number">1599-4385</a>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="payment-main">
        <div className="payment-container">
          <div className="payment-content">
            
            {/* 1단계: 상품 정보 */}
            <section className="payment-section">
              <div className="section-header">
                <div className="section-number">1</div>
                <h2 className="section-title">상품 정보</h2>
              </div>
              
              {selectedProducts.length === 0 ? (
                <div className="product-selector">
                  <button 
                    type="button" 
                    className="select-product-btn" 
                    onClick={() => setShowProductModal(true)}
                  >
                    <div className="select-icon">🔍</div>
                    <div className="select-text">
                      <span className="select-title">광고 상품 선택</span>
                      <span className="select-desc">원하는 지역과 상품을 검색해보세요</span>
                    </div>
                    <div className="select-arrow">→</div>
                  </button>
                </div>
              ) : (
                <div className="selected-products-container">
                  <div className="selected-products-header">
                    <h3>선택된 광고 상품 ({selectedProducts.length}개)</h3>
                    <button 
                      type="button" 
                      className="change-product-btn" 
                      onClick={() => setShowProductModal(true)}
                    >
                      상품 추가/변경하기
                    </button>
                  </div>
                  <div className="selected-products-list">
                    {selectedProducts.map((product, index) => (
                      <div key={product.id || index} className="selected-product-item">
                        <div className="product-image">
                          <div className="image-placeholder">📊</div>
                        </div>
                        <div className="product-details">
                          <h4 className="product-name">{product.name || product.title}</h4>
                          <p className="product-desc">{product.desc || product.subtitle}</p>
                          <div className="product-specs">
                            <div className="spec-item">
                              <span className="spec-label">광고 지역</span>
                              <span className="spec-value">{product.location}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">상품 유형</span>
                              <span className="spec-value">{product.type || '프리미엄'}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">정상 매물 건수</span>
                              <span className="spec-value">{product.type === '프리미엄' || product.type === '특화' ? '10건' : '10건'}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">서비스 매물 건수</span>
                              <span className="spec-value">{product.type === '프리미엄' || product.type === '특화' ? '10건' : '0건'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-price">
                          <div className="price-label">정가</div>
                          <div className="price-amount">{formatPrice(product.price)}/월</div>
                        </div>
                        <button 
                          className="remove-product-btn"
                          onClick={() => setSelectedProducts(prev => prev.filter((_, i) => i !== index))}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="products-summary">
                    <div className="summary-item">
                      <span className="summary-label">총 상품 개수</span>
                      <span className="summary-value">{selectedProducts.length}개</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">총 매물 건수</span>
                      <span className="summary-value">{propertyCounts.totalProperties}건</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">정상 매물 건수</span>
                      <span className="summary-value">{propertyCounts.normalProperties}건</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">서비스 매물 건수</span>
                      <span className="summary-value">{propertyCounts.serviceProperties}건</span>
                    </div>
                
                    <div className="summary-item">
                      <span className="summary-label">월 총 비용</span>
                      <span className="summary-value">{formatPrice(amounts.basePrice)}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 2단계: 할인 혜택 */}
            <section className="payment-section">
              <div className="section-header">
                <div className="section-number">2</div>
                <h2 className="section-title">할인 혜택</h2>
              </div>
              <div className="duration-section">
                <div className="duration-options">
                  <div className="duration-item">
                    <input 
                      type="radio" 
                      id="duration1" 
                      name="duration" 
                      value="1" 
                      checked={selectedDuration === '1'}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                    <label htmlFor="duration1" className="duration-label">
                      <div className="duration-badge">1개월</div>
                      <div className="duration-info">
                        <div className="duration-name">단기 이용</div>
                        <div className="duration-desc">정상가</div>
                        <div className="duration-monthly">월 {selectedProducts.length === 0 ? '상품 미선택' : formatPrice(amounts.basePrice)}</div>
                      </div>
                      <div className="duration-discount">할인없음</div>
                    </label>
                  </div>
                  
                  <div className="duration-item">
                    <input 
                      type="radio" 
                      id="duration3" 
                      name="duration" 
                      value="3"
                      checked={selectedDuration === '3'}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                    <label htmlFor="duration3" className="duration-label">
                      <div className="duration-badge">3개월</div>
                      <div className="duration-info">
                        <div className="duration-name">3개월 약정</div>
                        <div className="duration-desc">5% 할인 혜택</div>
                        <div className="duration-monthly">월 {selectedProducts.length === 0 ? '상품 미선택' : formatPrice(Math.floor(amounts.basePrice*3 * 0.95))}</div>
                      </div>
                      <div className="duration-discount">5% 할인</div>
                    </label>
                  </div>
                  
                  <div className={`duration-item ${selectedDuration === '6' ? 'recommended' : ''}`}>
                    <input 
                      type="radio" 
                      id="duration6" 
                      name="duration" 
                      value="6"
                      checked={selectedDuration === '6'}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                    <label htmlFor="duration6" className="duration-label">
                      <div className="duration-badge">6개월</div>
                      <div className="duration-info">
                        <div className="duration-name">장기 이용</div>
                        <div className="duration-desc">16.67% 할인 혜택</div>
                        <div className="duration-monthly">월 {selectedProducts.length === 0 ? '상품 미선택' : formatPrice(Math.floor(amounts.basePrice * 5))}</div>
                      </div>
                      <div className="duration-discount">16.67% 할인</div>
                    </label>
                    {selectedDuration === '6' && <div className="recommended-badge">추천</div>}
                  </div>
                </div>
                
                <div className="duration-info-text">
                  <div className="discount-callout">
                    <span className="callout-icon">💡</span>
                    <span className="callout-text">
                      <strong>장기 약정할수록</strong> 더 많은 <strong>할인 혜택</strong>을 받을 수 있습니다.
                      <span className="callout-badge">추천: 6개월</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3단계: 결제 금액 */}
            <section className="payment-section">
              <div className="section-header">
                <div className="section-number">3</div>
                <h2 className="section-title">결제 금액</h2>
              </div>
              <div className="payment-summary">
                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>정상가</span>
                    <span className="amount">
                      {selectedProducts.length === 0 ? '상품 선택 필요' : `${formatPrice(amounts.basePrice)} × ${amounts.months}개월`}
                    </span>
                  </div>
                  {amounts.durationDiscountAmount > 0 && (
                    <div className="summary-row discount-row">
                      <span>기간 할인 ({durationDiscounts[selectedDuration]}%)</span>
                      <span className="amount discount">-{formatPrice(amounts.durationDiscountAmount)}</span>
                    </div>
                  )}
                  {propertyCounts.bonusProperties > 0 ? (
                    <div className="summary-row promotion-row">
                      <span>🎁 8월 프로모션 (매물 {propertyCounts.bonusProperties}건 추가 증정)</span>
                      <span className="amount promotion">무료 제공</span>
                    </div>
                  ) : amounts.couponDiscountAmount > 0 ? (
                    <div className="summary-row discount-row">
                      <span>쿠폰 할인</span>
                      <span className="amount discount">-{formatPrice(amounts.couponDiscountAmount)}</span>
                    </div>
                  ) : null}
                  {amounts.subscriptionDiscountAmount > 0 && (
                    <div className="summary-row discount-row">
                      <span>정기결제 할인 (3%)</span>
                      <span className="amount discount">-{formatPrice(amounts.subscriptionDiscountAmount)}</span>
                    </div>
                  )}
                  <div className="summary-row discount-total-row">
                    <span>할인받은 금액</span>
                    <span className="discount-total">-{formatPrice(amounts.durationDiscountAmount + amounts.couponDiscountAmount + amounts.subscriptionDiscountAmount)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total-properties-row">
                    <span>최종 매물 건수</span>
                    <span className="total-properties">{selectedProducts.length === 0 ? '상품 선택 필요' : `${propertyCounts.totalProperties}건`}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>최종 결제금액</span>
                    <span className="total-amount">{selectedProducts.length === 0 ? '상품 선택 필요' : formatPrice(amounts.finalAmount)}</span>
                  </div>
                </div>
                
                {/* 쿠폰 선택 */}
                <div className="coupon-inline">
                  <label htmlFor="couponSelect" className="coupon-inline__label">사용 가능한 금액 쿠폰</label>
                  <div className="coupon-inline__control">
                    <select 
                      id="couponSelect" 
                      className="coupon-inline__select"
                      value={selectedCoupon}
                      onChange={(e) => setSelectedCoupon(e.target.value)}
                    >
                      {coupons.map(coupon => (
                        <option key={coupon.id} value={coupon.id}>
                          {coupon.name}
                        </option>
                      ))}
                    </select>
                 
                  </div>
                </div>
                
                {/* 정기결제 옵션 */}
                <div className="subscription-option">
                  <div className="subscription-toggle">
                    <input 
                      type="checkbox" 
                      id="subscriptionCheckbox" 
                      className="subscription-checkbox" 
                      checked={isSubscription}
                      onChange={(e) => setIsSubscription(e.target.checked)}
                    />
                    <label htmlFor="subscriptionCheckbox" className="subscription-label">
                      <div className="subscription-info">
                        <div className="subscription-title">
                          <span className="subscription-icon">🔄</span>
                          정기결제 신청하기
                        </div>
                        <div className="subscription-desc">
                          매월 자동 결제로 편리하게 이용하고 3% 할인 혜택도 받으세요
                        </div>
                      </div>
                      <div className="toggle-switch">
                        <div className="toggle-slider"></div>
                      </div>
                    </label>
                  </div>
                  {isSubscription && (
                    <div className="subscription-benefits">
                      <div className="benefit-item">
                        <span className="benefit-text">최총 결제 금액의 3% 할인 (최대 연간 oo만원 절약)</span>
                        <span className="benefit-text">*첫구매 기간 이후 언제든지 해지 가능*</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 결제 버튼 */}
                <div className="payment-actions">
                  <button className="btn-primary payment-btn" onClick={handlePayment}>
                    <span className="btn-amount">{selectedProducts.length === 0 ? '0원' : formatPrice(amounts.finalAmount)}</span>
                    <span className="btn-type">결제하기</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* 광고 상품 선택 모달 */}
      <AdProductModal 
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSelect={handleProductSelect}
        selectedProducts={selectedProducts}
      />

      {/* 결제 진행 모달 */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">결제 진행 중</h3>
            </div>
            <div className="modal-body">
              <div className="payment-progress">
                <div className="progress-icon">
                  <div className="loading-spinner"></div>
                </div>
                <p className="progress-text">결제를 처리하고 있습니다...</p>
                <p className="progress-subtext">잠시만 기다려주세요.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 결제 완료 모달 */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">결제 완료</h3>
              <button className="modal-close" onClick={() => setShowSuccessModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="success-content">
                <div className="success-icon">✅</div>
                <h4>결제가 완료되었습니다!</h4>
                <p>네모 프리미엄 광고 상품이 활성화되었습니다.</p>
                <div className="success-info">
                  <p><strong>총 상품 개수:</strong> {selectedProducts.length}개</p>
                  <p><strong>총 매물 건수:</strong> {propertyCounts.totalProperties}건</p>
                  <p><strong>정상 매물 건수:</strong> {propertyCounts.normalProperties}건</p>
                  <p><strong>서비스 매물 건수:</strong> {propertyCounts.serviceProperties}건</p>           
                  <p><strong>월 총 비용:</strong> {formatPrice(amounts.basePrice)}</p>
                  <p><strong>결제 금액:</strong> {formatPrice(amounts.finalAmount)}</p>
                  <p><strong>결제 일시:</strong> {new Date().toLocaleString('ko-KR')}</p>
                  <p><strong>결제 방법:</strong> 신용카드</p>
                </div>
                <div className="success-actions">
                  <Link to="/" className="btn btn-primary">
                    메인으로 돌아가기
                  </Link>
                  <button className="btn btn-secondary" onClick={() => window.print()}>
                    영수증 출력
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

