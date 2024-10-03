import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Select, Table, Thead, Tbody, Tr, Th, Td, useToast, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';

const Attendance = () => {
  const [date, setDate] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
    if (!date || !selectedCompany) return;

    setLoading(true);
    try {
      const formattedDate = moment(date).format('jYYYY/jMM/jDD');
      const response = await axios.get(
        `https://api.bsadak.ir/api/presence/list?date=${formattedDate}&page=1&company=${selectedCompany}&category=${selectedCategory || ''}`,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        }
      );
      setAttendanceData(response.data.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, value) => {
    setAttendanceData(prevData =>
      prevData.map(item =>
        item._id === id ? { ...item, status: value } : item
      )
    );
  };

  const handleWorkplaceChange = (id, value) => {
    setAttendanceData(prevData =>
      prevData.map(item =>
        item._id === id ? { ...item, workplace: value } : item
      )
    );
  };

  const handleSubmit = async (personnelId) => {
    const item = attendanceData.find(item => item._id === personnelId);
    if (!item) return;

    const { status, workplace } = item;

    try {
      await axios.post('https://api.bsadak.ir/api/presence/log', {
        date: moment(date).format('jYYYY/jMM/jDD'),
        personnel: personnelId,
        type: status,
        workplace: workplace
      }, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      toast({
        title: "ثبت موفقیت‌آمیز",
        description: "اطلاعات با موفقیت ثبت شد.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      toast({
        title: "خطا",
        description: "خطا در ثبت اطلاعات.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
            timePicker={false}
            style={{ border: '1px solid gray', padding: '10px', borderRadius: '5px' }}
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
          <FormLabel>محل کار</FormLabel>
          <Select
            placeholder="محل کار"
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
        <Button mt={8} colorScheme="teal" borderRadius={5} bgColor={'green.700'} onClick={fetchAttendanceData}>
          نمایش لیست
        </Button>
      </Flex>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table variant="striped" mt={5}>
          <Thead>
            <Tr>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>تاریخ</Th>
              <Th>محل کار</Th>
              <Th>وضعیت</Th>
              <Th>ثبت</Th> 
              <Th>جزئیات</Th>         
            </Tr>
          </Thead>
          <Tbody>
            {attendanceData.map((item) => (
              <Tr key={item._id}>
                <Td>{item.Personnel.Name}</Td>
                <Td>{item.Personnel.LastName}</Td>
                <Td>{item.Date.Persian}</Td>

                {/* Select for Workplace */}
                <Td>
                  <Select 
                    value={item.workplace || ''}
                    onChange={(e) => handleWorkplaceChange(item._id, e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.Name}
                      </option>
                    ))}
                  </Select>
                </Td>

                {/* Select for Status */}
                <Td>
                  <Select 
                    value={item.status || ''}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    <option value="-4">غیبت</option>
                    <option value="4">ماموریت</option>
                    <option value="0">نصف روز</option>
                    <option value="1">حضور کامل</option>
                    <option value="-1">مرخصی</option>
                    <option value="3">مرخصی استحقاقی</option>
                    <option value="2">تعطیل</option>
                  </Select>
                </Td>

                <Td>
                  <Button 
                    colorScheme="green"
                    onClick={() => handleSubmit(item._id)}
                  >
                    ثبت
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="teal" bgColor={'blue.500'} borderRadius={5}>جزئیات</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Attendance;
