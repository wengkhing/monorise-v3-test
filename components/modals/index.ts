import DeleteEntityModal from './delete-entity.modal';

const modals = {
  'delete-entity': DeleteEntityModal,
};

export type ModalName = keyof typeof modals;
export type Modals = typeof modals;

export default modals;
