# Building the AI Dashboard Executable

This guide explains how to build the AI-Dashboard-Setup.exe installer from the source code.

## Prerequisites

- Windows 10 or later (64-bit)
- Node.js 16.x or later
- npm 8.x or later
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/ai-dashboard.git
cd ai-dashboard
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Electron
- React
- Styled-components
- Solana Web3.js
- Other dependencies listed in package.json

## Step 3: Configure Environment Variables (Optional)

If you want to use specific API keys or configuration:

1. Create a `.env` file in the root directory
2. Add your configuration variables:
   ```
   OPENAI_API_KEY=your_api_key_here
   SOLANA_NETWORK=mainnet
   ```

## Step 4: Build the Application

For Windows:
```bash
npm run dist
```

For macOS:
```bash
npm run dist:mac
```

For Linux:
```bash
npm run dist:linux
```

## Step 5: Locate the Installer

After the build process completes, you'll find the installer in the `dist` folder:

- Windows: `dist/AI-Dashboard-Setup.exe`
- macOS: `dist/AI Dashboard.dmg`
- Linux: `dist/ai-dashboard_1.0.0_amd64.AppImage`

## Customizing the Build

You can customize the build by modifying the `build` section in `package.json`:

```json
"build": {
  "appId": "com.yourcompany.ai-dashboard",
  "productName": "AI Dashboard",
  "directories": {
    "output": "dist"
  },
  "win": {
    "target": [
      "nsis"
    ],
    "icon": "build/icon.ico"
  },
  "nsis": {
    "oneClick": true,
    "allowToChangeInstallationDirectory": false,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "AI Dashboard"
  }
}
```

## Troubleshooting

### Common Issues

1. **Missing dependencies**
   - Ensure you have all required build tools: `npm install -g windows-build-tools` (on Windows)

2. **Code signing errors**
   - For development, you can disable code signing by adding `"forceCodeSigning": false` to the build configuration

3. **Build fails with Node.js version error**
   - Make sure you're using a compatible Node.js version (16.x or later recommended)

### Getting Help

If you encounter issues during the build process:

1. Check the error logs in the console
2. Refer to the [Electron Builder documentation](https://www.electron.build/)
3. Search for specific error messages in the Electron community forums

## Distribution

Once you have built the installer:

1. Test it on a clean system to ensure all dependencies are properly bundled
2. Distribute it to users via your preferred distribution method (website, file sharing, etc.)
3. Consider setting up auto-updates for future versions

## Advanced: Setting Up Continuous Integration

For automated builds, consider setting up CI/CD with GitHub Actions or similar:

1. Create a `.github/workflows/build.yml` file
2. Configure it to build on push or release events
3. Automate the distribution of new versions

This will allow you to automatically generate new installers whenever you update the code.
