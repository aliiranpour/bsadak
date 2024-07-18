import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text
} from '@chakra-ui/react';

const DetailContractualItemModal = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات مورد قراردادی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">سال:</Text>
            <Text>{item.year}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">حق اولاد:</Text>
            <Text>{item.childAllowance}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">حق همسر:</Text>
            <Text>{item.spouseAllowance}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">حق بیمه:</Text>
            <Text>{item.insuranceAllowance}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">حق مسکن:</Text>
            <Text>{item.housingAllowance}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">بن کارگری:</Text>
            <Text>{item.laborBenefit}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailContractualItemModal;
