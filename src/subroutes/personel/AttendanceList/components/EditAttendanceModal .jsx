import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import axios from 'axios';

const EditAttendanceModal = ({ isOpen, onClose, attendance, categories, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedWorkplace, setSelectedWorkplace] = useState('');

  const attendanceStatusOptions = [
    { label: 'ماموریت', value: 1 },
    { label: 'مرخصی استحقاقی', value: 2 },
    { label: 'تعطیل', value: 3 },
    { label: 'تمام روز', value: 4 },
    { label: 'نصف روز', value: 5 },
    { label: 'مرخصی', value: 6 },
  ];

  const handleSave = async () => {
    if (!selectedStatus || !selectedWorkplace) return;

    try {
      await axios.patch(
        `http://api.bsadak.ir/api/presence/edit/${attendance._id}`,
        {
          type: selectedStatus,
          workplace: selectedWorkplace,
          reason: 'test',
        },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        }
      );
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش حضور و غیاب</ModalHeader>
        <ModalBody>
          <Text mb={4}>نام: {attendance?.Personnel?.Name} {attendance?.Personnel?.LastName}</Text>
          <FormControl mb={3}>
            <FormLabel>وضعیت حضور</FormLabel>
            <Select
              placeholder="انتخاب وضعیت"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(parseInt(e.target.value))}
            >
              {attendanceStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>محل کار</FormLabel>
            <Select
              placeholder="انتخاب محل کار"
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSave}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>
            انصراف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAttendanceModal;
