# Deployment Guide for Quiz Funnel Authentication

This guide covers the necessary steps to ensure your authentication system works correctly when deployed to production.

## Environment Variables

When deploying to a platform like Vercel, Netlify, or similar, you need to set the following environment variables:

1. **NEXTAUTH_SECRET**: Already set in your .env file. This should be kept secure and not changed between deployments.

   ```
   NEXTAUTH_SECRET=xYlKcleQOMUVP1DbEcAI4QUH2nPq/98a+oZ1cyISRME=
   ```

2. **NEXTAUTH_URL**: In production, this should be your deployed URL.

   - For Vercel: This is automatically set, but you can manually set it to your domain.
   - For other platforms: Set this to your full domain URL (e.g., `https://your-app.com`).

3. **DATABASE_URL**: Your production database connection string.
   - Ensure your database is accessible from your deployment platform.
   - Check firewall rules if using a managed database service.

## Deployment Checklist

Before deploying:

1. **Test locally**: Ensure authentication works in development.
2. **Check database connection**: Verify your production database is accessible.
3. **Create admin user**: Use the `create-admin.js` script to create an admin user in the production database.
   ```
   npm run create-admin admin@example.com your-secure-password
   ```

## Platform-Specific Instructions

### Vercel

1. Connect your GitHub repository to Vercel.
2. Set environment variables in the Vercel dashboard.
3. Use the following build command (already in your package.json):
   ```
   "build": "prisma generate && prisma db push && next build"
   ```

### Netlify/Other Platforms

1. Set the build command:
   ```
   npm run build
   ```
2. Set the publish directory to `.next`.
3. Add all environment variables in the platform dashboard.

## Post-Deployment Verification

After deploying:

1. Visit your login page (`/login`) and try to log in with your admin credentials.
2. Verify you can access protected routes like `/dashboard`.
3. Check that unauthenticated users are redirected to the login page.
4. Verify that the session persists after browser refresh.

## Troubleshooting

If authentication doesn't work in production:

1. **Check environment variables**: Ensure NEXTAUTH_URL and NEXTAUTH_SECRET are set correctly.
2. **Verify database connection**: Check logs for database connection errors.
3. **Cookie issues**: If using a custom domain, ensure cookies are configured correctly.
4. **CORS issues**: If your API and frontend are on different domains, check CORS settings.

## Security Considerations

1. Always use HTTPS in production.
2. Regularly rotate the NEXTAUTH_SECRET for enhanced security.
3. Consider implementing rate limiting for login attempts.
4. Set up monitoring for failed login attempts.
