import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || crypto.randomBytes(16).toString('base64'),
    },
});

export default config;
