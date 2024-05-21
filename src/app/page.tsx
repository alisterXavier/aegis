'use client';
import { FloatingNav } from '@/app/components/floating-navbar';
import { EvervaultCard } from './components/evervault-card';
import { Button } from '@nextui-org/react';
import { Para } from './components/character-fade';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import kenway from '../../public/images/Kenway.jpg';
import { TracingBeam } from './components/tracing';
import gsap from 'gsap';
import SplitType from 'split-type';

const testParas = [
  {
    header: 'Manual or Automatic',
  },
  {
    header: 'Follow the steps',
  },
  {
    header: 'a worry free web',
  },
];

export default function Home() {
  return (
    <div className="">
      <FloatingNav>
        <Button
          className="bg-[var(--blue)] text-white absolute z-[1000] right-10 top-5"
          radius="sm"
        >
          Login
        </Button>
      </FloatingNav>
      <EvervaultCard>
        <div className="w-[70%] flex justify-center items-center flex-col z-9">
          <div className="w-[100%] flex justify-center items-center flex-col p-5">
            <div className="w-full">
              <h1 className="text-3xl md:text-5xl font-semibold text-center text-[var(--blue)] astro-font">
                Unlock Seamless Security with Aegis
              </h1>
            </div>
            <div className="w-[80%]">
              <p className="text-md md:text-[20px] text-center text-white">
                Streamline SSL/TLS certificate management and installation for a
                worry-free web experience.
              </p>
            </div>
          </div>
          {/* <Button className=''>Get Started</Button> */}
        </div>
      </EvervaultCard>
      <div className="px-5 md:px-10 second-container">
        <div className="h-screen flex items-center">
          <div className="w-[90%]">
            <Para
              className="md:text-5xl text-2xl w-[100%] md:w-[60%]"
              parent="second-container"
            />
            <p className="text-white text-sm md:text-md">
              Expired certificates leads to more time managing certificates,
              potentially leading to a 42% higher chance of security breaches.
            </p>
          </div>
        </div>
        <TracingBeam className="px-6">
          <ThirdSection />
        </TracingBeam>
      </div>
      <FourthSection />
    </div>
  );
}

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const AppImages = ({ children }: { children: React.ReactNode }) => {
    const figureRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: figureRef,
      offset: ['start 100%', 'end end'],
    });

    const height = useSpring(
      useTransform(scrollYProgress, [0, 1], [400, 100]),
      {
        stiffness: 500,
        damping: 90,
      }
    );
    const width = useSpring(useTransform(scrollYProgress, [0, 1], [400, 100]), {
      stiffness: 500,
      damping: 90,
    });
    return (
      <figure
        className={`relative m-2 w-full md:w-[60%] h-[100%] overflow-hidden`}
        ref={figureRef}
      >
        {children}
        <motion.span
          style={{
            height,
          }}
          className="bg-gradient-to-b from-transparent  from-5% to-[var(--bg)] to-70% bottom-0 left-0 right-0 block z-[10] absolute"
        />
        <motion.span
          style={{
            width,
          }}
          className="bg-gradient-to-l from-transparent from-5% to-[var(--bg)] to-70%  top-0 bottom-0 w-[100px]  left-0 block z-[10] absolute"
        />
        <motion.span
          style={{
            height,
          }}
          className="bg-gradient-to-t from-transparent from-5% to-[var(--bg)] to-70%  right-0 top-0  left-0 block z-[10] absolute"
        />
        <motion.span
          style={{
            width,
          }}
          className="bg-gradient-to-r from-transparent from-5% to-[var(--bg)] to-70%  top-0 bottom-0 right-0 w-[100px] block z-[10] absolute"
        />
      </figure>
    );
  };

  const Test = ({ header, index }: { header: string; index: number }) => {
    const txtRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
      const ourText = new SplitType(txtRef.current ?? '');
      const chars = ourText.chars;
      gsap.fromTo(
        chars,
        {
          x: 0,
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          scrollTrigger: {
            trigger: txtRef.current,
            start: 'top 100%',
          },
        }
      );
    }, []);
    return (
      <div
        className={`h-[500px] top-50 bg-[var(--bg)] relative flex items-center justify-center overflow-hidden mb-10`}
      >
        <motion.div
          ref={ref}
          className={`absolute w-full md:w-[30%] top-[50%] -translate-y-[50%]
          ${
            index % 2 === 0 ? 'left-0  justify-start' : 'right-0  justify-end'
          }  z-[11] flex`}
        >
          <p
            className={`test-try flex flex-col w-fit md:w-[600px] ${
              index % 2 === 0 ? 'text-end' : 'text-start'
            } text-2xl md:text-5xl text-white`}
            ref={txtRef}
          >
            {header}
          </p>
        </motion.div>
        <AppImages>
          <Image src={kenway} fill alt="asdas" objectFit="contain" />
        </AppImages>
      </div>
    );
  };

  return (
    <div className="flex justify-start" ref={ref}>
      <div className="relative w-full astro-font overflow-hidden">
        {testParas.map((item, key) => {
          return <Test key={key} index={key} header={item.header} />;
        })}
      </div>
    </div>
  );
};

