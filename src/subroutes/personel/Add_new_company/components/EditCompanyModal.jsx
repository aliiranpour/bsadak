import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box
} from '@chakra-ui/react';

const EditCompanyModal = ({ isOpen, onClose, onEditCompany, initialCompany }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialCompany
  });

  useEffect(() => {
    reset(initialCompany);
  }, [initialCompany, reset]);

  const onSubmit = (data) => {
    onEditCompany({ ...data, _id: initialCompany._id });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>ویرایش شرکت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>نام شرکت</FormLabel>
              <Input
                {...register('Name', { required: 'این فیلد الزامی است' })}
              />
              {errors.Name && <Box color="red.500">{errors.Name.message}</Box>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>کد ثبت</FormLabel>
              <Input
                {...register('registrationNum', { required: 'این فیلد الزامی است' })}
              />
              {errors.registrationNum && <Box color="red.500">{errors.registrationNum.message}</Box>}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>توضیحات</FormLabel>
              <Textarea
                {...register('Caption')}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>آدرس</FormLabel>
              <Textarea
                {...register('Address')}
              />
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>
                لغو
              </Button>
              <Button type="submit" colorScheme="green" ml={3} borderRadius={5} bgColor={'green.300'}>
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
