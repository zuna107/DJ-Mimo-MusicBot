/**
 * Mengacak elemen dalam array
 * @param {Array} array - Array yang akan diacak
 * @returns {Array} - Array yang telah diacak
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
/**
 * Mengambil ID track dari URL Spotify
 * @param {string} url - URL Spotify
 * @returns {string|null} - ID track atau null jika tidak valid
 */
function extractTrackId(url) {
    const match = url.match(/track\/(\w+)/);
    return match ? match[1] : null;
  }
  
  module.exports = { shuffleArray, extractTrackId };
  
  