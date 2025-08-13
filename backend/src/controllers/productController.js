const Product = require('../models/Product');
const ProductNormal = require('../models/ProductNormal');
const { Op } = require('sequelize');

class ProductController {
  
  // 전체 상품 목록 조회
  async getAllProducts(req, res) {
    try {
      const { page = 1, limit = 50 } = req.query;
      const offset = (page - 1) * limit;

      const products = await Product.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['지역', 'ASC'], ['구', 'ASC']]
      });

      const formattedProducts = products.rows.map(product => ({
        id: product.코드,
        code: product.코드,
        name: product.getDisplayName(),
        location: product.getLocation(),
        city: product.시,
        district: product.구,
        region: product.지역,
        category: product.구분,
        price: product.getPrice(),
        properties: {
          office: product.사무실 || 0,
          commercial: product.상가 || 0,
          mixed: product.상가사무실 || 0,
          total: product.getTotalProperties(),
          normal: product.getNormalProperties(),
          service: product.getServiceProperties()
        }
      }));

      res.json({
        success: true,
        data: formattedProducts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: products.count,
          totalPages: Math.ceil(products.count / limit)
        }
      });
    } catch (error) {
      console.error('getAllProducts Error:', error);
      res.status(500).json({
        success: false,
        error: '상품 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 도시 목록 조회
  async getCities(req, res) {
    try {
      const cities = await Product.findAll({
        attributes: ['시'],
        group: ['시'],
        where: {
          시: {
            [Op.ne]: null,
            [Op.ne]: ''
          }
        },
        order: [['시', 'ASC']]
      });

      const cityList = cities.map(item => item.시).filter(Boolean);

      res.json({
        success: true,
        data: cityList
      });
    } catch (error) {
      console.error('getCities Error:', error);
      res.status(500).json({
        success: false,
        error: '도시 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 구/군 목록 조회
  async getDistricts(req, res) {
    try {
      const { city } = req.query;
      
      const whereClause = {
        구: {
          [Op.ne]: null,
          [Op.ne]: ''
        }
      };
      
      if (city) {
        whereClause.시 = city;
      }

      const districts = await Product.findAll({
        attributes: ['구'],
        group: ['구'],
        where: whereClause,
        order: [['구', 'ASC']]
      });

      const districtList = districts.map(item => item.구).filter(Boolean);

      res.json({
        success: true,
        data: districtList
      });
    } catch (error) {
      console.error('getDistricts Error:', error);
      res.status(500).json({
        success: false,
        error: '구/군 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 지역 목록 조회
  async getRegions(req, res) {
    try {
      const { city, district } = req.query;
      
      const whereClause = {
        지역: {
          [Op.ne]: null,
          [Op.ne]: ''
        }
      };
      
      if (city) whereClause.시 = city;
      if (district) whereClause.구 = district;

      const regions = await Product.findAll({
        attributes: ['지역'],
        group: ['지역'],
        where: whereClause,
        order: [['지역', 'ASC']]
      });

      const regionList = regions.map(item => item.지역).filter(Boolean);

      res.json({
        success: true,
        data: regionList
      });
    } catch (error) {
      console.error('getRegions Error:', error);
      res.status(500).json({
        success: false,
        error: '지역 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 상품 검색
  async searchProducts(req, res) {
    try {
      const { city, district, region, category, search } = req.query;
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      let whereClause = {};

      // 검색 조건 추가
      if (city) whereClause.시 = city;
      if (district) whereClause.구 = district;
      if (region) whereClause.지역 = region;
      if (category) whereClause.구분 = category;
      
      // 텍스트 검색
      if (search) {
        whereClause[Op.or] = [
          { 시: { [Op.iLike]: `%${search}%` } },
          { 구: { [Op.iLike]: `%${search}%` } },
          { 지역: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const products = await Product.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['지역', 'ASC'], ['구', 'ASC']]
      });

      const formattedProducts = products.rows.map(product => ({
        id: product.코드,
        code: product.코드,
        name: product.getDisplayName(),
        location: product.getLocation(),
        city: product.시,
        district: product.구,
        region: product.지역,
        category: product.구분,
        price: product.getPrice(),
        properties: {
          office: product.사무실 || 0,
          commercial: product.상가 || 0,
          mixed: product.상가사무실 || 0,
          total: product.getTotalProperties(),
          normal: product.getNormalProperties(),
          service: product.getServiceProperties()
        }
      }));

      res.json({
        success: true,
        data: formattedProducts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: products.count,
          totalPages: Math.ceil(products.count / limit)
        }
      });
    } catch (error) {
      console.error('searchProducts Error:', error);
      res.status(500).json({
        success: false,
        error: '상품 검색에 실패했습니다.',
        message: error.message
      });
    }
  }

  // 상품 상세 조회
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: '상품을 찾을 수 없습니다.'
        });
      }

      const formattedProduct = {
        id: product.코드,
        code: product.코드,
        name: product.getDisplayName(),
        location: product.getLocation(),
        city: product.시,
        district: product.구,
        region: product.지역,
        category: product.구분,
        price: product.getPrice(),
        properties: {
          office: product.사무실 || 0,
          commercial: product.상가 || 0,
          mixed: product.상가사무실 || 0,
          total: product.getTotalProperties(),
          normal: product.getNormalProperties(),
          service: product.getServiceProperties()
        }
      };

      res.json({
        success: true,
        data: formattedProduct
      });
    } catch (error) {
      console.error('getProductById Error:', error);
      res.status(500).json({
        success: false,
        error: '상품 상세 정보를 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 프리미엄 광고 상품 목록 조회 (프론트엔드용)
  async getPremiumProducts(req, res) {
    try {
      const { search, city, district, region } = req.query;
      
      let whereClause = {};
      
      // 검색 조건 추가
      if (search) {
        whereClause[Op.or] = [
          { 시: { [Op.iLike]: `%${search}%` } },
          { 구: { [Op.iLike]: `%${search}%` } },
          { 지역: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      if (city) whereClause.시 = city;
      if (district) whereClause.구 = district;
      if (region) whereClause.지역 = region;

      const products = await Product.findAll({
        where: whereClause,
        order: [['지역', 'ASC'], ['구', 'ASC']],
        limit: 50
      });

      const premiumProducts = products.map(product => ({
        id: product.코드,
        icon: '📈',
        title: `${product.getDisplayName()}`,
        subtitle: `${product.getLocation()} 프리미엄 광고 상품`,
        location: product.getLocation(),
        price: `${product.getPrice().toLocaleString()}원/월`,
        bgColor: '#dc2626',
        properties: {
          office: product.사무실 || 0,
          commercial: product.상가 || 0,
          mixed: product.상가사무실 || 0,
          total: product.getTotalProperties(),
          providedCount: 10,
          providedType: 'service'
        },
        details: `서비스 매물 10건 지급`
      }));

      res.json({
        success: true,
        data: premiumProducts
      });
    } catch (error) {
      console.error('getPremiumProducts Error:', error);
      res.status(500).json({
        success: false,
        error: '프리미엄 상품 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }

  // 일반 광고 상품 목록 조회 (프론트엔드용)
  async getNormalProducts(req, res) {
    try {
      const { search, city, district, region } = req.query;
      
      let whereClause = {};
      
      // 검색 조건 추가
      if (search) {
        whereClause[Op.or] = [
          { 시: { [Op.iLike]: `%${search}%` } },
          { 구: { [Op.iLike]: `%${search}%` } },
          { 지역: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      if (city) whereClause.시 = city;
      if (district) whereClause.구 = district;
      if (region) whereClause.지역 = region;

      const products = await ProductNormal.findAll({
        where: whereClause,
        order: [['지역', 'ASC'], ['구', 'ASC']],
        limit: 50
      });

      const normalProducts = products.map(product => ({
        id: product.코드,
        icon: '📊',
        title: `${product.getDisplayName()}`,
        subtitle: `${product.getLocation()} 일반 광고 상품`,
        location: product.getLocation(),
        price: `${product.getPrice().toLocaleString()}원/월`,
        bgColor: '#1e40af',
        properties: {
          office: product.사무실 || 0,
          commercial: product.상가 || 0,
          mixed: product.상가사무실 || 0,
          total: product.getTotalProperties(),
          providedCount: 10,
          providedType: 'normal'
        },
        details: `정상 매물 10건 지급`
      }));

      res.json({
        success: true,
        data: normalProducts
      });
    } catch (error) {
      console.error('getNormalProducts Error:', error);
      res.status(500).json({
        success: false,
        error: '일반 상품 목록을 불러오는데 실패했습니다.',
        message: error.message
      });
    }
  }
}

module.exports = new ProductController();