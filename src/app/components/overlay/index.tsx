import { ReactNode } from 'react';

export const Overlay = ({
  children,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
}) => {
  return (
    <div
      className="overlay fixed top-0 left-0 right-0 bottom-0 z-[90] bg-[var(--bg-transparent)] flex items-center justify-center"
      onClick={() => handleClose()}
    >
      {children}
    </div>
  );
};
