import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, Button, Input, Select, FormControl, FormLabel, FormErrorMessage, useToast, Grid, GridItem, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker2';
import axios from 'axios';

const RegisterPersonelForm = () => {
  const { handleSubmit, register, control, formState: { errors } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      await axios.post('https://api.bsadak.ir/api/personel', formData, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: "پرسنل جدید با موفقیت ثبت شد.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error registering personel:', error);
      toast({
        title: "خطا در ثبت پرسنل جدید.",
        description: error.response ? error.response.data.message : error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>نام</FormLabel>
              <Input {...register("name", { required: 'نام الزامی است' })} />
              {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel> نام خانواگی </FormLabel>
              <Input {...register("lastname", { required: 'نام خانوادگی الزامی است' })} />
              {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isInvalid={errors.nationalCode}>
              <FormLabel>کدملی</FormLabel>
              <Input {...register("codemeli", { required: 'کدملی الزامی است' })} type="number" />
              {errors.nationalCode && <FormErrorMessage>{errors.nationalCode.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isInvalid={errors.pedar}>
              <FormLabel> نام پدر</FormLabel>
              <Input {...register("pedar")} />
              {errors.pedar && <FormErrorMessage>{errors.pedar.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>تاریخ شروع به کار</FormLabel>
            <Controller
              control={control}
              name="Start"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  isGregorian={false}
                  timePicker={false}
                  placeholder="تاریخ شروع به کار"
                />
              )}
              rules={{ required: 'تاریخ شروع به کار الزامی است' }}
            />
            {errors.startDate && <FormErrorMessage>{errors.startDate.message}</FormErrorMessage>}
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isInvalid={errors.iban}>
              <FormLabel>شماره شبا</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children="IR" />
                <Input {...register("shaba")} type="number" />
              </InputGroup>
              {errors.shaba && <FormErrorMessage>{errors.shaba.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>شماره کارت</FormLabel>
              <Input {...register("Card")} type="number" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>بیمه</FormLabel>
              <Select {...register("bime")}>
                <option value="بیمه دارد">بیمه دارد</option>
                <option value="بیمه ندارد">بیمه ندارد</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>وضعیت تاهل</FormLabel>
              <Select {...register("Martial")}>
                <option value="0">مجرد</option>
                <option value="1">متاهل</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>شماره شناسنامه</FormLabel>
              <Input {...register("Shenasnameh")} type="number" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>تاریخ تولد</FormLabel>
            <Controller
              control={control}
              name="BirthDay"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  isGregorian={false}
                  timePicker={false}
                  placeholder="تاریخ تولد"
                />
              )}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>محل صدور  </FormLabel>
              <Input {...register("sodor")} type="text" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel> تلفن </FormLabel>
              <Input {...register("phone")} type="tel" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel> تعداد فرزندان </FormLabel>
              <Input {...register("ovlad")} type="number" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel> آدرس </FormLabel>
              <Input {...register("adres")} type="text" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>عکس پرسنلی</FormLabel>
              <Input {...register("image")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>عکس روی کارت ملی</FormLabel>
              <Input {...register("Meli1")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>عکس پشت کارت ملی</FormLabel>
              <Input {...register("Meli2")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel> صفحه اول شناسنامه </FormLabel>
              <Input {...register("Shenasnameh1")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>صفحه دوم شناسنامه</FormLabel>
              <Input {...register("Shenasnameh2")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>صفحه سوم شناسنامه</FormLabel>
              <Input {...register("Shenasnameh3")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel> مدرک تحصیلی </FormLabel>
              <Input {...register("Madarak")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel> سایر مدارک </FormLabel>
              <Input {...register("Other")} type="file" accept="image/*" />
            </FormControl>
          </GridItem>
          
          <GridItem colSpan={2}>
            <Button colorScheme="teal" bgColor={"green.900"} color={'white'} type="submit">ثبت پرسنل جدید</Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterPersonelForm;
