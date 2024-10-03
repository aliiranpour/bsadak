import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Select, VStack
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import axios from 'axios';

const SettlementModal = ({ isOpen, onClose, settlement, onSettle, onUpdate, newSettlement }) => {
  const [currentSettlement, setCurrentSettlement] = useState(newSettlement || { employeeId: '', date: null });
  const [employees, setEmployees] = useState([]); // حالت برای ذخیره لیست پرسنل

  useEffect(() => {
    if (settlement) {
      setCurrentSettlement({
        ...settlement,
        date: settlement.date ? moment(settlement.date, 'YYYY-MM-DD') : null,
      });
    } else {
      setCurrentSettlement(newSettlement || { employeeId: '', date: null });
    }
  }, [settlement, newSettlement]);

  useEffect(() => {
    if (isOpen) {
      // فراخوانی API برای دریافت پرسنل
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('https://api.bsadak.ir/api/group/join/65fd879ff1fd3c07179e4c2c', {
            headers: {
              'Authorization': localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
          });
          if (Array.isArray(response.data.data)) {
            setEmployees(response.data.data); // ذخیره لیست پرسنل در حالت
          } else {
            console.error('Invalid data format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      fetchEmployees();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSettlement(prevState => ({
      ...prevState,
      [name]: value || ''
    }));
  };

  const handleDateChange = (date) => {
    setCurrentSettlement(prevState => ({
      ...prevState,
      date: date || null
    }));
  };

  const handleSubmit = () => {
    if (!currentSettlement.employeeId || !currentSettlement.date) {
      alert('لطفاً تمامی فیلدها را پر کنید.');
      return;
    }

    const formattedSettlement = {
      ...currentSettlement,
      date: currentSettlement.date ? currentSettlement.date.format('YYYY-MM-DD') : null,
    };

    if (settlement) {
      onUpdate(formattedSettlement);
    } else {
      onSettle(formattedSettlement);
    }
    onClose(); // بستن مدال پس از ثبت موفقیت‌آمیز
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{settlement ? 'ویرایش تسویه' : 'تسویه جدید'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl mb={4}>
              <FormLabel>انتخاب پرسنل</FormLabel>
              <Select
                name="employeeId"
                value={currentSettlement?.employeeId}
                onChange={handleChange}
                disabled={!!settlement}
              >
                <option value="">انتخاب پرسنل</option>
                {employees && employees.length > 0 ? (
                  employees.map(employee => (
                    <option key={employee._id} value={employee._id}>
                      {employee.Name} {employee.LastName}
                    </option>
                  ))
                ) : (
                  <option value="">هیچ پرسنلی موجود نیست</option>
                )}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>تاریخ تسویه</FormLabel>
              <DatePicker
                isGregorian={false}
                value={currentSettlement.date}
                onChange={handleDateChange}
                timePicker={false}
                placeholderText="تاریخ تسویه (شمسی)"
                outline='1px solid black'
                border='1px solid black'
                borderRadius={5}
                w={'100%'}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit} bgColor={'green.900'} borderRadius={5}>
            {settlement ? 'ذخیره' : 'تسویه'}
          </Button>
          <Button variant="ghost" onClick={onClose} bgColor={'blackAlpha.700'} borderRadius={5}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettlementModal;
