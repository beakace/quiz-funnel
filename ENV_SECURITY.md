# Environment Variables Security Guide

## Security Issue Detected

A GitGuardian warning was triggered because database credentials were committed to the repository. This is a serious security risk as it exposes sensitive information that could be used to access your database.

## Immediate Actions Taken

1. **Removed sensitive credentials** from the `.env` file and replaced them with placeholders
2. **Updated `.gitignore`** to properly exclude all environment files
3. **Created `.env.example`** as a template without real credentials

## Best Practices for Environment Variables

### Never Commit Credentials to Git

- **NEVER** commit `.env` files containing real credentials to your repository
- Use `.env.example` files with placeholders to show required variables
- Generate new credentials if you accidentally expose them

### Setting Up Your Environment

1. Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

2. Fill in your actual credentials in the `.env` file

3. For production environments (like Vercel), use the platform's environment variable settings

### Vercel Deployment

When deploying to Vercel:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add all required variables from your `.env.example` file with real values
4. Deploy your application

### Database URL Security

For the `DATABASE_URL` variable:

- Use connection pooling URLs when available
- Ensure SSL is enabled (`sslmode=require`)
- Consider using environment-specific database users with limited permissions

### Rotating Credentials

If credentials are exposed:

1. Generate new database credentials immediately
2. Update all environments with the new credentials
3. Monitor for any unauthorized access

## Additional Resources

- [Prisma Environment Variables](https://pris.ly/d/prisma-schema)
- [NextAuth.js Environment Variables](https://next-auth.js.org/configuration/options#environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
