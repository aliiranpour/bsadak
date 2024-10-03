import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Select, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Text, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import EditAttendanceModal from './components/EditAttendanceModal ';

const AttendanceList = () => {
  const [date, setDate] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchCategories();
    }
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/company', {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/category', {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      const filteredCategories = response.data.data.filter(
        (category) => category.Company._id === selectedCompany
      );
      setCategories(filteredCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAttendanceData = async () => {
    if (!date || !selectedCompany || !selectedCategory) return;

    setLoading(true);
    try {
      const formattedDate = moment(date).format('jYYYY/jMM/jDD');
      const response = await axios.get(
        `https://api.bsadak.ir/api/presence/list?date=${formattedDate}&page=${currentPage}&company=${selectedCompany}&category=${selectedCategory}`,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        }
      );
      setAttendanceData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (attendance) => {
    setSelectedAttendance(attendance);
    onOpen();
  };

  return (
    <Box p={5}>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <FormControl width="25%">
          <FormLabel>انتخاب تاریخ</FormLabel>
          <DatePicker
            isGregorian={false}
            value={date}
            onChange={(newDate) => setDate(newDate)}
            placeholder="انتخاب تاریخ"
            timePicker={false} // عدم نمایش ساعت
          />
        </FormControl>
        <FormControl width="25%">
          <FormLabel>انتخاب شرکت</FormLabel>
          <Select
            placeholder="انتخاب شرکت"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.Name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl width="25%">
          <FormLabel>انتخاب سمت</FormLabel>
          <Select
            placeholder="انتخاب سمت"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            isDisabled={!selectedCompany}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.Name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button mt={8} colorScheme="teal" onClick={fetchAttendanceData}>
          نمایش لیست
        </Button>
      </Flex>

      {loading ? (
        <Text>در حال بارگذاری...</Text>
      ) : (
        <Table variant="striped" mt={5}>
          <Thead>
            <Tr>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>تاریخ</Th>
              <Th>وضعیت</Th>
              <Th>محل کار</Th>
              <Th>ویرایش</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceData.map((item) => (
              <Tr key={item._id}>
                <Td>{item.Personnel.Name}</Td>
                <Td>{item.Personnel.LastName}</Td>
                <Td>{item.Date.Persian}</Td>
                <Td>{item.Active.Value}</Td>
                <Td>{item.WorkPlace.Name}</Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleEditClick(item)}>
                    ویرایش
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <EditAttendanceModal
        isOpen={isOpen}
        onClose={onClose}
        attendance={selectedAttendance}
        categories={categories}
        onSave={fetchAttendanceData}
      />
    </Box>
  );
};

export default AttendanceList;
