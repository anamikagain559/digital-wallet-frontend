import Deposites from "@/pages/User/Deposits";
import Profile from "@/pages/User/Profile";
import Send from "@/pages/User/Send";
import Transactions from "@/pages/User/Transactions";
import Withdraw from "@/pages/User/Withdraw";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Deposits",
        url: "/user/deposits",
        component: Deposites,
      },
          {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
          {
        title: "Send",
        url: "/user/send",
        component: Send,
      },
          {
        title: "Transactions",
        url: "/user/transactions",
        component: Transactions,
      },
          {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
];