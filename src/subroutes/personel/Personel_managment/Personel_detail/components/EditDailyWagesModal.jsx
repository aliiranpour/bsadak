import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const EditDailyWagesModal = ({ isOpen, onClose, personId, currentWages, onSave }) => {
  const [dailyWages, setDailyWages] = useState(currentWages ? addCommas(currentWages.toString()) : '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!dailyWages) {
      setError('لطفاً دستمزد روزانه را وارد کنید.');
      return;
    }

    const dataToSend = {
      DailyWages: parseInt(dailyWages.replace(/,/g, ''), 10),
    };

    setIsLoading(true);
    try {
      await axios.patch(`https://api.bsadak.ir/api/groupdocument/DailyWages/${personId}`, dataToSend, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      onSave();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating daily wages:', error);
      setError('خطایی در به‌روزرسانی دستمزد روزانه رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDailyWagesChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setDailyWages(addCommas(value));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش دستمزد روزانه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={3}>{error}</Text>}
          <FormControl mb={3}>
            <FormLabel>دستمزد روزانه</FormLabel>
            <Input
              type="text"
              value={dailyWages}
              onChange={handleDailyWagesChange}
            />
            {dailyWages && (
              <Text mt={2} color="gray.500">
                {numberToPersian(parseInt(dailyWages.replace(/,/g, ''), 10))} ریال
              </Text>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button 
              onClick={handleSave} 
              isLoading={isLoading}
              mr={2}
              colorScheme="green"
              color="white"
              bgColor="green.300"
              borderRadius={5}>
              ذخیره
            </Button>
          <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'gray.300'}>انصراف</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDailyWagesModal;
