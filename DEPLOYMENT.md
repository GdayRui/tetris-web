# AWS Amplify Deployment Guide

This document provides step-by-step instructions for deploying your Tetris game to AWS Amplify.

## 🚀 Automatic Deployment Setup

### Prerequisites

- AWS Account
- GitHub repository with your Tetris game code
- AWS Amplify CLI (optional, for advanced configuration)

### Step 1: Connect GitHub Repository to AWS Amplify

1. **Login to AWS Console**

   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Sign in with your AWS credentials

2. **Create New App**

   - Click "Create app" → "Host web app"
   - Select "GitHub" as the source code provider
   - Authorize AWS Amplify to access your GitHub account

3. **Select Repository**
   - Choose your `tetris-web` repository
   - Select the `main` branch for production deployment

### Step 2: Configure Build Settings

1. **Build Settings Detection**

   - Amplify will automatically detect the `amplify.yml` file
   - Review the build configuration:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
             - npm run export
       artifacts:
         baseDirectory: out
         files:
           - "**/*"
     ```

2. **Environment Variables (if needed)**
   - Go to "Environment variables" section
   - Add any required environment variables:
     - `NODE_ENV`: `production`
     - `NEXT_PUBLIC_APP_ENV`: `production`

### Step 3: Deploy

1. **Start Deployment**

   - Click "Save and deploy"
   - Amplify will start the build and deployment process
   - Monitor the build logs for any issues

2. **Build Process**
   - **Provision**: Setting up build environment
   - **Build**: Running npm ci, build, and export commands
   - **Deploy**: Uploading static files to CDN
   - **Verify**: Health checks and final verification

### Step 4: Access Your App

1. **Get URL**

   - Once deployment is complete, you'll get a URL like:
   - `https://main.d1234567890.amplifyapp.com`

2. **Custom Domain (Optional)**
   - Go to "Domain management"
   - Add your custom domain
   - Configure DNS settings as instructed

## 🔄 Continuous Deployment

### Automatic Deployments

- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- GitHub Actions workflow runs tests and builds

### Manual Deployments

1. Go to AWS Amplify Console
2. Select your app
3. Click "Run build" to manually trigger deployment

## 🛠 Configuration Files

### amplify.yml

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
        - npm run export
  artifacts:
    baseDirectory: out
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### next.config.js

- Configured for static export (`output: 'export'`)
- Image optimization disabled for static hosting
- Trailing slashes enabled for better compatibility

## 🔧 Troubleshooting

### Common Issues

1. **Build Fails**

   - Check build logs in Amplify console
   - Verify all dependencies are in package.json
   - Ensure Node.js version compatibility

2. **Static Export Issues**

   - Make sure no server-side features are used
   - Check that all images have `unoptimized: true`
   - Verify no dynamic routes without `generateStaticParams`

3. **Missing Files**
   - Check `baseDirectory` is set to `out`
   - Verify `npm run export` generates files in `out/` directory

### Performance Optimization

1. **Caching**

   - Build cache is enabled for node_modules and .next/cache
   - Static assets are cached on Amplify CDN

2. **Bundle Size**
   - Monitor bundle size in build logs
   - Use dynamic imports for code splitting if needed

## 📊 Monitoring

### AWS Amplify Metrics

- Access logs
- Performance metrics
- Custom domain SSL certificate status
- Build history and duration

### GitHub Actions

- Build status badges
- Automated testing results
- Deployment notifications

## 🔒 Security

### Environment Variables

- Store sensitive data in Amplify environment variables
- Never commit secrets to repository
- Use different variables for staging/production

### HTTPS

- Amplify provides free SSL certificates
- Custom domains get automatic HTTPS
- Security headers can be configured

## 💰 Cost Considerations

### AWS Amplify Pricing

- **Build minutes**: First 1,000 minutes free per month
- **Storage**: First 15 GB free per month
- **Data transfer**: First 15 GB free per month
- **Requests**: First 1 million requests free per month

### Optimization Tips

- Use build caching to reduce build times
- Optimize images and assets
- Monitor usage in AWS billing dashboard

## 📞 Support Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

Happy deploying! 🎮🚀
