import React, { useState } from 'react';
import {
  Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select
} from '@chakra-ui/react';
import axios from 'axios';

const YearModal = ({ isOpen, onClose, onAddYear }) => {
  const years = Array.from({ length: 31 }, (_, i) => 1390 + i);
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleAddYear = async () => {
    try {
      await axios.post('https://api.bsadak.ir/api/year', {
        Number: selectedYear
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onAddYear();
      onClose();
      window.location.reload(); // Refresh the page after adding the company
    } catch (error) {
      console.error('Error adding year', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن سال</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select placeholder="سال مورد نظر را انتخاب کنید" onChange={handleYearChange}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleAddYear}  borderRadius={5} bgColor={'green.900'}>
            افزودن سال
          </Button>
          <Button variant="ghost" onClick={onClose}  borderRadius={5} bgColor={'blackAlpha.600'}>
            بستن
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Add default prop for onAddYear
YearModal.defaultProps = {
  onAddYear: () => {}, // Default to a no-op function if not provided
};

export default YearModal;
