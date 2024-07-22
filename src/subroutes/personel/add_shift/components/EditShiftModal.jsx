import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Checkbox
} from '@chakra-ui/react';

const EditShiftModal = ({ isOpen, onClose, onEditShift, initialShift }) => {
  const [shift, setShift] = useState(initialShift);

  useEffect(() => {
    setShift(initialShift);
  }, [initialShift]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShift(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onEditShift(shift);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش شیفت</ModalHeader>
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
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditShiftModal;
