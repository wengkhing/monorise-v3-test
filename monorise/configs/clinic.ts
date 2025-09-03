import { createEntityConfig } from '@monorise/base';
import { z } from 'zod';

const baseSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Please provide a name for this user account'),
  })
  .partial();

const createSchema = z.object({
  name: z.string()
});

const mutualSchema = z.object({
    practitioners: z.string().array(),
  })
  .partial();

const config = createEntityConfig({
  name: 'clinic',
  displayName: 'Clinic',
  baseSchema,
  createSchema,
  searchableFields: ['name'],
  mutual: {
    mutualSchema,
    mutualFields: {
      practitioners: {
        entityType: 'practitioner',
      }
    }
  },
});


export default config;
