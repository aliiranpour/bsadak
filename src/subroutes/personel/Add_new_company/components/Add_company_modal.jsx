import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, NumberInput, NumberInputField, FormControl, FormLabel, Select
} from '@chakra-ui/react';

const AddContractualItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [year, setYear] = useState('');
  const [childAllowance, setChildAllowance] = useState('');
  const [childBenefit, setChildBenefit] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [marriageAllowance, setMarriageAllowance] = useState('');
  const [laborBenefit, setLaborBenefit] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      year,
      childAllowance,
      childBenefit,
      housingAllowance,
      marriageAllowance,
      laborBenefit
    };
    onAddItem(newItem);
    onClose();
    setYear('');
    setChildAllowance('');
    setChildBenefit('');
    setHousingAllowance('');
    setMarriageAllowance('');
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
            <FormLabel>حق فرزند</FormLabel>
            <NumberInput value={childBenefit} onChange={(valueString) => setChildBenefit(valueString)}>
              <NumberInputField placeholder="حق فرزند" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق مسکن</FormLabel>
            <NumberInput value={housingAllowance} onChange={(valueString) => setHousingAllowance(valueString)}>
              <NumberInputField placeholder="حق مسکن" />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>حق تاهل</FormLabel>
            <NumberInput value={marriageAllowance} onChange={(valueString) => setMarriageAllowance(valueString)}>
              <NumberInputField placeholder="حق تاهل" />
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
