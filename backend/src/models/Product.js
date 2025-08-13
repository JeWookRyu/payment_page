const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// product_premium_new 테이블 모델 정의
const Product = sequelize.define('Product', {
  코드: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: '코드'
  },
  시: {
    type: DataTypes.STRING,
    allowNull: true,
    field: '시'
  },
  구: {
    type: DataTypes.STRING,
    allowNull: true,
    field: '구'
  },
  지역: {
    type: DataTypes.STRING,
    allowNull: true,
    field: '지역'
  },
  사무실: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: '사무실'
  },
  상가: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: '상가'
  },
  상가사무실: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: '상가사무실'
  },
  구분: {
    type: DataTypes.STRING,
    allowNull: true,
    field: '구분'
  }
}, {
  tableName: 'product_premium_new',
  timestamps: false,
  freezeTableName: true
});

// 가상 속성 추가 (계산된 필드들)
Product.prototype.getTotalProperties = function() {
  return (this.사무실 || 0) + (this.상가 || 0) + (this.상가사무실 || 0);
};

Product.prototype.getNormalProperties = function() {
  const total = this.getTotalProperties();
  return Math.floor(total * 0.7); // 70%를 정상 매물로 가정
};

Product.prototype.getServiceProperties = function() {
  const total = this.getTotalProperties();
  return Math.floor(total * 0.3); // 30%를 서비스 매물로 가정
};

Product.prototype.getPrice = function() {
  // 지역별 기본 가격 설정 (실제 비즈니스 로직에 맞게 조정 필요)
  const basePrice = 300000;
  const total = this.getTotalProperties();
  
  // 매물 수에 따른 가격 조정
  if (total >= 100) return 500000;
  if (total >= 50) return 400000;
  if (total >= 20) return 350000;
  return basePrice;
};

Product.prototype.getDisplayName = function() {
  return `${this.지역 || this.구 || this.시} 프리미엄 광고`;
};

Product.prototype.getLocation = function() {
  const parts = [this.시, this.구, this.지역].filter(Boolean);
  return parts.join(' ');
};

module.exports = Product;