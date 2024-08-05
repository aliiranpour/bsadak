import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Switch, Text
} from '@chakra-ui/react';
import axios from 'axios';

const AddShiftModal = ({ isOpen, onClose, onAddShift }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('https://api.bsadak.ir/api/shift', {
        Name: data.Name,
        Start: data.Start,
        End: data.End,
        Status: data.Status === 'true'
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onAddShift({ ...data, Status: data.Status === 'true' });
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding shift', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن شیفت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={errors.Name}>
              <FormLabel>نام شیفت</FormLabel>
              <Input {...register('Name', { required: 'نام شیفت الزامی است' })} />
              {errors.Name && <Text color="red.500">{errors.Name.message}</Text>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.Start}>
              <FormLabel>ساعت شروع</FormLabel>
              <Input type="time" {...register('Start', { required: 'ساعت شروع الزامی است' })} />
              {errors.Start && <Text color="red.500">{errors.Start.message}</Text>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.End}>
              <FormLabel>ساعت پایان</FormLabel>
              <Input type="time" {...register('End', { required: 'ساعت پایان الزامی است' })} />
              {errors.End && <Text color="red.500">{errors.End.message}</Text>}
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="status" mb="0">
                وضعیت
              </FormLabel>
              <Switch id="status" {...register('Status')} />
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>لغو</Button>
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

export default AddShiftModal;
