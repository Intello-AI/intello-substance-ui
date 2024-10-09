import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const dialogVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none",
  {
    variants: {
      open: {
        true: "pointer-events-auto",
        false: "pointer-events-none",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

interface DialogProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onEscapeKeyDown?: () => void;
  onOverlayClick?: () => void;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  return (
    <Slot
      className={cn(
        dialogVariants({ open: props.open, className: props.className })
      )}
      {...props}
    />
  );
};
