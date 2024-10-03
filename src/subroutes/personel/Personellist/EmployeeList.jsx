import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Select, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton } from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';
import axios from 'axios';

const PersonnelList = () => {
  const [personnelData, setPersonnelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null); // For modal details
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const toast = useToast();

  useEffect(() => {
    fetchPersonnel();
  }, [selectedFilter]);

  const fetchPersonnel = async () => {
    setLoading(true);
    try {
      let apiUrl = 'https://api.bsadak.ir/api/personel';
      if (selectedFilter === 'active') apiUrl += '?payoff=0';
      if (selectedFilter === 'settled') apiUrl += '?payoff=1';

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPersonnelData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error('Error fetching personnel data:', error);
      toast({
        title: 'Error fetching data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = personnelData.filter(
      (personnel) =>
        personnel.Name.toLowerCase().includes(query) ||
        personnel.LastName.toLowerCase().includes(query) ||
        personnel.CodeMeli.includes(query) ||
        String(personnel.PersonnelCode).includes(query)
    );
    setFilteredData(filtered);
  };

  const openModal = (personnel) => {
    setSelectedPersonnel(personnel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonnel(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/personel/${id}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      toast({
        title: 'Personnel deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchPersonnel();
    } catch (error) {
      console.error('Error deleting personnel:', error);
      toast({
        title: 'Error deleting personnel',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <FormControl width="25%">
          <FormLabel>فیلتر وضعیت</FormLabel>
          <Select
            placeholder="همه"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">همه</option>
            <option value="active">پرسنل فعال</option>
            <option value="settled">تسویه شده</option>
          </Select>
        </FormControl>

        <FormControl width="40%">
          <FormLabel>جستجو</FormLabel>
          <Input
            placeholder="جستجو براساس نام، نام خانوادگی، کد ملی یا کد پرسنلی"
            value={searchQuery}
            onChange={handleSearch}
          />
        </FormControl>
      </Flex>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table variant="striped" mt={5}>
          <Thead>
            <Tr>
              <Th>نام</Th>
              <Th>نام خانوادگی</Th>
              <Th>کد ملی</Th>
              <Th>کد پرسنلی</Th>
              <Th>وضعیت</Th>
              <Th>تاریخ شروع به کار</Th>
              <Th>جزئیات</Th>
              <Th>ویرایش</Th>
              <Th>حذف</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((personnel) => (
              <Tr key={personnel._id}>
                <Td>{personnel.Name}</Td>
                <Td>{personnel.LastName}</Td>
                <Td>{personnel.CodeMeli}</Td>
                <Td>{personnel.PersonnelCode}</Td>
                <Td>{personnel.PayOff ? 'تسویه شده' : 'فعال'}</Td>
                <Td>{personnel.Start.Persian}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => openModal(personnel)}>
                    جزئیات
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="yellow">ویرایش</Button>
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDelete(personnel._id)}>
                    حذف
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {selectedPersonnel && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <IconButton
                icon={<FaPrint />}
                aria-label="Print"
                onClick={() => window.print()}
                colorScheme="blue"
              />
              جزئیات پرسنل
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>نام: {selectedPersonnel.Name}</p>
              <p>نام خانوادگی: {selectedPersonnel.LastName}</p>
              <p>کد ملی: {selectedPersonnel.CodeMeli}</p>
              <p>کد پرسنلی: {selectedPersonnel.PersonnelCode}</p>
              <p>وضعیت: {selectedPersonnel.PayOff ? 'تسویه شده' : 'فعال'}</p>
              <p>تاریخ شروع: {selectedPersonnel.Start.Persian}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="ghost" borderRadius={5} bgColor={'blackAlpha.400'} onClick={closeModal}>
                بستن
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default PersonnelList;
