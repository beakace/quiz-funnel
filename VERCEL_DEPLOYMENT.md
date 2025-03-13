# Vercel Deployment Guide

This guide explains how to deploy your Quiz Funnel application to Vercel with automatic admin user creation.

## Setting Up Environment Variables

When deploying to Vercel, you need to set the following environment variables in the Vercel dashboard:

### Required Environment Variables

1. **DATABASE_URL**: Your production database connection string

   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
   ```

2. **NEXTAUTH_SECRET**: A secure random string for NextAuth.js

   ```
   NEXTAUTH_SECRET=your-secure-random-string
   ```

3. **NEXTAUTH_URL**: Your production URL (automatically set by Vercel, but you can override it)
   ```
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

### Admin User Creation Variables

To automatically create an admin user during deployment, set these variables:

1. **ADMIN_EMAIL**: The email address for the admin user

   ```
   ADMIN_EMAIL=your-admin@example.com
   ```

2. **ADMIN_PASSWORD**: The password for the admin user
   ```
   ADMIN_PASSWORD=your-secure-password
   ```

If you don't set these variables, the deployment will use default values:

- Default email: `admin@example.com`
- Default password: A randomly generated secure password (shown in the build logs)

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in the Vercel dashboard
3. Deploy your application

## Finding Your Admin Credentials

After deployment, you can find your admin credentials in the build logs:

1. Go to the Vercel dashboard
2. Select your project
3. Click on "Deployments"
4. Select the latest deployment
5. Click on "Build Logs"
6. Look for the section that says "DEPLOYMENT: ADMIN CREDENTIALS UPDATED" or "DEPLOYMENT: NEW ADMIN CREATED"

If you used a randomly generated password, make sure to save it from the build logs, as it won't be shown again.

## Logging In

After deployment, you can log in at:

```
https://your-app.vercel.app/login
```

Use the admin email and password you set up in the environment variables or found in the build logs.

## Security Best Practices

### Protecting Environment Variables

- **NEVER** commit `.env` files with real credentials to your repository
- Use `.env.example` files with placeholders to show required variables
- Always use the Vercel dashboard to set environment variables for production

### If Credentials Are Exposed

If you accidentally expose database credentials:

1. **Immediately rotate credentials** in your database provider (e.g., Neon, Supabase)
2. **Update environment variables** in all environments with the new credentials
3. **Check repository history** and consider using tools like BFG Repo-Cleaner to remove sensitive data
4. **Monitor for unauthorized access** in your database logs

For more detailed security guidelines, see the `ENV_SECURITY.md` file in the repository.

## Troubleshooting

If you encounter issues with admin user creation during deployment:

1. Check the build logs for any error messages
2. Verify that your database connection string is correct
3. Make sure your database is accessible from Vercel's servers
4. Try creating an admin user manually after deployment using the Vercel CLI:
   ```
   vercel run create-admin your-email@example.com your-password
   ```
