import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { createNewUrlAction,updateUrlAction, resetUrlCreated } from '../redux/urlActions';

interface ResponsiveDialogProps {
  open: boolean;
  handleClose: () => void;
  mode: "create" | "edit";
  initialData?: { id: string; webUrl: string; ttlInSeconds: number };
}

export default function ResponsiveDialog({
	open,
	handleClose,
	mode,
	initialData = { id: '', webUrl: '', ttlInSeconds: 0 },
  }: ResponsiveDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [inputs, setInputs] = useState(initialData);
  const { urlCreated } = useSelector((state: RootState) => state.urlReducer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
	setInputs(initialData);
    if (urlCreated) {
      handleClose();
      dispatch(resetUrlCreated());
    }
  }, [urlCreated, handleClose, dispatch,initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: name === 'ttlInSeconds' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (mode === 'create') {
      dispatch(createNewUrlAction(inputs.id, inputs.ttlInSeconds, inputs.webUrl));
    } else if (mode === 'edit') {
      dispatch(updateUrlAction(inputs.id, inputs.ttlInSeconds, inputs.webUrl));
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">
          {mode === 'create' ? 'Add New URL' : 'Edit URL'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ display: 'flex', flexDirection: 'column' }} gap={3}>
            <TextField
              id="outlined-basic"
              label="Web Url"
              variant="outlined"
              name="webUrl"
              value={inputs.webUrl}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Ttl In Seconds"
              variant="outlined"
              name="ttlInSeconds"
              value={inputs.ttlInSeconds}
              onChange={handleChange}
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Id"
              variant="outlined"
              name="id"
              value={inputs.id}
              onChange={handleChange}
              disabled={mode === 'edit'} 
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            {mode === 'create' ? 'Save' : 'Update'}
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
