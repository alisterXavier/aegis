'use client';
import './globals.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Providers } from '@/utils/providers/provider';
import ReactLenis from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ReactLenis
            root
            options={{ lerp: 0.04, duration: 0.05, syncTouch: true }}
          >
            {children}
          </ReactLenis>
        </Providers>
      </body>
    </html>
  );
}
