# Yield Assignment - React Native Expo Project

A React Native application built with Expo framework featuring tab navigation and modern UI components.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Running the App

After running `npm run dev`, you'll see a QR code in your terminal. Here's how to connect:

### Option 1: Scan QR Code with Expo Go App
1. **Download Expo Go** from your device's app store:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Open Expo Go** on your phone

3. **Scan the QR code** that appears in your terminal:
   - **iOS**: Use your phone's camera app to scan the QR code
   - **Android**: Use the Expo Go app's built-in QR scanner

### Option 2: Use Expo CLI Scanner
If you have Expo CLI installed globally:
```bash
npx expo start --tunnel
```

### Option 3: Manual Connection
If QR scanning doesn't work:
1. Make sure your phone and computer are on the same WiFi network
2. In Expo Go, tap "Enter URL manually"
3. Enter the URL shown in your terminal (usually starts with `exp://`)

## 🔧 Development

### Project Structure
```
project/
├── app/                    # Main application screens
│   ├── _layout.tsx        # Root layout configuration
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab layout
│   │   └── index.tsx      # Home screen
│   └── +not-found.tsx     # 404 error screen
├── assets/                 # Static assets
│   └── images/            # Image files
├── hooks/                  # Custom React hooks
│   └── useFrameworkReady.ts
└── package.json           # Dependencies and scripts
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## 📱 Features

- **Tab Navigation**: Smooth tab-based navigation
- **Modern UI**: Clean and responsive design
- **Custom Hooks**: Reusable React hooks for framework readiness
- **Asset Management**: Organized image and icon assets

## 🛠️ Troubleshooting

### Common Issues

1. **QR Code not scanning?**
   - Ensure your phone and computer are on the same network
   - Try using the tunnel option: `npx expo start --tunnel`
   - Check if your firewall is blocking the connection

2. **App not loading?**
   - Clear Expo Go app cache
   - Restart the development server
   - Check your internet connection

3. **Metro bundler issues?**
   - Clear Metro cache: `npx expo start --clear`
   - Restart your development server

4. **Dependencies issues?**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

### Development Tips

- **Hot Reload**: Changes are automatically reflected in the app
- **Debug Menu**: Shake your device to access the developer menu
- **Logs**: Check the terminal for detailed logs and error messages

## 📦 Dependencies

This project uses:
- React Native
- Expo SDK
- React Navigation
- TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about your problem

---

**Happy coding! 🎉** 