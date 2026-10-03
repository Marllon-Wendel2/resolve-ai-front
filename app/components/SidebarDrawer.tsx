"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function SidebarDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu de navegação"
        aria-expanded={isOpen}
        aria-controls="sidebar-drawer"
        className="grid h-9 w-9 place-items-center rounded-lg border border-line text-secondary transition-colors hover:bg-surface-2 hover:text-primary lg:hidden"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>


      <dialog
        id="sidebar-drawer"
        ref={dialogRef}
        aria-label="Menu de navegação"
        className="sidebar-drawer"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-end px-3">
            <button
              type="button"
              onClick={close}
              aria-label="Fechar menu"
              className="grid h-9 w-9 place-items-center rounded-lg text-secondary transition-colors hover:bg-surface-2 hover:text-primary"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <Sidebar />
          </div>
        </div>
      </dialog>
    </>
  );
}