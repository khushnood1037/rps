import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletIcon, WalletModalContext, useWalletModal } from "@solana/wallet-adapter-react-ui";
import type { FC, MouseEvent, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export interface FilteredWalletModalProviderProps {
  children: ReactNode;
}

function dedupeWalletsByName(wallets: Wallet[]): Wallet[] {
  const map = new Map<string, Wallet>();
  for (const wallet of wallets) {
    const name = wallet.adapter.name;
    const existing = map.get(name);
    if (!existing) {
      map.set(name, wallet);
      continue;
    }
    // Prefer "Installed" over non-installed variants when duplicates exist.
    if (
      existing.readyState !== WalletReadyState.Installed &&
      wallet.readyState === WalletReadyState.Installed
    ) {
      map.set(name, wallet);
    }
  }
  return Array.from(map.values());
}

const FilteredWalletModal: FC = () => {
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();
  const portal = typeof document !== "undefined" ? document.body : null;

  const listedWallets = useMemo(() => {
    const unique = dedupeWalletsByName(wallets);
    // Keep order stable but bias toward installed when duplicates exist.
    return unique;
  }, [wallets]);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      hideModal();
    },
    [hideModal]
  );

  const handleWalletClick = useCallback(
    (event: MouseEvent, wallet: Wallet) => {
      // Important: wallets like Phantom may require connect() to be called inside the user click handler.
      // Calling it later (setTimeout) can lose the user-activation and the wallet prompt won't open.
      select(wallet.adapter.name as WalletName);
      handleClose(event);

      void wallet.adapter.connect().catch(() => {
        // WalletProvider's onError will surface a toast; avoid double-reporting here.
      });
    },
    [select, handleClose]
  );

  return (
    portal &&
    createPortal(
      <div
        aria-labelledby="wallet-adapter-modal-title"
        aria-modal="true"
        className="wallet-adapter-modal wallet-adapter-modal-fade-in"
        role="dialog"
      >
        <div className="wallet-adapter-modal-container">
          <div className="wallet-adapter-modal-wrapper">
            <button onClick={handleClose} className="wallet-adapter-modal-button-close" type="button">
              <svg width="14" height="14">
                <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
              </svg>
            </button>

            <h1 className="wallet-adapter-modal-title" id="wallet-adapter-modal-title">
              Connect a wallet on Solana to continue
            </h1>

            <ul className="wallet-adapter-modal-list">
              {listedWallets.map((wallet) => (
                <li key={wallet.adapter.name}>
                  <button
                    className="wallet-adapter-button"
                    onClick={(event) => handleWalletClick(event, wallet)}
                    type="button"
                  >
                    <i className="wallet-adapter-button-start-icon">
                      <WalletIcon wallet={wallet} />
                    </i>
                    {wallet.adapter.name}
                    {wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wallet-adapter-modal-overlay" onMouseDown={handleClose} />
      </div>,
      portal
    )
  );
};

export const FilteredWalletModalProvider: FC<FilteredWalletModalProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      {visible && <FilteredWalletModal />}
    </WalletModalContext.Provider>
  );
};


