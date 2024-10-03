import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Input, Select, VStack, Text,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import numberToPersian from 'number-to-persian';

const EditPaymentModal = ({ isOpen, onClose, payment, fetchPayments }) => {
  const [editAmount, setEditAmount] = useState(payment.Salary);
  const [editDate, setEditDate] = useState(payment.Date);
  const [editReason, setEditReason] = useState(payment.Type);
  const [editDescription, setEditDescription] = useState(payment.Reason || '');

  const handleEditSubmit = () => {
    const body = {
      Year: payment.Year._id,
      Personnel: payment.Personnel._id,
      Type: editReason,
      Amount: parseInt(editAmount.replace(/,/g, ''), 10),
      Date: editDate,
    };
    if (editReason === '5') {
      body.Reason = editDescription;
    }

    axios.patch(`https://api.bsadak.ir/api/salary/${payment._id}`, body)
      .then(() => {
        fetchPayments();
        onClose();
      })
      .catch(error => console.error('Error updating payment:', error));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    setEditAmount(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش پرداختی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Input
              isDisabled
              placeholder="نام پرسنل"
              value={`${payment.Personnel.Name} ${payment.Personnel.LastName}`}
            />

            <DatePicker
              timePicker={false}
              value={editDate}
              onChange={setEditDate}
              isGregorian={false}
            />

            <Input
              value={addCommas(editAmount)}
              onChange={handleAmountChange}
              placeholder="مبلغ را وارد کنید"
            />
            <Text mt={2}>{numberToPersian(editAmount)} ریال</Text>

            <Select placeholder="دلیل پرداخت را انتخاب کنید" value={editReason} onChange={(e) => setEditReason(e.target.value)}>
              <option value="1">حقوق</option>
              <option value="2">مساعده</option>
              <option value="3">پاداش</option>
              <option value="4">اضافه کار</option>
              <option value="5">سایر</option>
              <option value="6">تسویه</option>
            </Select>

            {editReason === '5' && (
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="شرح پرداخت را وارد کنید"
              />
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" bgColor={'green.500'} borderRadius={5} onClick={handleEditSubmit}>ثبت ویرایش</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPaymentModal;
