# Pay Web Backend API

PostgreSQL 연동 백엔드 API 서버

## 설치 및 실행

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 `.env`로 복사하고 데이터베이스 정보를 입력하세요.

```bash
cp .env.example .env
```

`.env` 파일 예시:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. 서버 실행
```bash
# 개발 모드 (nodemon)
npm run dev

# 프로덕션 모드
npm start
```

## API 엔드포인트

### 기본 정보
- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`

### 상품 관련 API

#### 1. 데이터베이스 연결 상태 확인
```
GET /api/products/health
```

#### 2. 전체 상품 목록 조회
```
GET /api/products?page=1&limit=50
```

#### 3. 도시 목록 조회
```
GET /api/products/cities
```

#### 4. 구/군 목록 조회
```
GET /api/products/districts?city=서울시
```

#### 5. 지역 목록 조회
```
GET /api/products/regions?city=서울시&district=강남구
```

#### 6. 상품 검색
```
GET /api/products/search?city=서울시&district=강남구&region=강남역
```

#### 7. 상품 상세 조회
```
GET /api/products/:id
```

## 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

### 오류 응답
```json
{
  "success": false,
  "error": "오류 메시지",
  "message": "상세 오류 내용"
}
```

## 데이터베이스 스키마

테이블명: `product_premium_new`

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| 코드 | STRING | 상품 고유 코드 (PK) |
| 시 | STRING | 시/도 정보 |
| 구 | STRING | 구/군 정보 |
| 지역 | STRING | 세부 지역 (역명 등) |
| 사무실 | INTEGER | 사무실 매물 수 |
| 상가 | INTEGER | 상가 매물 수 |
| 상가사무실 | INTEGER | 상가사무실 매물 수 |
| 구분 | STRING | 상품 구분 |

## 개발 참고사항

1. **포트**: 기본적으로 3001번 포트를 사용합니다.
2. **CORS**: 프론트엔드 (localhost:3000)에서의 요청을 허용합니다.
3. **로깅**: 개발 모드에서는 SQL 쿼리가 콘솔에 출력됩니다.
4. **에러 처리**: 모든 API는 표준화된 에러 응답을 반환합니다.