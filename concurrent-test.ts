import { performance } from 'node:perf_hooks';

const BASE_URL = 'https://api-gallery-image.vercel.app/api/products';
const CONCURRENT_USERS = 100;

type Result = {
  status: number;
  duration: number;
};

async function hitApi(): Promise<Result> {
  const start = performance.now();

  const res = await fetch(BASE_URL);
  const duration = performance.now() - start;

  return {
    status: res.status,
    duration,
  };
}

async function run() {
  console.log(`🚀 Starting concurrent test: ${CONCURRENT_USERS} users`);

  const startAll = performance.now();

  const promises = Array.from({ length: CONCURRENT_USERS }, () => hitApi());

  const results = await Promise.all(promises);

  const totalDuration = performance.now() - startAll;

  const success = results.filter((r) => r.status === 200);
  const failed = results.filter((r) => r.status !== 200);

  const durations = results.map((r) => r.duration).sort((a, b) => a - b);

  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;

  const p95 = durations[Math.floor(durations.length * 0.95)];
  const p99 = durations[Math.floor(durations.length * 0.99)];

  console.log('--- RESULT ---');
  console.log(`Total Requests : ${results.length}`);
  console.log(`Success        : ${success.length}`);
  console.log(`Failed         : ${failed.length}`);
  console.log(`Total Time     : ${totalDuration.toFixed(2)} ms`);
  console.log(`Avg Response   : ${avg.toFixed(2)} ms`);
  console.log(`P95 Response   : ${p95.toFixed(2)} ms`);
  console.log(`P99 Response   : ${p99.toFixed(2)} ms`);
}

run().catch(console.error);
