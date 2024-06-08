'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import google from '/public/images/google.png';
import { Button, Divider, Input } from '@nextui-org/react';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const animation = {
  login: {
    y: 0,
  },
  register: {
    y: '-100%',
  },
};

const Login = ({
  setToggleLogin,
}: {
  setToggleLogin: (x: boolean) => void;
}) => {
  const router = useRouter();
  const controls = useAnimation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleRegister = () => {
    controls.start('register');
  };

  const handleLogin = () => {
    controls.start('login');
  };

  const handleNewUser = () => {
    const data = {
      email,
      password,
    };
    const res = axios
      .post('/api/user', data)
      .then((res) => {
        router.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExistingUser = async () => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
      return;
    }

    router.replace('/dashboard');
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden fixed top-0 left-0 right-0 bottom-0 z-[91] bg-[#00000049]">
      <motion.div
        className="p-5 bg-white shadow-lg rounded-[5px] flex items-center justify-center flex-col relative h-full md:h-[80%] w-full md:w-[35%] overflow-hidden"
        animate={controls}
      >
        <div className="w-full flex justify-end cursor-pointer">
          <IoMdClose
            size={30}
            onClick={() => {
              // setToggleLogin(false);
            }}
          />
        </div>
        <motion.div
          className="login p-5 flex flex-col justify-center items-center h-full"
          variants={animation}
        >
          <div className="w-full">
            <h1 className="text-[30px] login-header font-semibold">
              Login to Your Account
            </h1>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full h-[100%]">
              <Input
                isClearable
                className="login-input h-[80px]"
                variant="underlined"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  const com = e.currentTarget.value;
                  setEmail(com);
                }}
                errorMessage="Please enter a valid email"
              />
              <Input
                className="login-input h-[80px]"
                variant="underlined"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  const com = e.currentTarget.value;
                  setPassword(com);
                }}
              />
            </div>
            <div className="w-full my-5 flex flex-col items-center">
              <Button
                radius="none"
                className="bg-[#3cb371] text-white rounded-[5px] w-full shadow-md"
                onClick={handleExistingUser}
              >
                Login
              </Button>
              <div className="flex items-center w-fit my-5">
                <Divider className="w-[160px]" />
                <p className="mx-5 w-[20px]">or</p>
                <Divider className="w-[160px]" />
              </div>
              <Button
                radius="none"
                className="bg-white rounded-[5px] shadow-md h-[50px] flex justify-start"
                onClick={() => {
                  signIn('google');
                }}
              >
                <figure className="relative w-[30px] h-[30px]">
                  <Image
                    src={google}
                    sizes="100%"
                    alt="google-logo"
                    style={{
                      objectFit: 'contain',
                    }}
                    fill
                  />
                </figure>
                <p>Sign in with Google</p>
              </Button>
            </div>
            <div className="w-fit">
              <p className="text-sm cursor-pointer">
                Are you new?
                <span
                  className="text-blue-500 underline ml-1"
                  onClick={() => handleRegister()}
                >
                  Create an Account
                </span>
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="login p-5 bg-white flex flex-col justify-center items-center absolute h-full top-[100%]"
          variants={animation}
        >
          <div className="w-full">
            <h1 className="text-[30px] login-header font-semibold">
              Register Your Account
            </h1>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full h-[100%]">
              <Input
                isClearable
                className="login-input h-[80px]"
                variant="underlined"
                type="email"
                label="Email"
                errorMessage="Please enter a valid email"
                value={email}
                onChange={(e) => {
                  const com = e.currentTarget.value;
                  setEmail(com);
                }}
              />
              <Input
                className="login-input h-[80px]"
                variant="underlined"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  const com = e.currentTarget.value;
                  setPassword(com);
                }}
              />
            </div>
            <div className="w-full my-5 flex flex-col items-center">
              <Button
                radius="none"
                className="bg-[#3cb371] text-white rounded-[5px] w-full shadow-md"
                onClick={handleNewUser}
              >
                Register
              </Button>
              <div className="flex items-center w-fit my-5">
                <Divider className="w-[160px]" />
                <p className="mx-5 w-[20px]">or</p>
                <Divider className="w-[160px]" />
              </div>
              <Button
                radius="none"
                className="bg-white rounded-[5px] shadow-md h-[50px] flex justify-start"
                onClick={() => {
                  signIn('google');
                }}
              >
                <figure className="relative w-[30px] h-[30px]">
                  <Image
                    src={google}
                    sizes="100%"
                    alt="google-logo"
                    style={{
                      objectFit: 'contain',
                    }}
                    fill
                  />
                </figure>
                <p>Sign in with Google</p>
              </Button>
            </div>
            <div className="w-fit">
              <p className="text-sm cursor-pointer">
                Already have an account?
                <span
                  className="text-blue-500 underline ml-1"
                  onClick={() => handleLogin()}
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
