'use client';
import './globals.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Providers } from './components/';
import ReactLenis from '@studio-freight/react-lenis';
import { usePathname, useRouter } from 'next/navigation';

// Extra attributes from the server: style caused by GSAP
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <ReactLenis
            root
            options={{
              lerp: isHomePage ? 0.04 : 0 ,
              duration: isHomePage ? 0.05 : 0,
              syncTouch: true,
            }}
          >
            {children}
          </ReactLenis>
        </Providers>
      </body>
    </html>
  );
}
