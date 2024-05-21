'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import google from '../../../public/images/google.png';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
} from '@nextui-org/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { MdInstallDesktop, MdManageAccounts } from 'react-icons/md';
import { GrSecure } from 'react-icons/gr';

const animation = {
  login: {
    y: 0,
  },
  register: {
    y: '-100vh',
  },
};

const Login = () => {
  const controls = useAnimation();

  const handleRegister = () => {
    controls.start('register');
  };

  const handleLogin = () => {
    controls.start('login');
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="w-[65%] h-full flex flex-col items-center justify-center bg-[var(--green)]">
        <div>
          <h1 className="text-[40px] font-semibold">AEGIS</h1>
        </div>
        <div className="">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px] my-5"
            shadow="sm"
            radius="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-4 md:gap-4 items-center justify-center">
                <div className="relative flex items-center justify-center col-span-1 md:col-span-2 w-[50px] h-[50px]">
                  <MdManageAccounts className="w-[30px] h-[30px]" />
                </div>
                <p className="flex flex-col col-span-3 md:col-span-8 text-white">
                  Streamlined Certificate Management
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px] my-5"
            shadow="sm"
            radius="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-4 md:gap-4 items-center justify-center">
                <div className="relative flex items-center justify-center col-span-1 md:col-span-2 w-[50px] h-[50px]">
                  <GrSecure className="w-[30px] h-[30px]" />
                </div>
                <p className="flex flex-col col-span-6 md:col-span-8 text-white">
                  Secure and Flexible
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px] my-5"
            shadow="sm"
            radius="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-4 md:gap-4 items-center justify-center">
                <div className="relative flex items-center justify-center col-span-1 md:col-span-2 w-[50px] h-[50px]">
                  <MdInstallDesktop className="w-[30px] h-[30px]" />
                </div>
                <p className="flex flex-col col-span-6 md:col-span-8 text-white">
                  Hassle-Free Installation
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <motion.div
        className="p-5 shadow-lg rounded-md h-full w-[35%] flex items-center justify-center relative"
        animate={controls}
      >
        <motion.div
          className="login p-5 bg-white flex flex-col justify-center items-center h-full"
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
                errorMessage="Please enter a valid email"
              />
              <Input
                className="login-input h-[80px]"
                variant="underlined"
                type="password"
                label="Password"
              />
            </div>
            <div className="w-full my-5 flex flex-col items-center">
              <Button
                radius="none"
                className="bg-[#3cb371] text-white rounded-[5px] w-full shadow-md"
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
              />
              <Input
                className="login-input h-[80px]"
                variant="underlined"
                type="password"
                label="Password"
              />
            </div>
            <div className="w-full my-5 flex flex-col items-center">
              <Button
                radius="none"
                className="bg-[#3cb371] text-white rounded-[5px] w-full shadow-md"
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
