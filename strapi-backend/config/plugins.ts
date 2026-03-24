import type { Core } from '@strapi/strapi';
import * as crypto from 'crypto';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
'users-permissions': {
    config: {
      jwt: {
        jwtSecret: env('STRAPI_JWT_SECRET') || crypto.randomBytes(16).toString('base64')
      },
    },
},
}
);

export default config;
