const isDevelopment = process.env.NODE_ENV === 'development';
console.log(isDevelopment, 'isDevelopment');

export const API_BASE_URL = isDevelopment
  ? 'http://localhost:5000' // 로컬 Node.js 서버
  : 'https://your-backend-api.com'; // 실제 백엔드 서버
