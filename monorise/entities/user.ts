import { createEntityConfig } from '@monorise/base';
import { z } from 'zod';

const baseSchema = z
  .object({
    displayName: z
      .string()
      .min(1, 'Please provide a name for this user account'),
    firstName: z.string().min(1, 'Please provide first name'),
    lastName: z.string().min(1, 'Please provide last name'),
    jobTitle: z.string(),
  })
  .partial();

const config = createEntityConfig({
  name: 'user',
  baseSchema,
});

export default config;
