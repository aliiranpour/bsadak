import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Textarea
} from '@chakra-ui/react';

const EditCompanyModal = ({ isOpen, onClose, onEditCompany, initialCompany }) => {
  const [company, setCompany] = useState(initialCompany);

  useEffect(() => {
    setCompany(initialCompany);
  }, [initialCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onEditCompany(company);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش شرکت</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>نام شرکت</FormLabel>
            <Input
              name="name"
              value={company.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>کد ثبت</FormLabel>
            <Input
              name="registrationCode"
              value={company.registrationCode}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>توضیحات</FormLabel>
            <Textarea
              name="description"
              value={company.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>آدرس</FormLabel>
            <Textarea
              name="address"
              value={company.address}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCompanyModal;
