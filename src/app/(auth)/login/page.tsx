'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { FormEvent, useState, useEffect } from 'react';
import {Box, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { LoadingButton } from '@mui/lab';
import Lottie from 'lottie-react';
import postAnimation from '../../../assets/animations/post.json';

const HARDCODED_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    isAdmin: true,
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    isAdmin: false,
  },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [is900, setIs900] = useState<boolean>(false);
  const is480 = window.innerWidth < 480;

  useEffect(() => {
    const handleResize = () => {
      setIs900(window.innerWidth >= 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const user = HARDCODED_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);
      router.push('/posts');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>
        
        {is900 && 
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} alignItems={'center'}>
          <Lottie 
            animationData={postAnimation} 
            style={{ width: '50%', height: 'auto' }}
          />
        </Stack> 
        }

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

                <Stack rowGap={'.4rem'}>
                  <Stack flexDirection={'row'} alignItems={'baseline'}>
                    <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Post</Typography> 
                    <Typography variant='h2'  sx={{wordBreak:"break-word"}} fontWeight={600} className='text-orange-500'>Manager</Typography>
                  </Stack>
                  <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Manage Easy, Manage Smart!</Typography>
                </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit}>

                    {error && (
                      <Box sx={{ 
                        backgroundColor: 'error.light', 
                        borderLeft: 4, 
                        borderColor: 'error.main', 
                        p: 2 
                      }}>
                        <Typography color="white">{error}</Typography>
                      </Box>
                    )}

                    <motion.div whileHover={{y:-5}}>
                      <TextField 
                        fullWidth 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                      />
                    </motion.div>

                    <motion.div whileHover={{y:-5}}>
                      <TextField 
                        type='password' 
                        fullWidth 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                      />
                    </motion.div>
                    
                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton 
                        fullWidth  
                        sx={{ 
                          height: '2.5rem', 
                        }} 
                        type='submit' 
                        variant='contained'
                        className='hover:bg-orange-500'
                      >
                        Login
                      </LoadingButton>
                    </motion.div>

                </Stack>
        </Stack>
    </Stack>
  );
}