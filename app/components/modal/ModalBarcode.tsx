import React from "react";
import { Box, Modal } from "@mui/material";
import ReactBarcode from "react-jsbarcode";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FAFAFA',
    border: '2px solid #2A186C',
    boxShadow: 24,
    p: 4,
  };

function ModalBarcode({ setOpenModal, openModal, productCode }: { setOpenModal: (value: boolean) => void; openModal: boolean; productCode: string; }) {
  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <div className=""><ReactBarcode value={productCode}/></div>
        </Box>
    </Modal>
  );
}

export default ModalBarcode;
