import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Toaster from "../components/common/Toast";
// @ts-expect-error solana types
import { useWallet } from "@solana/wallet-adapter-react";

const ADMIN_WALLET = "CdmD8DTQ2pjftiG7hKqSkFubUdfmN9V4wQ6Lke7EL1zz";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { publicKey } = useWallet();
  const location = useLocation();
  const hasShownToast = useRef(false);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const walletAddress = publicKey?.toBase58?.() ?? null;

  const isConnected = !!walletAddress;
  const isAdmin = walletAddress === ADMIN_WALLET;

  useEffect(() => {
    if (!isAdminRoute || hasShownToast.current) return;

    if (!isConnected) {
      Toaster.error("Please connect your wallet");
      hasShownToast.current = true;
      return;
    }

    if (!isAdmin) {
      Toaster.error("Unauthorized Access");
      hasShownToast.current = true;
    }
  }, [isAdminRoute, isConnected, isAdmin]);


  // Connected but not admin → blocked
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // // Admin wallet but not inside /admin yet → push dashboard
  // if (!location.pathname.startsWith("/admin")) {
  //   return <Navigate to="/admin/dashboard" replace />;
  // }

  return <>{children}</>;
};

export default AuthGuard;
