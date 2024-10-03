import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Select, Table, Thead, Tbody, Tr, Th, Td, useToast, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';

const AddOvertime = () => {
  const [date, setDate] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [personnelData, setPersonnelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [overtime, setOvertime] = useState({}); // برای ذخیره نوع و مقدار اضافه کار

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

  const fetchPersonnelData = async () => {
    if (!date || !selectedCompany) return;

    setLoading(true);
    try {
      const formattedDate = moment(date).format('jYYYY/jMM/jDD');
      const response = await axios.post(
        `https://api.bsadak.ir/api/presence/addHour`,
        {
          date: formattedDate,
          company: selectedCompany,
          category: selectedCategory || '', // ارسال مقدار خالی اگر انتخاب نشده باشد
        },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        }
      );
      setPersonnelData(response.data.data);
    } catch (error) {
      console.error('Error fetching personnel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOvertime = async (personnelId) => {
    const { type, addHour } = overtime[personnelId] || {};

    if (!type || !addHour) {
      toast({
        title: 'لطفا اطلاعات را کامل وارد کنید',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(
        `https://api.bsadak.ir/api/presence/addHour/${personnelId}`,
        { type, addhour: Number(addHour) }, 
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: 'ثبت موفقیت‌آمیز!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving overtime:', error);
      toast({
        title: 'خطا در ثبت',
        description: 'لطفا دوباره تلاش کنید.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (personnelId, field, value) => {
    setOvertime((prev) => ({
      ...prev,
      [personnelId]: {
        ...prev[personnelId],
        [field]: value,
      },
    }));
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
          <FormLabel>محل کار</FormLabel>
          <Select
            placeholder="محل  کار "
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
        <Button mt={8} colorScheme="teal" borderRadius={5} bgColor={'green.700'} onClick={fetchPersonnelData}>
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
              <Th>وضعیت</Th>
              <Th>نوع</Th>
              <Th>اضافه‌کار/کسر کار (دقیقه)</Th>
              <Th>ثبت</Th>
            </Tr>
          </Thead>
          <Tbody>
            {personnelData.map((item) => (
              <Tr key={item._id}>
                <Td>{item.Personnel.Name}</Td>
                <Td>{item.Personnel.LastName}</Td>
                <Td>{item.Date.Persian}</Td>
                <Td>{item.Active.Value}</Td>
                <Td>
                  <Select
                    placeholder="انتخاب نوع"
                    onChange={(e) => handleInputChange(item.Personnel._id, 'type', e.target.value)}
                  >
                    <option value="add">اضافه‌کار</option>
                    <option value="remove">کسر کار</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="مقدار به دقیقه"
                    onChange={(e) => handleInputChange(item.Personnel._id, 'addHour', e.target.value)}
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    borderRadius={5}
                    bgColor={'green.700'}
                    onClick={() => handleSaveOvertime(item.Personnel._id)}
                  >
                    ثبت
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default AddOvertime;
