import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Select, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Spinner, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YearModal from './components/modals/add_new_year';
import AddGroupModal from './components/modals/add_new_group';
import AddPersonnelToGroupModal from './components/modals/add_personel_group';
import WorkDetailsModal from './components/modals/WorkDetailsModal'; // اضافه کردن مدال جدید

const PersonnelManagement = () => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [status, setStatus] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState(''); // افزودن state برای نگهداری شناسه پرسنل انتخاب‌شده
  const navigate = useNavigate();

  const {
    isOpen: isYearModalOpen,
    onOpen: onYearModalOpen,
    onClose: onYearModalClose,
  } = useDisclosure();

  const {
    isOpen: isAddGroupModalOpen,
    onOpen: onAddGroupModalOpen,
    onClose: onAddGroupModalClose,
  } = useDisclosure();

  const {
    isOpen: isAddPersonnelToGroupModalOpen,
    onOpen: onAddPersonnelToGroupModalOpen,
    onClose: onAddPersonnelToGroupModalClose,
  } = useDisclosure();

  const {
    isOpen: isWorkDetailsModalOpen,
    onOpen: onWorkDetailsModalOpen,
    onClose: onWorkDetailsModalClose,
  } = useDisclosure(); // برای مدیریت مدال جدید

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    fetchPersonnel();
  }, [selectedGroup, status, selectedCategory]);

  const fetchGroups = async () => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/group/company', {}, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      const validGroups = response.data.data.filter(group => group.Company !== null);
      setGroups(validGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchPersonnel = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.bsadak.ir/api/group/user/1', {
        Status: status,
        Category: selectedCategory,
        Company: selectedCompany,
        Year: selectedYear,
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPersonnel(response.data.data);
    } catch (error) {
      console.error('Error fetching personnel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = async (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    setSelectedCategory('');

    if (groupId) {
      try {
        const selectedGroup = groups.find((group) => group._id === groupId);
        setSelectedCompany(selectedGroup?.Company?._id || '');
        setSelectedYear(selectedGroup?.Year?._id || '');

        const response = await axios.get(`https://api.bsadak.ir/api/group/join/${groupId}`, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        const personnelResponse = await axios.get(`https://api.bsadak.ir/api/category`, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });

        setCategories(personnelResponse.data.data.filter((category) => category.Company._id === selectedGroup.Company._id));
      } catch (error) {
        console.error('Error fetching personnel or categories:', error);
      }
    }
  };

  const handleStatusChange = (event) => {
    setStatus(Number(event.target.value));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleAccountsClick = (groupId) => {
    navigate(`/admin/admin/personel_managing/hesab/${groupId}`);
  };  

  const handleDetailsClick = (personId) => {
    navigate(`/admin/admin/personel_managing/personnel-details/${personId}`);
  };

  const handleDelete = async (personId) => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/group/user/${personId}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPersonnel((prev) => prev.filter((person) => person._id !== personId));
    } catch (error) {
      console.error('Error deleting personnel:', error);
    }
  };

  const handleWorkDetailsClick = (personId) => {
    setSelectedPersonId(personId);
    onWorkDetailsModalOpen();
  };

  return (
    <Box p={5}>
      <Flex justifyContent="flex-start" ml={10} mb={5}>
        <Button colorScheme="teal" onClick={onYearModalOpen} borderRadius={5} bgColor={'green.500'} mr={4}>
          افزودن سال
        </Button>
        <Button colorScheme="green" onClick={onAddGroupModalOpen} borderRadius={5} bgColor={'green.700'} mr={4}>
          افزودن گروه
        </Button>
        <Button colorScheme="teal" onClick={onAddPersonnelToGroupModalOpen} borderRadius={5} bgColor={'green.900'}>
          افزودن پرسنل به گروه‌ها
        </Button>
      </Flex>

      <Flex justifyContent="flex-start" ml={10} mb={5}>
        <Select placeholder="انتخاب گروه" onChange={handleGroupChange} mr={4}>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.Company?.Name} ({group.Year?.Number})
            </option>
          ))}
        </Select>

        <Select placeholder="انتخاب وضعیت" onChange={handleStatusChange} mr={4}>
          <option value={0}>همه</option>
          <option value={1}>فعال</option>
          <option value={2}>تسویه شده</option>
        </Select>

        <Select placeholder="انتخاب دسته‌بندی" onChange={handleCategoryChange} mr={4} isDisabled={!selectedGroup}>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.Name}
            </option>
          ))}
        </Select>
      </Flex>

      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : personnel.length > 0 ? (
        <Table variant="striped" mt={5} border={'1px solid gray'} borderRadius={5}>
          <Thead>
            <Tr bg={'white'}>
              <Th>شماره پرسنلی</Th>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>شرکت</Th>
              <Th>سال</Th>
              <Th>دسته‌بندی</Th>
              <Th>وضعیت بیمه</Th>
              <Th>جزئیات</Th>
              <Th>حساب</Th>
              <Th>جزئیات کارکرد</Th> {/* ستون جدید */}
              <Th>حذف</Th>
            </Tr>
          </Thead>
          <Tbody>
            {personnel.map((person, index) => (
              <Tr key={person._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} cursor="pointer">
                <Td>{person.Personnel.PersonnelCode}</Td>
                <Td>{person.Personnel.Name}</Td>
                <Td>{person.Personnel.LastName}</Td>
                <Td>{person.Company?.Name || 'نامشخص'}</Td>
                <Td>{person.Year?.Number || 'نامشخص'}</Td>
                <Td>{person.Category?.Name || 'نامشخص'}</Td>
                <Td>{person.Personnel.Insurance}</Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleDetailsClick(person._id)}>جزئیات</Button>
                </Td>
                <Td>
                  <Button colorScheme='whatsapp' onClick={() => handleAccountsClick(person.Group?._id)}>حساب</Button>
                </Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => handleWorkDetailsClick(person._id)}>جزئیات کارکرد</Button>
                </Td>
                <Td>
                  <IconButton
                    aria-label="حذف"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete(person._id);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text mt={5} textAlign="center">هیچ پرسنلی یافت نشد.</Text>
      )}

      <YearModal isOpen={isYearModalOpen} onClose={onYearModalClose} />
      <AddGroupModal isOpen={isAddGroupModalOpen} onClose={onAddGroupModalClose} />
      <AddPersonnelToGroupModal isOpen={isAddPersonnelToGroupModalOpen} onClose={onAddPersonnelToGroupModalClose} />
      <WorkDetailsModal isOpen={isWorkDetailsModalOpen} onClose={onWorkDetailsModalClose} personId={selectedPersonId} /> {/* مدال جدید */}
    </Box>
  );
};

export default PersonnelManagement;
