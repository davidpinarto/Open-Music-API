const InvariantError = require('../../exceptions/InvariantError');
const { ImageHeadersSchema } = require('./schema');

const CoversValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CoversValidator;
