const pong = require('../../util/pong');

describe('Testing Pong file', () => {
  it('returns pong', () => {
    expect(pong()).toBe('pong');
  });
});
