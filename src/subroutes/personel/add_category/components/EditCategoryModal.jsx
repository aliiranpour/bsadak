import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Text
} from '@chakra-ui/react';
import axios from 'axios';

const EditCategoryModal = ({ isOpen, onClose, onEditCategory, initialCategory }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue('Name', initialCategory.Name);
    setValue('Caption', initialCategory.Caption);
  }, [initialCategory, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/category/${initialCategory._id}`, {
        Name: data.Name,
        Caption: data.Caption
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onEditCategory(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error editing category', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.300'}>
        <ModalHeader>ویرایش دسته بندی</ModalHeader>
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
              <FormLabel>توضیحات</FormLabel>
              <Textarea
                {...register('Caption', { required: 'توضیحات الزامی است' })}
                placeholder="توضیحات"
                outline={'1px solid black'}
              />
              {errors.Caption && <Text color="red.500">{errors.Caption.message}</Text>}
            </FormControl>
            <ModalFooter>
              <Button onClick={onClose} bgColor={'blackAlpha.300'} borderRadius={5}>
                لغو
              </Button>
              <Button colorScheme="teal" type="submit" ml={5} bgColor={'green.300'} borderRadius={5}>
                ذخیره
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
