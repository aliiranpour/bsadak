import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text
} from '@chakra-ui/react';

const DetailCategoryModal = ({ isOpen, onClose, category }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
        <ModalHeader>جزئیات دسته بندی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام دسته بندی:</Text>
            <Text>{category.Name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{category.Caption}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">شرکت:</Text>
            <Text>{category.Company.Name}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" bgColor={'teal.600'} onClick={onClose} borderRadius={5}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailCategoryModal;
