// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  DollarOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  ProfileOutlined,
  TableOutlined,
  UserOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  PlusOutlined
} from '@ant-design/icons';
// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  DollarOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  ProfileOutlined,
  TableOutlined,
  UserOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  PlusOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'orders',
      title: <FormattedMessage id="Đơn hàng" />,
      type: 'item',
      url: '/orders/list',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'customers',
      title: <FormattedMessage id="Khách hàng" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="Danh sách khách hàng" />,
          type: 'item',
          url: '/customers/list',
          icon: icons.OrderedListOutlined
        },
        {
          id: 'create',
          title: <FormattedMessage id="Tạo khách hàng mới" />,
          type: 'item',
          url: '/customers/create',
          icon: icons.PlusOutlined
        }
      ]
    },
    {
      id: 'sales',
      title: <FormattedMessage id="Danh sách sản phẩm" />,
      type: 'item',
      url: '/sales/list',
      icon: icons.UserOutlined
    },
    {
      id: 'apps',
      title: <FormattedMessage id="Hồ sơ" />,
      type: 'collapse',
      icon: icons.ProfileOutlined,
      children: [
        {
          id: 'profiles-personal',
          title: <FormattedMessage id="profiles-user-personal" />,
          type: 'item',
          url: '/apps/profiles/user/personal',
          target: false
        },
        {
          id: 'profiles-payment',
          title: <FormattedMessage id="profiles-user-payment" />,
          type: 'item',
          url: '/apps/profiles/user/payment',
          target: false
        },
        {
          id: 'profiles-password',
          title: <FormattedMessage id="profiles-user-password" />,
          type: 'item',
          url: '/apps/profiles/user/password',
          target: false
        }
        // {
        //   id: 'profiles-settings',
        //   title: <FormattedMessage id="profiles-user-settings" />,
        //   type: 'item',
        //   url: '/apps/profiles/user/settings',
        //   target: false
        // }
      ]
    }

    // {
    //   id: 'maintenance',
    //   title: <FormattedMessage id="maintenance" />,
    //   type: 'collapse',
    //   icon: icons.RocketOutlined,
    //   isDropdown: true,
    //   children: [
    //     {
    //       id: 'error-404',
    //       title: <FormattedMessage id="error-404" />,
    //       type: 'item',
    //       url: '/maintenance/404',
    //       target: true
    //     },
    //     {
    //       id: 'error-500',
    //       title: <FormattedMessage id="error-500" />,
    //       type: 'item',
    //       url: '/maintenance/500',
    //       target: true
    //     },
    //     {
    //       id: 'coming-soon',
    //       title: <FormattedMessage id="coming-soon" />,
    //       type: 'item',
    //       url: '/maintenance/coming-soon',
    //       target: true
    //     },
    //     {
    //       id: 'under-construction',
    //       title: <FormattedMessage id="under-construction" />,
    //       type: 'item',
    //       url: '/maintenance/under-construction',
    //       target: true
    //     }
    //   ]
    // }
  ]
};

export default pages;
