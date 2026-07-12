/**
 * @fileoverview AI Recommendations stub — Taste & Tales
 * Extension point for a future AI-powered product recommendation engine.
 * Currently returns curated rule-based suggestions.
 *
 * TODO: Replace with actual ML model (e.g., Vertex AI, Personalize, or
 *       a custom collaborative filtering model) when traffic justifies it.
 */

/**
 * Get related products for a given product.
 * @param {string} productId
 * @param {string} category
 * @param {Object[]} allProducts
 * @param {number} [limit=4]
 * @returns {Object[]}
 */
export function getRelatedProducts(productId, category, allProducts, limit = 4) {
  // Current: same-category products, excluding self
  return allProducts
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, limit);
}

/**
 * Get "You may also like" suggestions based on cart contents.
 * @param {string[]} cartProductIds
 * @param {Object[]} allProducts
 * @param {number} [limit=4]
 * @returns {Object[]}
 */
export function getCartRecommendations(cartProductIds, allProducts, limit = 4) {
  // Current: products not already in cart
  return allProducts.filter((p) => !cartProductIds.includes(p.id)).slice(0, limit);
}

/**
 * Get personalized homepage recommendations.
 * @param {Object} userProfile  - { wishlist, orderHistory, lastCategory }
 * @param {Object[]} allProducts
 * @param {number} [limit=8]
 * @returns {Object[]}
 */
export function getPersonalizedRecommendations(userProfile, allProducts, limit = 8) {
  // TODO: Replace with AI model call
  // Current: bestsellers (sorted by ratingCount desc)
  return [...allProducts]
    .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
    .slice(0, limit);
}

/**
 * Get trending products (for homepage bestsellers strip).
 * @param {Object[]} allProducts
 * @param {number} [limit=6]
 * @returns {Object[]}
 */
export function getTrendingProducts(allProducts, limit = 6) {
  return [...allProducts]
    .sort((a, b) => (b.ratingAvg || 0) * (b.ratingCount || 0) - (a.ratingAvg || 0) * (a.ratingCount || 0))
    .slice(0, limit);
}

/**
 * Get gift box recommendations based on occasion.
 * @param {string} occasion - e.g. "diwali", "wedding", "corporate"
 * @param {Object[]} allProducts
 * @returns {Object[]}
 */
export function getGiftRecommendations(occasion, allProducts) {
  return allProducts.filter(
    (p) =>
      p.isCorporate ||
      p.category === "gift-boxes" ||
      (p.tags || []).includes(occasion)
  );
}
