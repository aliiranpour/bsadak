import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Textarea, FormControl, FormLabel, Box
} from '@chakra-ui/react';

const AddCompanyModal = ({ isOpen, onClose, onAddCompany }) => {
  const [name, setName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleAddCompany = () => {
    const newCompany = {
      id: Date.now(), 
      name,
      registrationCode,
      description,
      address
    };
    onAddCompany(newCompany);
    onClose();
    setName('');
    setRegistrationCode('');
    setDescription('');
    setAddress('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن شرکت جدید</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>نام شرکت</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام شرکت" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>کد ثبت شرکت</FormLabel>
            <Input value={registrationCode} onChange={(e) => setRegistrationCode(e.target.value)} placeholder="کد ثبت شرکت" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>توضیحات</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="توضیحات" height="100px" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>آدرس</FormLabel>
            <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="آدرس" height="100px" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleAddCompany}>
            افزودن شرکت
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            لغو
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCompanyModal;
