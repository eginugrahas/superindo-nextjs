import React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FAFAFA",
  border: "2px solid #2A186C",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function ModalConfirm({ setOpenModal, openModal, context, cancelAction, confirmAction, bgColor }: { setOpenModal: (value: boolean) => void; openModal: boolean; context: string; cancelAction: () => void; confirmAction: () => void; bgColor?: string; }) {
    const handleClose = () => setOpenModal(false);
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-3">
            <div className="font-semibold">Yakin ingin {context} produk?</div>
            <div className="flex items-center justify-center gap-2">
                <button type="button" className="border rounded bg-p-white text-center py-2 px-4" onClick={cancelAction}>Batal</button>
                <button type="button" className={`rounded ${bgColor} text-white text-center py-2 px-4`} onClick={confirmAction}>Simpan</button>
            </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalConfirm;
