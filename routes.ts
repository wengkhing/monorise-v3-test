import { Hono } from 'hono';
import config, { Entity } from '#/monorise/config';
import { DependencyContainer } from '@monorise/core';

const container = new DependencyContainer(config);

const app = new Hono();

app.get('/test', async (c) => {
  const entities = await container.entityRepository.listEntities({
    entityType: Entity.USER,
  });
  return c.json({
    items: entities.items,
  })
});

export default app
