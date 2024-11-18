import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useShortenedUrl } from '../hooks/useShortenedUrl';
import { useUrlContext } from '../context/urlContext';

import { useTranslation } from 'react-i18next';
import '../i18n';


export default function InputMask(){

  const { t } = useTranslation();

  const [inputUrl, setInputUrl] = useState('');
  const { shortenedUrl, shortenUrl } = useShortenedUrl(inputUrl);
  const { lastUrl, setLastUrl } = useUrlContext();

  const handleShorten = () => {
    setLastUrl(inputUrl);
    shortenUrl(inputUrl);
  };

  return (
    <Box mt={4} width="100%" >
      <Box width="100%" display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
        <TextField
          id='outlined-basic'
          label={t('websiteUrl')}
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{width: '40%'}}
          
          
        />
        <Button variant='contained' onClick={handleShorten} style={{marginTop: '2%', height:' 50px', width: '150px', backgroundColor: "#342BC2" }}>{t('go')}</Button>
      </Box>

      {shortenedUrl && (
        <Box mt={5} width="100%" display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
          <TextField
            label={t('output')}
            value={shortenedUrl}
            style={{width: '40%'}}
            InputProps={{ readOnly: true }}
          />
          <Box  mt={5} display="flex" flexDirection="row">
            <Button variant='contained' onClick={() => window.open(shortenedUrl, '_blank')} style={{height:' 50px', width: '150px',backgroundColor: "#342BC2" }}>{t('test')}</Button>
            <Button variant='contained' startIcon={<ContentCopyIcon />}  onClick={() => navigator.clipboard.writeText(shortenedUrl)} style={{marginLeft: '5%', height:' 50px', width: '150px', backgroundColor: "#342BC2" }}>{t('copy')}</Button>

          </Box>
        </Box>
      )}
    </Box>
  );
};
