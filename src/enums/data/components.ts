import { Enum } from '@/enums/enum'

export const components = new Enum({
  layouts: [
    'userLayout',
    'basicLayout',
    'routeView',
    'blankLayout',
    'pageView'
  ],
  children: [
    'workplace',
    'users',
    'roles',
    'rules',
    'departments',
    'jobs',
    'database',
    'loginLog',
    'operateLog',
    'attachment',
    'config',
    'generate',
    'xiaoquIndex',
    'IsEmptyPage'
  ]
})
