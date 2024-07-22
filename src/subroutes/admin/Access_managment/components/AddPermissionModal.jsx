import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box
} from '@chakra-ui/react';

const AddPermissionModal = ({ isOpen, onClose, onAddPermission, allPermissions }) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { newPermission } = data;
    if (allPermissions.includes(newPermission)) {
      setError('newPermission', {
        type: 'manual',
        message: 'این دسترسی از قبل وجود دارد!',
      });
    } else {
      onAddPermission(newPermission);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن دسترسی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="نام دسترسی"
              {...register('newPermission', { required: 'نام دسترسی الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.newPermission && <Box color="red.500">{errors.newPermission.message}</Box>}
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>لغو</Button>
              <Button colorScheme="teal" mr={3} type="submit" borderRadius={5}>
                افزودن
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPermissionModal;
