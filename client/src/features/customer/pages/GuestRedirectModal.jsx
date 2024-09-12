import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui-custom/dialog';
import { Button } from '@/components/ui-custom/button';

const GuestRedirectModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`w-[28rem] rounded-lg sm:w-[35rem]
          ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
        <DialogHeader>
          <DialogTitle>Sign In or Create an Account</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          Please log in or sign up to continue with your order.
        </p>
        <div className="grid gap-4 py-4">
          <Button onClick={handleLogin} className="w-full">
            Log In
          </Button>
          <Button onClick={handleSignUp} variant="outline" className="w-full">
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestRedirectModal;
