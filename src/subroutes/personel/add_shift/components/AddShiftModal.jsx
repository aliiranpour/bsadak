import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Checkbox
} from '@chakra-ui/react';

const AddShiftModal = ({ isOpen, onClose, onAddShift }) => {
  const [shift, setShift] = useState({
    name: '',
    startTime: '',
    endTime: '',
    status: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShift(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onAddShift({ ...shift, id: Date.now() });
    onClose();
    setShift({ name: '', startTime: '', endTime: '', status: false });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن شیفت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>نام شیفت</FormLabel>
            <Input name="name" value={shift.name} onChange={handleChange} placeholder="نام شیفت" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>ساعت شروع</FormLabel>
            <Input name="startTime" type="time" value={shift.startTime} onChange={handleChange} placeholder="ساعت شروع" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>ساعت پایان</FormLabel>
            <Input name="endTime" type="time" value={shift.endTime} onChange={handleChange} placeholder="ساعت پایان" />
          </FormControl>
          <FormControl mb={4}>
            <Checkbox name="status" isChecked={shift.status} onChange={handleChange}>
              انجام شده
            </Checkbox>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            لغو
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddShiftModal;
