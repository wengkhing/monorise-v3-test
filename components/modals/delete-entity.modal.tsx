import { type CreatedEntity, type Entity, deleteEntity } from '@monorise/react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog';
import { EntityConfig } from '#/monorise/config';

export type DeleteEntityModalProps<T extends Entity> = {
  entityType: T;
  entity?: CreatedEntity<T>;
  onDeleted: () => void;
  displayFieldName: keyof CreatedEntity<T>['data'];
};

const DeleteEntityModal = <T extends Entity>({
  entityType,
  entity,
  onDeleted,
  displayFieldName,
}: DeleteEntityModalProps<T>) => {
  const entityName = EntityConfig[entityType].displayName.toLowerCase();

  const handleDelete = async () => {
    if (entity?.entityId) {
      await deleteEntity(entityType, entity.entityId);
      onDeleted?.();
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You&apos;re about to delete &quot;
          {(entity?.data as any)?.[displayFieldName]}&quot;
        </AlertDialogDescription>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this{' '}
          {entityName} and remove the {entityName} data from our servers
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className='bg-red-600 hover:bg-red-500'
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteEntityModal;
