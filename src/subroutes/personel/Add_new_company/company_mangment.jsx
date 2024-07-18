import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery, Text
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import AddCompanyModal from './components/Add_company_modal';
import EditCompanyModal from './components/EditCompanyModal';
import DetailCompanyModal from './components/DetailCompanyModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const initialCompanies = [
  { id: 1, name: 'شرکت الف', registrationCode: '12345', description: 'شرکت تولیدی با تاریخچه طولانی و محصولات با کیفیت بالا', address: 'تهران، خیابان انقلاب، پلاک ۱' },
  { id: 2, name: 'شرکت ب', registrationCode: '67890', description: 'شرکت خدماتی با گستره خدمات وسیع در حوزه فناوری اطلاعات', address: 'اصفهان، میدان نقش جهان، پلاک ۲' }
];

const CompanyManagement = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [editCompany, setEditCompany] = useState(null);
  const [detailCompany, setDetailCompany] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const handleEditCompany = (updatedCompany) => {
    setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    setEditCompany(null);
    onEditClose();
  };

  const handleDeleteCompany = () => {
    setCompanies(companies.filter(c => c.id !== editCompany.id));
    setEditCompany(null);
    onDeleteClose();
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

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const truncateText = (text, length) => (text.length > length ? `${text.substring(0, length)}...` : text);

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'} borderBottom='1px solid black' pb={5}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan}>مدیریت شرکت‌ها</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          افزودن شرکت جدید
        </Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
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
            {companies.map((company) => (
              <Tr key={company.id} onClick={() => handleRowClick(company)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{company.name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{company.registrationCode}</Td>
                <Td fontSize={textFontSize} textAlign="center">{truncateText(company.description, 20)}</Td>
                <Td fontSize={textFontSize} textAlign="center">{truncateText(company.address, 20)}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(company); }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(company); }}
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
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCompany} ml={3}>
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
