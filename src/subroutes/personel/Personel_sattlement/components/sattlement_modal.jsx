import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, Select
} from '@chakra-ui/react';

const SettlementModal = ({ isOpen, onClose, settlement, employees, onSettle, onUpdate, newSettlement, setNewSettlement }) => {
  const [currentSettlement, setCurrentSettlement] = useState(newSettlement);

  useEffect(() => {
    if (settlement) {
      setCurrentSettlement(settlement);
    } else {
      setCurrentSettlement(newSettlement);
    }
  }, [settlement, newSettlement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSettlement(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (settlement) {
      onUpdate(currentSettlement);
    } else {
      onSettle();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{settlement ? 'ویرایش تسویه' : 'تسویه جدید'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>انتخاب پرسنل</FormLabel>
            <Select
              name="employeeId"
              value={currentSettlement.employeeId}
              onChange={handleChange}
            >
              <option value="">انتخاب پرسنل</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>تاریخ تسویه</FormLabel>
            <Input
              name="date"
              type="date"
              value={currentSettlement.date}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {settlement ? 'ذخیره' : 'تسویه'}
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettlementModal;
