export const isProduction = process.env.NODE_ENV === 'production'
export const BASE_URL = isProduction? `http://localhost:${process.env.REACT_APP_PORT}`: `http://localhost:${process.env.REACT_APP_PORT}`;
export const BACKEND_URL = isProduction ? `https://lithium.tesla.com/backend` : `http://localhost:8080/backend`;
export const WEBSOCKET_URL = isProduction ? `https://lithium.tesla.com` : `http://localhost:8089/`;
export const AUTH_URL = isProduction ? `https://lithium.tesla.com` : `http://localhost:8080`;


