const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { testConnection } = require('../config/database');

// 데이터베이스 연결 상태 확인
router.get('/health', async (req, res) => {
  try {
    await testConnection();
    res.json({
      success: true,
      message: '데이터베이스 연결 정상',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '데이터베이스 연결 실패',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 전체 상품 목록 조회
// GET /api/products
router.get('/', productController.getAllProducts);

// 도시 목록 조회
// GET /api/products/cities
router.get('/cities', productController.getCities);

// 구/군 목록 조회
// GET /api/products/districts?city=서울시
router.get('/districts', productController.getDistricts);

// 지역 목록 조회
// GET /api/products/regions?city=서울시&district=강남구
router.get('/regions', productController.getRegions);

// 상품 검색
// GET /api/products/search?city=서울시&district=강남구&region=강남역
router.get('/search', productController.searchProducts);

// 프리미엄 광고 상품 목록 조회 (프론트엔드용)
// GET /api/products/premium?search=강남&city=서울시&district=강남구
router.get('/premium', productController.getPremiumProducts);

// 일반 광고 상품 목록 조회 (프론트엔드용)
// GET /api/products/normal?search=강남&city=서울시&district=강남구
router.get('/normal', productController.getNormalProducts);

// 상품 상세 조회 (맨 마지막에 위치해야 함)
// GET /api/products/:id
router.get('/:id', productController.getProductById);

module.exports = router;