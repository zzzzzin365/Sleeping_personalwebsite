import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    
    // 获取canvas的父容器尺寸
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0); // 透明背景

    // 粒子系统的设置
    const particleCount = 3000;  // 总粒子数
    const radius = 14;  // 球体半径

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // 生成粒子的位置
    for (let i = 0; i < particleCount; i++) {
      // 使用球坐标系来分布粒子，phi 和 theta 的分布需要调整
      const phi = Math.acos(1 - 2 * Math.random());  // 控制粒子沿纵轴的分布
      const theta = Math.random() * Math.PI * 2;  // 控制粒子沿横轴的分布

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 使用白色的粒子
    const material = new THREE.PointsMaterial({ 
      color: 0xFFFFFF, 
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(geometry, material);

    scene.add(particles);

    camera.position.z = 25;

    // 渲染和动画
    const animate = () => {
      requestAnimationFrame(animate);

      // 动态旋转粒子球体
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // 监听窗口大小变化
    const handleResize = () => {
      const newContainerWidth = container.clientWidth;
      const newContainerHeight = container.clientHeight;
      
      camera.aspect = newContainerWidth / newContainerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newContainerWidth, newContainerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>;
};

export default ParticleSphere; 