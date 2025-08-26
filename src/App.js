import React, { useState, useEffect, useRef } from 'react';
import TextPressure from './TextPressure';
import Particles from './Particles';
import ParticleSphere from './ParticleSphere';
import TextType from './TextType';
import CircularText from './CircularText';
import TiltedCard from './TiltedCard';
import CurvedLoop from './CurvedLoop';
import ShootingStar from './ShootingStar';
import TargetCursor from './TargetCursor';
import ScrollFloat from './ScrollFloat';
import './ShootingStar.css';
import './TargetCursor.css';
import './ScrollFloat.css';

import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [spinnerScale, setSpinnerScale] = useState(0.4);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const [modalVisible, setModalVisible] = useState(false);



  const spinnerRef = useRef(null);
  const techStackRef = useRef(null);

  useEffect(() => {

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);


    const hideTimer = setTimeout(() => {
      setShowSplash(false);
      setStartTyping(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleSpinnerScroll = () => {
      if (!spinnerRef.current) return;
      
      const rect = spinnerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      

      if (rect.top < windowHeight) {

        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)));
        const scale = 0.2 + (progress * 0.8);
        setSpinnerScale(scale);
      } else {
        setSpinnerScale(0.2);
      }
    };
    
    handleSpinnerScroll();
    window.addEventListener('scroll', handleSpinnerScroll);
    return () => window.removeEventListener('scroll', handleSpinnerScroll);
  }, []);


  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    if (targetId === 'blog') {
      window.location.href = '/blog';
      return;
    }
    
    let targetElement = null;
    
    if (targetId === 'projects') {
      targetElement = document.querySelector('.projects-section');
    } else if (targetId === 'skills') {
      targetElement = document.querySelector('.tech-stack-section');
    } else if (targetId === 'contact') {
      targetElement = document.querySelector('.footer');
    }
    
    if (targetElement) {
      const navbarHeight = 80;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };


  useEffect(() => {
    if (showModal) {

      setModalVisible(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const modalOverlay = document.querySelector('.modal-overlay');
          if (modalOverlay) {
            modalOverlay.classList.add('show');
          }
        });
      });
    } else {
      setModalVisible(false);
    }
  }, [showModal]);



  return (
    <div className="App">
      <TargetCursor 
        targetSelector=".navbar .cursor-target"
        spinDuration={2}
        hideDefaultCursor={false}
      />
      

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/avainweb.png" alt="avainweb" className="nav-logo-image" />
          </div>
                      <ul className="nav-menu">
              <li><a href="#blog" className="cursor-target" onClick={(e) => handleNavClick(e, 'blog')}>blog</a></li>
              <li><a href="#projects" className="cursor-target" onClick={(e) => handleNavClick(e, 'projects')}>我的项目</a></li>
              <li><a href="#skills" className="cursor-target" onClick={(e) => handleNavClick(e, 'skills')}>技术栈</a></li>
              <li><a href="#contact" className="cursor-target" onClick={(e) => handleNavClick(e, 'contact')}>联系我</a></li>
            </ul>
        </div>
      </nav>
      
      <ShootingStar triggerRef={techStackRef} />

      {modalVisible && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-tools">
              <div className="modal-circle">
                <span className="modal-box modal-red"></span>
              </div>
              <div className="modal-circle">
                <span className="modal-box modal-yellow"></span>
              </div>
              <div className="modal-circle">
                <span className="modal-box modal-green"></span>
              </div>
            </div>
            <div className="modal-content">
              <h3>{modalContent.title}</h3>
              {modalContent.video && (
                <div className="modal-video-container">
                  <video 
                    controls 
                    className="modal-video"
                    autoPlay={false}
                    muted={false}
                    preload="metadata"
                    onError={(e) => {
                      console.error('视频加载失败:', e);
                      // 如果GitHub链接失败，尝试使用本地文件作为备选
                      if (e.target.src.includes('github.com')) {
                        const localVideo = e.target.src.replace(
                          'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2-4/p4.mp4',
                          '/p4项目演示视频.mp4'
                        ).replace(
                          'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2/default.mp4',
                          '/乐呼.mp4'
                        );
                        e.target.src = localVideo;
                      }
                    }}
                  >
                    <source src={modalContent.video} type="video/mp4" />
                    <source 
                      src={modalContent.video.includes('p4.mp4') ? '/p4项目演示视频.mp4' : '/乐呼.mp4'} 
                      type="video/mp4" 
                    />
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              )}
              {modalContent.image && (
                <div className="modal-image-container">
                  <img 
                    src={modalContent.image} 
                    alt="项目详情" 
                    className={`modal-image ${modalContent.transparentImage ? 'transparent-bg' : ''}`}
                  />
                </div>
              )}
              <div 
                className="modal-description"
                dangerouslySetInnerHTML={{ 
                  __html: modalContent.description.replace(/\n/g, '<br>') 
                }} 
              />
              {modalContent.image1 && (
                <div className="modal-tech-section">
                  <h4 className="modal-tech-title">本app技术路线图</h4>
                  <div className="modal-image-container">
                    <img src={modalContent.image1} alt="本app技术路线图" className="modal-image" />
                  </div>
                </div>
              )}
              {modalContent.image2 && (
                <div className="modal-tech-section">
                  <h4 className="modal-tech-title">算法原理流程图</h4>
                  <div className="modal-image-container">
                    <img src={modalContent.image2} alt="算法原理流程图" className="modal-image" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
            )}



      {showSplash && (
        <div 
          className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#141414',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'opacity 1s ease-out'
          }}
        >
          <div 
            style={{
              position: 'relative', 
              height: '300px',
              width: '100%',
              maxWidth: '800px',
              padding: '0 20px'
            }}
          >
            <TextPressure
              text="Welcome"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={36}
            />
          </div>
        </div>
      )}



      <div className="main-content">
        <div className="particles-background">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>


        <div className="content-overlay">
         
    

          <main className="main-sections">

            <section id="hero" className="hero-section">
              <div 
                className="particle-sphere-background"
                style={{
                  transform: `translateX(${Math.min(scrollY * 1.2, 600)}px) translateY(${Math.min(scrollY * 0.5, 300)}px) scale(${Math.max(0.7, 1 - scrollY * 0.0002)})`,
                  opacity: Math.max(0.6, 1 - scrollY * 0.0003)
                }}
              >
                <ParticleSphere />
              </div>
              <div className="hero-content">
                <TextType 
                  text={["  Hello , I'm Sleeping"]}
                  initialDelay = {1500}
                  typingSpeed={130}
                  pauseDuration={1300}
                  showCursor={true}
                  cursorCharacter="|"
                  className="hero-title"
                  forceStart={startTyping}
                />
              </div>
            </section>


            <section id="about" style={{ marginBottom: '4rem' }}>
              <div className="section-container">
                <TiltedCard
                  imageSrc=""
                  altText="About Me Card"
                  captionText="About Me"
                  containerHeight="400px"
                  containerWidth="600px"
                  imageHeight="400px"
                  imageWidth="600px"
                  rotateAmplitude={15}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="about-card">
                      <div className="about-content-new">
                        <div className="about-avatar">
                          <img src="/avainweb.png" alt="我的头像" className="avatar-image" />
                        </div>
                        <div className="about-info">
                          <ul className="about-list">
                            <li> 某211软工专业本科在读</li>
                            <li> INTJ</li>
                            <li> 雅思7，GRE准备中。。。</li>
                            <li> 未来想成为一名独立开发者</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  }
                />
                <div className="circular-text-container">
                  <CircularText
                    text=" Something * About * Me *"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>
              </div>
            </section>

            
            <section className="projects-section">

              <section className="curved-loop-section" style={{ marginBottom: '4rem' }}>
                <CurvedLoop 
                  marqueeText="My Project ✦ My Project ✦ My Project ✦"
                  speed={2}
                  curveAmount={-150}
                  direction="left"
                  interactive={true}
                  className="project-curved-text"
                />
              </section>


              <section className="spinner-section" ref={spinnerRef}>
                <div 
                  className="spinner"
                  style={{
                    width: `${44 * spinnerScale}px`,
                    height: `${44 * spinnerScale}px`,
                    transition: 'width 0.3s ease-out, height 0.4s ease-out'
                  }}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </section>


              <section className="projects-cards-section">
              <div style={{ textAlign: 'center', color: 'white', padding: '2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>


                  

                  <div className="cards-container">
                    <div className="card cursor-target">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p1.png" alt="Project 1" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>OurEchoes</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">OurEchoes</p>
                        <p className="card__description">一款基于<b>SwiftUI</b>ios开发框架与<b>多模态AI技术</b>的智慧分身记忆互动app。</p>
                        
                        <button 
                          className="project-btn" 
                          onClick={() => {
                            console.log('按钮被点击了！');
                            setModalContent({
                              title: 'OurEchoes',
                              description: '一款基于 SwiftUI ios开发框架与多模态AI技术的智慧分身记忆互动app,用户能够与基于个人记忆创建的AI角色实现跨时空对话。\n\n✦ LLM + 语音克隆 + TTS合成\n\ngithub地址：<a href="https://github.com/zzzzzin365/OurEchoes.git" target="_blank" style="color: white;">https://github.com/zzzzzin365/OurEchoes.git</a>',
                              image: '/p1_more.png',
                              transparentImage: true
                            });
                            setShowModal(true);
                            console.log('showModal设置为true');
                          }}
                        >
                          了解更多
                        </button>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p2.png" alt="Project 2" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>乐呼</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">乐呼</p>
                        <p className="card__description">基于<b>React Native</b>开发的跨平台app。</p>
                        <button 
                          className="project-btn" 
                          onClick={() => {
                            setModalContent({
                              title: '乐呼',
                              description: '基于<b>React Native</b>开发的跨平台app, 是一款以社区联结为基础的新型助老平台，用户终端为移动端。\n\n✦ AI Agent + AR\n\ngithub地址：',
                              video: 'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2/default.mp4',
                              image1: '/p2_more1.png',
                              image2: '/p2_more2.png'
                            });
                            setShowModal(true);
                          }}
                        >
                          了解更多
                        </button>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p3.png" alt="Project 3" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>DeepPaper</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">DeepPaper</p>
                        <p className="card__description">基于<b>Vue</b>与<b>NLP等AI技术</b>开发的智能论文阅读与管理平台。</p>
                        <button 
                          className="project-btn" 
                          onClick={() => {
                            setModalContent({
                              title: 'DeepPaper',
                              description: '基于<b>Vue</b>与<b>NLP等AI技术</b>开发的智能论文阅读与管理平台，用户可通过本平台实现智能论文管理与阅读、获得个性化咨询、文献推荐。\n\n✦ NLP + ML + RAG + OCR\n\ngithub地址：',
                              image: '/p3_more.png'
                            });
                            setShowModal(true);
                          }}
                        >
                          了解更多
                        </button>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p4.png" alt="Project 4" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>智能排课系统</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">智能排课系统</p>
                        <p className="card__description">基于<b>React</b>开发的智能排课系统。</p>
                        <button 
                          className="project-btn" 
                          onClick={() => {
                            setModalContent({
                              title: '智能排课系统',
                              description: '基于<b>遗传算法</b>与<b>强化学习</b>开发的智能排课系统， 目的是为了减轻高校管理员的排课负担。',
                              video: 'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2-4/p4.mp4',
                              image: '/p4_more1.png',
                              image2: '/p4_more2.png'
                            });
                            setShowModal(true);
                          }}
                        >
                          了解更多
                        </button>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p7.png" alt="Project 7" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>Coffee Shop</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">Coffee Shop</p>
                        <p className="card__description">基于<b>Uniapp</b>开发的Coffee Shop 小程序。</p>
                        <button 
                          className="project-btn" 
                          onClick={() => {
                            setModalContent({
                              title: 'Coffee Shop',
                              description: '基于<b>Uniapp</b>开发的Coffee Shop 小程序。\n\n✦ 技术栈描述\n\ngithub地址：',
                              image: '/p7_more.png'
                            });
                            setShowModal(true);
                          }}
                        >
                          了解更多
                          
                        </button>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/avainweb.png" alt="Project 8" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>本网站</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">本网站</p>
                        <p className="card__description">基于<b>React</b>开发的个人网站。</p>
                        <p className="card__description">✦ GASP + Three.js + Motion</p>
                        
                        
                      </div>
                    </div>
                    
                    
                    <div className="card cursor-target">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p5.png" alt="Project 5" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#383838', fontSize: '1rem', fontWeight: '600' }}>电商短视频 + 评论分析工具</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">电商视频与评论智能分析系统</p>
                        <p className="card__description">基于<b>LLM</b>与<b>语义向量</b>技术的电商视频与评论智能分析系统</p>
                      </div>
                    </div>
                    
                    <div className="card cursor-target">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src="/p6.png" alt="Project 6" className="card-image" style={{ width: '80px', height: '80px' }} />
                        <div style={{ color: '#383838', fontSize: '1rem', fontWeight: '600' }}>用户新老分类预测系统</div>
                      </div>
                      <div className="card__content">
                        <p className="card__title">用户新老分类预测系统</p>
                        <p className="card__description">基于<b>LightGBM</b>与<b>XGBoost</b>集成学习和多维特征工程的智能用户新老分类预测系统</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </section>


            <section className="tech-stack-section" ref={techStackRef}>
                              <div style={{ textAlign: 'center', color: 'white', padding: '1rem 0' }}>

                  <CurvedLoop 
                    marqueeText="My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦ My Tech Stack ✦"
                    speed={2}
                    curveAmount={10}
                    direction="left"
                    interactive={true}
                    className="tech-stack-curved-text"
                  />
                  

                  <section>
                <h2 style={{
                  textAlign: 'left',
                  color: '#ffffff',
                  fontSize: '2rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 2rem',
                  position: 'relative',
                  zIndex: 10
                }}>
                  Web Dev ( Strive to become a full stack developer... )
                </h2>
                <div style={{
                  display: 'flex',
                  gap: '40px',
                  alignItems: 'center',
                  marginBottom: '60px',
                  marginLeft: '2rem'
                }}>
                        <div style={{ textAlign: 'center' }}>
                          <img 
                            src="/vue.png" 
                            alt="Vue" 
                            style={{ 
                              width: '48px', 
                              height: '48px', 
                              marginBottom: '0.5rem' 
                            }} 
                          />
                          <div style={{ 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Vue
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <img 
                            src="/react.png" 
                            alt="React" 
                            style={{ 
                              width: '48px', 
                              height: '48px', 
                              marginBottom: '0.5rem' 
                            }} 
                          />
                          <div style={{ 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            React
                          </div>
                        </div>
                                          <div style={{ textAlign: 'center' }}>
                    <img
                      src="/node.png"
                      alt="Node.js"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Node.js
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/webpack.png"
                      alt="Webpack"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Webpack
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/vite.png"
                      alt="Vite"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Vite
                    </div>
                  </div>
                        
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/js.png"
                      alt="JavaScript"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      JavaScript
                  </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/ts.png"
                      alt="TypeScript"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      TypeScript
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/html.png"
                      alt="HTML5"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      
                      fontWeight: '500'
                    }}>
                      HTML5
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/css.png"
                      alt="CSS3"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      CSS3
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/python.png"
                      alt="Python"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Python
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/java.png"
                      alt="Java"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Java
                    </div>
                  </div>
                </div>
                  </section>


                <section>
                  <h2 style={{
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '2rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 2rem',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    Mobile Dev
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '40px',
                    alignItems: 'center',
                    marginBottom: '60px',
                    marginLeft: '2rem'
                  }}>
                                        <div style={{ textAlign: 'center' }}>
                    <img
                      src="/swiftui.png"
                      alt="SwiftUI"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      SwiftUI
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/react.png"
                      alt="React Native"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      React Native
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/uniapp.PNG"
                      alt="UniApp"
                      style={{
                        width: '48px',
                        height: '48px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      UniApp
                    </div>
                  </div>
                    </div>
                  </section>


                <section>
                  <h2 style={{
                    textAlign: 'left',
                    color: '#ffffff',
                    fontSize: '2rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 2rem',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    UI/UX Design
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '40px',
                    alignItems: 'center',
                    marginBottom: '60px',
                    marginLeft: '2rem'
                  }}>
                                            <div style={{ textAlign: 'center' }}>
                        <img
                          src="/figma.png"
                          alt="Figma"
                          style={{
                            width: '48px',
                            height: '48px',
                            marginBottom: '0.5rem',
                            objectFit: 'contain'
                          }}
                        />
                        <div style={{
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}>
                          Figma
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <img 
                          src="/ai.png" 
                          alt="Adobe Illustrator" 
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            marginBottom: '0.5rem' 
                          }} 
                        />
                        <div style={{ 
                          color: '#ffffff', 
                          fontSize: '0.9rem', 
                          fontWeight: '500' 
                        }}>
                          Adobe Illustrator
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <img 
                          src="/ae.png" 
                          alt="Adobe After Effects" 
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            marginBottom: '0.5rem' 
                          }} 
                        />
                        <div style={{ 
                          color: '#ffffff', 
                          fontSize: '0.9rem', 
                          fontWeight: '500' 
                        }}>
                          Adobe After Effects
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <img 
                          src="/spline.png" 
                          alt="Spline" 
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            marginBottom: '0.5rem' 
                          }} 
                        />
                        <div style={{ 
                          color: '#ffffff', 
                          fontSize: '0.9rem', 
                          fontWeight: '500' 
                        }}>
                          Spline
                        </div>
                      </div>
                    </div>
                  </section>
              </div>
            </section>


            <section className="my-interest-section" style={{ marginTop: '4rem', marginBottom: '12rem' }}>
              <div style={{ textAlign: 'left', color: 'white', padding: '2rem 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem' }}>
                <div style={{fontSize: '4rem', fontWeight: '700', color: 'white'}}>
                  <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='top bottom-=100px'
                    scrollEnd='top center'
                    stagger={0.03}
                  >
                    I am interested in...
                  </ScrollFloat>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='top bottom-=50px'
                    scrollEnd='top center-=100px'
                    stagger={0.02}
                    containerClassName="small-text"
                  >
                    AR development, embodied intelligence, Web3, embedded software development,
                  </ScrollFloat>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='top bottom'
                    scrollEnd='top center-=50px'
                    stagger={0.02}
                    containerClassName="small-text"
                  >
                    and I also think about how to better integrate technology with business.
                  </ScrollFloat>
                </div>
              </div>
            </section>

            
          

            <section id="skills">
             
            </section>

          </main>


          <footer className="footer">
            <div className="footer-content">
               <p style={{ margin: '0.5rem 0' }}>&copy; 2025 Huitian Chen. All rights reserved.</p>
               <p style={{ color: 'white', margin: '0.5rem 0' }}>
                 <strong>Email:</strong> <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText('cht_se2027@163.com')}>cht_se2027@163.com (点击复制)</span>
               </p>
               <p style={{ color: 'white', margin: '0.5rem 0' }}>
                 <strong>Github:</strong> <a href="https://github.com/zzzzzin365?tab=repositories" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'underline'}}>@zzzzzin365</a>
               </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;