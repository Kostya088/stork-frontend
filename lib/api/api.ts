import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  success: boolean;
}

const authRoutesWithoutRefresh = [
  '/auth/login',
  '/auth/register',
  '/auth/logout',
  '/auth/refresh',
];

let refreshPromise: Promise<void> | null = null;

function shouldSkipRefresh(url?: string) {
  if (!url) return false;

  return authRoutesWithoutRefresh.some((route) => url.includes(route));
}

async function refreshAccessToken() {
  const { data } = await nextServer.post<RefreshResponse>('/auth/refresh');

  if (!data.success) {
    throw new Error('Unable to refresh access token');
  }
}

function notifySessionExpired() {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event('auth:session-expired'));
}

nextServer.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    if (
      typeof window === 'undefined' ||
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      await refreshPromise;

      return nextServer.request(originalRequest);
    } catch (refreshError) {
      notifySessionExpired();
      return Promise.reject(refreshError);
    }
  },
);
