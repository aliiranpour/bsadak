import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Text
} from '@chakra-ui/react';
import axios from 'axios';

const EditCompanyModal = ({ isOpen, onClose, onEditCompany, initialCompany }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue('Name', initialCompany.Name);
    setValue('registrationNum', initialCompany.registrationNum);
    setValue('Caption', initialCompany.Caption);
    setValue('Address', initialCompany.Address);
  }, [initialCompany, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/company/${initialCompany._id}`, {
        Name: data.Name,
        registrationNum: data.registrationNum,
        Caption: data.Caption,
        Address: data.Address
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onEditCompany(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error editing company', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.300'}>
        <ModalHeader>ویرایش شرکت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>نام شرکت</FormLabel>
              <Input
                {...register('Name', { required: 'نام شرکت الزامی است' })}
                placeholder="نام شرکت"
                outline={'2px solid black'}
              />
              {errors.Name && <Text color="red.500">{errors.Name.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>کد ثبت</FormLabel>
              <Input
                {...register('registrationNum', { required: 'کد ثبت الزامی است' })}
                placeholder="کد ثبت"
                outline={'2px solid black'}
              />
              {errors.registrationNum && <Text color="red.500">{errors.registrationNum.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>توضیحات</FormLabel>
              <Textarea
                {...register('Caption', { required: 'توضیحات الزامی است' })}
                placeholder="توضیحات"
                outline={'2px solid black'}
              />
              {errors.Caption && <Text color="red.500">{errors.Caption.message}</Text>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>آدرس</FormLabel>
              <Textarea
                {...register('Address', { required: 'آدرس الزامی است' })}
                placeholder="آدرس"
                outline={'2px solid black'}
              />
              {errors.Address && <Text color="red.500">{errors.Address.message}</Text>}
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

export default EditCompanyModal;
