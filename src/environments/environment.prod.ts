import {UserRoleType} from '@app/panel/domain/user-role-type';

const baseUrl = 'http://185.185.126.15:8020';
export const environment = {
  production: true,
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
        token: baseUrl + '/engine/oauth/token'
      },
      dashboard: {
        get: (currency: string) => `/engine/dashboard/volumes/${currency}`,
        topTerminals: baseUrl + '/engine/dashboard/terminals',
        topMerchants: baseUrl + '/engine/dashboard/merchants',
        topContracts: baseUrl + '/engine/dashboard/contracts'
      },
      users: {
        requestReset: baseUrl + '/engine/users/request',
        confirmation_token: baseUrl + '/engine/users/confirmation_token',
        reset_token: baseUrl + '/engine/users/reset_token',
        reset_confirmation: baseUrl + '/engine/users/reset_confirmation',
        reset_password: baseUrl + '/engine/users/reset_password',
        reset_user_password: baseUrl + '/engine/users/reset_user_password',
        reset: baseUrl + '/engine/users/reset',
        base: baseUrl + '/engine/users/pages',
        find: baseUrl + '/engine/users/find',
        create: baseUrl + '/engine/users/create',
        get: (id: number) => `/engine/users/${id}`,
        persist: (id: number) => `/engine/users/${id}`,
        export: baseUrl + '/engine/users/export'
      },
      downloads: {
        getPdf: baseUrl + '/engine/downloads/export'
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
