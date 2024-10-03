// AccountManagement.js
import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AccountManagement = () => {
  const { groupId, monthNumber } = useParams();
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountData();
  }, [groupId, monthNumber]);

  const fetchAccountData = async () => {
    try {
      const response = await axios.post(`https://api.bsadak.ir/api/account/group/${groupId}/${monthNumber}`, {}, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setAccountData(response.data.data);
    } catch (error) {
      console.error('Error fetching account data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5}>
      {loading ? (
        <Spinner size="xl" />
      ) : accountData.length > 0 ? (
        <Table variant="striped" mt={5} border={'1px solid gray'} borderRadius={5}>
          <Thead>
            <Tr bg={'white'}>
              <Th>شماره پرسنلی</Th>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>مبلغ حساب</Th>
              <Th>وضعیت</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accountData.map((account, index) => (
              <Tr key={account.Personnel.PersonnelCode}>
                <Td>{account.Personnel.PersonnelCode}</Td>
                <Td>{account.Personnel.Name}</Td>
                <Td>{account.Personnel.LastName}</Td>
                <Td>{account.Amount}</Td>
                <Td>{account.Status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>هیچ داده‌ای برای این ماه و گروه یافت نشد.</Text>
      )}
    </Box>
  );
};

export default AccountManagement;
