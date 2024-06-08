import { cn } from '@/utils/server/ccn';
import { useScroll, motion, MotionValue, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import SplitType from 'split-type';

const text =
  'Without a certificate manager, businesses risk increased downtime due expired certificates.';

export const Para = ({
  className,
  parent,
}: {
  className: string;
  parent: string;
}) => {
  useEffect(() => {
    const splitText = new SplitType('.stagger');
    const chars = splitText.chars;
    gsap.fromTo(
      chars,
      {
        y: '100px',
        opacity: 0
      },
      {
        y: 0,
        opacity:1,
        stagger: {
          amount: 0.5,
        },
        scrollTrigger: {
          trigger: chars,
          start: 'top 100%',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <p
      className={cn('stagger astro-font !text-white flex flex-wrap overflow-hidden', className)}
    >
      {text}
    </p>
  );
};