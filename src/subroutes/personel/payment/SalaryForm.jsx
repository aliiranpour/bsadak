import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Select, Text, VStack, FormControl, FormLabel, useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const SalaryForm = () => {
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState('');
  const [paymentDate, setPaymentDate] = useState(moment());
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  // Initial fetch for years and companies
  useEffect(() => {
    const fetchYearsAndCompanies = () => {
      axios.post('https://api.bsadak.ir/api/group/user/1', {
        Status: 1,
        Category: '',
        Company: '',
        Year: ''
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'), 
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        const uniqueYears = Array.from(new Set(response.data.data.map(item => item.Year.Number)));
        const uniqueCompanies = Array.from(new Set(response.data.data.map(item => item.Company.Name)));

        setYears(uniqueYears);
        setCompanies(uniqueCompanies);
      })
      .catch(error => {
        console.error('Error fetching years and companies:', error);
        if (error.response?.status === 401) {
          toast({
            title: 'خطا',
            description: 'توکن احراز هویت معتبر نیست یا منقضی شده است.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    };

    fetchYearsAndCompanies();
  }, []);

  // Fetch companies and personnel based on selected year or company
  useEffect(() => {
    const fetchData = () => {
      const body = {
        Status: 0,
        Category: '',
      };

      if (selectedYear) {
        body.Year = selectedYear._id;
      }

      if (selectedCompany) {
        body.Company = selectedCompany._id;
      }

      axios.post('https://api.bsadak.ir/api/group/user/1', body, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'), 
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (selectedYear && !selectedCompany) {
          const uniqueCompanies = Array.from(new Set(response.data.data.map(item => item.Company.Name)));
          setCompanies(uniqueCompanies);
        } else if (selectedCompany && !selectedYear) {
          const uniqueYears = Array.from(new Set(response.data.data.map(item => item.Year.Number)));
          setYears(uniqueYears);
        } else if (selectedYear && selectedCompany) {
          setPersonnel(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          toast({
            title: 'خطا',
            description: 'توکن احراز هویت معتبر نیست یا منقضی شده است.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    };

    if (selectedYear || selectedCompany) {
      fetchData();
    }
  }, [selectedYear, selectedCompany]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setAmount(value);
  };

  const handleSubmit = () => {
    const requestBody = {
      Year: selectedYear._id,
      Personnel: selectedPersonnel._id,
      Type: reason,
      Amount: parseInt(amount.replace(/,/g, ''), 10),
      Date: paymentDate.format('jYYYY/jMM/jDD'),
    };

    axios.post('https://api.bsadak.ir/api/salary', requestBody, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'), 
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      toast({
        title: 'موفقیت',
        description: 'پرداختی با موفقیت ثبت شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error('Error submitting payment:', error);
      if (error.response?.status === 401) {
        toast({
          title: 'خطا',
          description: 'توکن احراز هویت معتبر نیست یا منقضی شده است.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <FormControl isDisabled={selectedYear === '' && selectedCompany === ''}>
          <FormLabel>انتخاب سال</FormLabel>
          <Select placeholder="سال را انتخاب کنید" onChange={(e) => setSelectedYear(years.find(year => year._id === e.target.value))}>
            {years.map(year => (
              <option key={year._id} value={year._id}>{year.Number}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={selectedYear === '' && selectedCompany === ''}>
          <FormLabel>انتخاب شرکت</FormLabel>
          <Select placeholder="شرکت را انتخاب کنید" onChange={(e) => setSelectedCompany(e.target.value)}>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={selectedYear === '' || selectedCompany === ''}>
          <FormLabel>انتخاب پرسنل</FormLabel>
          <Select placeholder="پرسنل را انتخاب کنید" onChange={(e) => setSelectedPersonnel(personnel.find(p => p._id === e.target.value))}>
            {personnel.map(person => (
              <option key={person._id} value={person._id}>{person.Personnel.Name} {person.Personnel.LastName}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>تاریخ پرداخت</FormLabel>
          <DatePicker
            timePicker={false}
            value={paymentDate}
            onChange={setPaymentDate}
            isGregorian={false}
            inputFormat="jYYYY/jMM/jDD"
          />
        </FormControl>

        <FormControl>
          <FormLabel>مبلغ پرداختی</FormLabel>
          <Input
            value={addCommas(amount)}
            onChange={handleAmountChange}
            placeholder="مبلغ را وارد کنید"
          />
          <Text mt={2}>{numberToPersian(amount)} ریال</Text>
        </FormControl>

        <FormControl>
          <FormLabel>بابت</FormLabel>
          <Select placeholder="دلیل پرداخت را انتخاب کنید" onChange={(e) => setReason(e.target.value)}>
            <option value="1">حقوق</option>
            <option value="2">مساعده</option>
            <option value="3">پاداش</option>
            <option value="4">اضافه کار</option>
            <option value="5">سایر</option>
            <option value="6">تسویه</option>
          </Select>
        </FormControl>

        {reason === '5' && (
          <FormControl>
            <FormLabel>شرح پرداخت</FormLabel>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="شرح پرداخت را وارد کنید" />
          </FormControl>
        )}

        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={!selectedYear || !selectedCompany || !selectedPersonnel || !amount || !reason}>
          ثبت پرداخت
        </Button>
      </VStack>
    </Box>
  );
};

export default SalaryForm;