const FourthSection = () => {
  const [itemsPerRow, setItemsPerRow] = useState(0);
  const [itemsPerColumn, setItemsPerColumn] = useState(0);
  const [totalBoxes, setTotalBoxes] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function calculateItemsPerRow() {
      const container = document.querySelector('.grid-container');
      const item = document.querySelector('.grid-item');
      if (container && item) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const itemWidth = item.clientWidth;
        const itemHeight = item.clientHeight;
        setItemsPerRow(Math.floor(containerWidth / itemWidth) - 1);
        setItemsPerColumn(Math.floor(containerHeight / itemHeight));
      }
    }
    const handleBoxesResize = () => {
      const test = document.querySelector('.grid-container');
      const width = (test?.clientWidth ?? 0) / 50;
      const height = (test?.clientHeight ?? 0) / 50;
      const boxes = width * height;
      setTotalBoxes(boxes);
    };
    const resizeChain = () => {
      handleBoxesResize();
      calculateItemsPerRow();
    };
    resizeChain();

    window.addEventListener('resize', resizeChain);

    return () => {
      window.removeEventListener('resize', resizeChain);
    };
  }, [totalBoxes]);

  useEffect(() => {
    if (isLoaded && itemsPerRow && itemsPerColumn && totalBoxes) {
      const gridAnimations = () => {
        // Pulse
        const scrollTriggerConfig = {
          trigger: '.fourth-container',
          start: 'top 100%',
          scrub: true,
          markers: true,
        };
        const pulseTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
          onComplete: () => ScrollTrigger.refresh(),
        });
        pulseTimeline
          .from('.grid-item.active', {
            border: '1px solid transparent',
          })
          .to('.grid-item.active', {
            border: '1px solid #16729b',
            repeat: 0,
            stagger: {
              amount: 2,
              grid: [itemsPerColumn, itemsPerRow],
              from: 1,
            },
          })
          .to('.grid-item.active', {
            border: '1px solid transparent',
            stagger: {
              amount: 1.5,
              grid: [itemsPerColumn, itemsPerRow],
              from: 1,
            },
          });

        // Scale and opacity animation for grid items
        gsap.fromTo(
          '.grid-item',
          {
            scale: 0.8,
            opacity: 1,
          },
          {
            x: (i) => {
              var currentRow = Math.floor(i / itemsPerRow);
              var center =
                currentRow * itemsPerRow + Math.floor(itemsPerRow / 2);
              return i <= center ? '-100%' : '100%';
            },
            y: '100%',
            scale: 0,
            stagger: {
              grid: [itemsPerColumn, itemsPerRow],
              each: 0.1,
              from: 15,
            },
            duration: 1,
            scrollTrigger: scrollTriggerConfig,
          }
        );
      };
      const TitleAnimation = () => {
        gsap.fromTo(
          '.try-title',
          {
            y: '500px',
          },
          {
            y: 0,
            scrollTrigger: {
              trigger: '.fourth-container',
              start: 'top 100%',
              end: 'bottom 100%',
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          '.title-shadow-height',
          {
            height: '100px',
          },
          {
            height: 0,
            y: '0%',
            ease: 'power1.inOut',
            yoyo: true,
            duration: 1,
            scrollTrigger: {
              trigger: '.fourth-container',
              scrub: true,
              start: 'top 100%',
            },
          }
        );
        gsap.fromTo(
          '.title-shadow-width',
          {
            width: '50px',
            opacity: 0,
          },
          {
            width: 0,
            y: '0%',
            opacity: 1,
            ease: 'power1.inOut',
            yoyo: true,
            duration: 1,
            scrollTrigger: {
              trigger: '.fourth-container',
              scrub: true,
              start: 'top 100%',
            },
          }
        );
      };

      gridAnimations();
      TitleAnimation();
    } else setIsLoaded(true);
  }, [isLoaded, itemsPerColumn, itemsPerRow, totalBoxes]);

  return (
    <div className="relative fourth-container h-[100vh] overflow-hidden z-100">
      <div className="relative inner-container h-[100%] flex justify-center items-center">
        <p className="relative try-title astro-font text-white text-2xl md:text-7xl">
          Try
          <span className="cursor-pointer transition-all hover:text-[var(--blue)] mx-2">
            Aegis
          </span>
          for free
          <motion.span className="bg-gradient-to-b from-transparent title-shadow-height h-[100px] from-5% to-[var(--bg)] to-70% bottom-0 left-0 right-0 block z-[10] absolute" />
          <motion.span className="bg-gradient-to-l from-transparent title-shadow-width from-5% to-[var(--bg)] to-70%  top-0 bottom-0 w-[100px]  left-0 block z-[10] absolute" />
          <motion.span className="bg-gradient-to-r from-transparent from-5% title-shadow-width to-[var(--bg)] to-70%  top-0 bottom-0 right-0 w-[100px] block z-[10] absolute" />
        </p>
      </div>
      <div className="absolute h-screen grid-container top-0 left-0 right-0 bottom-0 grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(50px,_1fr))] z-10">
        {Array.from({ length: totalBoxes }).map((index, i) => {
          return (
            <div
              key={i}
              className="active grid-item relative
              border-[transparent] border 
              before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:shadow-[1px_10px_70px_black] bg-[var(--bg)] before:z-[1]
              "
            >
              <span></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
