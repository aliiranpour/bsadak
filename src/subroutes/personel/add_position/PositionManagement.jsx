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
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import AddPositionModal from './components/AddPositionModal';
import EditPositionModal from './components/EditPositionModal';
import DetailPositionModal from './components/DetailPositionModal';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const PositionManagement = () => {
  const [positions, setPositions] = useState([]);
  const [editPosition, setEditPosition] = useState(null);
  const [detailPosition, setDetailPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const fetchPositions = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/semat', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setPositions(data);
      } else if (data && Array.isArray(data.data)) {
        setPositions(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching positions', error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleDeletePosition = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/semat/${editPosition._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchPositions();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting position', error);
    }
  };

  const handleEditPosition = async (updatedPosition) => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/semat/${editPosition._id}`, updatedPosition, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchPositions();
      setEditPosition(null);
      onEditClose();
    } catch (error) {
      console.error('Error editing position', error);
    }
  };

  const handleAddPosition = async (newPosition) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/semat', newPosition, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchPositions();
      onAddClose();
    } catch (error) {
      console.error('Error adding position', error);
    }
  };

  const handleEditClick = (position) => {
    setEditPosition(position);
    onEditOpen();
  };

  const handleDeleteClick = (position) => {
    setEditPosition(position);
    onDeleteOpen();
  };

  const handleRowClick = (position) => {
    setDetailPosition(position);
    onDetailOpen();
  };

  const filteredPositions = positions.filter((position) =>
    position.Name && position.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <InputGroup mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '80%'} h="50px" outline="1px solid black" borderRadius={5}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          <Input
            type="text"
            placeholder="نام سمت مورد نظر را وارد کنید"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fontFamily={yekan}
            h="50px"
          />
        </InputGroup>
        <Button
          leftIcon={<AddIcon />}
          onClick={onAddOpen}
          size={buttonSize}
          w={isMobile ? '100%' : '30%'}
          borderRadius={5}
          mx={isMobile ? '10px' : '1.5rem'}
          h="50px"
          colorScheme="green"
          color="white"
          bgColor="green.700"
        >
          افزودن سمت جدید
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام سمت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">توضیحات</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPositions.map((position, index) => (
              <Tr key={position._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} onClick={() => handleRowClick(position)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{position.Name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{position.Caption}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(position); }}
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
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(position); }}
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

      <AddPositionModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddPosition={handleAddPosition}
      />

      {editPosition && (
        <EditPositionModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditPosition={handleEditPosition}
          initialPosition={editPosition}
        />
      )}

      {detailPosition && (
        <DetailPositionModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          position={detailPosition}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف سمت
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این سمت را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeletePosition} 
                ml={3}
                bgColor="blackAlpha.800"
                color="white"
                borderRadius={5}
                colorScheme="blackAlpha"
                >
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PositionManagement;
