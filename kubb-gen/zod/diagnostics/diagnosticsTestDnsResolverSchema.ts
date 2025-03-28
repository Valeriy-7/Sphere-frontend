import { z } from 'zod';

/**
 * @description Результаты проверки DNS-резолвинга
 */
export const diagnosticsTestDnsResolver200Schema = z.any();

export const diagnosticsTestDnsResolverQueryResponseSchema = z.lazy(
  () => diagnosticsTestDnsResolver200Schema,
);
