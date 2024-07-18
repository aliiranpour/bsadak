import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailCompanyModal = ({ isOpen, onClose, company }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات شرکت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام شرکت:</Text>
            <Text>{company.name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">کد ثبت:</Text>
            <Text>{company.registrationCode}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{company.description}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">آدرس:</Text>
            <Text>{company.address}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailCompanyModal;
