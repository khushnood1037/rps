import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Toaster from "../components/common/Toast";
import { useWallet } from "@solana/wallet-adapter-react";

const ADMIN_WALLET = "3upZihznv9XYZQSAVLVtyCuJUUKEQzwqdfFf4EF7rvA6";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { publicKey, connecting } = useWallet();
  const location = useLocation();
  const hasShownToast = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const walletAddress = publicKey?.toBase58?.() ?? null;

  const isConnected = !!walletAddress;
  const isAdmin = walletAddress === ADMIN_WALLET;

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 2000);

    if (!connecting) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
        clearTimeout(fallbackTimer);
      }, 100);
      return () => {
        clearTimeout(timer);
        clearTimeout(fallbackTimer);
      };
    }

    return () => clearTimeout(fallbackTimer);
  }, [connecting]);

  useEffect(() => {
    if (!isAdminRoute || hasShownToast.current || !isInitialized) return;

    if (!isConnected) {
      Toaster.error("Please connect your wallet");
      hasShownToast.current = true;
      return;
    }

    if (!isAdmin) {
      Toaster.error("Unauthorized Access");
      hasShownToast.current = true;
    }
  }, [isAdminRoute, isConnected, isAdmin, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AuthGuard;
