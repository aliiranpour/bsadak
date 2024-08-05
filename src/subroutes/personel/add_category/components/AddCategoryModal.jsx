import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Text, Select
} from '@chakra-ui/react';
import axios from 'axios';

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const handleRefresh = () => {
    window.location.reload();
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/category', {
        Name: data.Name,
        Caption: data.Caption,
        CompanyId: data.CompanyId
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onAddCategory(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن دسته بندی جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>نام دسته بندی</FormLabel>
              <Input
                {...register('Name', { required: 'نام دسته بندی الزامی است' })}
                placeholder="نام دسته بندی"
                outline={'1px solid black'}
              />
              {errors.Name && <Text color="red.500">{errors.Name.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>کد ثبت</FormLabel>
              <Input
                {...register('registrationNum', { required: 'کد ثبت الزامی است' })}
                placeholder="کد ثبت"
                outline={'1px solid black'}
              />
              {errors.registrationNum && <Text color="red.500">{errors.registrationNum.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>توضیحات</FormLabel>
              <Textarea
                {...register('Caption')}
                placeholder="توضیحات..."
                outline={'1px solid black'}
              />
              {errors.Caption && <Text color="red.500">{errors.Caption.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>آدرس</FormLabel>
              <Textarea
                {...register('Address', { required: 'آدرس الزامی است' })}
                placeholder="آدرس"
                outline={'1px solid black'}
              />
              {errors.Address && <Text color="red.500">{errors.Address.message}</Text>}
            </FormControl>
            <ModalFooter>
              <Button onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>
                لغو
              </Button>
              <Button colorScheme="teal" type="submit" ml={5} borderRadius={5} bgColor={'green.800'} onClick={handleRefresh} onSubmit={onSubmit}>
                افزودن
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
