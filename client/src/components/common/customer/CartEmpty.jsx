import { CircleArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui-custom/button.jsx';
import { Card } from '@/components/ui-custom/card.jsx';
import { NavLink } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <Card
      className={`mx-auto flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-100
        dark:bg-neutral-900`}>
      <div className={'flex items-center gap-4'}>
        <ShoppingBag className={'scale-150 text-purple-700 dark:text-purple-400'} />
        <div className={'text-2xl dark:text-white'}>is empty ¯\_(ツ)_/¯</div>
      </div>
      <NavLink to={'/'}>
        <Button className={'space-x-3'}>
          <CircleArrowLeft className={'scale-90'} /> <div>Back to home</div>
        </Button>
      </NavLink>
    </Card>
  );
};

export default CartEmpty;
