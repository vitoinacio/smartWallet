import { toast as Toaster, ToastContainerProps } from 'react-toastify';

interface toastProps extends ToastContainerProps {
  title: string; 
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
  theme?: 'light' | 'dark' | 'colored';
  autoClose?: number; 
  msTransition?: string;
  progress?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  newestOnTop?: boolean;
  rtl?: boolean;
}

// A função de exibição do toast
const toast = ({ title, ...props }: toastProps) => {
  Toaster(title, {
    ...props,
    type: props.type || 'info',
  });
};

export default toast;
