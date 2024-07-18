import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea
} from '@chakra-ui/react';

const EditPositionModal = ({ isOpen, onClose, onEditPosition, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosition(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onEditPosition(position);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش سمت</ModalHeader>
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
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPositionModal;
