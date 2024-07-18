import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, NumberInput, NumberInputField, FormControl, FormLabel, Select
} from '@chakra-ui/react';

const AddContractualItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [year, setYear] = useState('');
  const [childAllowance, setChildAllowance] = useState('');
  const [spouseAllowance, setSpouseAllowance] = useState('');
  const [insuranceAllowance, setInsuranceAllowance] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [laborBenefit, setLaborBenefit] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      year,
      childAllowance,
      spouseAllowance,
      insuranceAllowance,
      housingAllowance,
      laborBenefit
    };
    onAddItem(newItem);
    onClose();
    setYear('');
    setChildAllowance('');
    setSpouseAllowance('');
    setInsuranceAllowance('');
    setHousingAllowance('');
    setLaborBenefit('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن مورد قراردادی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>سال</FormLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)} placeholder="انتخاب سال">
              {[2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق اولاد</FormLabel>
            <NumberInput value={childAllowance} onChange={(valueString) => setChildAllowance(valueString)}>
              <NumberInputField placeholder="حق اولاد" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق همسر</FormLabel>
            <NumberInput value={spouseAllowance} onChange={(valueString) => setSpouseAllowance(valueString)}>
              <NumberInputField placeholder="حق همسر" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق بیمه</FormLabel>
            <NumberInput value={insuranceAllowance} onChange={(valueString) => setInsuranceAllowance(valueString)}>
              <NumberInputField placeholder="حق بیمه" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق مسکن</FormLabel>
            <NumberInput value={housingAllowance} onChange={(valueString) => setHousingAllowance(valueString)}>
              <NumberInputField placeholder="حق مسکن" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>بن کارگری</FormLabel>
            <NumberInput value={laborBenefit} onChange={(valueString) => setLaborBenefit(valueString)}>
              <NumberInputField placeholder="بن کارگری" />
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleAddItem}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            لغو
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddContractualItemModal;
