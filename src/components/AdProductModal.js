import React, { useState, useEffect } from 'react';
import '../styles/adProductModal.css';

const AdProductModal = ({ isOpen, onClose, onSelect, selectedProducts = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [normalProducts, setNormalProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // API에서 프리미엄 상품 데이터 가져오기
  const fetchPremiumProducts = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`http://localhost:3001/api/products/premium?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setRecommendedProducts(data.data);
      }
    } catch (error) {
      console.error('프리미엄 상품 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // API에서 일반 상품 데이터 가져오기
  const fetchNormalProducts = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`http://localhost:3001/api/products/normal?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setNormalProducts(data.data);
      }
    } catch (error) {
      console.error('일반 상품 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 상품 로드
  useEffect(() => {
    if (isOpen) {
      fetchPremiumProducts();
      fetchNormalProducts();
    }
  }, [isOpen]);

  const handleProductSelect = (productId) => {
    onSelect(productId);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      await Promise.all([
        fetchPremiumProducts(searchQuery),
        fetchNormalProducts(searchQuery)
      ]);
      setSearchResults([...recommendedProducts, ...normalProducts]);
      setShowSearchResults(true);
    } catch (error) {
      console.error('검색 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = () => {
    if (selectedCity && selectedDistrict && selectedStation) {
      // 선택된 지역 기반으로 상품 생성
      const locationProduct = {
        id: `${selectedDistrict}-${selectedStation}`,
        icon: '🏢',
        title: `${selectedDistrict} ${selectedStation} 프리미엄 광고`,
        subtitle: `${selectedStation} 근처 상업지구 광고`,
        location: `${selectedCity} ${selectedDistrict} ${selectedStation}`,
        price: '380,000원/월',
        bgColor: '#FE2C54'
      };
      onSelect(locationProduct.id, locationProduct);
      // 선택 초기화
      setSelectedCity('');
      setSelectedDistrict('');
      setSelectedStation('');
    }
  };

  const isProductSelected = (productId) => {
    return selectedProducts.some(product => product.id === productId);
  };

  if (!isOpen) return null;

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="ad-modal-header">
          <h2 className="ad-modal-title">광고 상품 선택</h2>
          <button className="ad-modal-close" onClick={onClose}>×</button>
        </div>

        {/* 탭 메뉴 */}
        <div className="ad-tab-menu">
          <button 
            className={`ad-tab-button ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            검색으로 찾기
          </button>
          <button 
            className={`ad-tab-button ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            지역으로 찾기
          </button>
        </div>

        {/* 검색 탭 */}
        {activeTab === 'search' && (
          <div className="ad-search-section">
            <div className="ad-search-container">
              <input
                type="text"
                className="ad-search-input"
                placeholder="지역, 역명을 검색해보세요 (예: 강남역, 강남구)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="ad-search-button" onClick={handleSearch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 검색 결과 */}
            {showSearchResults && (
              <div className="ad-search-results">
                <h4 className="ad-results-title">검색 결과</h4>
                <div className="ad-products-list">
                  {searchResults.map((product) => (
                    <div key={product.id} className={`ad-product-item ${isProductSelected(product.id) ? 'selected' : ''}`}>
                      <div className="ad-product-icon" style={{ backgroundColor: product.bgColor }}>
                        <span className="ad-icon-emoji">{product.icon}</span>
                      </div>
                      <div className="ad-product-info">
                        <h4 className="ad-product-title">{product.title}</h4>
                        <p className="ad-product-subtitle">{product.subtitle}</p>
                        <p className="ad-product-location">{product.location}</p>
                        <p className="ad-product-price">{product.price}</p>
                      </div>
                      <button 
                        className={`ad-select-button ${isProductSelected(product.id) ? 'selected' : ''}`}
                        onClick={() => handleProductSelect(product.id)}
                      >
                        {isProductSelected(product.id) ? '선택됨' : '선택'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 지역 선택 탭 */}
        {activeTab === 'location' && (
          <div className="ad-location-section">
            <div className="ad-location-selectors">
              {/* 시/도 선택 */}
              <div className="ad-location-step">
                <label className="ad-location-label">지역</label>
                <select 
                  className="ad-location-select" 
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedDistrict('');
                    setSelectedStation('');
                  }}
                >
                  <option value="">시/도 선택</option>
                  {Object.keys(locationData).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* 구/군 선택 */}
              {selectedCity && (
                <div className="ad-location-step">
                  <label className="ad-location-label">구/군</label>
                  <select 
                    className="ad-location-select" 
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedStation('');
                    }}
                  >
                    <option value="">구/군 선택</option>
                    {Object.keys(locationData[selectedCity]).map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* 역/동 선택 */}
              {selectedDistrict && (
                <div className="ad-location-step">
                  <label className="ad-location-label">역/동</label>
                  <select 
                    className="ad-location-select" 
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                  >
                    <option value="">역/동 선택</option>
                    {locationData[selectedCity][selectedDistrict].map(station => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 선택 완료 버튼 */}
            {selectedCity && selectedDistrict && selectedStation && (
              <div className="ad-location-confirm">
                <div className="ad-selected-location">
                  선택된 지역: <strong>{selectedCity} {selectedDistrict} {selectedStation}</strong>
                </div>
                <button className="ad-location-confirm-btn" onClick={handleLocationSelect}>
                  이 지역으로 선택하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* 프리미엄 광고 상품 섹션 */}
        <div className="ad-recommended-section">
          <h3 className="ad-section-title">프리미엄 광고 상품</h3>
          {loading ? (
            <div className="ad-loading">상품을 불러오는 중...</div>
          ) : (
            <div className="ad-products-list">
              {recommendedProducts.map((product) => (
                <div key={product.id} className={`ad-product-item ${isProductSelected(product.id) ? 'selected' : ''}`}>
                  <div className="ad-product-icon" style={{ backgroundColor: product.bgColor }}>
                    <span className="ad-icon-emoji">{product.icon}</span>
                  </div>
                  <div className="ad-product-info">
                    <h4 className="ad-product-title">{product.title}</h4>
                    <p className="ad-product-subtitle">{product.subtitle}</p>
                    <p className="ad-product-location">{product.location}</p>
                    <p className="ad-product-price">{product.price}</p>
                    {product.details && (
                      <p className="ad-product-details">{product.details}</p>
                    )}
                  </div>
                  <button 
                    className={`ad-select-button ${isProductSelected(product.id) ? 'selected' : ''}`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    {isProductSelected(product.id) ? '선택됨' : '선택'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 일반 광고 상품 섹션 */}
        <div className="ad-recommended-section">
          <h3 className="ad-section-title">일반 광고 상품</h3>
          {loading ? (
            <div className="ad-loading">상품을 불러오는 중...</div>
          ) : (
            <div className="ad-products-list">
              {normalProducts.map((product) => (
                <div key={product.id} className={`ad-product-item ${isProductSelected(product.id) ? 'selected' : ''}`}>
                  <div className="ad-product-icon" style={{ backgroundColor: product.bgColor }}>
                    <span className="ad-icon-emoji">{product.icon}</span>
                  </div>
                  <div className="ad-product-info">
                    <h4 className="ad-product-title">{product.title}</h4>
                    <p className="ad-product-subtitle">{product.subtitle}</p>
                    <p className="ad-product-location">{product.location}</p>
                    <p className="ad-product-price">{product.price}</p>
                    {product.details && (
                      <p className="ad-product-details">{product.details}</p>
                    )}
                  </div>
                  <button 
                    className={`ad-select-button ${isProductSelected(product.id) ? 'selected' : ''}`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    {isProductSelected(product.id) ? '선택됨' : '선택'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 선택된 상품 수 표시 */}
        {selectedProducts.length > 0 && (
          <div className="ad-selected-count">
            선택된 상품: {selectedProducts.length}개
          </div>
        )}
      </div>
    </div>
  );
};

export default AdProductModal;