import NiceModal from "@ebay/nice-modal-react";
import LogoutModal from "./components/ui/commonModal/logoutModal/LogoutModal";
import SuccessModal from "./components/ui/commonModal/SuccessModal/SuccessModal.tsx";

//registeries

NiceModal.register("LogoutModal", LogoutModal);
NiceModal.register("SuccessModal", SuccessModal);
