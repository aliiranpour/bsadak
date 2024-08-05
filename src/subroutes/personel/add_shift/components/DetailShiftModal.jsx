import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text
} from '@chakra-ui/react';

const DetailShiftModal = ({ isOpen, onClose, shift }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>جزئیات شیفت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام شیفت:</Text>
            <Text>{shift.Name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">ساعت شروع:</Text>
            <Text>{shift.Work.Start}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">ساعت پایان:</Text>
            <Text>{shift.Work.End}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">وضعیت:</Text>
            <Text>{shift.Active ? 'انجام شده' : 'انجام نشده'}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" bgColor={'teal.600'} onClick={onClose} borderRadius={5}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailShiftModal;
