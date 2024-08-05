import React, { useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, NumberInput, NumberInputField, Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const EditContractualItemModal = ({ isOpen, onClose, onEditItem, initialItem }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: initialItem
  });

  useEffect(() => {
    setValue('year', initialItem.year);
    setValue('childAllowance', initialItem.childAllowance);
    setValue('spouseAllowance', initialItem.spouseAllowance);
    setValue('insuranceAllowance', initialItem.insuranceAllowance);
    setValue('housingAllowance', initialItem.housingAllowance);
    setValue('laborBenefit', initialItem.laborBenefit);
  }, [initialItem, setValue]);

  const onSubmit = (data) => {
    const updatedItem = {
      ...initialItem,
      year: data.year,
      childAllowance: parseFloat(data.childAllowance),
      spouseAllowance: parseFloat(data.spouseAllowance),
      insuranceAllowance: parseFloat(data.insuranceAllowance),
      housingAllowance: parseFloat(data.housingAllowance),
      laborBenefit: parseFloat(data.laborBenefit)
    };
    onEditItem(updatedItem);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.300'}>
        <ModalHeader>ویرایش مورد قراردادی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
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
            <FormControl mb={4}>
              <FormLabel>حق اولاد</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('childAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>حق همسر</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('spouseAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>حق بیمه</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('insuranceAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>حق مسکن</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('housingAllowance', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>بن کارگری</FormLabel>
              <NumberInput>
                <NumberInputField
                  {...register('laborBenefit', { required: true })}
                  outline={'1px solid black'}
                />
              </NumberInput>
            </FormControl>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} bgColor={'blackAlpha.300'} borderRadius={5}>
                لغو
              </Button>
              <Button colorScheme="blue" type="submit" ml={5} bgColor={'green.300'} borderRadius={5}>
                ذخیره
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditContractualItemModal;
