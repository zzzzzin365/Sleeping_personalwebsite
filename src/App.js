import React, { useState, useEffect } from 'react';
import TextPressure from './TextPressure';
import Particles from './Particles';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 2秒后开始淡出效果
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // 3秒后完全隐藏开屏
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="App">
      {/* 开屏页面 */}
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

      {/* 主网站内容 */}
      <div className="main-content">
        {/* 粒子背景 */}
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

        {/* 网站内容 */}
        <div className="content-overlay">
          {/* 导航栏 */}
          <nav className="navbar">
            <div className="nav-container">
              <div className="logo">我的网站</div>
              <div className="nav-links">
                <a href="#about">关于我</a>
                <a href="#projects">项目</a>
                <a href="#skills">技能</a>
                <a href="#contact">联系</a>
              </div>
            </div>
          </nav>

          {/* 主要内容区域 */}
          <main className="main-sections">
            {/* 介绍部分 */}
            <section id="hero" className="hero-section">
              <div className="hero-content">
                <h1>Hello, I'm Your Name</h1>
                <p>一个充满热情的开发者</p>
                <button className="cta-button">了解更多</button>
              </div>
            </section>

            {/* 关于我部分 */}
            <section id="about" className="content-section">
              <div className="section-container">
                <h2>关于我</h2>
                <div className="about-content">
                  <div className="about-text">
                    <p>
                      我是一个热爱技术的开发者，专注于创建优秀的用户体验。
                      拥有丰富的前端开发经验，熟悉现代web技术栈。
                    </p>
                    <p>
                      我相信代码不仅仅是功能的实现，更是艺术的表达。
                      每一行代码都应该优雅、高效且易于维护。
                    </p>
                  </div>
                  <div className="about-image">
                    <div className="image-placeholder">
                      <span>您的照片</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 项目部分 */}
            <section id="projects" className="content-section">
              <div className="section-container">
                <h2>我的项目</h2>
                <div className="projects-grid">
                  <div className="project-card">
                    <h3>项目一</h3>
                    <p>项目描述：一个令人印象深刻的web应用</p>
                    <div className="project-tech">
                      <span>React</span>
                      <span>Node.js</span>
                      <span>MongoDB</span>
                    </div>
                  </div>
                  <div className="project-card">
                    <h3>项目二</h3>
                    <p>项目描述：创新的移动端解决方案</p>
                    <div className="project-tech">
                      <span>React Native</span>
                      <span>Firebase</span>
                      <span>TypeScript</span>
                    </div>
                  </div>
                  <div className="project-card">
                    <h3>项目三</h3>
                    <p>项目描述：高性能的数据可视化工具</p>
                    <div className="project-tech">
                      <span>D3.js</span>
                      <span>WebGL</span>
                      <span>Python</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 技能部分 */}
            <section id="skills" className="content-section">
              <div className="section-container">
                <h2>技能专长</h2>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h3>前端开发</h3>
                    <div className="skill-list">
                      <span>React</span>
                      <span>Vue.js</span>
                      <span>JavaScript</span>
                      <span>TypeScript</span>
                      <span>CSS/SCSS</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3>后端开发</h3>
                    <div className="skill-list">
                      <span>Node.js</span>
                      <span>Python</span>
                      <span>Express</span>
                      <span>MongoDB</span>
                      <span>MySQL</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3>工具与其他</h3>
                    <div className="skill-list">
                      <span>Git</span>
                      <span>Docker</span>
                      <span>AWS</span>
                      <span>Figma</span>
                      <span>Webpack</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 联系部分 */}
            <section id="contact" className="content-section">
              <div className="section-container">
                <h2>联系我</h2>
                <div className="contact-content">
                  <div className="contact-info">
                    <div className="contact-item">
                      <h4>邮箱</h4>
                      <p>your.email@example.com</p>
                    </div>
                    <div className="contact-item">
                      <h4>电话</h4>
                      <p>+86 123 4567 8900</p>
                    </div>
                    <div className="contact-item">
                      <h4>地址</h4>
                      <p>中国，上海</p>
                    </div>
                  </div>
                  <div className="contact-form">
                    <form>
                      <input type="text" placeholder="您的姓名" />
                      <input type="email" placeholder="您的邮箱" />
                      <textarea placeholder="留言内容" rows="5"></textarea>
                      <button type="submit">发送消息</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* 页脚 */}
          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2024 Your Name. All rights reserved.</p>
              <div className="social-links">
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;