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
  useMediaQuery,
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  useToast,
  VStack
} from '@chakra-ui/react';
import { EditIcon, RepeatIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import axios from 'axios';
import AddPayOffModal from './components/AddPayOffModal';
import EditPayOffModal from './components/EditPayOffModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf'

const PayOffManagement = () => {
  const [personnelList, setPersonnelList] = useState([]);
  const [payOffPersonnel, setPayOffPersonnel] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  const fetchPersonnelList = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/personel', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPersonnelList(response.data.data);
    } catch (error) {
      console.error('Error fetching personnel list', error);
    }
  };

  const fetchPayOffPersonnel = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/personel/payoff', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPayOffPersonnel(response.data.data);
    } catch (error) {
      console.error('Error fetching payoff personnel', error);
    }
  };

  useEffect(() => {
    fetchPersonnelList();
    fetchPayOffPersonnel();
  }, []);

  const handleAddPayOff = async (payOffData) => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/personel/payoff', payOffData, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setPayOffPersonnel([...payOffPersonnel, response.data]);
      onAddClose();
      toast({
        title: 'Success',
        description: 'Payoff successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding payoff', error);
      toast({
        title: 'Error',
        description: 'Failed to add payoff.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditPayOff = async (updatedPayOffData) => {
    try {
      await axios.patch(`https://api.bsadak.ir/api/personel/payoff/${selectedPersonnel._id}`, updatedPayOffData, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });

      setPayOffPersonnel(prevList =>
        prevList.map(person =>
          person._id === selectedPersonnel._id
            ? { ...person, End: updatedPayOffData.End }
            : person
        )
      );

      onEditClose();
      toast({
        title: 'Success',
        description: 'Payoff successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error editing payoff', error);
      toast({
        title: 'Error',
        description: 'Failed to update payoff.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReturnToWork = async (personnelId) => {
    try {
      await axios.put(`https://api.bsadak.ir/api/personel/payoff/${personnelId}`, {}, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      fetchPayOffPersonnel();
      toast({
        title: 'Success',
        description: 'Personnel successfully returned to work.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error returning personnel to work', error);
      toast({
        title: 'Error',
        description: 'Failed to return personnel to work.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredPayOffPersonnel = Array.isArray(payOffPersonnel)
    ? payOffPersonnel.filter((person) => {
        const payOffDate = moment(person.End.Persian, 'jYYYY/jMM/jDD');
        return (
          person.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!startDate || !endDate || payOffDate.isBetween(startDate, endDate, 'day', '[]'))
        );
      })
    : [];

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Flex justifyContent="space-between" alignItems="center" flexDirection={isMobile ? 'column' : 'row'}>
          <InputGroup mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '60%'} h="50px"  borderRadius={5} mx={3}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
            <Input
              type="text"
              placeholder="جستجو بر اساس نام پرسنل"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              h="50px"
            />
          </InputGroup>
          <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onAddOpen} bgColor={'green.900'} 
            borderRadius={5} 
            w={isMobile ? '100%' : '40%'}
            h="50px"
          >
            ثبت تسویه جدید
          </Button>
        </Flex>
        <Flex justifyContent="flex-start" alignItems="center" flexDirection={isMobile ? 'column' : 'row'}>
          <InputGroup>
            <FormLabel> از تاریخ </FormLabel>
            <DatePicker
                isGregorian={false}
                value={startDate}
                onChange={setStartDate}
                placeholderText="از تاریخ"
                timePicker={false}
                outline='1px solid black'
                border='1px solid black'
              />
          </InputGroup>
          <InputGroup>
            <FormLabel> تا تاریخ </FormLabel>
            <DatePicker
                isGregorian={false}
                value={endDate}
                onChange={setEndDate}
                placeholderText="تا تاریخ"
                timePicker={false}
                w='100%'
                outline='1px solid black'
                border='1px solid black'
              />
          </InputGroup>
        </Flex>
        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th justifyContent="center" fontFamily={yekan}>نام</Th>
                <Th justifyContent="center" fontFamily={yekan}>نام خانوادگی</Th>
                <Th justifyContent="center" fontFamily={yekan}>کد پرسنلی</Th>
                <Th justifyContent="center" fontFamily={yekan}>تاریخ تسویه</Th>
                <Th justifyContent="center" fontFamily={yekan}>عملیات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPayOffPersonnel.map((person) => (
                <Tr key={person._id}>
                  <Td justifyContent="center" fontFamily={yekan} >{person.Name}</Td>
                  <Td justifyContent="center" fontFamily={yekan}>{person.LastName}</Td>
                  <Td justifyContent="center" fontFamily={yekan}>{person.PersonnelCode}</Td>
                  <Td justifyContent="center" fontFamily={yekan}>{person.End.Persian}</Td>
                  <Td>
                    <Flex justifyContent="center">
                      <Button
                        leftIcon={<EditIcon />}
                        colorScheme="teal"
                        borderRadius={5}
                        onClick={() => {
                          setSelectedPersonnel(person);
                          onEditOpen();
                        }}
                        mr={2}
                        bgColor={'green.700'}
                      >
                        ویرایش
                      </Button>
                      <Button
                        leftIcon={<RepeatIcon />}
                        colorScheme="yellow"
                        borderRadius={5}
                        bgColor={'yellow.400'}
                        color={'white'}
                        onClick={() => handleReturnToWork(person._id)}
                      >
                        بازگشت به کار
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <AddPayOffModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddPayOff={handleAddPayOff}
        personnelList={personnelList}
      />

      {selectedPersonnel && (
        <EditPayOffModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditPayOff={handleEditPayOff}
          personnel={selectedPersonnel}
        />
      )}
    </Box>
  );
};

export default PayOffManagement;
