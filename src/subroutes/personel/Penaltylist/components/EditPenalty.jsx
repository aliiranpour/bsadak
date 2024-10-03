import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const EditPenaltyModal = ({ isOpen, onClose, penalty }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    amount: addCommas(penalty.Penalty[0].Amount),
    amountInWords: numberToPersian(penalty.Penalty[0].Amount),
    reason: penalty.Penalty[0].Reason,
  });

  const handleUpdate = async () => {
    try {
      const payload = {
        Amount: formData.amount.replace(/,/g, ''),
        Reason: formData.reason,
      };

      console.log('Payload:', payload); // چاپ payload برای بررسی

      await axios.patch(`https://api.bsadak.ir/api/penalty/${penalty._id}/${penalty.Penalty[0]._id}`, payload, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: 'موفقیت',
        description: 'جریمه با موفقیت ویرایش شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error('Error updating penalty:', error);
      toast({
        title: 'خطا',
        description: 'خطایی در ویرایش جریمه رخ داد.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش جریمه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5}>
            <FormControl>
              <FormLabel>مبلغ جریمه</FormLabel>
              <Input
                type="text"
                value={formData.amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  setFormData({
                    ...formData,
                    amount: addCommas(value),
                    amountInWords: numberToPersian(value),
                  });
                }}
              />
              <Text mt={2}>{formData.amountInWords} ریال</Text>
            </FormControl>
            <FormControl>
              <FormLabel>علت جریمه</FormLabel>
              <Input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleUpdate} bgColor={'green.500'} borderRadius={5} mx={2}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose} borderRadius={5} bgColor={'gray.300'}>
            بستن
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPenaltyModal;
