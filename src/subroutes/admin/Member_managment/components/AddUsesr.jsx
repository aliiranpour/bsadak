import React from 'react';
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
  Box,
  Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/admin/user', {
        Name: data.Name,
        LastName: data.LastName,
        UserName: data.UserName,
        Password: data.Password,
        Phone: data.Phone,
        Email: data.Email,
        UserType: data.UserType
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        }
      });
      
      onAddUser(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن کاربر جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={errors.Name}>
              <FormLabel>نام</FormLabel>
              <Input
                placeholder="نام"
                {...register('Name', { required: 'نام الزامی است' })}
              />
              {errors.Name && <Box color="red.500">{errors.Name.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.LastName}>
              <FormLabel>نام خانوادگی</FormLabel>
              <Input
                placeholder="نام خانوادگی"
                {...register('LastName', { required: 'نام خانوادگی الزامی است' })}
              />
              {errors.LastName && <Box color="red.500">{errors.LastName.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.UserName}>
              <FormLabel>نام کاربری</FormLabel>
              <Input
                placeholder="نام کاربری"
                {...register('UserName', { required: 'نام کاربری الزامی است' })}
              />
              {errors.UserName && <Box color="red.500">{errors.UserName.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.Password}>
              <FormLabel>رمز عبور</FormLabel>
              <Input
                type="password"
                placeholder="رمز عبور"
                {...register('Password', { required: 'رمز عبور الزامی است' })}
              />
              {errors.Password && <Box color="red.500">{errors.Password.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.Phone}>
              <FormLabel>تلفن</FormLabel>
              <Input
                placeholder="تلفن"
                {...register('Phone', { required: 'تلفن الزامی است' })}
              />
              {errors.Phone && <Box color="red.500">{errors.Phone.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.Email}>
              <FormLabel>ایمیل</FormLabel>
              <Input
                placeholder="ایمیل"
                {...register('Email')}
              />
              {errors.Email && <Box color="red.500">{errors.Email.message}</Box>}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.UserType}>
              <FormLabel>نوع کاربر</FormLabel>
              <Select placeholder="انتخاب نوع کاربر" {...register('UserType', { required: 'نوع کاربر الزامی است' })}>
                <option value="6519afc1e63fd7c231098bfc">admin</option>
                <option value="660d25c6502c48627dcedd85">مسئول پرداخت</option>
                <option value="662dfec34d37a761b4973b23">حسابدار</option>
                <option value="65f40c04fdf23f281bcb3fb8">مسئول حضور غیاب</option>
              </Select>
              {errors.UserType && <Box color="red.500">{errors.UserType.message}</Box>}
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} ml={3} bgColor={'blackAlpha.300'} borderRadius={5} me={5}>
                لغو
              </Button>
              <Button colorScheme="teal" type="submit" borderRadius={5} bgColor={'green.700'}>
                افزودن
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
