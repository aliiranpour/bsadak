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
  Switch
} from '@chakra-ui/react';

const EditShiftModal = ({ isOpen, onClose, onEditShift, initialShift }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (initialShift) {
      setValue('name', initialShift.Name);
      setValue('startTime', initialShift.Work.Start);
      setValue('endTime', initialShift.Work.End);
      setValue('status', initialShift.Active);
    }
  }, [initialShift, setValue]);

  const onSubmit = (data) => {
    const updatedShift = {
      ...initialShift,
      Name: data.name,
      Work: {
        Start: data.startTime,
        End: data.endTime
      },
      Active: data.status
    };
    onEditShift(updatedShift);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.100'}>
        <ModalHeader>ویرایش شیفت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={errors.name}>
              <FormLabel>نام شیفت</FormLabel>
              <Input
                {...register('name', { required: 'نام شیفت الزامی است' })}
                placeholder="نام شیفت"
              />
            </FormControl>
            <FormControl mb={4} isInvalid={errors.startTime}>
              <FormLabel>ساعت شروع</FormLabel>
              <Input
                type="time"
                {...register('startTime', { required: 'ساعت شروع الزامی است' })}
              />
            </FormControl>
            <FormControl mb={4} isInvalid={errors.endTime}>
              <FormLabel>ساعت پایان</FormLabel>
              <Input
                type="time"
                {...register('endTime', { required: 'ساعت پایان الزامی است' })}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="status" mb="0">
                وضعیت
              </FormLabel>
              <Switch id="status" {...register('status')} />
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} bgColor={'blackAlpha.300'} borderRadius={5}>
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

export default EditShiftModal;
