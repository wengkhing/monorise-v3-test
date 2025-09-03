import { createEntityConfig, Entity } from '@monorise/base';
import { z } from 'zod';

const baseSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Please provide a name for this user account'),
    address: z.string(),
    size: z.number(),
    billingStatus: z.enum(['individual', 'full']),
  })
  .partial();

const createSchema = z.object({
  name: z.string(),
});


const config = createEntityConfig({
  name: 'organisation',
  displayName: 'Organisation',
  baseSchema,
  createSchema,
  tags: [
    {
      name: 'billingStatus',
      processor: (
        entity,
      ): { group?: string; sortValue?: string }[] => {
        return [
          {
            group: entity.data.billingStatus,
          },
        ];
      },
    },
  ],
});


export default config;
