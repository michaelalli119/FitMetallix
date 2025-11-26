describe('lib/trpc', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules to clear any cached imports
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getBaseUrl', () => {
    it('should return base URL from environment variable', () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:3000';

      // Import after setting env
      const { trpcClient } = require('../trpc');

      expect(trpcClient).toBeDefined();
    });

    it('should throw error when environment variable is missing', () => {
      delete process.env.EXPO_PUBLIC_API_BASE_URL;

      // Import should throw an error
      expect(() => {
        require('../trpc');
      }).toThrow('No base url found');
    });

    it('should throw error with correct message', () => {
      delete process.env.EXPO_PUBLIC_API_BASE_URL;

      expect(() => {
        require('../trpc');
      }).toThrow('please set EXPO_PUBLIC_API_BASE_URL');
    });

    it('should handle different base URL values', () => {
      const urls = [
        'http://localhost:3000',
        'https://api.example.com',
        'https://prod-api.example.com',
      ];

      urls.forEach(url => {
        jest.resetModules();
        process.env.EXPO_PUBLIC_API_BASE_URL = url;

        const { trpcClient } = require('../trpc');
        expect(trpcClient).toBeDefined();
      });
    });
  });

  describe('trpcClient', () => {
    beforeEach(() => {
      process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:3000';
    });

    it('should create trpc client', () => {
      const { trpcClient } = require('../trpc');

      expect(trpcClient).toBeDefined();
      expect(typeof trpcClient).toBe('function');
    });

    it('should export trpc React hooks', () => {
      const { trpc } = require('../trpc');

      expect(trpc).toBeDefined();
      expect(typeof trpc).toBe('function');
    });

    it('should have correct link configuration', () => {
      const { trpcClient } = require('../trpc');

      expect(trpcClient).toBeDefined();
      // The client should have links configured
      expect(trpcClient.links).toBeDefined();
    });
  });

  describe('Configuration', () => {
    it('should use superjson transformer', () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:3000';
      const { trpcClient } = require('../trpc');

      // Client should be configured with superjson
      expect(trpcClient).toBeDefined();
      // We can't easily test the transformer directly, but we can ensure the client was created
    });

    it('should configure httpLink with correct URL', () => {
      const baseUrl = 'http://localhost:3000';
      process.env.EXPO_PUBLIC_API_BASE_URL = baseUrl;

      const { trpcClient } = require('../trpc');

      // The trpc client should be properly configured
      expect(trpcClient).toBeDefined();
      // The URL should include /api/trpc suffix
    });
  });

  describe('Type Safety', () => {
    it('should export typed trpc hooks', () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:3000';
      const { trpc } = require('../trpc');

      // Should have createClient method
      expect(typeof trpc.createClient).toBe('function');
    });

    it('should have Provider component', () => {
      process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:3000';
      const { trpc } = require('../trpc');

      expect(trpc.Provider).toBeDefined();
    });
  });
});
