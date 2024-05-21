'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/utils/ccn';

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
      setSvgWidth(contentRef.current.offsetWidth);
    }
  }, []);

  const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [0, 2]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn('relative w-full h-full', className)}>
      <div className="absolute left-0 right-0 top-3 z-[100]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height={svgHeight}
          className="block z-[100]"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="dropShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="5"
                dy="5"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.5"
              />
            </filter>
          </defs>
          <motion.path
            d={`M 0 0 V 450 C 0 450 0 500 50 500 H ${svgWidth - 50} C ${
              svgWidth - 50
            } 500 ${svgWidth} 500 ${svgWidth} 550 V 950 C ${svgWidth} 950 ${svgWidth} 1000 ${
              svgWidth - 50
            } 1000 H 50 C 50 1000 0 1000 0 1050 V 1500`}
            fill="none"
            className=""
            stroke="black"
            strokeLinecap={'round'}
            strokeOpacity=".1"
            strokeWidth="4"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 0 -10 V 450 C 0 450 0 500 50 500 H ${svgWidth - 50} C ${
              svgWidth - 50
            } 500 ${svgWidth} 500 ${svgWidth} 550 V 950 C ${svgWidth} 950 ${svgWidth} 1000 ${
              svgWidth - 50
            } 1000 H 50 C 50 1000 0 1000 0 1050 V 1600`}
            fill="none"
            style={{
              pathLength,
              boxShadow: `inset 0px 0px 20px #fa1593, 0px 0px 2rem #fa1593`,
            }}
            strokeDasharray="1px 1px"
            stroke="var(--blue)"
            strokeLinecap="round"
            strokeDashoffset={0}
            strokeWidth="4"
            className="motion-reduce:hidden"
            filter="url(#dropShadow)"
          ></motion.path>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
