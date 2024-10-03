import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, IconButton, Select, Stack, Divider, Button, Input, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { addCommas } from 'persian-tools2';
import { useParams } from 'react-router-dom';
import EditDailyContractModal from './components/EditDailyContractModal';
import EditDailyWagesModal from './components/EditDailyWagesModal';
import AddPaymentModal from './components/AddPaymentModal';
import EditCategoryModal from './components/EditCategoryModal';

const PersonnelDetails = () => {
  const { personId } = useParams();
  const [personnelData, setPersonnelData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [sayer, setSayer] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDailyWagesOpen, onOpen: onDailyWagesOpen, onClose: onDailyWagesClose } = useDisclosure();
  const { isOpen: isCategoryOpen, onOpen: onCategoryOpen, onClose: onCategoryClose } = useDisclosure();
  const { isOpen: isAddPaymentOpen, onOpen: onAddPaymentOpen, onClose: onAddPaymentClose } = useDisclosure();

  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  useEffect(() => {
    if (personId) {
      fetchPersonnelData();
      fetchContractData();
    }
  }, [personId, selectedMonth]);

  const fetchPersonnelData = async () => {
    try {
      const response = await axios.get(`https://api.bsadak.ir/api/groupdocument/more/${personId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setPersonnelData(response.data);
      setSayer(response.data.sayer);
    } catch (error) {
      console.error('Error fetching personnel data:', error);
    }
  };

  const fetchContractData = async () => {
    try {
      const response = await axios.get(`https://api.bsadak.ir/api/groupdocument/contract/${personId}/${selectedMonth}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setContractData(response.data.data);
    } catch (error) {
      console.error('Error fetching contract data:', error);
    }
  };

  const handleDeleteSayer = async (sayerId) => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/groupdocument/sayer/${personId}/${sayerId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      fetchPersonnelData();
    } catch (error) {
      console.error('Error deleting sayer:', error);
    }
  };

  if (!personnelData || !contractData) return <div>Loading...</div>;

  return (
    <Box p={5}>
      <Flex direction="column" bg="gray.50" borderRadius={10} p={5} border="1px solid #1c4532">
        {/* Header Section */}
        <Flex justifyContent="space-between" mb={5} p={3} border="1px solid #1c4532" borderRadius={5} bg="green.900" color="white">
          <Text fontWeight="bold">
            نام: {personnelData.personnel.Name} {personnelData.personnel.LastName}
          </Text>
          <Text fontWeight="bold">سال: {personnelData.year.Number}</Text>
          <Text fontWeight="bold">شرکت: {personnelData.company.Name}</Text>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} mb={5} gap={5}>
          {/* Contract Details */}
          <Box flex={1} bg="green.900" color="white" borderRadius={10} p={5} border="1px solid #1c4532">
            <Text fontWeight="bold" mb={4}>موارد قراردادی کلی</Text>
            <Stack spacing={3}>
              <Flex justifyContent="space-between">
                <Text>حق مسکن:</Text>
                <Text>{addCommas(personnelData.rightHousing)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>حق تأهل:</Text>
                <Text>{addCommas(personnelData.hamsar)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>حق فرزند:</Text>
                <Text>{addCommas(personnelData.rightChild)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>بن کارگری:</Text>
                <Text>{addCommas(personnelData.bone)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>سنوات روزانه:</Text>
                <Text>{addCommas(personnelData.daySanavat)} ریال</Text>
              </Flex>
            </Stack>
          </Box>

          {/* Additional Info */}
          <Box flex={1} bg="white" borderRadius={10} p={5} border="1px solid #1c4532">
            <Stack spacing={3}>
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>محل کار:</Text>
                  <Text>{personnelData.category.Name}</Text>
                </Box>
                <IconButton 
                  icon={<EditIcon />} 
                  size="sm" 
                  onClick={onCategoryOpen} 
                  aria-label="Edit Category" 
                />
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>دستمزد روزانه:</Text>
                  <Text>{addCommas(personnelData.dailyWages)} ریال</Text>
                </Box>
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  onClick={onDailyWagesOpen} 
                  aria-label="Edit Daily Wages" 
                />
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>مبلغ کسر کار:</Text>
                <Text>{addCommas(personnelData.delay)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>مبلغ غیبت:</Text>
                <Text>{addCommas(personnelData.absence)} ریال</Text>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>عیدی:</Text>
                <Button flex={1} size="xs">محاسبه</Button>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>سنوات:</Text>
                <Button flex={1} size="xs">محاسبه</Button>
              </Flex>
            </Stack>
          </Box>

          {/* Contract Details */}
          <Box flex={1} bg="green.900" color="white" borderRadius={10} p={5} border="1px solid #1c4532">
            <Flex justifyContent="space-between" alignItems="center" mb={5}>
              <Text fontWeight="bold">قرارداد روزانه</Text>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                onClick={onOpen}
                aria-label="Edit Daily Contract"
                bgColor={'green.900'}
              />
            </Flex>
            <Select placeholder="انتخاب ماه" onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth} mb={5} color="black">
              {months.map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
              ))}
            </Select>
            <Stack spacing={3}>
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>انتخاب سمت:</Text>
                  <Text>{contractData.semat}</Text>
                </Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>تعداد روز قرارداد:</Text>
                  <Text>{contractData.days}</Text>
                </Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>فوق العاده شغل:</Text>
                  <Text>{addCommas(contractData.job)} ریال</Text>
                </Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Box flex={2}>
                  <Text>سایر مزایا:</Text>
                  <Text>{addCommas(contractData.moreBenefits)} ریال</Text>
                </Box>
              </Flex>
              <Divider />
              <Flex justifyContent="space-between">
                <Text>تعداد فرزند:</Text>
                <Text>{contractData.child}</Text>
              </Flex>
            </Stack>
          </Box>
        </Flex>

        {/* Payments Section */}
        <Box mt={10} bg="white" borderRadius={10} p={5} border="1px solid #1c4532">
          <Flex mb={5} justifyContent="space-between" alignItems="center">
            <Input placeholder="جستجو..."   h="50px" />
            <Button 
              onClick={onAddPaymentOpen}           
              borderRadius={5}
              h="50px"
              colorScheme="green"
              color="white"
              bgColor="green.700"
            >  
              افزودن  سایر پرداختی
            </Button>
          </Flex>
          <Table variant="striped" mt={5} border={'1px solid gray'} borderRadius={5}>
            <Thead>
              <Tr>
                <Th textAlign="center">مبلغ</Th>
                <Th textAlign="center">ماه</Th>
                <Th textAlign="center">علت</Th>
                <Th textAlign="center">حذف</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sayer.map((item, index) => (
                <Tr key={item._id}  bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
                  <Td textAlign="center">{addCommas(item.Amount)} ریال</Td>
                  <Td textAlign="center">{months[item.Month - 1]}</Td>
                  <Td textAlign="center">{item.Reason}</Td>
                  <Td textAlign="center">
                    <IconButton
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => handleDeleteSayer(item._id)}
                      aria-label="Delete Sayer"
                      colorScheme="blackAlpha"
                      bgColor="blackAlpha.800"
                      color="white"
                      borderRadius={5}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>

      {/* Modals */}
      <EditDailyContractModal
        isOpen={isOpen}
        onClose={onClose}
        personId={personId}
        selectedMonth={selectedMonth}
        contractData={contractData}
        onSave={fetchContractData}
      />

      <EditDailyWagesModal
        isOpen={isDailyWagesOpen}
        onClose={onDailyWagesClose}
        personId={personId}
        currentWages={personnelData.dailyWages}
        onSave={fetchPersonnelData}
      />

      <AddPaymentModal
        isOpen={isAddPaymentOpen}
        onClose={onAddPaymentClose}
        personId={personId}
        onSave={fetchPersonnelData}
      />

      <EditCategoryModal
        isOpen={isCategoryOpen}
        onClose={onCategoryClose}
        personId={personId}
        currentCategory={personnelData.category}
        companyName={personnelData.company.Name}
        onSave={fetchPersonnelData}
      />
    </Box>
  );
};

export default PersonnelDetails;
