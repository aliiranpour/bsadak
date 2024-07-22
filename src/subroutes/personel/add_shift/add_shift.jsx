import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery, Input, Select
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import AddShiftModal from './components/AddShiftModal';
import EditShiftModal from './components/EditShiftModal';
import DetailShiftModal from './components/DetailShiftModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf'
const initialShifts = [
  { id: 1, name: 'شیفت صبح', startTime: '08:00', endTime: '16:00', status: true },
  { id: 2, name: 'شیفت شب', startTime: '16:00', endTime: '00:00', status: false }
];

const ShiftManagement = () => {
  const [shifts, setShifts] = useState(initialShifts);
  const [editShift, setEditShift] = useState(null);
  const [detailShift, setDetailShift] = useState(null);
  const [filter, setFilter] = useState('همه');
  const [search, setSearch] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleAddShift = (newShift) => {
    setShifts([...shifts, newShift]);
  };

  const handleEditShift = (updatedShift) => {
    setShifts(shifts.map(shift => shift.id === updatedShift.id ? updatedShift : shift));
    setEditShift(null);
    onEditClose();
  };

  const handleDeleteShift = () => {
    setShifts(shifts.filter(shift => shift.id !== editShift.id));
    setEditShift(null);
    onDeleteClose();
  };

  const handleEditClick = (shift) => {
    setEditShift(shift);
    onEditOpen();
  };

  const handleDeleteClick = (shift) => {
    setEditShift(shift);
    onDeleteOpen();
  };

  const handleRowClick = (shift) => {
    setDetailShift(shift);
    onDetailOpen();
  };

  const filteredShifts = shifts.filter(shift => {
    return (
      (filter === 'همه' || (filter === 'انجام شده' && shift.status) || (filter === 'انجام نشده' && !shift.status)) &&
      shift.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 568px)');

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'} borderBottom='1px solid black' pb={5}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan}>مدیریت شیفت‌ها</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          افزودن شیفت جدید
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '200px'}>
          <option value="همه">همه</option>
          <option value="انجام شده">انجام شده</option>
          <option value="انجام نشده">انجام نشده</option>
        </Select>
        <Input placeholder="جستجوی نام شیفت" value={search} onChange={(e) => setSearch(e.target.value)} w={isMobile ? '100%' : '200px'} />
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>نام شیفت</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>ساعت شروع شیفت</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>ساعت پایان شیفت</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>وضعیت</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredShifts.map((shift, index) => (
              <Tr key={shift.id} bg={index % 2 === 0 ? '#B2F5EA' : 'white'} onClick={() => handleRowClick(shift)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{shift.name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.startTime}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.endTime}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.status ? 'انجام شده' : 'انجام نشده'}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(shift); }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(shift); }}
                    >
                      حذف
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AddShiftModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddShift={handleAddShift}
      />

      {editShift && (
        <EditShiftModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditShift={handleEditShift}
          initialShift={editShift}
        />
      )}

      {detailShift && (
        <DetailShiftModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          shift={detailShift}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف شیفت
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این شیفت را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeleteShift} ml={3}>
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ShiftManagement;
