import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select, Text, VStack, useToast
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf'
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian'; 

const PenaltyForm = () => {
  const [date, setDate] = useState(moment()); 
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState('');
  const [amount, setAmount] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [reason, setReason] = useState('');
  const [yearId, setYearId] = useState(''); // برای ذخیره شناسه سال
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.post('https://api.bsadak.ir/api/group/company', {}, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data.data)) {
          const validGroups = response.data.data.filter(group => group.Company !== null);
          setGroups(validGroups);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupChange = async (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    setSelectedPersonnel('');
    setIsFormDisabled(true);

    if (groupId) {
      try {
        const response = await axios.get(`https://api.bsadak.ir/api/group/join/${groupId}`, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data.data)) {
          setPersonnelList(response.data.data);
          setIsFormDisabled(false);

          // دریافت شناسه سال و ذخیره آن
          const selectedGroupObject = groups.find(group => group._id === groupId);
          if (selectedGroupObject && selectedGroupObject.Year) {
            setYearId(selectedGroupObject.Year._id);
          } else {
            console.error('Year ID not found for the selected group.');
          }
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    }
  };

  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/,/g, ''); 
    setAmount(addCommas(value)); 

    // تبدیل عدد به حروف فارسی
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      setAmountInWords(numberToPersian(numberValue));
    } else {
      setAmountInWords('');
    }
  };

  const handleSubmit = async () => {
    // چاپ مقادیر برای بررسی
    console.log('selectedPersonnel:', selectedPersonnel);
    console.log('amount:', amount);
    console.log('reason:', reason);
    console.log('date:', date);
    console.log('yearId:', yearId);

    if (!selectedPersonnel || !amount || !reason || !date || !yearId) {
      toast({
        title: 'خطا',
        description: 'لطفاً تمامی فیلدها را پر کنید.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const selectedGroupObject = groups.find(group => group._id === selectedGroup);

    const payload = {
      Year: yearId, // استفاده از شناسه سال به جای مقدار سال
      Month: date.jMonth() + 1,
      Company: selectedGroupObject?.Company?._id, 
      Personnel: selectedPersonnel, 
      Amount: amount.replace(/,/g, ''), 
      Date: date.format('jYYYY/jMM/jDD'), // تاریخ به فرمت شمسی ارسال می‌شود
      Reason: reason,
    };

    try {
      await axios.post('https://api.bsadak.ir/api/penalty', payload, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: 'موفقیت',
        description: 'جریمه با موفقیت ثبت شد.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setDate(moment());
      setSelectedGroup('');
      setPersonnelList([]);
      setSelectedPersonnel('');
      setAmount('');
      setReason('');
      setAmountInWords(''); 
      setYearId('');
      setIsFormDisabled(true);
    } catch (error) {
      console.error('Error submitting penalty:', error);
      toast({
        title: 'خطا',
        description: 'خطایی در ثبت جریمه رخ داد.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxWidth="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>تاریخ</FormLabel>
          <DatePicker
            isGregorian={false}
            value={date}
            onChange={setDate}
            timePicker={false}
            w={'100%'}
            outline='1px solid black'
            border="1px solid black"
          />
        </FormControl>
        <FormControl>
          <FormLabel>گروه</FormLabel>
          <Select placeholder="انتخاب گروه" value={selectedGroup} onChange={handleGroupChange} fontFamily={yekan}>
            {groups.map(group => (
              <option key={group._id} value={group._id}>
                {group.Company?.Name} - {group.Year?.Number}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={isFormDisabled}>
          <FormLabel>انتخاب پرسنل</FormLabel>
          <Select placeholder="انتخاب پرسنل" value={selectedPersonnel} onChange={(e) => setSelectedPersonnel(e.target.value)}>
            {personnelList.map(person => (
              <option key={person._id} value={person._id}>
                {person.Name} {person.LastName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isDisabled={isFormDisabled}>
          <FormLabel>مبلغ جریمه</FormLabel>
          <Input
            type="text"
            placeholder="مبلغ جریمه"
            value={amount}
            onChange={handleAmountChange}
          />
          <Text mt={2}>{amountInWords} ریال</Text>
        </FormControl>
        <FormControl isDisabled={isFormDisabled}>
          <FormLabel>علت جریمه</FormLabel>
          <Input
            type="text"
            placeholder="علت جریمه"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit} isDisabled={isFormDisabled} borderRadius={5} bgColor={'green.900'} >
          ثبت جریمه
        </Button>
      </VStack>
    </Box>
  );
};

export default PenaltyForm;
