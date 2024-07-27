import {Card, CardContent, Typography, Button, Box} from "@mui/material";

const CacheItem = (props) => {
  const expirationData = new Date(props.expiration * 1000).toLocaleTimeString();
  return (
    <Card variant="outlined" sx={{marginBottom: 2, marginTop: 2}}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{marginBottom: 2}}>
          Key: {props.keyItem}
        </Typography>
        <Box display="flex" flexDirection="column">
          <Typography variant="body2" component="text.secondary">
            Value: {props.value}
          </Typography>
          <Typography variant="body2" component="text.secondary">
            Expires at: {expirationData}
          </Typography>
        </Box>
        {props.onDelete && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              onClick={() => props.onDelete(props.key)}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CacheItem;
