export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ContactDialogProps extends DialogProps {
  emailCopied: boolean;
  copyEmail: () => void;
}