# 部署到Vercel指南

## 前提条件
1. 确保你的代码已经推送到GitHub仓库
2. 确保视频文件已经上传到GitHub Releases

## 部署步骤

### 1. 准备GitHub Releases
在GitHub上为你的仓库创建新的Release，并上传以下视频文件：
- `乐呼.mp4` → 上传到Release v2
- `p4项目演示视频.mp4` → 上传到Release v2-4

### 2. 部署到Vercel

#### 方法1：通过Vercel Dashboard（推荐）
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击"New Project"
4. 选择你的GitHub仓库：`zzzzzin365/Sleeping_personalwebsite`
5. 保持默认设置，点击"Deploy"

#### 方法2：通过Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 3. 配置环境变量（可选）
在Vercel Dashboard中，你可以设置以下环境变量：
- `REACT_APP_GITHUB_RELEASES_URL`: GitHub releases基础URL

### 4. 自定义域名（可选）
在Vercel Dashboard中，你可以：
1. 进入项目设置
2. 在"Domains"部分添加你的自定义域名
3. 配置DNS记录

## 视频播放配置

### 当前配置
项目已经配置了智能视频播放：
- **首选**: GitHub Releases链接
- **备选**: 本地文件（开发环境）
- **错误处理**: 自动回退机制

### 视频链接格式
```javascript
// 乐呼项目
video: 'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2/default.mp4'

// 智能排课系统项目
video: 'https://github.com/zzzzzin365/Sleeping_personalwebsite/releases/download/v2-4/p4.mp4'
```

## 故障排除

### 视频无法播放
1. 检查GitHub Releases链接是否有效
2. 确认视频文件已正确上传
3. 检查浏览器控制台错误信息
4. 验证CORS设置

### 部署失败
1. 检查构建日志
2. 确认所有依赖已安装
3. 验证Node.js版本兼容性

### 性能优化
1. 启用Vercel的CDN
2. 配置适当的缓存策略
3. 使用图片和视频压缩

## 维护

### 更新视频
1. 上传新视频到GitHub Releases
2. 更新代码中的视频链接
3. 重新部署到Vercel

### 监控
- 使用Vercel Analytics监控性能
- 设置错误通知
- 定期检查视频播放状态

## 联系支持
如果遇到问题，可以：
1. 检查Vercel文档
2. 查看GitHub Issues
3. 联系Vercel支持团队
