# OneTake Prompt v3 — 职业精准匹配体系

> 2026-07-05 | 基于测试反馈 + 美国职业头shot行业标准

---

## 一、产品定位重申

```
OneTake = AI 实现的摄影棚级职业形象照

关键词：影棚质感、专业服装、经典场景、精准pose
不是：生活随拍、创意写真、户外探险照
```

**一句话**: 用户花 $19/$35，应该得到去 Peter Hurley 工作室花 $500 拍出来的那种照片。

---

## 二、用户画像与美国主流职业分类

### 数据基础

美国白领就业 ~7100 万人（BLS 2025），按头部规模排序：

| 职业大类 | 从业人数 | 占白领比例 | 头shot消费频次 |
|----------|---------|-----------|---------------|
| 管理层/企业主 | 2090万 | 29.3% | ★★★★★ 最高 |
| 商业/金融 | 1020万 | 14.3% | ★★★★ |
| 医疗健康 | 1040万 | 14.5% | ★★★ |
| 教育/学术 | 950万 | 13.3% | ★★★ |
| 科技/IT | 670万 | 9.4% | ★★★★ |
| 创意/设计/媒体 | 350万 | 4.9% | ★★★ |
| 法律 | 190万 | 2.6% | ★★★★ |
| 地产/销售 | ~500万（估计） | ~7% | ★★★★★ |

### OneTake 职业选项设计（10选1，必选）

| 选项 | 英文 label | 典型用户 | 头shot风格需求 |
|------|-----------|---------|---------------|
| **高级管理者/企业主** | Executive / Business Owner | CEO, VP, Director, Founder | 权力感、董事会、角窗办公室 |
| **金融/银行/会计** | Finance & Accounting | Banker, Investor, CPA, Actuary | 保守正式、深色西装、白/灰背景 |
| **律师/法律** | Legal / Law | Attorney, Judge, Paralegal | 权威、木饰书房、深色正装 |
| **科技/互联网** | Technology & Startup | Engineer, PM, Designer, Founder | 现代商务休闲、开放办公室 |
| **医疗/健康** | Medical & Healthcare | Doctor, Dentist, Nurse, Therapist | 白大褂、干净明亮、温暖可信 |
| **咨询/专业服务** | Consulting & Advisory | Management Consultant, Coach | 精致得体、西装不系领带 |
| **地产/销售** | Real Estate & Sales | Agent, Broker, Sales Manager | 温暖亲和、户外生活风 |
| **创意/设计/媒体** | Creative & Media | Designer, Photographer, Writer | 艺术感、个性、大胆色彩 |
| **学术/教育** | Academia & Education | Professor, Teacher, Researcher | 知性温暖、校园/图书馆 |
| **通用职业** | General Professional | 以上均不适用 | 干净专业、白/灰影棚、中性 |

### 新增必选项：性别

| 选项 | 作用 |
|------|------|
| **男性 Male** | 匹配 西装+领带、衬衫、polo 等男性化服装描述 |
| **女性 Female** | 匹配 blouse、丝巾、sheath dress、statement jewelry 等女性化描述 |

> 注：当前 64 个模板的服装描述基本是 unisex/偏男性。v3 需要每种场景同时提供男/女两版。

---

## 三、Prompt 分类体系重构（Tier 体系）

### 旧体系问题

```
v2: 5 个平权分类，各 12-14 个 → "撒网"
    STUDIO CLASSIC  12  ← 最主流但最少！
    MODERN TECH     12
    EXECUTIVE       13
    CREATIVE        14  ← 小众但量最多
    OUTDOOR NATURAL 13  ← 小众但量多
```

### 新体系：按场景正式度和适用面分层

```
Tier 1 — STUDIO CORE（影棚核心）        ~40 模板  ← 主力
Tier 2 — PROFESSIONAL ENVIRONMENT（职业场景）~15 模板  ← 按职业匹配
Tier 3 — LIFESTYLE（生活方式）           ~5 模板   ← 仅匹配职业
Tier 4 — EXPERIMENTAL（实验）            若干      ← 测试用，不入生产
```

### 职业 → 分类权重矩阵

| 职业 | Studio Core | Prof Env (Office) | Prof Env (Medical) | Prof Env (Legal) | Prof Env (Academic) | Lifestyle |
|------|:-----------:|:-----------------:|:------------------:|:----------------:|:-------------------:|:---------:|
| Executive | 50% | 35% | 0% | 0% | 5% | 10% |
| Finance | 60% | 25% | 0% | 5% | 0% | 10% |
| Legal | 40% | 15% | 0% | 35% | 0% | 10% |
| Tech | 40% | 40% | 0% | 0% | 0% | 20% |
| Medical | 45% | 10% | 35% | 0% | 5% | 5% |
| Consulting | 50% | 30% | 0% | 0% | 5% | 15% |
| Real Estate | 30% | 15% | 0% | 0% | 0% | 55% |
| Creative | 30% | 10% | 0% | 0% | 0% | 60% |
| Academia | 40% | 10% | 0% | 5% | 30% | 15% |
| General | 50% | 25% | 0% | 0% | 5% | 20% |

