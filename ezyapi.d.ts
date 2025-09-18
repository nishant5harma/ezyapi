/**
 * EzyAPI - Making APIs Easy
 * A lightweight, zero-dependency JavaScript library for API calls and DOM data binding
 */

declare global {
  interface Window {
    callapi: typeof callapi;
    apidata: typeof apidata;
    bindData: typeof bindData;
    autoBind: typeof autoBind;
  }
}

/**
 * Options for API requests
 */
export interface ApiOptions {
  /** HTTP method (default: 'GET') */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  /** Request body for POST/PUT requests */
  body?: any;
  /** Include credentials with request (default: true) */
  withCredentials?: boolean;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Request headers */
  headers?: Record<string, string>;
}

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  [key: string]: any;
}

/**
 * Makes an HTTP request and returns a Promise with the response
 * @param url - The API endpoint URL
 * @param options - Request configuration options
 * @returns Promise that resolves to the API response
 * 
 * @example
 * ```typescript
 * // GET request
 * const response = await callapi('/api/users');
 * 
 * // POST request
 * const newUser = await callapi('/api/users', {
 *   method: 'POST',
 *   body: { name: 'John', email: 'john@example.com' }
 * });
 * ```
 */
export function callapi<T = any>(url: string, options?: ApiOptions): Promise<T>;

/**
 * Extracts the data payload from API responses that follow the {success: true, data: {...}} pattern
 * @param promise - The promise returned by callapi()
 * @returns The data field if the response has success: true, otherwise returns the full response
 * 
 * @example
 * ```typescript
 * const users = await apidata(callapi('/api/users'));
 * console.log(users); // Just the data, not the wrapper
 * ```
 */
export function apidata<T = any>(promise: Promise<ApiResponse<T>>): Promise<T>;

/**
 * Replaces placeholders in the DOM with actual data values
 * @param data - The data object containing values
 * @param root - Root element to search for placeholders (default: document.body)
 * 
 * @example
 * ```typescript
 * const userData = { name: 'Alice', address: { city: 'New York' } };
 * // HTML: <p>Hello {name} from {address.city}!</p>
 * bindData(userData);
 * // Result: <p>Hello Alice from New York!</p>
 * ```
 */
export function bindData(data: any, root?: Element): void;

/**
 * Convenience function that combines callapi, apidata, and bindData in one call
 * @param url - API endpoint URL
 * @param root - Root element for data binding (default: document.body)
 * @param options - Request options (same as callapi)
 * @returns Promise that resolves to the bound data object
 * 
 * @example
 * ```typescript
 * // Fetch user data and automatically bind to DOM
 * const userData = await autoBind('/api/user/123');
 * ```
 */
export function autoBind<T = any>(url: string, root?: Element, options?: ApiOptions): Promise<T>;

// Make functions available globally when used via script tag
declare global {
  function callapi<T = any>(url: string, options?: ApiOptions): Promise<T>;
  function apidata<T = any>(promise: Promise<ApiResponse<T>>): Promise<T>;
  function bindData(data: any, root?: Element): void;
  function autoBind<T = any>(url: string, root?: Element, options?: ApiOptions): Promise<T>;
}

export {};
