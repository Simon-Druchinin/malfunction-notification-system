// ** Auth Endpoints
export default {
  baseURL: 'http://127.0.0.1:8000',
  loginEndpoint: '/api/v1/token/',
  registerEndpoint: '/api/v1/register/',
  refreshEndpoint: '/api/v1/token/refresh/',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'JWT',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
