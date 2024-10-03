import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import EditPaymentModal from './components/EditPaymentModal';
import { addCommas } from 'persian-tools2';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, [currentPage]);

  const fetchPayments = () => {
    axios.get(`https://api.bsadak.ir/api/salary?page=${currentPage}`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setPayments(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching payments:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://api.bsadak.ir/api/salary/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        fetchPayments();
      })
      .catch(error => console.error('Error deleting payment:', error));
  };

  const handleEditClick = (payment) => {
    setSelectedPayment(payment);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPayment(null);
    fetchPayments(); // به‌روزرسانی لیست پس از ویرایش
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="جستجو کنید"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <Table variant="striped" size="md" mt={5}>
          <Thead>
            <Tr>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>تاریخ</Th>
              <Th>مبلغ</Th>
              <Th>علت</Th>
              <Th>ویرایش</Th>
              <Th>حذف</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.filter(payment => 
              payment.Personnel.Name.includes(searchTerm) || 
              payment.Personnel.LastName.includes(searchTerm)
            ).map(payment => (
              <Tr key={payment._id}>
                <Td>{payment.Personnel.Name}</Td>
                <Td>{payment.Personnel.LastName}</Td>
                <Td>{payment.Date}</Td>
                <Td>{addCommas(payment.Salary)}</Td>
                <Td>{payment.Reason}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => handleEditClick(payment)}>ویرایش</Button>
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(payment._id)}>حذف</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack mt={4} justifyContent="center">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            صفحه قبل
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            صفحه بعد
          </Button>
        </HStack>
      </VStack>

      {selectedPayment && (
        <EditPaymentModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          payment={selectedPayment}
          fetchPayments={fetchPayments}
        />
      )}
    </Box>
  );
};

export default PaymentList;
