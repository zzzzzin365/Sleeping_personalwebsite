import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

const ShootingStar = ({ triggerRef }) => {
  const starRef = useRef(null);

  useEffect(() => {
    if (!starRef.current || !triggerRef?.current) return;

    const starEl = starRef.current;

    // 初始位置
    gsap.set(starEl, { 
      x: -200, 
      y: -200,
      opacity: 1
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: false,
        toggleActions: "play none none reverse",
        onEnter: () => {
          // 当技术栈区域进入视窗时播放动画
          tl.play();
        },
        onLeave: () => gsap.set(starEl, {opacity: 0}),
        onEnterBack: () => gsap.set(starEl, {opacity: 1})
      }
    });

    // 移动路径
    tl.to(starEl, {
      x: () => window.innerWidth + 200,
      y: () => window.innerHeight + 200,
      ease: "none",
      duration: 2
    }, 0);

    // 旋转流星头
    tl.fromTo(".head",
      { rotate: -45 },
      { rotate: 315, ease: "none" },
      0.3
    ).duration(0.4);

    // 光晕闪光
    tl.to(".glow", {
      opacity: 1,
      scale: 1.5,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    }, 0.3);

    // 粒子生成
    tl.add(() => {
      createParticles();
    }, 0.3);

    // 拖影尾巴生成
    function createTailClone() {
      const rect = starEl.getBoundingClientRect();
      const tailClone = document.createElement("div");
      tailClone.classList.add("tail-clone");
      tailClone.style.width = "200px";
      tailClone.style.left = rect.left + "px";
      tailClone.style.top = rect.top + "px";
      document.body.appendChild(tailClone);

      gsap.to(tailClone, {
        opacity: 0,
        width: "80px", // 尾巴缩短
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => tailClone.remove()
      });
    }

    function createParticles() {
      const container = starEl;
      for (let i = 0; i < 12; i++) {
        let p = document.createElement("div");
        p.classList.add("particle");
        container.appendChild(p);

        gsap.set(p, { 
          x: 180,
          y: 0,
          opacity: 1
        });

        gsap.to(p, {
          x: "+=" + (Math.random() * 100 - 50),
          y: "+=" + (Math.random() * 100 - 50),
          opacity: 0,
          duration: 0.8,
          ease: "power1.out",
          onComplete: () => p.remove()
        });
      }
    }

    // 在动画播放过程中持续生成拖影
    const interval = setInterval(() => {
      if (tl.isActive()) {
        createTailClone();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [triggerRef]);

  return (
    <div className="shooting-star" ref={starRef}>
      <div className="tail"></div>
      <div 
        className="head"
        style={{
          background: `url('/star.png') no-repeat center/contain`
        }}
      >
        <div className="glow"></div>
      </div>
    </div>
  );
};

export default ShootingStar;
