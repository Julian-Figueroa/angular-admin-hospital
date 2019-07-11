import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'Users', url: '/progress'},
        { title: 'Roles', url: '/graph1'},
      ]
    }
  ]

  constructor() { }

}
