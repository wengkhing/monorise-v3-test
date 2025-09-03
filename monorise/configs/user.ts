import { createEntityConfig, Entity } from '@monorise/base';
import { z } from 'zod';

const baseSchema = z
  .object({
    displayName: z
      .string()
      .min(1, 'Please provide a name for this user account'),
    firstName: z.string().min(1, 'Please provide first name'),
    lastName: z.string().min(1, 'Please provide last name'),
    jobTitle: z.string(),
    status: z.string(),
  })
  .partial();

const mutualSchema = z.object({
    posts: z.string().array(),
  })
  .partial();

const config = createEntityConfig({
  name: 'user',
  displayName: 'User',
  baseSchema,
  mutual: {
    mutualSchema,
    mutualFields: {
      posts: {
        entityType: Entity.POST,
      }
    }
  },
  tags: [
    {
      name: 'status',
      processor: (
        entity,
      ): { group?: string; sortValue?: string }[] => {
        return [
          {
            group: entity.data.status,
          },
        ];
      },
    },
  ],
});


export default config;
