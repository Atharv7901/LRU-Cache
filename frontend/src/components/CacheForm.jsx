import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useSetCacheItemMutation} from "../services/cacheApi";

const CacheForm = (props) => {
  const [key, SetKey] = useState("");
  const [value, SetValue] = useState("");
  const [expiration, SetExpiration] = useState("");
  const [submitForm, CacheSetResponse] = useSetCacheItemMutation();

  const handleFormSubmit = () => {
    const payload = {
      key: key,
      value: value,
      expiration: parseInt(expiration, 10),
    };
    submitForm(payload);
    SetKey("");
    SetValue("");
    SetExpiration("");
  };

  useEffect(() => {
    if (CacheSetResponse.isSuccess) {
      props.handleClose();
    }
  }, [CacheSetResponse]);

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Set Cache Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the key, value and expiration time (in seconds) for the cache
          item
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Key"
          type="text"
          fullWidth
          value={key}
          onChange={(e) => SetKey(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Value"
          type="text"
          fullWidth
          value={value}
          onChange={(e) => SetValue(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Expiration (seconds)"
          type="number"
          fullWidth
          value={expiration}
          onChange={(e) => SetExpiration(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CacheForm;
