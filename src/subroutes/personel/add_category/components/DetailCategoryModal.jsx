import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailCategoryModal = ({ isOpen, onClose, category }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات دسته بندی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام شرکت:</Text>
            <Text>{category.company}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">نام دسته بندی:</Text>
            <Text>{category.name}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">توضیحات:</Text>
            <Text>{category.description}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailCategoryModal;
