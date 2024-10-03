import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Select, useToast, TableContainer, VStack, useMediaQuery,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import EditPenaltyModal from './components/EditPenalty'; 

const PenaltyList = () => {
  const [penalties, setPenalties] = useState([]);
  const [filteredPenalties, setFilteredPenalties] = useState([]);
  const [selectedPenalty, setSelectedPenalty] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [years, setYears] = useState([]); // State برای ذخیره سال‌ها
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  const [filters, setFilters] = useState({
    year: '',
    month: '',
    company: '',
    personnel: '',
  });

  useEffect(() => {
    // دریافت سال‌ها از API
    const fetchYears = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/year', {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        setYears(response.data.data); // ذخیره سال‌ها در state
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchPenalties = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/penalty', {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });

        const validPenalties = response.data.data.filter(p => p.Penalty[0]?.Date);

        setPenalties(validPenalties);
        setFilteredPenalties(validPenalties);
      } catch (error) {
        console.error('Error fetching penalties:', error);
      }
    };

    fetchPenalties();
  }, []);

  const handleDelete = async (dataId, penaltyId) => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/penalty/${dataId}/${penaltyId}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: 'موفقیت',
        description: 'جریمه با موفقیت حذف شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setPenalties(penalties.filter(p => p._id !== dataId));
      setFilteredPenalties(filteredPenalties.filter(p => p._id !== dataId));
    } catch (error) {
      console.error('Error deleting penalty:', error);
      toast({
        title: 'خطا',
        description: 'خطایی در حذف جریمه رخ داد.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (penalty) => {
    setSelectedPenalty(penalty);
    setEditModalOpen(true);
  };

  const applyFilters = () => {
    let filtered = penalties;
    if (filters.year) {
      filtered = filtered.filter(p => p.Year.Number === parseInt(filters.year));
    }
    if (filters.month) {
      filtered = filtered.filter(p => p.Month === parseInt(filters.month));
    }
    if (filters.company) {
      filtered = filtered.filter(p => p.Company._id === filters.company);
    }
    if (filters.personnel) {
      filtered = filtered.filter(p => p.Personnel._id === filters.personnel);
    }
    setFilteredPenalties(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <Box p={5}>
      <VStack spacing={5} mb={5}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={isMobile ? 'column' : 'row'}
          flexWrap="wrap"
          gap={isMobile ? '10px' : '0'}
        >
          <Select
            placeholder="فیلتر بر اساس سال"
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            w={isMobile ? '100%' : '23%'}
            minWidth="200px"
          >
            {years.map(year => (
              <option key={year._id} value={year.Number}>
                {year.Number}
              </option>
            ))}
          </Select>
          <Select
            placeholder="فیلتر بر اساس ماه"
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            w={isMobile ? '100%' : '23%'}
            minWidth="200px"
          >
            <option value="1">فروردین</option>
            <option value="2">اردیبهشت</option>
            <option value="3">خرداد</option>
            <option value="4">تیر</option>
            <option value="5">مرداد</option>
            <option value="6">شهریور</option>
            <option value="7">مهر</option>
            <option value="8">آبان</option>
            <option value="9">آذر</option>
            <option value="10">دی</option>
            <option value="11">بهمن</option>
            <option value="12">اسفند</option>
          </Select>
          <Select
            placeholder="فیلتر بر اساس شرکت"
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            w={isMobile ? '100%' : '23%'}
            minWidth="200px"
          >
            {penalties.map(p => (
              <option key={p.Company._id} value={p.Company._id}>
                {p.Company.Name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="فیلتر بر اساس نام پرسنل"
            onChange={(e) => setFilters({ ...filters, personnel: e.target.value })}
            w={isMobile ? '100%' : '23%'}
            minWidth="200px"
          >
            {penalties.map(p => (
              <option key={p.Personnel._id} value={p.Personnel._id}>
                {p.Personnel.Name} {p.Personnel.LastName}
              </option>
            ))}
          </Select>
        </Flex>
      </VStack>

      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>نام شرکت</Th>
              <Th>نام پرسنل</Th>
              <Th>مبلغ جریمه</Th>
              <Th>علت جریمه</Th>
              <Th>تاریخ</Th>
              <Th>ویرایش</Th>
              <Th>حذف</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPenalties.map(p => (
              <Tr key={p._id}>
                <Td>{p.Company.Name}</Td>
                <Td>{p.Personnel.Name} {p.Personnel.LastName}</Td>
                <Td>{addCommas(p.Penalty[0]?.Amount || 0)}</Td>
                <Td>{p.Penalty[0]?.Reason || '-'}</Td>
                <Td>{p.Penalty[0]?.Date || '-'}</Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleEdit(p)} borderRadius={5} bgColor={'green.500'}>
                    ویرایش
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="ghost" onClick={() => handleDelete(p._id, p.Penalty[0]._id)} borderRadius={5} bgColor={'gray.300'}>
                    حذف
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedPenalty && (
        <EditPenaltyModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          penalty={selectedPenalty}
        />
      )}
    </Box>
  );
};

export default PenaltyList;
