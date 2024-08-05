import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box
} from '@chakra-ui/react';
import axios from 'axios';

const AddPermissionModal = ({ isOpen, onClose, onAddPermission }) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { Name, Code } = data;
    try {
      const response = await axios.post('https://api.bsadak.ir/api/admin/permision', {
        Name,
        Code
      }, {
        headers: {
          'Authorization': ` ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      onAddPermission(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding permission', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError('Name', {
          type: 'manual',
          message: error.response.data.message,
        });
      }
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
              {...register('Name', { required: 'نام دسترسی الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.Name && <Box color="red.500">{errors.Name.message}</Box>}
            <Input
              placeholder="کد دسترسی"
              {...register('Code', { required: 'کد دسترسی الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.Code && <Box color="red.500">{errors.Code.message}</Box>}
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
