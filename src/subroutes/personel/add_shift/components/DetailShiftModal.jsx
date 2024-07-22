import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text
} from '@chakra-ui/react';

const DetailShiftModal = ({ isOpen, onClose, shift }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات شیفت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام شیفت:</Text>
            <Text>{shift.name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">ساعت شروع:</Text>
            <Text>{shift.startTime}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">ساعت پایان:</Text>
            <Text>{shift.endTime}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">وضعیت:</Text>
            <Text>{shift.status ? 'انجام شده' : 'انجام نشده'}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailShiftModal;
