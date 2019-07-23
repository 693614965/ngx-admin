import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '权限管理',
    icon: 'grid-outline',
    children: [
      {
        title: '用户管理',
        link: '/views/authority/users',
      },
      {
        title: '角色管理',
        link: '/views/authority/roles',
      },
    ],
  },
  {
    title: '系统管理',
    icon: 'grid-outline',
    children: [
      {
        title: '菜单管理',
        link: '/views/system/menus',
      },
      {
        title: '功能管理',
        link: '/views/system/permissions',
      },
      {
        title: '字典管理',
        link: '/views/system/dicts',
      },
    ],
  },
];
