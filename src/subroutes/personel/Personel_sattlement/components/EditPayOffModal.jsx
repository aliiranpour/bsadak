import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';

const EditPayOffModal = ({ isOpen, onClose, onEditPayOff, personnel }) => {
  const [payOffDateShamsi, setPayOffDateShamsi] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (personnel) {
      // تنظیم تاریخ شمسی از داده Persian
      const initialShamsiDate = personnel.End?.Persian ? moment(personnel.End.Persian, 'jYYYY/jMM/jDD') : null;
      setPayOffDateShamsi(initialShamsiDate);
    }
  }, [personnel]);

  const handleEdit = async () => {
    if (!payOffDateShamsi) {
      toast({
        title: 'خطا',
        description: 'لطفاً تاریخ تسویه را وارد کنید.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const updatedPayOffData = {
      End: {
        Persian: payOffDateShamsi.format('jYYYY/jMM/jDD'),  // ذخیره به صورت تاریخ شمسی
        DateSys: payOffDateShamsi.toISOString(),  // ذخیره به صورت تاریخ میلادی (ISO format)
      },
    };

    await onEditPayOff(updatedPayOffData);
    setPayOffDateShamsi(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش تسویه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              value={`${personnel.Name} ${personnel.LastName} (${personnel.PersonnelCode})`}
              isReadOnly
            />
            <DatePicker
              isGregorian={false}
              value={payOffDateShamsi}
              onChange={setPayOffDateShamsi}
              placeholderText="تاریخ تسویه (شمسی)"
              timePicker={false}
              border={'1px solid black'}
              borderRadius={5}
              w={100}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleEdit} borderRadius={5} bgColor={'green.700'}>
            به‌روزرسانی
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPayOffModal;
