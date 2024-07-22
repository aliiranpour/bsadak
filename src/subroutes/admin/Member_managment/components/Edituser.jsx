import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select, Box
} from '@chakra-ui/react';

const EditUserModal = ({ isOpen, onClose, onEditUser, user, positions }) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
    defaultValues: user
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data) => {
    onEditUser(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>ویرایش کاربر</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="نام"
              {...register('first_name', { required: 'نام الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.first_name && <Box color="red.500">{errors.first_name.message}</Box>}

            <Input
              placeholder="نام خانوادگی"
              {...register('last_name', { required: 'نام خانوادگی الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.last_name && <Box color="red.500">{errors.last_name.message}</Box>}

            <Input
              placeholder="نام کاربری"
              {...register('username', { required: 'نام کاربری الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.username && <Box color="red.500">{errors.username.message}</Box>}

            <Input
              placeholder="رمز عبور"
              {...register('password', { required: 'رمز عبور الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.password && <Box color="red.500">{errors.password.message}</Box>}

            <Select
              placeholder="انتخاب موقعیت"
              {...register('position', { required: 'موقعیت الزامی است' })}
              mb={2}
              outline='1px solid black'
            >
              {positions.map((pos) => (
                <option key={pos.id} value={pos.name}>{pos.name}</option>
              ))}
            </Select>
            {errors.position && <Box color="red.500">{errors.position.message}</Box>}

            <Input
              placeholder="تلفن"
              {...register('tel', { required: 'تلفن الزامی است' })}
              mb={2}
              outline='1px solid black'
            />
            {errors.tel && <Box color="red.500">{errors.tel.message}</Box>}

            <ModalFooter>
              <Button onClick={onClose} colorScheme={'blackAlpha.400'} bgColor={'blackAlpha.800'} borderRadius={5} color={'white'}>
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
