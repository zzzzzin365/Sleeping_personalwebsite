import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 
      ref={containerRef} 
      className={`scroll-float ${containerClassName}`}
      style={{
        fontSize: containerClassName.includes('small-text') ? '20px' : '4rem',
        fontWeight: containerClassName.includes('small-text') ? '700' : '700',
        color: containerClassName.includes('small-text') ? '#cccccc' : 'white',
        margin: '0',
        padding: '0',
        lineHeight: '1'
      }}
    >
      <span 
        className={`scroll-float-text ${textClassName}`}
        style={{
          fontSize: containerClassName.includes('small-text') ? '20px' : '4rem',
          fontWeight: containerClassName.includes('small-text') ? '700' : '700',
          color: containerClassName.includes('small-text') ? '#cccccc' : 'white',
          display: 'inline-block',
          textAlign: 'left',
          lineHeight: '1'
        }}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;
