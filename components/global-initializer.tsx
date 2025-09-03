'use client';

import type { Entity, MonoriseEntityConfig } from '@monorise/base';
import Monorise from '@monorise/react';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { toast } from 'sonner';
import { EntityConfig } from '#/monorise/config';
import modals from './modals';

Monorise.config({
  modals,
  entityConfig: EntityConfig as Record<Entity, MonoriseEntityConfig>,
  onApiSuccess: (response, feedback) => {
    switch (typeof feedback) {
      case 'function':
        toast(feedback(response.data));
        break;
      case 'string':
        toast(
          <>
            <IconCircleCheckFilled color='rgb(34 197 94)' />
            {feedback}
          </>,
        );
        break;
      case 'boolean':
        toast('Request success');
        break;
    }
  },
});

const GlobalInitializer = () => {
  return null;
};

export default GlobalInitializer;
