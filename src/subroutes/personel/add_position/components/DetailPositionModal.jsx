import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailPositionModal = ({ isOpen, onClose, position }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>جزئیات سمت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام سمت:</Text>
            <Text>{position.Name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{position.Caption}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" bgColor={'teal.600'} onClick={onClose} borderRadius={5}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailPositionModal;
