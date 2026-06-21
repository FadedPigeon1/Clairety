/**
 * Clairety API Client
 *
 * Centralized API calls to the Express backend.
 * Base URL is read from .env via react-native-dotenv.
 */

import { API_BASE_URL } from '@env';

const BASE = API_BASE_URL || 'http://localhost:3000/api';

/**
 * Fetch all closet items.
 * @returns {Promise<Array>} Array of closet item objects
 */
export async function fetchCloset() {
  const response = await fetch(`${BASE}/closet`);
  const json = await response.json();
  return json.data || [];
}

/**
 * Add a new item to the closet.
 * @param {{ name: string, category: string, image: string }} item
 * @returns {Promise<{ success: boolean, data?: object }>}
 */
export async function addClosetItem(item) {
  const response = await fetch(`${BASE}/closet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  const json = await response.json();
  return {
    success: json.message === 'success',
    data: json.data,
  };
}

/**
 * Delete an item from the closet.
 * @param {number} id - Item ID
 * @returns {Promise<boolean>} Whether deletion was successful
 */
export async function deleteClosetItem(id) {
  const response = await fetch(`${BASE}/closet/${id}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json.message === 'success';
}

/**
 * Fetch outfit match suggestions.
 * @returns {Promise<Array>} Array of suggestion objects
 */
export async function fetchSuggestions() {
  const response = await fetch(`${BASE}/suggestions`);
  const json = await response.json();
  return json.data || [];
}
