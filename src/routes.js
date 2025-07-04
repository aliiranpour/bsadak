import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import Personel from "views/admin/personel";
import Admin from "views/admin/admin";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import MemberManagement from "subroutes/admin/Member_managment/Member_managment";
import UserLevelManagement from "subroutes/admin/User_level_managment/User_level_managment";
import PermissionManagement from "subroutes/admin/Access_managment/Access_managment";
import CompanyManagement from "subroutes/personel/Add_new_company/company_mangment";
import CategoryManagement from "subroutes/personel/add_category/CategoryManagement";
import PositionManagement from "subroutes/personel/add_position/PositionManagement";
import EmployeeList from "subroutes/personel/Personellist/EmployeeList";
import NewEmployeeForm from "subroutes/personel/Add_personel/NewEmployeeForm";
import EmployeeSettlement from "subroutes/personel/Personel_sattlement/Employee_sattlment";
import ContractualItemsPage from "subroutes/personel/Registration_contractual_items/ContractualItems";
import ShiftManagement from "subroutes/personel/add_shift/add_shift";
import Home from "views/home/home";
import Login from "views/auth/logIn/logIn";
import RegisterPersonelForm from "subroutes/personel/register_personel/Rgister-personel-managment";
import PersonnelManagement from "subroutes/personel/Personel_managment/Personel_managment";
import PenaltyForm from "subroutes/personel/Penalty/Penaltymanagment";
import PenaltyList from "subroutes/personel/Penaltylist/Penaltylist";
import WorkList from "subroutes/personel/Works/Workslist";
import SalaryForm from "subroutes/personel/payment/SalaryForm";
import PaymentList from "subroutes/personel/payment/SalaryList.";
import PersonnelDetails from "subroutes/personel/Personel_managment/Personel_detail/Personel_detail";
import AttendanceList from "subroutes/personel/AttendanceList/AttendanceList ";
import AddOvertime from "subroutes/personel/add_extra_work/Add_extra_work";
import Attendance from "subroutes/personel/register_attendance/register_attendance";
import AccountManagement from "subroutes/personel/Personel_managment/hesab/Hesab";

const routes = [
  {
    name: "خانه",
    layout: "/",
    path: "/",
    component: Home,
  },
  {
    name: "ورود",
    layout: "/auth",
    path: "/Login",
    component: Login,
  },
  {
    name: "ثبت نام",
    layout: "/auth",
    path: "/signUp",
    component: Home,
  },
  {
    name: "پیشخوان",
    layout: "/admin",
    path: "/counter",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "ادمین",
    layout: "/admin",
    path: "/admin",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    subRoutes: [
      {
        name: "مدیریت کاربران سایت",
        path: "/member_managment",
        component: MemberManagement,
      },
      {
        name: "مدیریت سطوح کاربری",
        path: "/member-level-managment",
        component: UserLevelManagement,
      },
      {
        name: "مدیریت دسترسی ها",
        path: "/access-managing",
        component: PermissionManagement,
      },
      {
        name: "تنظیمات پیشفرض",
        path: "/default-setting",
        component: MainDashboard,
      },
    ],
  },
  {
    name: "پرسنل",
    layout: "/admin",
    path: "/personel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    subRoutes: [
      {
        name: "مدیریت پرسنل",
        path: "/personel_managing",
        component: PersonnelManagement ,
      },
      {
        name: "افزودن شرکت جدید",
        path: "/add-company",
        component: CompanyManagement,
      },
      {
        name: "افزودن دسته بندی",
        path: "/add-category",
        component: CategoryManagement,
      },
      {
        name: "افزودن سمت",
        path: "/add-positin",
        component: PositionManagement,
      },
      {
        name: "ثبت پرسنل جدید",
        path: "/register-personel",
        component: RegisterPersonelForm ,
      },
      {
        name: "لیست پرسنل",
        path: "/personel-list",
        component: EmployeeList,
      },
      {
        name: "تسویه پرسنل",
        path: "/personel-sattlement",
        component: EmployeeSettlement,
      },
      {
        name: "ثبت موارد قراردادی",
        path: "/Registration_contractual_items",
        component: ContractualItemsPage,
      },
      {
        name: "افزودن شیفت کاری",
        path: "/add-shift",
        component: ShiftManagement,
      },
      {
        name: "حضور غیاب ",
        path: "/present-absence",
        component: Attendance,
      },
      {
        name: "لیست حضور غیاب",
        path: "/present-absence-list",
        component: AttendanceList,
      },
      {
        name: "افزودن اضافه کار",
        path: "/add-extra-work",
        component: AddOvertime,
      },
      {
        name: "ثبت جریمه",
        path: "/register-fine",
        component: PenaltyForm ,
      },
      {
        name: "لیست جریمه‌ها",
        path: "/fines-list",
        component: PenaltyList,
      },
      {
        name: "ثبت تعطیلی",
        path: "/register-holiday",
        component: MainDashboard,
      },
      {
        name: "محاسبه کل کارکرد",
        path: "/calculate-total-function",
        component: MainDashboard,
      },
      {
        name: "لیست کارکردها",
        path: "/functions-list",
        component: WorkList,
      },
      {
        name: "ثبت پرداختی",
        path: "/register-payment",
        component: SalaryForm ,
      },
      {
        name: "لیست پرداختی‌ها",
        path: "/payments-list",
        component: PaymentList,
      },
    ],
  },
  {
    name: "جزئیات پرسنل", 
    layout: "/admin",
    path: "/personel_managing/personnel-details/:personId", 
    component: PersonnelDetails ,
    hidden: true,
  },  {
    name: "حساب پرسنل", 
    layout: "/admin",
    path: "/admin/admin/personel_managing/hesab/:groupId/:monthNumber", 
    component: AccountManagement ,
    hidden: true,
  },
  {
    name: "قرارداد",
    layout: "/admin",
    path: "/contract",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "بارنامه",
    layout: "/admin",
    path: "/waybill",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    subRoutes: [
      {
        name: "بارنامه سوخت",
        path: "/fuel-paybill",
        component: MainDashboard,
      },
      {
        name: "بارنامه سیمان",
        path: "/Cement-paybill",
        component: MainDashboard,
      },
      {
        name: "بارنامه قیر",
        path: "/bitumen-paybill",
        component: MainDashboard,
      },
    ],
  },
  {
    name: "حسابداری",
    layout: "/admin",
    path: "/accounting",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
];

export default routes;
