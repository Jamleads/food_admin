import {
  MdOutlineCampaign,
  MdOutlineSignpost,
  MdOutlineMapsHomeWork,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaUserInjured } from "react-icons/fa";

export const sideBarData = [
  {
    id: 1,
    pageLink: "/",
    pageName: "Dashboard",
    pageIcon: MdOutlineMapsHomeWork,
  },
  {
    id: 2,
    pageLink: "/orders",
    pageName: "orders",
    pageIcon: MdShoppingCartCheckout,
  },
  {
    id: 3,
    pageLink: "/products",
    pageName: "products",
    pageIcon: MdOutlineCampaign,
  },
  {
    id: 6,
    pageLink: "/rewards",
    pageName: "rewards",
    pageIcon: MdOutlineCampaign,
  },
  {
    id: 4,
    pageLink: "/categories",
    pageName: "categories",
    pageIcon: MdOutlineSignpost,
  },
  {
    id: 5,
    pageLink: "/customers",
    pageName: "customers",
    pageIcon: HiUserGroup,
  },
  {
    id: 5,
    pageLink: "/admins",
    pageName: "admins",
    pageIcon: FaUserInjured,
  },
];

export const campaignData = [
  {
    id: 1,
    campaignTitle: "Campaign 1",
    campaignStatus: "Active",
    createdBy: "Marketer Username",
    createdDate: "2021-05-20",
    lastModifiedDate: "2021-05-20",
  },
  {
    id: 2,
    campaignTitle: "Campaign 2",
    campaignStatus: "Daft",
    createdBy: "Marketer Username",
    createdDate: "2021-05-20",
    lastModifiedDate: "2021-05-20",
  },
  {
    id: 3,
    campaignTitle: "Campaign 3",
    campaignStatus: "Active",
    createdBy: "Marketer Username",
    createdDate: "2021-05-20",
    lastModifiedDate: "2021-05-20",
  },
  {
    id: 4,
    campaignTitle: "Campaign 4",
    campaignStatus: "Active",
    createdBy: "Marketer Username",
    createdDate: "2021-05-20",
    lastModifiedDate: "2021-05-20",
  },
  {
    id: 5,
    campaignTitle: "Campaign 5",
    campaignStatus: "Pending",
    createdBy: "Marketer Username",
    createdDate: "2021-05-20",
    lastModifiedDate: "2021-05-20",
  },
];

// dummy
export const dashVeriicationProces = [
  {
    title: "Email veriication",
    details: "Verify your email address",
    status: "Done",
  },
  {
    title: "Complete profile",
    details:
      "Complete your profile information manually or migrate your MailerLite Classic account to get started",
    status: "Done",
  },
  {
    title: "Confirm account",
    details:
      "Confirm your account in order to start sending campaigns and publishing sites.",
    status: "Complete",
  },
];

export const boardData = [
  {
    name: "Subscribers",
    total: 100,
    note: "Want more subscribers? Grow your email list with",
    action: "signup forms",
    to: "/campainSignform",
  },
  {
    name: "Emails sent",
    total: 60,
    note: "Want to send more emails? use",
    action: "send email",
    to: "/campainSignform",
  },
  {
    name: "Active Forms",
    total: 10,
    note: "Create more active forms?",
    action: "forms",
    to: "/campainSignform",
  },
  {
    name: "Campaign",
    total: 100,
    note: "Reach your subscribers with more campaign",
    action: "create campaign",
    to: "/campainSignform",
  },
  {
    name: "Post",
    total: 100,
    note: "Reach your subscribers with more post",
    action: "create post",
    to: "/campainSignform",
  },
];
