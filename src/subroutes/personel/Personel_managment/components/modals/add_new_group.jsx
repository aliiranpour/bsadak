import React, { useState, useEffect } from 'react';
import {
  Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select
} from '@chakra-ui/react';
import axios from 'axios';

const AddGroupModal = ({ isOpen, onClose, onAddGroup }) => {
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/year', {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        
        // Check if the response contains an array and set the years
        if (response.data && Array.isArray(response.data.data)) {
          setYears(response.data.data);
        } else {
          console.error('Invalid data format for years:', response.data);
        }
      } catch (error) {
        console.error('Error fetching years', error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/company', {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        
        // Check if the response contains an array and set the companies
        if (response.data && Array.isArray(response.data.data)) {
          setCompanies(response.data.data);
        } else {
          console.error('Invalid data format for companies:', response.data);
        }
      } catch (error) {
        console.error('Error fetching companies', error);
      }
    };

    fetchYears();
    fetchCompanies();
  }, []);

  const handleAddGroup = async () => {
    try {
      await axios.post('https://api.bsadak.ir/api/group', {
        Year: selectedYear,
        Company: selectedCompany,
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      onAddGroup();
      onClose();
      window.location.reload(); // Refresh the page after adding the company
    } catch (error) {
      console.error('Error adding group', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن گروه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select placeholder="انتخاب سال" onChange={(e) => setSelectedYear(e.target.value)} mb={4}>
            {years.map(year => (
              <option key={year._id} value={year._id}>{year.Number}</option>
            ))}
          </Select>
          <Select placeholder="انتخاب شرکت" onChange={(e) => setSelectedCompany(e.target.value)}>
            {companies.map(company => (
              <option key={company._id} value={company._id}>{company.Name}</option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} borderRadius={5}>
            بستن
          </Button>
          <Button colorScheme="blue" onClick={handleAddGroup} borderRadius={5}>
            افزودن گروه
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AddGroupModal.defaultProps = {
  onAddGroup: () => {}, // Default to a no-op function if not provided
};

export default AddGroupModal;
