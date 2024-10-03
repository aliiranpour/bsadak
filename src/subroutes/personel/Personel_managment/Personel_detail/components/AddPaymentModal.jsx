import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Text, Select } from '@chakra-ui/react';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const AddPaymentModal = ({ isOpen, onClose, personId, onSave }) => {
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setAmount(addCommas(value));
  };

  const handleSave = async () => {
    if (!amount || !month || !reason) {
      setError('لطفاً تمام فیلدها را پر کنید.');
      return;
    }

    const dataToSend = {
      Amount: parseInt(amount.replace(/,/g, ''), 10),
      Month: parseInt(month, 10),
      Reason: reason,
    };

    setIsLoading(true);
    try {
      await axios.patch(`https://api.bsadak.ir/api/groupdocument/sayer/${personId}`, dataToSend, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      onSave();
      onClose();
    } catch (error) {
      console.error('Error adding payment:', error);
      setError('خطایی در افزودن پرداختی رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const months = [
    { value: 1, label: 'فروردین' },
    { value: 2, label: 'اردیبهشت' },
    { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' },
    { value: 5, label: 'مرداد' },
    { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' },
    { value: 8, label: 'آبان' },
    { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' },
    { value: 11, label: 'بهمن' },
    { value: 12, label: 'اسفند' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن پرداختی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={3}>{error}</Text>}
          <FormControl mb={3}>
            <FormLabel>مبلغ پرداختی</FormLabel>
            <Input
              type="text"
              value={amount}
              onChange={handleAmountChange}
            />
            <Text mt={2} color="gray.500">{numberToPersian(parseInt(amount.replace(/,/g, ''), 10))} ریال</Text>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>ماه</FormLabel>
            <Select
              placeholder="انتخاب ماه"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>علت پرداخت</FormLabel>
            <Input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={handleSave}
            isLoading={isLoading}
            mr={2}
            colorScheme="teal"
            color="white"
            bgColor="green.900"
            borderRadius={5}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'blackAlpha.300'}>انصراف</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPaymentModal;
