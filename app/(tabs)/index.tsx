import { useContext, useEffect, useState } from 'react';

import Login from '@/components/Login';
import Main from '@/components/main';
import Splash from '@/components/splash';
import { UserContext } from '@/context/context';

export default function HomeScreen() {
  const { userId } = useContext(UserContext);
  const [slash, setSplsh] = useState(true)
  {
    useEffect(()=>{
      const timer = setTimeout(()=>{
            setSplsh(false)
      },1000)
    },[])
  }
  if (slash){
    return <Splash/>
  }
  if (userId === null) {
    return <Login />;
  }

  return <Main />;
}