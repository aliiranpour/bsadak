import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailPositionModal = ({ isOpen, onClose, position }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات سمت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام سمت:</Text>
            <Text>{position.name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{position.description}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailPositionModal;
