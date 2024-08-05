import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailCompanyModal = ({ isOpen, onClose, company }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>جزئیات شرکت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام شرکت:</Text>
            <Text>{company.Name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">کد ثبت:</Text>
            <Text>{company.registrationNum}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{company.Caption}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">آدرس:</Text>
            <Text>{company.Address}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" bgColor={'teal.600'} onClick={onClose} borderRadius={5}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailCompanyModal;
