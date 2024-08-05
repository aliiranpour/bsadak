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
import AddCompanyModal from './components/Add_company_modal';
import EditCompanyModal from './components/EditCompanyModal';
import DetailCompanyModal from './components/DetailCompanyModal';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [editCompany, setEditCompany] = useState(null);
  const [detailCompany, setDetailCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/company', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setCompanies(data);
      } else if (data && Array.isArray(data.data)) {
        setCompanies(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching companies', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDeleteCompany = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/company/${editCompany._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchCompanies();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting company', error);
    }
  };

  const handleEditCompany = async (updatedCompany) => {
    try {
      await axios.patch(`https://api.bsadak.ir/api/company/${editCompany._id}`, updatedCompany, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchCompanies();
      setEditCompany(null);
      onEditClose();
    } catch (error) {
      console.error('Error editing company', error);
    }
  };

  const handleAddCompany = async (newCompany) => {
    try {
      console.log('Sending data to API:', newCompany);
      const response = await axios.post('https://api.bsadak.ir/api/company', newCompany, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      console.log('Response from API:', response.data);
      setCompanies([...companies, response.data]);
      onAddClose();
    } catch (error) {
      console.error('Error adding company', error);
      console.log('Error response:', error.response);
    }
  };

  const handleEditClick = (company) => {
    setEditCompany(company);
    onEditOpen();
  };

  const handleDeleteClick = (company) => {
    setEditCompany(company);
    onDeleteOpen();
  };

  const handleRowClick = (company) => {
    setDetailCompany(company);
    onDetailOpen();
  };

  const filteredCompanies = companies.filter((company) =>
    company.Name && company.Name.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="نام شرکت مورد نظر را وارد کنید"
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
          افزودن شرکت جدید
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام شرکت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">کد ثبت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">توضیحات</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">آدرس</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCompanies.map((company, index) => (
              <Tr key={company._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} onClick={() => handleRowClick(company)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{company.Name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{company.registrationNum}</Td>
                <Td fontSize={textFontSize} textAlign="center">{company.Caption}</Td>
                <Td fontSize={textFontSize} textAlign="center">{company.Address}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(company); }}
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
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(company); }}
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

      <AddCompanyModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddCompany={handleAddCompany}
      />

      {editCompany && (
        <EditCompanyModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditCompany={handleEditCompany}
          initialCompany={editCompany}
        />
      )}

      {detailCompany && (
        <DetailCompanyModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          company={detailCompany}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف شرکت
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این شرکت را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button
                onClick={handleDeleteCompany}
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

export default CompanyManagement;
