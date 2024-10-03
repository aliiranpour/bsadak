import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const EditDailyContractModal = ({ isOpen, onClose, personId, selectedMonth, contractData, onSave }) => {
  const [sematOptions, setSematOptions] = useState([]);
  const [semat, setSemat] = useState('');
  const [job, setJob] = useState('');
  const [moreBenefits, setMoreBenefits] = useState('');
  const [days, setDays] = useState('');
  const [child, setChild] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSematOptions = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/semat', {
          headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
        setSematOptions(response.data.data);

        // پیدا کردن شناسه سمت بر اساس نام سمت
        const selectedSemat = response.data.data.find(option => option.Name === contractData?.semat);
        setSemat(selectedSemat?._id || ''); // شناسه سمت

        setJob(contractData.job ? addCommas(contractData.job.toString()) : '');
        setMoreBenefits(contractData.moreBenefits ? addCommas(contractData.moreBenefits.toString()) : '');
        setDays(contractData.days || '');
        setChild(contractData.child || '');
      } catch (error) {
        console.error('Error fetching semat options:', error);
        setError('خطایی در بارگذاری گزینه‌های سمت رخ داد. لطفاً دوباره تلاش کنید.');
      }
    };

    if (isOpen) {
      fetchSematOptions();
    }
  }, [contractData, isOpen]);

  const handleSave = async () => {
    // بررسی پر بودن همه فیلدها
    if (!semat || !job || !moreBenefits || !days || !child) {
      setError('تمام فیلدها باید پر باشند.');
      return;
    }

    const dataToSend = {
      Month: parseInt(selectedMonth, 10),
      Semat: semat, // شناسه سمت
      Job: parseInt(job.replace(/,/g, ''), 10),
      MoreBenefits: parseInt(moreBenefits.replace(/,/g, ''), 10),
      Days: parseInt(days, 10),
      Child: parseInt(child, 10),
    };
    
    console.log('Data to send:', dataToSend);

    setIsLoading(true);
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/groupdocument/contract/${personId}`, dataToSend, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);
      // if (response.data.success) { // بررسی موفقیت در پاسخ سرور
        onSave(); // داده‌ها را دوباره از سرور دریافت کنید و UI را به‌روزرسانی کنید
        onClose();
        window.location.reload();

      // } else {
        // setError('بروزرسانی انجام نشد. پاسخ سرور: ' + response.data.message);
      // }
    } catch (error) {
      console.error('Error updating contract details:', error.response || error.message || error);
      setError('خطایی در به‌روزرسانی اطلاعات قرارداد رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setJob(addCommas(value));
  };

  const handleMoreBenefitsChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setMoreBenefits(addCommas(value));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش موارد قراردادی روزانه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={3}>{error}</Text>}
          <FormControl mb={3}>
            <FormLabel>سمت</FormLabel>
            <Select value={semat} onChange={(e) => setSemat(e.target.value)}>
              {sematOptions.map(option => (
                <option key={option._id} value={option._id}>
                  {option.Name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>فوق العاده شغل</FormLabel>
            <Input
              type="text"
              value={job}
              onChange={handleJobChange}
            />
            <Text mt={2} color="gray.500">{numberToPersian(parseInt(job.replace(/,/g, ''), 10))} ریال</Text>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>سایر مزایا</FormLabel>
            <Input
              type="text"
              value={moreBenefits}
              onChange={handleMoreBenefitsChange}
            />
            <Text mt={2} color="gray.500">{numberToPersian(parseInt(moreBenefits.replace(/,/g, ''), 10))} ریال</Text>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>تعداد روز قرارداد</FormLabel>
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>تعداد فرزند</FormLabel>
            <Input
              type="number"
              value={child}
              onChange={(e) => setChild(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
        <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            mr={2}
            colorScheme="green"
            color="white"
            bgColor="green.300"
            borderRadius={5}>
            ذخیره
          </Button> 
          <Button variant="ghost" onClick={onClose} borderRadius={5} >انصراف</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDailyContractModal;
