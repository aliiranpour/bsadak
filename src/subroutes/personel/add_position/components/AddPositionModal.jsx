import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea
} from '@chakra-ui/react';

const AddPositionModal = ({ isOpen, onClose, onAddPosition }) => {
  const [position, setPosition] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosition(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onAddPosition({ ...position, id: Date.now() });
    onClose();
    setPosition({ name: '', description: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن سمت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>نام سمت</FormLabel>
            <Input
              name="name"
              value={position.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>توضیحات</FormLabel>
            <Textarea
              name="description"
              value={position.description}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPositionModal;
