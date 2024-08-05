import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Text
} from '@chakra-ui/react';
import axios from 'axios';

const AddPositionModal = ({ isOpen, onClose, onAddPosition }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/semat', {
        Name: data.Name,
        Caption: data.Caption
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onAddPosition(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding position', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن سمت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>نام سمت</FormLabel>
              <Input
                {...register('Name', { required: 'نام سمت الزامی است' })}
                placeholder="نام سمت"
                outline={'1px solid black'}
              />
              {errors.Name && <Text color="red.500">{errors.Name.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>توضیحات</FormLabel>
              <Textarea
                {...register('Caption', { required: 'توضیحات الزامی است' })}
                placeholder="توضیحات..."
                outline={'1px solid black'}
              />
              {errors.Caption && <Text color="red.500">{errors.Caption.message}</Text>}
            </FormControl>
            <ModalFooter>
              <Button onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>
                لغو
              </Button>
              <Button colorScheme="teal" type="submit" ml={5} borderRadius={5} bgColor={'green.800'}>
                افزودن
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPositionModal;
