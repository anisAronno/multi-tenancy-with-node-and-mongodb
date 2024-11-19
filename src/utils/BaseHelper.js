// src/utils/BaseHelper.js
const AppseroError = require('../errors/AppseroError.js');
const crypto = require('crypto');
const Logger = require('../utils/Logger');

class BaseHelper {
  /**
   * Stop process with custom error
   * @param {string} message Error message
   * @param {Object} [context] Additional context for logging
   * @throws {AppseroError}
   */
  static stopProcess(message, context = {}) {
    Logger.error('Process Stopped', { message, ...context });
    throw new AppseroError(message);
  }

  /**
   * Generate random string
   * @param {number} length Length of random string
   * @param {string} [type='alphanumeric'] Type of random string (alphanumeric, numeric, alpha)
   * @returns {string}
   */
  static strRandom(length = 20, type = 'alphanumeric') {
    const charSets = {
      alphanumeric:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      numeric: '0123456789',
      alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    };

    const chars = charSets[type] || charSets.alphanumeric;
    let result = '';

    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      const randomIndex = bytes[i] % chars.length;
      result += chars[randomIndex];
    }

    return result;
  }
}

module.exports = BaseHelper;
