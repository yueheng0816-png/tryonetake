# OneTake 生产部署指南

## 当前状态

- ✅ Vercel 项目已创建：`ai-headshot`
- ✅ 本地生产构建通过（`npm run build` — 零错误）
- ✅ middleware.ts → proxy.ts 迁移完成（Next.js 16）
- ✅ vercel.json 已配置
- ✅ Git 仓库已初始化
- ⏳ 待部署到 Vercel

## 第一步：推送环境变量到 Vercel

在项目目录 `d:\工作\AI建站\ai-headshot` 中运行以下命令。
每个命令会把 `.env.local` 中对应的值推送到 Vercel 生产环境：

```bash
# 进入项目目录
cd "d:\工作\AI建站\ai-headshot"

# Database (Neon — 已经是生产库)
echo "你的DATABASE_URL值" | vercel env add DATABASE_URL production --yes

# AI 模型
echo "你的REPLICATE_API_TOKEN值" | vercel env add REPLICATE_API_TOKEN production --yes

# 邮件
echo "你的RESEND_API_KEY值" | vercel env add RESEND_API_KEY production --yes

# Clerk（当前是 TEST 密钥 — 生产上线前需替换）
echo "你的NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY值" | vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --yes
echo "你的CLERK_SECRET_KEY值" | vercel env add CLERK_SECRET_KEY production --yes

# Stripe（当前是 TEST 密钥 — 生产上线前需替换）
echo "你的NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY值" | vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production --yes
echo "你的STRIPE_SECRET_KEY值" | vercel env add STRIPE_SECRET_KEY production --yes
echo "你的STRIPE_STARTER_PRICE_ID值" | vercel env add STRIPE_STARTER_PRICE_ID production --yes
echo "你的STRIPE_PRO_PRICE_ID值" | vercel env add STRIPE_PRO_PRICE_ID production --yes
echo "你的STRIPE_WEBHOOK_SECRET值" | vercel env add STRIPE_WEBHOOK_SECRET production --yes
```

> **提示**：可以从 `.env.local` 文件复制值。用实际值替换上面命令中的中文占位符。

## 第二步：部署

```bash
cd "d:\工作\AI建站\ai-headshot"
vercel --prod --yes
```

部署完成后会显示生产 URL，例如 `https://ai-headshot-xxx.vercel.app`。

## 第三步：配置 NEXT_PUBLIC_APP_URL

在 Vercel Dashboard（https://vercel.com/yueheng0816-6741s-projects/ai-headshot/settings/environment-variables）添加：

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_APP_URL` | `https://你的域名.vercel.app` |

## 第四步：生产密钥切换

### Clerk 生产实例
1. 登录 https://dashboard.clerk.com
2. 创建 **Production** 实例
3. 更新 Vercel 中的 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 和 `CLERK_SECRET_KEY`
4. 在 Clerk Dashboard → API Keys → Advanced → Allowed Origins，添加生产域名

### Stripe Live 模式
1. 登录 https://dashboard.stripe.com
2. 切换到 **Live** 模式（左上角开关）
3. 创建 Live 产品/价格
4. 更新 Vercel 中的 Stripe 密钥和 Price IDs
5. 创建 Live Webhook endpoint → `https://你的域名/api/webhook/stripe`
   - 事件：`checkout.session.completed`
6. 把 Live Webhook Signing Secret 更新到 Vercel 的 `STRIPE_WEBHOOK_SECRET`

### Replicate Webhook
在 Replicate 后台添加 webhook endpoint → `https://你的域名/api/webhook/replicate`

## 第五步：购买自定义域名

1. Vercel Dashboard → Settings → Domains → 添加域名
2. 在域名注册商处配置 DNS 指向 Vercel
3. 更新 `NEXT_PUBLIC_APP_URL` 为自定义域名
4. 更新 Clerk 和 Stripe 的 allowed origins/webhook URLs

## 回滚

```bash
# 查看部署历史
vercel list --cwd "d:\工作\AI建站\ai-headshot"

# 回滚到上一个版本
vercel rollback --cwd "d:\工作\AI建站\ai-headshot"
```
