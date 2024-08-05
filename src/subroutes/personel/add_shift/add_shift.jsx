import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBreakpointValue,
  useMediaQuery,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import AddShiftModal from './components/AddShiftModal';
import EditShiftModal from './components/EditShiftModal';
import DetailShiftModal from './components/DetailShiftModal';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const ShiftManagement = () => {
  const [shifts, setShifts] = useState([]);
  const [editShift, setEditShift] = useState(null);
  const [detailShift, setDetailShift] = useState(null);
  const [filter, setFilter] = useState('همه');
  const [search, setSearch] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchShifts = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/shift', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setShifts(data);
      } else if (data && Array.isArray(data.data)) {
        setShifts(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching shifts', error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleDeleteShift = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/shift/${editShift._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchShifts();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting shift', error);
    }
  };

  const handleEditShift = async (updatedShift) => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/shift/${editShift._id}`, updatedShift, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchShifts();
      setEditShift(null);
      onEditClose();
    } catch (error) {
      console.error('Error editing shift', error);
    }
  };

  const handleAddShift = async (newShift) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/shift', newShift, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchShifts();
      onAddClose();
    } catch (error) {
      console.error('Error adding shift', error);
    }
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
      (filter === 'همه' || (filter === 'انجام شده' && shift.Active) || (filter === 'انجام نشده' && !shift.Active)) &&
      shift.Name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} wrap="wrap">
        <Flex w={isMobile ? '100%' : '100%'} justifyContent="flex-end" alignItems="center" flexDirection={isMobile ? 'column' : 'row'} my={15}>
          <InputGroup w={isMobile ? '100%' : '100%'} h="50px" outline="1px solid black" borderRadius={5} mb={isMobile ? 4 : 0}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
            <Input
              type="text"
              placeholder="جستجوی نام شیفت"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fontFamily={yekan}
              h="50px"
            />
          </InputGroup>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '50%'} h='50px' mx={isMobile ? 0 : 4} outline={'1px solid black'}>
            <option value="همه">همه</option>
            <option value="انجام شده">انجام شده</option>
            <option value="انجام نشده">انجام نشده</option>
          </Select>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={onAddOpen}
            size={buttonSize}
            w={isMobile ? '100%' : '40%'}
            borderRadius={5}
            h="50px"
            bgColor="green.700"
            color="white"
          >
            افزودن شیفت جدید
          </Button>
        </Flex>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
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
              <Tr key={shift._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} onClick={() => handleRowClick(shift)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{shift.Name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.Work.Start}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.Work.End}</Td>
                <Td fontSize={textFontSize} textAlign="center">{shift.Active ? 'انجام شده' : 'انجام نشده'}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(shift); }}
                      mr={2}
                      bgColor="green.300"
                      color="white"
                      borderRadius={5}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="blackAlpha"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(shift); }}
                      bgColor="blackAlpha.800"
                      color="white"
                      borderRadius={5}
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
