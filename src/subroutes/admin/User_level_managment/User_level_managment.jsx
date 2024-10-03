import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, InputGroup, InputLeftElement, Input, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import AddLevelModal from './components/AddLevelModal';
import EditLevelModal from './components/EditLevelModal';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const UserLevelManagement = () => {
  const [levels, setLevels] = useState([]);
  const [editLevel, setEditLevel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPermissions, setAllPermissions] = useState([]);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const fetchLevels = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/admin/usertype', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      setLevels(response.data.data);
    } catch (error) {
      console.error('Error fetching levels', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/admin/permision', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setAllPermissions(data);
      } else if (data && Array.isArray(data.data)) {
        setAllPermissions(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching permissions', error);
    }
  };

  useEffect(() => {
    fetchLevels();
    fetchPermissions();
  }, []);

  const handleDeleteLevel = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/admin/usertype/${editLevel._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchLevels();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting level', error);
    }
  };

  const handleEditLevel = async (updatedLevel) => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/admin/usertype/${editLevel._id}`, updatedLevel, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchLevels();
      setEditLevel(null);
      onEditClose();
    } catch (error) {
      console.error('Error editing level', error);
    }
  };

  const handleAddLevel = async (newLevel) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/admin/usertype', newLevel, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchLevels();
      onAddClose();
    } catch (error) {
      console.error('Error adding level', error);
    }
  };

  const handleEditClick = async (level) => {
    try {
      const response = await axios.get(`https://api.bsadak.ir/api/admin/usertype/${level._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.data) {
        setEditLevel(response.data.data);
        onEditOpen();
      } else {
        console.error('Error: Level not found');
      }
    } catch (error) {
      console.error('Error fetching level data', error);
    }
  };

  const handleDeleteClick = (level) => {
    setEditLevel(level);
    onDeleteOpen();
  };

  const filteredLevels = levels.filter((level) =>
    level.Title.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="نام سطح کاربری مورد نظر را وارد کنید"
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
          افزودن سطح کاربری جدید
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عنوان سطح کاربری</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLevels.map((level) => (
              <Tr key={level._id} onClick={() => handleEditClick(level)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{level.Title}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(level); }}
                      mr={2}
                      bgColor="green.300"
                      color="white"
                      borderRadius={5}
                    >
                      مشاهده دسترسی ها و ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="blackAlpha"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(level); }}
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

      <AddLevelModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddLevel={handleAddLevel}
        allPermissions={allPermissions}
      />

      {editLevel && (
        <EditLevelModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditLevel={handleEditLevel}
          level={editLevel}
          allPermissions={allPermissions}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف سطح کاربری
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این سطح کاربری را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeleteLevel} 
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

export default UserLevelManagement;
