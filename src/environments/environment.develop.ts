import {UserRoleType} from '@app/panel/domain/user-role-type';

export const environment = {
  production: false,
  config: {
    pageSize: 10
  },
  api: {
    keys: {
      auth: {
        clientId: 'web',
        secret: 'secret'
      }
    },
    urls: {
      auth: {
        token: '/engine/oauth/token'
      },
      dashboard: {
        get: (currency: string) => `/engine/dashboard/volumes/${currency}`,
        topTerminals: '/engine/dashboard/terminals',
        topMerchants: '/engine/dashboard/merchants',
        topContracts: '/engine/dashboard/contracts'
      },
      users: {
        requestReset: '/engine/users/request',
        confirmation_token: '/engine/users/confirmation_token',
        reset_token: '/engine/users/reset_token',
        reset_confirmation: '/engine/users/reset_confirmation',
        reset_password: '/engine/users/reset_password',
        reset_user_password: '/engine/users/reset_user_password',
        reset: '/engine/users/reset',
        base: '/engine/users/pages',
        find: '/engine/users/find',
        create: '/engine/users/create',
        get: (id: number) => `/engine/users/${id}`,
        persist: (id: number) => `/engine/users/${id}`,
        export: '/engine/users/export'
      },
      downloads: {
        getPdf: '/engine/downloads/export'
      }
    },
    unauthorizedUrls: [
      new RegExp('^/engine/oauth/token$'),
      new RegExp('^/engine/users/request$'),
      new RegExp('^/engine/users/confirmation_token$'),
      new RegExp('^/engine/users/reset_token'),
      new RegExp('^/engine/users/reset_confirmation'),
      new RegExp('^/engine/users/reset_password'),
      new RegExp('^/engine/users/reset$')
    ]
  },
  defaultRoutes: [
    { role: UserRoleType.masterAdmin, route: '/panel/dashboard' }
  ]
};
