import { useState } from 'react';

// Component for selecting background audio
function AudioSelect({ audioSrc, setAudioSrc }) {
  const [audioType, setAudioType] = useState('silent'); // silent, binaural, youtube
  const [customUrl, setCustomUrl] = useState('');

  const handleTypeChange = (type) => {
    setAudioType(type);
    if (type === 'silent') {
      setAudioSrc('');
    } else if (type === 'binaural') {
      setAudioSrc(customUrl);
    } else if (type === 'youtube') {
      // For YouTube, embed URL
      setAudioSrc(customUrl);
    }
  };

  const handleUrlChange = (url) => {
    setCustomUrl(url);
    if (audioType === 'binaural' || audioType === 'youtube') {
      setAudioSrc(url);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Background Audio
      </label>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="audio"
            value="silent"
            checked={audioType === 'silent'}
            onChange={() => handleTypeChange('silent')}
            className="mr-2"
          />
          Silent
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="audio"
            value="binaural"
            checked={audioType === 'binaural'}
            onChange={() => handleTypeChange('binaural')}
            className="mr-2"
          />
          Binaural Audio (URL)
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="audio"
            value="youtube"
            checked={audioType === 'youtube'}
            onChange={() => handleTypeChange('youtube')}
            className="mr-2"
          />
          YouTube Guided Session (URL)
        </label>
      </div>
      {(audioType === 'binaural' || audioType === 'youtube') && (
        <input
          type="url"
          placeholder="Enter audio URL"
          value={customUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          aria-label="Audio URL input"
        />
      )}
    </div>
  );
}

export default AudioSelect;