> Lifestyle 包含适度 outdoor + creative，不超过分配比例。权重决定了 30 个槽位中各分类占几个。

---

## 四、高风险 Prompt 退场清单

基于"输出效果取决于参考图表情/动作匹配度"的原则：

### 直接废弃/降级为 experimental

| 模板 ID | 原因 | 处理 |
|---------|------|------|
| `studio-bright-laugh` | 大笑表情 — 除非用户照片本身在笑，否则效果诡异 | → deprecated |
| `tech-garden-walk` | 大步走路 — 动态幅度大，动作匹配失败率高 | → experimental |
| `outdoor-bridge-crossing` | 大步走路 + 全身 | → experimental |
| `exec-walking-hallway` | 大步前行 + 动态模糊 | → experimental |
| `outdoor-market-stroll` | 行走中抓拍 | → experimental |
| `outdoor-beach-casual` | 大笑 + 极度休闲，与影棚定位冲突 | → deprecated |
| `creative-aerial-drone` | 角度怪异，风险高 | → experimental（已在） |
| `exec-private-jet` | 过于浮夸，不符合"职业照"定位 | → deprecated |

### 保留但降权（仅匹配特定职业时才分配）

| 模板 | 仅限职业 |
|------|---------|
| 所有 CREATIVE 14 个（除已废弃） | 仅 Creative & Media |
| 所有 OUTDOOR 13 个（除已废弃） | Real Estate、Creative、General（少量） |
| `tech-cafe-remote` | Tech、Creative |
| `tech-brick-wall` | Tech、Creative |
| `tech-rooftop` | Tech、Executive |

---

## 五、新模板补充计划

### Tier 1: STUDIO CORE（目标 ~40 个，需新增 ~16）

#### 1A. 白底经典（+8，最重要的补充）

```
新模板: studio-white-male-formal-1
→ 男性, 藏蓝西装+白衬衫+领带, 纯白背景, 自信沉稳微笑, 蝴蝶光, 
  齐肩, LinkedIn黄金标准

新模板: studio-white-male-formal-2
→ 男性, 炭灰西装+浅蓝衬衫+纹理领带, 纯白背景, 中性专业表情,
  三点布光, 齐肩

新模板: studio-white-male-biz-casual
→ 男性, 藏蓝西装外套+白衬衫开领(无领带), 纯白背景,
  轻松自信微笑, 柔光, 齐肩

新模板: studio-white-female-formal-1
→ 女性, 黑色西装外套+丝质衬衫, 纯白背景, 自信专业微笑,
  蝴蝶光, 齐肩

新模板: studio-white-female-formal-2
→ 女性, 藏蓝西装外套+柔和色调blouse, 纯白背景, 
  温暖亲和微笑, 柔光, 齐肩

新模板: studio-white-female-biz-casual
→ 女性, 奶油色西装外套+精致上衣, 纯白背景, 轻松自然微笑,
  柔光, 齐肩（适合科技/咨询行业女性）

新模板: studio-white-unisex-classic
→ 深色西装+白衬衫, 纯白无缝背景, 传统大头照裁切,
  经典双灯, 面部居中, 永恒LinkedIn风格

新模板: studio-white-unisex-warm
→ 商务正式着装, 纯白背景, 温暖真诚微笑, 柔光漫射,
  亲和力强的职场肖像
```

#### 1B. 灰/深色背景（+4）

```
新模板: studio-dark-male-power
→ 男性, 黑西装+黑衬衫(无领带), 深灰无缝背景, 
  强势自信表情, 单灯+轮廓光, 齐肩, 现代权力感

新模板: studio-dark-female-exec
→ 女性, 深色西装外套+statement项链, 炭灰背景, 
  自信微笑, 柔光+轻微轮廓光, 齐肩, 女性高管

新模板: studio-gray-unisex-modern
→ 中灰无缝背景, 商务正装, 现代简约, 均匀三点光, 
  齐肩, 科技/咨询通用

新模板: studio-navy-unisex-exec
→ 藏蓝背景, 灰西装+白衬衫, 现代高管风格, 
  柔光+发丝分离光, 齐肩
```

#### 1C. 影棚办公室风（+4）

```
新模板: studio-desk-male
→ 男性, 坐在现代简约办公桌前, 身体微前倾, 双手自然, 
  藏蓝西装, 柔光窗光效果, 半身, 企业高管

新模板: studio-desk-female
→ 女性, 现代办公桌, 专业着装, 温暖自信, 
  柔光, 半身, 亲和力高管

新模板: studio-window-light-unisex
→ 模拟大窗光效果(影棚内), 商务着装, 放松姿态, 
  柔光自然效果, 半身, 现代职场

新模板: studio-modern-chair-unisex
→ 现代设计椅, 放松但专业的坐姿, 商务休闲,
  影棚背景, 柔光, 半身
```

### Tier 2: PROFESSIONAL ENVIRONMENT（+7）

#### 2A. 医疗（+3）

