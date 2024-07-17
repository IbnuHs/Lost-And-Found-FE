import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";

export const DeletePrompt = (props) => {
  return (
    <div>
      <Dialog
        open={true}
        // onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogContent
          style={{
            width: "400px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogContentText style={{ fontWeight: "600" }}>
            Apakah Anda Ingin Menyelesaikan Laporan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick="" color="secondary">
            Cancel
          </Button>
          <Button type="button" onClick="" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
