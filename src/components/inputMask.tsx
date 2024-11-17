import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useShortenedUrl } from '../hooks/useShortenedUrl';
import { useUrlContext } from '../context/urlContext';


const InputMask: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const { shortenedUrl, shortenUrl } = useShortenedUrl(inputUrl);
  const { lastUrl, setLastUrl } = useUrlContext();

  const handleShorten = () => {
    setLastUrl(inputUrl);
    shortenUrl(inputUrl);
  };

  return (
    <Box mt={4} width="100%">
      <Box width="50%" display="flex" flexDirection="row">
        <TextField
          id='outlined-basic'
          label="Website Url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          fullWidth
        />
        <Button onClick={handleShorten}>Go</Button>
      </Box>

      {shortenedUrl && (
        <Box mt={2} width="50%" display="flex" flexDirection="row">
          <TextField
            label="Output"
            value={shortenedUrl}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <Button onClick={() => window.open(shortenedUrl, '_blank')}>Test</Button>
          <Button onClick={() => navigator.clipboard.writeText(shortenedUrl)}>Copy</Button>
        </Box>
      )}
    </Box>
  );
};

export default InputMask;