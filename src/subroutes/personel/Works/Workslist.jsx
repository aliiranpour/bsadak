import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, TableContainer, VStack, Flex, IconButton, Text, useMediaQuery,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdCalculate } from 'react-icons/md';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const WorkList = () => {
  const [workData, setWorkData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await axios.get(`https://api.bsadak.ir/api/work`, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
          params: {
            page: currentPage + 1,
          },
        });

        const initialData = response.data.data.map(item => ({
          ...item,
          overtimeAmount: 0, // اضافه کردن مقدار پیش‌فرض 0 برای مبلغ اضافه‌کار
        }));

        setWorkData(initialData);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.error('Error fetching work data:', error);
      }
    };

    fetchWorkData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/work/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: 'موفقیت',
        description: 'کارکرد با موفقیت حذف شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setWorkData(workData.filter(item => item._id !== id));
      setTotalItems(totalItems - 1);
    } catch (error) {
      console.error('Error deleting work:', error);
      toast({
        title: 'خطا',
        description: 'خطایی در حذف کارکرد رخ داد.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCompute = async (id) => {
    try {
      const response = await axios.post(`https://api.bsadak.ir/api/work/computing/${id}`, {}, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      const computedAmount = response.data.overtimeAmount || 0; // فرض بر این است که API مبلغ اضافه‌کار را برمی‌گرداند

      setWorkData(prevData =>
        prevData.map(item =>
          item._id === id ? { ...item, overtimeAmount: computedAmount } : item
        )
      );

      toast({
        title: 'موفقیت',
        description: 'کل کارکرد با موفقیت محاسبه شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error computing work:', error);
      toast({
        title: 'خطا',
        description: 'خطایی در محاسبه کل کارکرد رخ داد.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Box p={5}>
      <VStack spacing={5} mb={5} align="stretch">
        <Flex justify="space-between" align="center" flexDirection={isMobile ? 'column' : 'row'}>
          <Input
            placeholder="جستجو..."
            value={searchTerm}
            onChange={handleSearch}
            w={isMobile ? '100%' : '30%'}
            mb={isMobile ? 4 : 0}
          />
          <Text>{`تعداد آیتم‌ها: ${totalItems}`}</Text>
        </Flex>

        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>نام شرکت</Th>
                <Th>نام پرسنل</Th>
                <Th>ماه</Th>
                <Th>سال</Th>
                <Th>روزها</Th>
                <Th>ساعت اضافه</Th>
                <Th>غیبت</Th>
                <Th>تأخیر</Th>
                <Th>مبلغ اضافه‌کار</Th>
                <Th>عملیات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workData
                .filter(item =>
                  item.Personnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.Company.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(item => (
                  <Tr key={item._id}>
                    <Td>{item.Company}</Td>
                    <Td>{item.Personnel}</Td>
                    <Td>{item.Month.Name}</Td>
                    <Td>{item.Year}</Td>
                    <Td>{item.Days}</Td>
                    <Td>{item.AddHour.Hour}</Td>
                    <Td>{item.Absence}</Td>
                    <Td>{item.Delay}</Td>
                    <Td>{item.overtimeAmount}</Td>
                    <Td>
                      <Flex justify="space-around">
                        <IconButton
                          icon={<MdCalculate />}
                          colorScheme="teal"
                          onClick={() => handleCompute(item._id)}
                          aria-label="محاسبه کل کارکرد"
                          borderRadius={5}
                          bgColor={'green.700'}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleDelete(item._id)}
                          aria-label="حذف"
                          borderRadius={5}
                          bgColor={'blackAlpha.300'}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Box mt={5}>
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            pageCount={Math.ceil(totalItems / 50)} // 50 مورد در هر صفحه
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default WorkList;
