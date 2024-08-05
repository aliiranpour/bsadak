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
  Input,
  Select,
  Box
} from '@chakra-ui/react';
import axios from 'axios';

const EditUserModal = ({ isOpen, onClose, onEditUser, user, positions }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: user ? {
      Name: user.Name,
      LastName: user.LastName,
      UserName: user.UserName,
      Password: user.Password,
      Phone: user.Phone,
      Email: user.Email,
      UserType: user.UserType._id
    } : {}
  });

  useEffect(() => {
    if (user) {
      reset({
        Name: user.Name,
        LastName: user.LastName,
        UserName: user.UserName,
        Password: user.Password,
        Phone: user.Phone,
        Email: user.Email,
        UserType: user.UserType._id
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      if (!user || !user._id) {
        console.error('User or User ID is missing');
        return;
      }

      const response = await axios.patch(`https://api.bsadak.ir/api/admin/user/${user._id}`, {
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

      onEditUser(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {
        reset();
        onClose();
      }}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>ویرایش کاربر</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="نام"
              {...register('Name', { required: 'نام الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.Name && <Box color="red.500">{errors.Name.message}</Box>}

            <Input
              placeholder="نام خانوادگی"
              {...register('LastName', { required: 'نام خانوادگی الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.LastName && <Box color="red.500">{errors.LastName.message}</Box>}

            <Input
              placeholder="نام کاربری"
              {...register('UserName', { required: 'نام کاربری الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.UserName && <Box color="red.500">{errors.UserName.message}</Box>}

            <Input
              placeholder="رمز عبور"
              {...register('Password', { required: 'رمز عبور الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.Password && <Box color="red.500">{errors.Password.message}</Box>}

            <Input
              placeholder="تلفن"
              {...register('Phone', { required: 'تلفن الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.Phone && <Box color="red.500">{errors.Phone.message}</Box>}

            <Input
              placeholder="ایمیل"
              {...register('Email')}
              mb={2}
              outline='1px solid black'
            />
            {errors.Email && <Box color="red.500">{errors.Email.message}</Box>}

            <Select
              placeholder="انتخاب موقعیت"
              {...register('UserType', { required: 'موقعیت الزامی است' })}
              mb={2}
              outline='1px solid black'
            >
                <option value="6519afc1e63fd7c231098bfc">admin</option>
                <option value="660d25c6502c48627dcedd85">مسئول پرداخت</option>
                <option value="662dfec34d37a761b4973b23">حسابدار</option>
                <option value="65f40c04fdf23f281bcb3fb8">مسئول حضور غیاب</option>
            </Select>
            {errors.UserType && <Box color="red.500">{errors.UserType.message}</Box>}

            <ModalFooter>
              <Button onClick={() => {
                  reset();
                  onClose();
                }} colorScheme={'blackAlpha.400'} bgColor={'blackAlpha.800'} borderRadius={5} color={'white'}>
                لغو
              </Button>
              <Button colorScheme="green" mr={3} type="submit" bgColor={'green.300'} borderRadius={5} ms={5}>
                ذخیره
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
