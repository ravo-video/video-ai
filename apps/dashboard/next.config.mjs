/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  async headers() {
    return [
      {
        source: '/:path',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  webpack(config, { isServer, dev }) {
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? '../static/wasm/[modulehash].wasm'
        : 'static/wasm/[modulehash].wasm';

    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      perf_hooks: false,
      worker_threads: false,
    };

    return config;
  },
};

export default nextConfig;
