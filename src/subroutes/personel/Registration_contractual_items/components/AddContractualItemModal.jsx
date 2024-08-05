import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, NumberInput, NumberInputField, Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const AddContractualItemModal = ({ isOpen, onClose, onAddItem }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newItem = {
      id: Date.now(),
      year: data.year,
      childAllowance: parseFloat(data.childAllowance),
      spouseAllowance: parseFloat(data.spouseAllowance),
      insuranceAllowance: parseFloat(data.insuranceAllowance),
      housingAllowance: parseFloat(data.housingAllowance),
      laborBenefit: parseFloat(data.laborBenefit)
    };
    onAddItem(newItem);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'green.100'}>
        <ModalHeader>افزودن مورد قراردادی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={errors.year}>
              <FormLabel>سال</FormLabel>
              <Select
                {...register('year', { required: true })}
                outline={'1px solid black'}
              >
                {[2022, 2023, 2024, 2025].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.childAllowance}>
              <FormLabel>حق اولاد</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('childAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.spouseAllowance}>
              <FormLabel>حق همسر</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('spouseAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.insuranceAllowance}>
              <FormLabel>حق بیمه</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('insuranceAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.housingAllowance}>
              <FormLabel>حق مسکن</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('housingAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4} isInvalid={errors.laborBenefit}>
              <FormLabel>بن کارگری</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('laborBenefit', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>لغو</Button>
              <Button colorScheme="teal" type="submit" ml={5} borderRadius={5} bgColor={'green.800'}>
                افزودن
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddContractualItemModal;
