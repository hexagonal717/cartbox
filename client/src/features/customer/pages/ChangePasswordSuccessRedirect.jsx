import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui-custom/button';
import { Progress } from '@/components/ui-custom/progress';
import { CheckCircle2 } from 'lucide-react';

const ChangePasswordSuccessRedirect = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 250);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-neutral-950">
      <Card className="m-2 w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-md flex items-center justify-center space-x-2 font-bold sm:text-2xl">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <span>Password Changed Successfully</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300 sm:text-lg">
            Your password has been updated. You will be redirected to the login page
            in a few seconds.
          </p>
          <Progress value={progress} className="w-full" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Go to Login Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePasswordSuccessRedirect;
