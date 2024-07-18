import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box, Text
} from '@chakra-ui/react';

const DetailEmployeeModal = ({ isOpen, onClose, employee }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات پرسنل</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">نام:</Text>
            <Text>{employee.firstName}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">نام خانوادگی:</Text>
            <Text>{employee.lastName}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">کد ملی:</Text>
            <Text>{employee.nationalCode}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">کد پرسنلی:</Text>
            <Text>{employee.personnelCode}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">نام پدر:</Text>
            <Text>{employee.fatherName}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">تاریخ شروع به کار:</Text>
            <Text>{employee.startDate}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">شماره شبا:</Text>
            <Text>{employee.shaba}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">شماره کارت:</Text>
            <Text>{employee.cardNumber}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">شماره شناسنامه:</Text>
            <Text>{employee.idNumber}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">تاریخ تولد:</Text>
            <Text>{employee.birthDate}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">محل صدور:</Text>
            <Text>{employee.birthPlace}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">تلفن:</Text>
            <Text>{employee.phone}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">تعداد فرزندان:</Text>
            <Text>{employee.children}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">آدرس:</Text>
            <Text>{employee.address}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">وضعیت تاهل:</Text>
            <Text>{employee.maritalStatus}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">بیمه:</Text>
            <Text>{employee.insurance}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>بستن</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailEmployeeModal;
