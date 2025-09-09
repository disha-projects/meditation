# Meditation Mirror

A calm, privacy-first meditation web app built with Vite, React, and Tailwind CSS. Features pre-meditation steps, audio selection, duration settings, webcam accountability mirror, fullscreen session with timer and progress bar, and localStorage logging for streaks and minutes.

## Features

- **Pre-Meditation Steps**: Guided steps to prepare for meditation.
- **Audio Options**: Silent, binaural audio URL, or YouTube guided sessions.
- **Duration Selection**: Choose from 5 to 30 minutes.
- **Webcam Mirror**: Optional live webcam feed for accountability (local only, not recorded or uploaded).
- **Fullscreen Session**: Distraction-free meditation with timer, progress bar, play/pause controls.
- **Bell Notification**: Gentle bell sound at session end using WebAudio.
- **LocalStorage Logging**: Track meditation sessions, minutes, and streaks.
- **Responsive & Accessible**: Works on desktop and mobile, with ARIA attributes and keyboard support.
- **Privacy-First**: All data stays local; no server uploads.

## Installation

1. Clone or download the project.
2. Navigate to the project directory:
   ```bash
   cd meditation-mirror
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

- **Development**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Deployment

- **Vercel/Netlify**: Upload the built files from `dist/` directory.
- Ensure HTTPS for production to enable webcam access.
- For localhost development, use HTTP (webcam works on localhost without HTTPS).

## Testing Checklist

- [ ] Pre-meditation steps navigate correctly.
- [ ] Audio selection (silent, binaural, YouTube) works.
- [ ] Duration selection updates correctly.
- [ ] Camera permission request and fallback if denied.
- [ ] Fullscreen session starts on Begin click.
- [ ] Timer counts down accurately.
- [ ] Progress bar updates in real-time.
- [ ] Play/pause audio controls function.
- [ ] Camera toggle shows/hides feed.
- [ ] Bell sound plays at end.
- [ ] Session logs to localStorage.
- [ ] Completion screen displays.
- [ ] Responsive on mobile devices.
- [ ] Keyboard navigation works.
- [ ] YouTube autoplay fallback shows manual play button if blocked.

## Privacy Notice

This app is designed with privacy in mind:
- Webcam feed is used locally only and not recorded, stored, or uploaded to any server.
- All meditation session data (dates, minutes, streaks) is stored in your browser's localStorage.
- No personal data is collected or shared.
- Audio URLs are loaded directly from the provided sources; ensure they are from trusted providers.

## Technologies Used

- **Vite**: Fast build tool and dev server.
- **React**: UI library.
- **Tailwind CSS**: Utility-first CSS framework.
- **WebAudio API**: For bell sound synthesis.
- **getUserMedia**: For webcam access.

## Browser Support

- Modern browsers with WebRTC support (Chrome, Firefox, Safari, Edge).
- HTTPS required for production webcam access; localhost works with HTTP.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## License

MIT License.
