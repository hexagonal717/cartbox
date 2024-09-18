import {
  ChevronLeft
} from 'lucide-react';
import {
  useNavigate
} from 'react-router-dom';
import {
  Button
} from '@/components/ui-custom/button.jsx';

const MobileSettingsPageNavBar = () => {

  const navigate = useNavigate();

  return <main className={'fixed h-10 flex items-center w-full px-5'}>

    <div className={'pt-10'}>
    <Button className={'rounded-full p-0 h-12 w-12'} onClick={()=>navigate('/')} variant={'ghost'}><ChevronLeft/></Button>
    </div>
  </main>;
};

export default MobileSettingsPageNavBar;
