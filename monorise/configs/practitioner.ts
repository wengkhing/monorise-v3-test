import { createEntityConfig, Entity } from '@monorise/base';
import { z } from 'zod';

const baseSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1, 'Please provide first name'),
    lastName: z.string().min(1, 'Please provide last name'),
    fop: z.string(),
    test: z.string(),
  })
  .partial();

const config = createEntityConfig({
  name: 'practitioner',
  displayName: 'Practitioner',
  baseSchema,
  uniqueFields: ['email'],
});


export default config;

