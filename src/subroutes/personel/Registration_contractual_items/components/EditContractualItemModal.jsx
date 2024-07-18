import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, NumberInput, NumberInputField, Select
} from '@chakra-ui/react';

const EditContractualItemModal = ({ isOpen, onClose, onEditItem, initialItem }) => {
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleNumberChange = (name, value) => {
    setItem(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onEditItem(item);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش مورد قراردادی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>سال</FormLabel>
            <Select name="year" value={item.year} onChange={handleChange}>
              <option value="">انتخاب سال</option>
              {[2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق اولاد</FormLabel>
            <NumberInput value={item.childAllowance} onChange={(value) => handleNumberChange('childAllowance', value)}>
              <NumberInputField name="childAllowance" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق همسر</FormLabel>
            <NumberInput value={item.spouseAllowance} onChange={(value) => handleNumberChange('spouseAllowance', value)}>
              <NumberInputField name="spouseAllowance" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق بیمه</FormLabel>
            <NumberInput value={item.insuranceAllowance} onChange={(value) => handleNumberChange('insuranceAllowance', value)}>
              <NumberInputField name="insuranceAllowance" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق مسکن</FormLabel>
            <NumberInput value={item.housingAllowance} onChange={(value) => handleNumberChange('housingAllowance', value)}>
              <NumberInputField name="housingAllowance" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>بن کارگری</FormLabel>
            <NumberInput value={item.laborBenefit} onChange={(value) => handleNumberChange('laborBenefit', value)}>
              <NumberInputField name="laborBenefit" />
            </NumberInput>
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

export default EditContractualItemModal;
