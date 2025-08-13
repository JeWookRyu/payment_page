const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// product_nomal_new 테이블 모델 정의
const ProductNormal = sequelize.define('ProductNormal', {
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
  tableName: 'product_nomal_new',
  timestamps: false,
  freezeTableName: true
});

// 가상 속성 추가 (계산된 필드들)
ProductNormal.prototype.getTotalProperties = function() {
  return (this.사무실 || 0) + (this.상가 || 0) + (this.상가사무실 || 0);
};

ProductNormal.prototype.getNormalProperties = function() {
  const total = this.getTotalProperties();
  return Math.floor(total * 0.7); // 70%를 정상 매물로 가정
};

ProductNormal.prototype.getServiceProperties = function() {
  const total = this.getTotalProperties();
  return Math.floor(total * 0.3); // 30%를 서비스 매물로 가정
};

ProductNormal.prototype.getPrice = function() {
  // 일반 광고는 프리미엄보다 저렴한 가격 설정
  const basePrice = 150000;
  const total = this.getTotalProperties();
  
  // 매물 수에 따른 가격 조정 (프리미엄보다 낮은 가격)
  if (total >= 100) return 250000;
  if (total >= 50) return 200000;
  if (total >= 20) return 175000;
  return basePrice;
};

ProductNormal.prototype.getDisplayName = function() {
  return `${this.지역 || this.구 || this.시} 일반 광고`;
};

ProductNormal.prototype.getLocation = function() {
  const parts = [this.시, this.구, this.지역].filter(Boolean);
  return parts.join(' ');
};

module.exports = ProductNormal;