```
新模板: medical-whitecoat-male
→ 男性, 白大褂+听诊器, 干净诊所背景虚化, 
  温暖可信赖微笑, 明亮均匀布光, 齐肩, 医生

新模板: medical-whitecoat-female
→ 女性, 白大褂+专业内搭, 明亮医疗环境虚化, 
  亲和微笑, 柔光, 齐肩, 女医生

新模板: medical-scrubs-unisex
→ 手术服/工作服, 现代医疗办公环境, 
  专业可靠表情, 干净布光, 半身
```

#### 2B. 法律（+2）

```
新模板: legal-library-male
→ 男性, 深色西装+白衬衫+领带, 木饰法律图书室, 
  书架虚化背景, 权威沉稳, 暖光, 半身

新模板: legal-library-female
→ 女性, 深色西装外套+blouse, 法律图书室, 
  自信专业, 柔光+暖光, 半身
```

#### 2C. 学术（+2）

```
新模板: academic-campus-male
→ 男性, 粗花呢西装外套或学术休闲, 校园红砖建筑虚化, 
  知性微笑, 柔和晨光, 半身

新模板: academic-library-unisex
→ 大学图书馆, 书架间, 知性温暖表情, 
  商务学术休闲着装, 暖光, 半身
```

### Tier 3: LIFESTYLE（保留精选 +1）

```
保留: outdoor-park-bench, outdoor-city-steps, outdoor-courtyard, 
      outdoor-riverside, outdoor-autumn-leaves

弃用其余 outdoor 模板（降级 experimental）

新增: lifestyle-modern-cafe-unisex
→ 现代简约咖啡厅, 商务休闲, 窗边自然光, 
  放松自信, 半身（仅匹配 Tech/Creative/RealEstate）
```

---

## 六、模板汰换汇总

| | v2 现状 | v3 目标 |
|------|---------|---------|
| Studio Core | 18（含 tech studio 类） | **~40** |
| Prof Environment | ~20（分散在各分类） | **~15**（按职业精准匹配） |
| Lifestyle | ~18 | **~5**（精选，仅匹配职业） |
| Experimental | 4 | ~15（含降级的） |
| Deprecated | 0 | 3-5 |
| **总活跃** | 58 | **~60** |
| **每次抽取** | 30 | 30（但按职业权重分配） |

---

## 七、实施计划

### Step 1: 数据层
- [ ] 新增类型: `Gender`, `Profession`
- [ ] 新增分类权重矩阵函数 `getCategoryWeights(profession)`
- [ ] 新增分配函数 `distributePromptsV3(photoCount, plan, gender, profession)`
- [ ] 保留旧函数兼容，逐步迁移

### Step 2: 模板层
- [ ] 废弃 3 个高风险模板
- [ ] 降级 8 个 lifestyle/creative 为 experimental
- [ ] 新增 ~21 个模板（Studio Core 16 + Prof Env 7 + Lifestyle 1）
- [ ] 所有新模板同时提供男/女版本，通过 `gender` 参数选择服装描述

### Step 3: 前端
- [ ] Upload 页面新增性别选择（Male/Female 切换按钮）
- [ ] Upload 页面新增职业选择（Dropdown，10 个选项）
- [ ] 两个字段均为必选，未选择时"Continue"按钮禁用
- [ ] Order 数据库新增 `gender` 和 `profession` 字段

### Step 4: API 适配
- [ ] `/api/checkout` 接受并存储 `gender` 和 `profession`
- [ ] 生成流程传递 `gender` 和 `profession` 到 prompt 匹配
- [ ] Prisma schema 新增字段

---

## 八、我的补充意见

同意你的方向，有以下补充：

1. **保留 15-20% 的"惊喜"配额**。即使 Finance 用户权重表写的是 10% Lifestyle，也应该保留给每个用户几张户外/场景照的机会——完全不出影棚会让产品显得"单调"。心理学上，用户看到"哦还有一张我在公园的"会增加满意感。

2. **Gender 字段不要叫"性别"**，叫 "Presentation" 或直接问 "How do you typically dress for work?" —— 更职业化，避免不必要的敏感。

3. **职业选项增加 "I'm not sure / General Professional"** 作为默认值。数据显示 ~20-30% 用户会选这个。

4. **Studio White 是护城河**。从行业调研看，90% 的 LinkedIn 头shot 是白底或浅灰底。我们的 prompt 里这个类别应该最大、质量最高。

5. **后续可迭代方向**（现在不做，以免复杂度爆炸）：
   - 上传照片后自动检测表情（微笑/不笑/大笑）→ 自动排除不匹配的 prompt
   - 检测服装正式度 → 自动调整分类权重
   - 用户历史偏好学习

---

## 九、需要你的确认

1. 职业分类 OK？10 个是否太多/太少？
2. 权重矩阵 OK？各职业的比例你觉得合理吗？
3. Gender 字段用 "Work style presentation" 这种表述可以吗？
4. 废弃/降级列表有没有你不同意的？
5. 确认后我开始写代码。
