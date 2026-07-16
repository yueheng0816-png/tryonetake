# OneTake Prompt 模板审核表

> 共计 **103** 个模板：`active` 个生产中 · `experimental` 个实验性 · `deprecated` 0 个已废弃
>
> **图例**: 🟢 active · 🟡 experimental · 🔴 deprecated
>
> 带 `{outfit}` 占位符的模板在生成时会根据用户性别替换为对应的服装描述。

---

## TIER 1 — STUDIO CORE (纯色背景棚拍)

### 1.1 经典棚拍 (Classic Studio)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 1 | `studio-warm-smile` | 🟢 | Warm confident smile with direct eye contact, clean white studio background, soft diffused professional lighting, navy blazer over white shirt, shoulders-up portrait, approachable corporate professional | 温暖自信的微笑，直视镜头，干净白色影棚背景，柔和散射专业灯光，海军蓝西装外套配白衬衫，肩部以上，亲和力企业人士 | — | 无（内嵌） |
| 2 | `studio-serious-exec` | 🟢 | Serious composed executive expression, slight chin lift, charcoal grey suit with light blue shirt, dark grey studio backdrop, dramatic rim lighting, waist-up portrait, boardroom authority | 沉稳严肃的高管表情，微抬下巴，炭灰色西装搭配浅蓝衬衫，深灰影棚背景，戏剧性轮廓光，半身像，董事会权威气势 | — | 无（内嵌） |
| 3 | `studio-gentle-closed` | 🟢 | Gentle closed-lip smile, soft friendly eyes, cream textured studio backdrop, beige blazer with neutral top, soft wrap-around lighting, shoulders-up, warm trustworthy professional | 温柔抿嘴微笑，柔和友善眼神，奶油色纹理影棚背景，米色西装外套搭配中性色上衣，柔和环绕光，肩部以上，温暖值得信赖的专业形象 | — | 无（内嵌） |
| 4 | `studio-confident-arms` | 🟢 | Confident expression with slight smirk, arms crossed, navy suit with white open-collar shirt, white studio background, even three-point lighting, waist-up corporate portrait, modern professional | 自信表情带一丝得意的微笑，双臂交叉，海军蓝西装搭配白色开领衬衫，白色影棚背景，均匀三点布光，半身像，现代企业人像 | — | 无（内嵌） |
| 5 | `studio-minimal-black` | 🟢 | Calm centered expression, black fine-knit turtleneck, minimalist white studio background, soft single-source key light with subtle fill, shoulders-up, modern creative director, clean aesthetic | 平静专注的表情，黑色细针织高领衫，极简白色影棚背景，柔和单光源主光加微弱辅光，肩部以上，现代创意总监，干净美学 | — | 无（内嵌） |
| 6 | `studio-thoughtful-gaze` | 🟢 | Thoughtful gaze directed slightly off-camera, intellectual reflective mood, dark navy background with subtle gradient, burgundy blazer, single key light from 45 degrees, shoulders-up, academic consultant | 若有所思的目光微微偏离镜头，知性反思的情绪，深海军蓝渐变背景，酒红色西装外套，45度单主光，肩部以上，学术顾问风格 | — | 无（内嵌） |
| 7 | `studio-relaxed-seated` | 🟢 | Relaxed seated pose in modern office chair, angled slightly away then looking back at camera, approachable smile, light grey suit, white studio background, soft even lighting, waist-up, friendly executive | 放松坐在现代办公椅上，身体微侧转回看镜头，亲和微笑，浅灰西装，白色影棚背景，柔和均匀布光，半身像，友善高管 | — | 无（内嵌） |
| 8 | `studio-power-stance` | 🟢 | Standing confident pose, one hand in pocket, slight three-quarter turn toward camera, charcoal suit with crisp white shirt, dark studio backdrop with subtle hair light separation, full-length if possible, commanding presence | 自信站姿，一手插口袋，四分之三侧身面向镜头，炭灰色西装配挺括白衬衫，深色影棚背景带微弱发丝光分离，尽可能全身像，掌控全场的气势 | — | 无（内嵌） |
| 9 | `studio-headshot-classic` | 🟢 | Classic professional headshot, straight-on symmetrical framing, confident neutral expression, dark suit jacket with white collar showing, medium grey seamless background, traditional two-light setup, shoulders-up, LinkedIn perfect | 经典职业头像照，正面居中对称构图，自信中性表情，深色西装外套露出白色衣领，中灰色无缝背景，传统双灯布光，肩部以上，LinkedIn标准完美 | — | 无（内嵌） |
| 10 | `studio-creative-color` | 🟢 | Slight playful smile, forest green blazer over black top, vibrant teal studio backdrop, clamshell lighting setup, shoulders-up, creative industry professional, distinctive personal brand | 略带俏皮的微笑，森林绿西装外套配黑色内搭，鲜艳蓝绿色影棚背景，蚌壳式布光，肩部以上，创意行业人士，鲜明个人品牌 | — | 无（内嵌） |

### 1.2 白色背景 (White Background)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 11 | `studio-white-formal-smile` | 🟢 | {outfit}, clean pure white seamless studio background, warm confident closed-lip smile, butterfly lighting with soft fill, shoulders-up tight crop, LinkedIn gold standard corporate headshot, eyes sharp and engaged | {outfit}，纯净白色无缝影棚背景，温暖自信抿嘴微笑，蝴蝶光加柔和辅光，肩部以上紧凑裁剪，LinkedIn黄金标准企业头像，眼神锐利专注 | — | ✅ 男/女各一套 |
| 12 | `studio-white-formal-neutral` | 🟢 | {outfit}, pure white seamless studio background, composed neutral professional expression with slight jaw tension for authority, classic two-light setup with even illumination, shoulders-up traditional crop, conservative corporate portrait | {outfit}，纯白无缝影棚背景，沉稳中性职业表情，下颌微收紧体现权威感，经典双灯均匀照明，肩部以上传统裁剪，保守企业人像 | — | ✅ 男/女各一套 |
| 13 | `studio-white-biz-casual` | 🟢 | {outfit}, bright white studio background with subtle vignette, relaxed approachable smile, soft diffused wrap-around lighting, shoulders-up, modern business casual corporate portrait, tech-friendly vibe | {outfit}，明亮白色影棚背景带微弱暗角，放松亲和微笑，柔和散射环绕光，肩部以上，现代商务休闲企业人像，科技友好风格 | — | ✅ 男/女各一套 |
| 14 | `studio-white-exec-power` | 🟢 | {outfit}, pure white studio background, confident powerful expression with slight smirk, dramatic clamshell lighting with subtle hair light separation, shoulders-up, executive presence, boardroom-ready authority portrait | {outfit}，纯白影棚背景，自信强势表情带一丝笑意，戏剧性蚌壳光加微弱发丝分离光，肩部以上，高管气场，随时可进董事会的权威形象 | — | ✅ 男/女各一套 |
| 15 | `studio-white-warm-approachable` | 🟢 | {outfit}, clean white studio backdrop, warm genuine smile showing approachability, ultra-soft butterfly lighting with heavy diffusion, shoulders-up, friendly yet professional, connects with viewer, ideal for client-facing roles | {outfit}，干净白色影棚背景，温暖真诚微笑展现亲和力，超柔蝴蝶光加强力散射，肩部以上，友善不失专业，与观众产生连接，理想客户面向角色 | — | ✅ 男/女各一套 |
| 16 | `studio-white-modern-minimal` | 🟢 | {outfit}, pure white seamless background, modern minimalist aesthetic, slight three-quarter turn with eyes directly at camera, single large softbox key light with subtle fill, shoulders-up, contemporary professional, clean and fresh | {outfit}，纯白无缝背景，现代极简美学，轻微四分之三侧身但眼睛直视镜头，单大柔光箱主光加微弱辅光，肩部以上，当代专业人士，干净清新 | — | ✅ 男/女各一套 |

### 1.3 深色/灰色背景 (Dark/Gray Background)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 17 | `studio-dark-power` | 🟢 | {outfit}, deep charcoal seamless studio background, intense confident expression, dramatic single key light from 45 degrees with strong contrast, subtle rim light for hair separation, shoulders-up, modern power portrait, cinematic feel | {outfit}，深炭灰色无缝影棚背景，强烈自信表情，45度单主光戏剧性强对比，微弱轮廓光分离发丝，肩部以上，现代力量肖像，电影质感 | — | ✅ 男/女各一套 |
| 18 | `studio-gray-modern` | 🟢 | {outfit}, medium grey seamless studio background, relaxed confident expression, balanced three-point lighting with soft diffusion, shoulders-up, modern versatile corporate portrait, works for any industry | {outfit}，中灰色无缝影棚背景，放松自信表情，均衡三点布光加柔和散射，肩部以上，现代通用企业人像，适合任何行业 | — | ✅ 男/女各一套 |
| 19 | `studio-navy-exec` | 🟢 | {outfit}, rich navy blue seamless studio background, executive calm confidence, soft key light with gentle fill, slight shadow on one side for depth, shoulders-up, distinguished leadership portrait, C-suite quality | {outfit}，浓郁海军蓝无缝影棚背景，高管沉稳自信，柔和主光加轻微辅光，一侧微影增加深度，肩部以上，杰出领导力肖像，C-suite品质 | — | ✅ 男/女各一套 |
| 20 | `studio-charcoal-soft` | 🟢 | {outfit}, charcoal grey textured studio backdrop, warm approachable half-smile, large softbox key light with heavy diffusion for flattering soft shadows, shoulders-up, executive with human touch, trustworthy authority | {outfit}，炭灰色纹理影棚背景，温暖亲和半微笑，大柔光箱主光加强力散射营造柔和迷人阴影，肩部以上，有人情味的高管，可信任的权威 | — | ✅ 男/女各一套 |

### 1.4 棚拍办公场景 (Desk/Chair/Standing in Studio)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 21 | `studio-desk-seated` | 🟢 | {outfit}, seated at a sleek modern minimalist desk, slight forward lean with hands resting naturally, warm engaging expression as if in conversation, soft window-light simulation from side, waist-up, modern executive at work | {outfit}，坐在时尚现代极简书桌前，身体微前倾双手自然放置，温暖投入的表情如在交谈中，侧方模拟窗光，半身像，工作中的现代高管 | — | ✅ 男/女各一套 |
| 22 | `studio-window-light` | 🟢 | {outfit}, posed near a large simulated window light in studio, soft directional light creating natural depth on face, relaxed genuine expression, neutral studio wall background softly falling into shadow, waist-up, modern professional with natural elegance | {outfit}，在棚内大型模拟窗光旁拍摄，柔和定向光营造面部自然层次感，放松真实表情，中性影棚墙壁背景渐入阴影，半身像，现代专业人士自然优雅 | — | ✅ 男/女各一套 |
| 23 | `studio-modern-chair` | 🟢 | {outfit}, seated in a contemporary designer armchair, relaxed but professional posture with one arm resting on chair side, knowing slight smile, studio backdrop with subtle gradient, soft even lighting, waist-up, creative executive portrait | {outfit}，坐在当代设计师扶手椅上，放松但专业的姿态一臂搭在椅侧，会心的微笑，影棚背景带微弱渐变，柔和均匀布光，半身像，创意高管肖像 | — | ✅ 男/女各一套 |
| 24 | `studio-standing-lean` | 🟢 | {outfit}, standing and leaning slightly against a modern high table or standing desk, confident engaged expression, arms relaxed at sides or one hand resting, clean studio background, three-point lighting, three-quarter length, dynamic professional presence | {outfit}，站立微靠现代高桌或站立式办公桌，自信专注表情，双臂放松下垂或一手搭放，干净影棚背景，三点布光，四分之三身长，充满活力的专业气场 | — | ✅ 男/女各一套 |

### 1.5 其他棚拍风格

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 25 | `tech-podcast-guest` | 🟢 | Expression mid-conversation as if answering an interesting question, professional podcast setup with microphone and acoustic panels blurred behind, dark polo or casual blazer, warm video light, authentic media professional | 对话中回答有趣问题的表情，专业播客设备含麦克风和声学板虚化背景，深色Polo衫或休闲西装外套，温暖视频灯光，真实媒体专业人士 | — | 无（内嵌） |
| 26 | `creative-color-pop` | 🟢 | Bold colorful portrait, vibrant solid-color backdrop matching outfit accent, joyful genuine expression, creative industry professional, clamshell lighting with color gel rim light, shoulders-up, energetic personal brand | 大胆多彩人像，鲜艳纯色背景与服装配色呼应，开心真诚表情，创意行业人士，蚌壳布光搭配彩色滤片轮廓光，肩部以上，充满活力的个人品牌 | — | 无（内嵌） |
| 27 | `creative-studio-action` | 🟢 | In a creative studio or workshop, surrounded by tools of the trade blurred (camera gear, design materials, art supplies), mid-action engaged expression, authentic work attire, practical lighting, waist-up, maker creative professional | 在创意工作室或工坊中，周围虚化的专业工具（摄影器材、设计材料、美术用品），工作状态中专注表情，真实工作着装，实用灯光，半身像，创造者型创意人士 | — | 无（内嵌） |
| 28 | `studio-bright-laugh` | 🟡 | Mid-laugh genuine candid expression, bright white studio with subtle vignette, light grey blazer over pastel shirt, beauty dish lighting, shoulders-up, joyful approachable leader | 大笑中真实抓拍表情，明亮白色影棚带微弱暗角，浅灰西装外套配柔和色调衬衫，雷达罩布光，肩部以上，快乐亲和的领导者 | — | 无（内嵌） |
| 29 | `exec-modern-monochrome` | 🟡 | High-contrast black and white style portrait, intense thoughtful expression, black turtleneck, dark seamless background with dramatic single light source creating strong shadows, artistic executive portrait, timeless | 高对比黑白风格人像，强烈沉思表情，黑色高领衫，深色无缝背景搭配戏剧性单一光源营造强烈阴影，艺术性高管肖像，永恒经典 | — | 无（内嵌） |
| 30 | `creative-moody-shadow` | 🟡 | Dramatic chiaroscuro lighting, half face in shadow half illuminated, intense artistic expression, dark creative attire, black seamless background, fine-art portrait, bold creative director | 戏剧性明暗对照布光，半张脸在阴影中半张被照亮，强烈艺术感表情，深色创意着装，黑色无缝背景，纯艺术人像，大胆创意总监 | — | 无（内嵌） |
| 31 | `studio-soft-feminine` | 🟢 | Warm inviting smile, soft glamour lighting with butterfly pattern, cream blazer over silk blouse, pale pink studio backdrop, shoulders-up, approachable yet polished, modern professional feminine aesthetic | 温暖迷人的微笑，柔美蝴蝶光布光，奶油色西装外套配丝绸衬衫，浅粉色影棚背景，肩部以上，亲和但不失精致，现代专业女性美学 | 🔴 仅女性 | 无（内嵌） |

> **注**：`studio-soft-feminine` 已标注 `gender: "female"`，男性用户不会被分配此模板。

---

## TIER 2 — 专业场景 (Professional Environment)

### 2.1 办公室 / 科技公司 (Office / Tech)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 32 | `tech-open-office` | 🟢 | Confident subtle smirk, blurred modern open-plan office with glass walls and natural window light behind, smart casual white button-down with rolled sleeves, waist-up, startup founder, authentic tech vibe | 自信微妙得意的笑，虚化的现代开放式办公室含玻璃墙和自然窗光，白色卷袖商务休闲衬衫，半身像，创业创始人，真实科技氛围 | — | 无（内嵌） |
| 33 | `tech-standing-desk` | 🟢 | Standing at a height-adjustable desk, leaning slightly forward with hands resting on the desk edge, engaged listener expression, dark fitted polo shirt, bright modern office background with plants, relaxed tech professional | 站在可升降办公桌前，身体微前倾双手搭在桌沿，专注倾听表情，深色合身Polo衫，明亮现代办公室背景有绿植，放松的科技从业者 | — | 无（内嵌） |
| 34 | `tech-lounge-seated` | 🟢 | Seated on a modern minimalist lounge chair in a tech office lounge area, relaxed crossed-leg pose, thoughtful expression, grey merino wool sweater, natural light from large windows, lifestyle corporate portrait | 坐在科技公司休息区的现代极简休闲椅上，放松翘腿姿势，沉思表情，灰色美利奴羊毛衫，大窗自然光，生活方式企业人像 | — | 无（内嵌） |
| 35 | `tech-conference-room` | 🟢 | Standing in front of a whiteboard with faint strategy diagrams blurred, explaining gesture with hands, confident knowledgeable expression, business casual blazer no tie, modern conference room, thought-leader portrait | 站在白板前，上面有模糊的策略图表，用手势解说的姿态，自信博学表情，商务休闲西装外套不系领带，现代会议室，思想领袖肖像 | — | 无（内嵌） |
| 36 | `tech-monitor-glow` | 🟢 | Working late aesthetic, face softly lit by monitor glow with practical desk lamp fill, focused expression transitioning to a slight smile, dark modern office, dark crew neck sweater, intimate authentic tech portrait | 深夜工作美学，面部被显示器光芒柔和照亮加台灯补光，专注表情过渡到微笑，深色现代办公室，深色圆领毛衣，私密真实科技人像 | — | 无（内嵌） |
| 37 | `tech-coworking` | 🟢 | Warm collaborative expression, blurred vibrant coworking space with colorful furniture and people, light denim shirt open over white tee, shoulders-up, community-oriented professional, modern work culture | 温暖合作表情，虚化活力共享办公空间含彩色家具和人群，浅色牛仔衬衫敞开内搭白T恤，肩部以上，社区导向专业人士，现代工作文化 | — | 无（内嵌） |

### 2.2 高管办公室 (Executive Office)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 38 | `exec-corner-office` | 🟢 | Standing in a premium corner office with floor-to-ceiling windows showing city skyline, arms relaxed at sides, authoritative calm expression, charcoal bespoke suit with subtle pinstripe, natural window backlight with subtle fill, full-length, C-suite presence | 站在高级角落办公室中，落地窗外城市天际线，双臂自然下垂，权威冷静表情，炭灰色定制西装带微弱细条纹，自然窗光逆光加微弱补光，全身像，C-suite气场 | — | 无（内嵌） |
| 39 | `exec-boardroom-head` | 🟢 | Seated at the head of a polished boardroom table, leaning slightly forward with hands clasped on the table, intense focused gaze directly at camera, dark navy suit with power tie, dramatic overhead lighting, commanding leadership | 坐在明亮会议室桌首，身体微前倾双手交握桌上，强烈专注凝视镜头，深海军蓝西装搭配权力领带，戏剧性顶光，掌控全局的领导力 | — | 无（内嵌） |
| 40 | `exec-over-the-shoulder` | 🟢 | Over-the-shoulder glance looking back at camera, dramatic confident expression, high-rise office window with twilight cityscape behind, perfectly tailored black suit, cinematic lighting with strong rim light, editorial executive portrait | 回眸看向镜头，戏剧性自信表情，高层办公室窗外黄昏城市景观，完美剪裁黑色西装，电影级布光搭配强劲轮廓光，杂志级高管肖像 | — | 无（内嵌） |
| 41 | `exec-leaning-standing` | 🟢 | Leaning against a sleek executive desk, arms loosely crossed, slight knowing smile, bespoke grey suit with subtle pattern, warm ambient office lighting with desk lamp glow, modern penthouse office, confident authority | 靠在时尚高管办公桌旁，双臂松散交叉，会心微笑，定制灰色西装带微弱图案，温暖环境办公灯光加台灯暖光，现代顶层办公室，自信权威 | — | 无（内嵌） |
| 42 | `exec-window-silhouette` | 🟢 | Standing facing a floor-to-ceiling window with city view, silhouette with soft front fill revealing facial features, contemplative leadership expression, sharp suit silhouette, dramatic natural backlight, full-length, visionary CEO portrait | 面向落地窗站立俯瞰城市，剪影效果配合柔和正面补光展现面部特征，沉思型领导表情，利落西装轮廓，戏剧性自然逆光，全身像，远见CEO肖像 | — | 无（内嵌） |
| 43 | `exec-handshake` | 🟢 | Mid-handshake pose as if greeting someone off-camera, warm professional smile, classic navy suit, modern corporate lobby with marble and glass blurred behind, dynamic engaged moment, partnership-oriented leader | 握手动作中如在迎接镜头外某人，温暖职业微笑，经典海军蓝西装，现代企业大堂大理石与玻璃虚化背景，动态互动瞬间，重视合作的领导者 | — | 无（内嵌） |
| 44 | `exec-thoughtful-window` | 🟢 | Standing by a window looking out thoughtfully, then turning toward camera with a warm knowing smile, dark suit, soft natural daylight, waist-up, reflective leader, approachable yet authoritative | 站在窗前若有所思望向窗外，随即转向镜头露出温暖会心微笑，深色西装，柔和自然日光，半身像，反思型领导者，亲和又不失权威 | — | 无（内嵌） |
| 45 | `exec-walking-hallway` | 🟡 | Walking purposefully down a sleek modern corporate hallway, caught mid-stride looking confidently at camera, sharp tailored suit, motion blur in background, dynamic powerful presence, full-body, leader in motion | 目的明确地走在时尚现代企业走廊中，行进中被捕捉自信看向镜头，利落剪裁西装，背景动态模糊，充满活力的强大气场，全身像，行进中的领导者 | — | 无（内嵌） |

### 2.3 医疗场景 (Medical)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 46 | `medical-whitecoat-portrait` | 🟢 | {outfit}, clean modern clinic interior with soft blurred medical equipment in background, warm trustworthy smile, bright even medical-grade lighting, shoulders-up, compassionate healthcare professional portrait | {outfit}，干净现代诊所室内，柔和虚化医疗设备背景，温暖可信任微笑，明亮均匀医疗级灯光，肩部以上，富有同情心的医疗专业人士肖像 | — | ✅ 男/女各一套 |
| 47 | `medical-scrubs-modern` | 🟢 | {outfit}, modern bright medical office or consultation room with warm natural light, calm professional expression, clean modern healthcare environment, waist-up, approachable medical professional, contemporary clinic aesthetic | {outfit}，现代明亮医疗办公室或诊室含温暖自然光，冷静专业表情，干净现代医疗环境，半身像，亲和医疗专业人士，当代诊所美学 | — | ✅ 男/女各一套 |
| 48 | `medical-consultation-desk` | 🟢 | {outfit}, seated at a clean modern consultation desk, slight forward lean with hands gently clasped, warm engaged expression as if listening to a patient, bright clinic room with soft medical equipment blurred behind, even medical-grade lighting, waist-up, compassionate physician in conversation | {outfit}，坐在干净现代诊桌前，微前倾双手轻握，温暖专注表情如在倾听患者，明亮诊室柔化医疗设备虚化背景，均匀医疗级灯光，半身像，对话中的仁心医生 | — | ✅ 男/女各一套 |
| 49 | `medical-hospital-corridor` | 🟢 | {outfit}, standing confidently in a bright modern hospital corridor with soft natural light from large windows, calm reassuring expression, clean hospital environment subtly blurred, waist-up, medical professional on rounds, capable and trustworthy | {outfit}，自信站在明亮现代医院走廊中，大窗柔和自然光，冷静令人安心的表情，清洁医院环境轻微虚化，半身像，巡房中的医疗专业人士，能力出众值得信赖 | — | ✅ 男/女各一套 |
| 50 | `medical-clinic-standing` | 🟢 | {outfit}, standing in a pristine modern medical clinic with sleek design elements softly blurred, arms relaxed at sides, warm professional smile, bright even lighting from large overhead panels, full-length, approachable healthcare leader, contemporary medicine aesthetic | {outfit}，站在一尘不染的现代医疗诊所中，时尚设计元素柔和虚化，双臂放松下垂，温暖专业微笑，大面积顶灯明亮均匀照明，全身像，亲和的医疗领导者，当代医学美学 | — | ✅ 男/女各一套 |
| 51 | `medical-confident-arms` | 🟢 | {outfit}, arms crossed with a confident reassuring expression, standing in front of a softly blurred medical credentials wall or clinic interior, slight knowing smile, professional medical lighting, waist-up, experienced physician, trusted authority | {outfit}，双臂交叉，自信令人放心的表情，站在柔和虚化的医疗资质墙或诊所内部前，会心微笑，专业医疗灯光，半身像，经验丰富的医生，可信任的权威 | — | ✅ 男/女各一套 |
| 52 | `medical-window-light` | 🟢 | {outfit}, standing near a large window in a modern medical office, soft natural daylight creating gentle shadows, warm approachable smile, clean contemporary interior with a small plant on the windowsill, waist-up, modern healthcare professional, human connection | {outfit}，站在现代医疗办公室大窗旁，柔和自然日光营造温和阴影，温暖亲和微笑，干净当代室内窗台有小盆栽，半身像，现代医疗专业人士，人文关怀 | — | ✅ 男/女各一套 |
| 53 | `medical-team-leader` | 🟢 | {outfit}, confident leadership stance with one hand resting on a modern medical workstation, direct engaged gaze, blurred team or clinical environment behind suggesting collaborative care, medical professional as department leader, waist-up, healthcare executive presence | {outfit}，自信领导姿态，一手搭在现代医疗工作站上，直接专注的凝视，背后虚化的团队或临床环境暗示协作护理，作为科室领导的医疗专业人士，半身像，医疗高管气场 | — | ✅ 男/女各一套 |
| 54 | `medical-whitecoat-female` | 🟢 | Female medical professional, white doctor's coat over elegant professional blouse, warm compassionate smile, bright clean clinic or hospital corridor softly blurred behind, soft even lighting, shoulders-up, trustworthy female physician portrait | 女性医疗专业人士，白大褂内搭优雅职业衬衫，温暖富有同情心的微笑，明亮干净诊所或医院走廊柔和虚化背景，柔和均匀布光，肩部以上，值得信赖的女医师肖像 | 🔴 仅女性 | 无（内嵌） |

> **注**：`medical-whitecoat-female` 已标注 `gender: "female"`，男性用户不会被分配此模板。

### 2.4 法律场景 (Legal)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 55 | `legal-library-portrait` | 🟢 | {outfit}, standing in a distinguished wood-paneled law library, floor-to-ceiling leather-bound books blurred behind, authoritative composed expression, warm tungsten lighting from brass desk lamp, waist-up, traditional legal professional portrait | {outfit}，站在尊贵的木质镶板法律图书馆中，落地真皮精装书籍柔和虚化，权威沉稳表情，黄铜台灯温暖钨丝灯光，半身像，传统法律专业人士肖像 | — | ✅ 男/女各一套 |
| 56 | `legal-office-classic` | 🟢 | {outfit}, seated in a classic leather wingback chair in a traditional law office, confident steady gaze, brass and mahogany details blurred behind, warm ambient lighting with desk lamp glow, waist-up, established attorney portrait | {outfit}，坐在传统律师事务所经典真皮翼背椅中，自信沉稳凝视，黄铜与红木细节虚化背景，温暖环境灯光加台灯光晕，半身像，资深律师肖像 | — | ✅ 男/女各一套 |
| 57 | `legal-modern-office` | 🟢 | {outfit}, standing in a sleek contemporary law office with glass walls and steel accents, confident forward-looking expression, modern legal practice environment blurred behind, natural light mixed with warm interior lighting, waist-up, forward-thinking attorney, modern legal professional | {outfit}，站在时尚当代律师事务所中，玻璃墙与钢结构点缀，自信前瞻表情，现代法律执业环境虚化背景，自然光混合温暖室内灯光，半身像，前瞻性律师，现代法律专业人士 | — | ✅ 男/女各一套 |
| 58 | `legal-courtroom-subtle` | 🟢 | {outfit}, standing confidently with courtroom wood paneling and the bar subtly blurred in deep background, composed serious-but-approachable expression, traditional courtroom lighting with warm tones, waist-up, trial attorney presence, gravitas with humanity | {outfit}，自信站立，法庭木质镶板和律师席在深景中微妙虚化，沉稳严肃但不失亲和的表情，传统法庭暖色调灯光，半身像，庭审律师气场，威严中有人情味 | — | ✅ 男/女各一套 |
| 59 | `legal-standing-portrait` | 🟢 | {outfit}, standing in an elegant law firm lobby with marble floors and classic architectural details softly blurred, one hand relaxed at side, confident composed expression, natural light from tall windows, full-length, distinguished law firm partner, established presence | {outfit}，站在优雅律师事务所大堂中，大理石地面和经典建筑细节柔和虚化，一手放松垂于身侧，自信沉稳表情，高窗自然光，全身像，杰出律所合伙人，稳重气场 | — | ✅ 男/女各一套 |
| 60 | `legal-desk-document` | 🟢 | {outfit}, seated at a distinguished mahogany desk with legal documents softly out of focus, looking up with a thoughtful knowledgeable expression, brass desk lamp providing warm directional light, waist-up, scholarly attorney, depth of expertise | {outfit}，坐在尊贵红木书桌前，法律文件柔焦虚化，抬头露出深思博学的表情，黄铜台灯提供温暖定向光，半身像，学者型律师，深厚专业功底 | — | ✅ 男/女各一套 |
| 61 | `legal-window-natural` | 🟢 | {outfit}, standing by a tall window in a tasteful law office, soft natural daylight creating a warm approachable atmosphere, genuine slight smile, classic interior with law books visible, waist-up, trusted legal advisor, the lawyer you can talk to | {outfit}，站在高雅律师事务所高窗旁，柔和自然日光营造温暖亲和氛围，真诚微笑，经典室内可见法律书籍，半身像，可信任的法律顾问，让人愿意倾诉的律师 | — | ✅ 男/女各一套 |
| 62 | `legal-crossed-arms` | 🟢 | {outfit}, arms crossed with quiet confidence, standing in front of floor-to-ceiling law bookshelves softly blurred, direct steady gaze, warm ambient lighting from classic brass fixtures, waist-up, commanding legal presence, won't back down | {outfit}，双臂交叉带着沉稳自信，站在落地法律书架虚化背景前，直接稳定凝视，经典黄铜灯具温暖环境光，半身像，具有威慑力的法律气场，绝不退让 | — | ✅ 男/女各一套 |

### 2.5 学术场景 (Academic)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 63 | `exec-library` | 🟢 | Standing in a wood-paneled library or study, one hand resting on a leather chair, dignified composed expression, navy blazer with elbow patches or classic suit, warm tungsten lighting from desk lamp and fireplace glow, distinguished academic leader | 站在木质镶板图书馆或书房中，一手搭在真皮椅上，尊贵沉稳表情，海军蓝肘部补丁西装外套或经典西装，台灯和壁炉暖光，杰出学术领袖 | — | 无（内嵌） |
| 64 | `academic-campus-outdoor` | 🟢 | {outfit}, standing on a historic university campus with ivy-covered brick buildings softly blurred behind, warm intellectual smile, soft morning or golden hour light, waist-up, professor or academic leader, collegial warmth | {outfit}，站在历史悠久的大学校园中，常春藤覆盖的砖楼柔和虚化背景，温暖知性微笑，柔和晨光或黄金时刻光线，半身像，教授或学术领导者，学院式温暖 | — | ✅ 男/女各一套 |
| 65 | `academic-library-scholarly` | 🟢 | {outfit}, standing between tall bookshelves in a grand university library, warm scholarly smile, soft natural light from tall windows mixed with warm interior lighting, waist-up, academic professional, intellectual gravitas | {outfit}，站在宏伟大学图书馆高耸书架之间，温暖学术微笑，高窗柔和自然光混合温暖室内灯光，半身像，学术专业人士，知识分子的厚重感 | — | ✅ 男/女各一套 |
| 66 | `academic-lecture-hall` | 🟢 | {outfit}, standing at a modern lecture podium with tiered seating softly blurred behind, engaging mid-lecture expression as if explaining an important point, one hand gesturing naturally, bright even academic lighting, waist-up, dynamic professor, inspiring educator presence | {outfit}，站在现代讲台前，阶梯教室柔和虚化背景，讲课中引人入胜的表情如在解释重要观点，一手自然做手势，明亮均匀学术灯光，半身像，充满活力的教授，鼓舞人心的教育者气场 | — | ✅ 男/女各一套 |
| 67 | `academic-office-books` | 🟢 | {outfit}, seated in a cozy professor's office surrounded by overflowing bookshelves and academic papers, warm knowing smile, desk lamp and window light creating intimate scholarly atmosphere, waist-up, tenured professor in their element, intellectual home | {outfit}，坐在舒适的教授办公室里，周围是满满当当的书架和学术论文，温暖会心微笑，台灯和窗光营造亲密学术氛围，半身像，终身教授在自己天地中，知识分子的家 | — | ✅ 男/女各一套 |
| 68 | `academic-quad-seated` | 🟢 | {outfit}, seated on a classic wooden bench in a leafy university quad, historic campus buildings softly blurred behind, relaxed intellectual smile, golden afternoon light filtering through mature trees, waist-up, collegial professor, timeless academic setting | {outfit}，坐在绿树成荫大学四方院的经典木长椅上，历史悠久的校园建筑柔和虚化背景，放松知性微笑，金色午后阳光透过大树洒落，半身像，学院派教授，永恒学术场景 | — | ✅ 男/女各一套 |
| 69 | `academic-modern-classroom` | 🟢 | {outfit}, standing in a bright modern classroom with digital whiteboard and collaborative furniture softly blurred, approachable encouraging expression, natural daylight from large windows, waist-up, contemporary educator, student-centered teaching presence | {outfit}，站在明亮现代教室中，数字白板和协作式家具柔和虚化，亲和鼓励的表情，大窗自然日光，半身像，当代教育者，以学生为中心的教学气场 | — | ✅ 男/女各一套 |
| 70 | `outdoor-campus-walk` | 🟢 | Walking along a tree-lined university campus path, looking at camera with intellectual smile, tweed blazer or academic casual attire, soft morning light, full-body walking shot, professor or academic administrator | 走在林荫大学校园小径上，看向镜头露出知性微笑，粗花呢西装外套或学术休闲装，柔和晨光，全身行走照，教授或学术行政人员 | — | 无（内嵌） |

---

## TIER 3 — 生活方式 (Lifestyle)

### 3.1 户外自然 (Outdoor Nature)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 71 | `outdoor-park-bench` | 🟢 | Seated on a modern park bench, surrounded by soft green foliage bokeh, warm genuine smile, smart casual blazer with chinos, late afternoon golden sunlight filtering through trees, waist-up, approachable authentic professional | 坐在现代公园长椅上，周围柔绿树叶散景虚化，温暖真诚微笑，商务休闲西装外套配卡其裤，傍晚金色阳光透过树叶洒落，半身像，亲和真实的专业人士 | — | 无（内嵌） |
| 72 | `outdoor-city-steps` | 🟢 | Seated on modern urban architecture steps in a downtown plaza, confident relaxed posture, business casual attire, bright overcast sky providing perfect diffused light, waist-up, urban professional, city hall or corporate district vibe | 坐在市中心广场现代建筑台阶上，自信放松姿态，商务休闲着装，明亮多云天空提供完美散射光，半身像，都市专业人士，市政厅或企业区风格 | — | 无（内嵌） |
| 73 | `outdoor-mountain-view` | 🟢 | Standing on a viewpoint overlooking mountains or hills, fresh air wind slightly moving hair, confident serene expression, outdoor smart jacket, dramatic natural landscape bokeh behind, crisp clear daylight, adventurous leader | 站在山景或丘陵观景点，清风微拂头发，自信宁静表情，户外修身夹克，背后戏剧性自然风光散景，清澈明媚日光，有冒险精神的领导者 | — | 无（内嵌） |
| 74 | `outdoor-riverside` | 🟢 | Leaning on a riverside railing with water and city reflection behind, relaxed reflective expression, smart casual dark jacket, soft afternoon light, waist-up, thoughtful urban professional, serene moment | 靠在河边栏杆上，背后水面倒映城市，放松沉思表情，深色商务休闲夹克，柔和午后光线，半身像，沉思的都市专业人士，宁静时刻 | — | 无（内嵌） |
| 75 | `outdoor-autumn-leaves` | 🟢 | Standing among autumn foliage with warm orange and gold leaves blurred, cozy sophisticated sweater or light coat, genuine warm smile, crisp autumn afternoon light, waist-up, seasonal warmth, authentic professional | 站在秋叶中，温暖橘金色树叶虚化，舒适精致毛衣或轻薄外套，真诚温暖微笑，清爽秋日午后光线，半身像，季节温暖感，真实专业人士 | — | 无（内嵌） |
| 76 | `outdoor-courtyard` | 🟢 | Standing in a serene internal courtyard or atrium with modern architecture and plants, calm centered expression, sophisticated casual attire, soft overhead natural light filtered through structure, full-length, oasis professional | 站在宁静内院或中庭中，现代建筑与绿植环绕，平静专注表情，精致休闲着装，柔和顶光透过建筑结构洒下，全身像，都市绿洲专业人士 | — | 无（内嵌） |
| 77 | `outdoor-harbor` | 🟢 | Harbor or marina background with boats softly blurred, confident relaxed posture leaning on a wooden railing, nautical-inspired smart casual with navy blazer, bright sea-light, waist-up, maritime city professional | 海港或游艇码头背景，船只柔和虚化，自信放松靠在木栏杆上，海军蓝西装外套航海风商务休闲，明亮海面光线，半身像，海滨城市专业人士 | — | 无（内嵌） |
| 78 | `outdoor-beach-casual` | 🟡 | Beach setting at golden hour, relaxed genuine laughter, smart casual linen shirt, ocean horizon bokeh behind with warm sunset tones, shoulders-up, lifestyle entrepreneur, coastal professional, authentic joy | 黄昏黄金时刻海滩场景，放松真实大笑，商务休闲亚麻衬衫，海平线散景配温暖日落色调，肩部以上，生活方式创业者，海岸专业人士，真实快乐 | — | 无（内嵌） |
| 79 | `outdoor-market-stroll` | 🟡 | Walking through an upscale outdoor market or shopping district, caught mid-stride looking at camera with natural smile, stylish casual attire, afternoon natural light, lifestyle authentic, cosmopolitan professional | 穿行于高端户外市集或购物区，行进中被捕捉自然微笑看向镜头，时尚休闲着装，午后自然光，真实生活方式，国际都市专业人士 | — | 无（内嵌） |
| 80 | `outdoor-bridge-crossing` | 🟡 | Walking across a modern pedestrian bridge with city skyline behind, purposeful stride, confident expression, business attire with long coat, dynamic movement, full-body, metropolitan professional, forward momentum | 走过现代人行天桥，城市天际线背景，步履坚定，自信表情，商务着装搭配长外套，动态移动，全身像，大都市专业人士，向前进取 | — | 无（内嵌） |
| 81 | `outdoor-snow-crisp` | 🟡 | Crisp winter day with soft snow-covered background, warm sophisticated coat and scarf, breath visible in cold air, joyful resilient expression, bright overcast winter light creating soft even illumination, shoulders-up, northern professional | 清冷冬日，柔和雪景背景，温暖精致大衣和围巾，可见呵出的白气，欢快坚韧表情，明亮多云冬季光线营造柔和均匀照明，肩部以上，北方专业人士 | — | 无（内嵌） |

### 3.2 都市 / 科技生活 (Urban / Tech Lifestyle)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 82 | `tech-cafe-remote` | 🟢 | Warm genuine smile, blurred cozy coffee shop interior with warm pendant lights, casual oatmeal sweater, soft window light from side, shoulders-up, digital nomad remote worker, authentic lifestyle | 温暖真诚微笑，虚化的舒适咖啡店内景配温暖吊灯，休闲燕麦色毛衣，侧方柔和窗光，肩部以上，数字游民远程工作者，真实生活方式 | — | 无（内嵌） |
| 83 | `tech-brick-wall` | 🟢 | Creative confident expression, exposed brick wall with warm Edison bulb bokeh behind, black denim jacket over charcoal tee, three-quarter turn, creative tech district professional, urban authentic | 创意自信表情，裸露砖墙配温暖爱迪生灯泡散景背景，黑色牛仔夹克配炭灰色T恤，四分之三侧身，创意科技区专业人士，都市真实感 | — | 无（内嵌） |
| 84 | `tech-rooftop` | 🟢 | Relaxed happy expression, rooftop terrace with city skyline bokeh at golden hour, smart casual navy blazer over white tee, warm natural backlight with reflector fill, shoulders-up, modern entrepreneur | 放松开心表情，黄金时刻屋顶露台城市天际线散景，海军蓝商务休闲西装外套配白T恤，温暖自然逆光加反光板补光，肩部以上，现代创业者 | — | 无（内嵌） |
| 85 | `tech-balcony-overlook` | 🟢 | Leaning on a modern glass balcony railing overlooking a city, confident relaxed expression, smart casual navy blazer with pocket square, bright overcast natural light, waist-up, visionary professional | 靠在现代玻璃阳台栏杆上俯瞰城市，自信放松表情，海军蓝商务休闲西装外套配口袋巾，明亮多云自然光，半身像，有远见的专业人士 | — | 无（内嵌） |
| 86 | `tech-garden-walk` | 🟡 | Walking shot captured mid-stride on a modern corporate campus garden path, looking at camera with natural smile, smart casual outfit with light blazer, golden hour dappled light through trees, full-body, dynamic lifestyle | 现代企业园区花园小径上行走中被抓拍，自然微笑看向镜头，浅色西装外套商务休闲装，黄金时刻树影斑驳光线，全身像，动态生活方式 | — | 无（内嵌） |

### 3.3 创意 / 艺术 (Creative / Artistic)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 87 | `creative-gallery` | 🟢 | Standing in a contemporary art gallery with abstract paintings blurred on the wall behind, thoughtful appreciative expression, stylish creative professional attire with interesting texture or pattern, gallery track lighting, waist-up, cultural thought leader | 站在当代艺术画廊中，抽象画作虚化墙上，沉思欣赏的表情，有质感或图案的时尚创意职业装，画廊轨道灯光，半身像，文化思想领袖 | — | 无（内嵌） |
| 88 | `creative-golden-portrait` | 🟢 | Editorial golden hour portrait, warm backlight creating hair glow, slight turned pose looking back at camera with magnetic expression, neutral earth-tone outfit, outdoor with warm grass or urban texture bokeh, magazine cover quality | 杂志级黄金时刻人像，温暖逆光营造发丝光晕，微侧身回眸看向镜头，迷人表情，中性大地色着装，户外暖色草地或都市纹理散景，封面级品质 | — | 无（内嵌） |
| 89 | `creative-architectural` | 🟢 | Standing in a striking modern architectural space with geometric lines and natural light shafts, confident composed expression, architectural minimalist attire in neutral tones, waist-up or full-body, design professional, spatial awareness | 站在瞩目的现代建筑空间中，几何线条与自然光束交织，自信沉稳表情，中性色调建筑极简着装，半身或全身像，设计专业人士，空间感 | — | 无（内嵌） |
| 90 | `creative-morning-light` | 🟢 | Soft morning light streaming through a large window, seated on a windowsill with coffee cup, relaxed genuine morning-person smile, casual elegant loungewear or smart casual, lifestyle authentic, warm and inviting | 柔和晨光透过大窗洒入，坐在窗台上手捧咖啡杯，放松真实晨型人微笑，休闲优雅家居服或商务休闲，真实生活方式，温暖迷人 | — | 无（内嵌） |
| 91 | `creative-dappled-shade` | 🟢 | Outdoor under a tree canopy with dappled sunlight creating natural patterns on face, relaxed dreamy expression, light natural-fabric outfit, bokeh green background, waist-up, bohemian creative professional, nature-connected | 户外树冠下，斑驳阳光在脸上形成自然图案，放松梦幻表情，轻薄天然面料着装，绿色散景背景，半身像，波西米亚风创意人士，连接自然 | — | 无（内嵌） |
| 92 | `creative-rain-window` | 🟢 | Behind a rain-streaked window, contemplative moody expression, warm interior lighting contrasting with cool exterior, cozy knitwear visible, cinematic atmospheric portrait, introspective creative, emotional depth | 雨水划过玻璃窗后，沉思情绪化表情，温暖室内灯光与冷色室外形成对比，可见舒适针织衫，电影氛围人像，内省型创意人，情感深度 | — | 无（内嵌） |
| 93 | `creative-bookstore` | 🟢 | Browsing in a charming independent bookstore, looking up from a book with a warm surprised smile, cozy intellectual attire, warm ambient bookstore lighting with shelves blurred, cultured creative professional | 在迷人独立书店中翻阅书籍，从书中抬头露出温暖惊喜的微笑，舒适知性着装，温暖书店环境灯光配虚化书架，有文化修养的创意人士 | — | 无（内嵌） |
| 94 | `creative-vinyl-lounge` | 🟢 | In a stylish mid-century modern lounge with vinyl records or design books nearby, relaxed cultured expression, retro-modern smart casual attire, warm analog lighting, music creative or design professional, tasteful aesthetic | 在时尚中世纪现代风格休息室中，黑胶唱片或设计书籍近在咫尺，放松有品位的表情，复古现代商务休闲着装，温暖模拟灯光，音乐创意或设计专业人士，雅致美学 | — | 无（内嵌） |
| 95 | `creative-urban-night` | 🟡 | Nighttime urban portrait, standing under a modern street lamp, city lights and traffic trails bokeh behind, confident mysterious expression, dark stylish coat or leather jacket, cinematic neon-tinged lighting, waist-up, creative nocturnal professional | 夜晚都市人像，站在现代路灯下，城市灯光与车流光轨散景背景，自信神秘表情，深色时尚大衣或皮夹克，电影级霓虹色调灯光，半身像，夜行创意人士 | — | 无（内嵌） |
| 96 | `creative-mirror-reflection` | 🟡 | Reflection shot in a modern mirror or glass surface, creative composition, confident self-aware expression, stylish contemporary outfit, interesting interior space reflected, editorial artistic portrait, unique perspective | 现代镜面或玻璃表面反射拍摄，创意构图，自信自知表情，时尚当代着装，有趣室内空间反射，杂志艺术人像，独特视角 | — | 无（内嵌） |
| 97 | `creative-aerial-drone` | 🟡 | Looking up toward camera from a lower angle or drone perspective, confident smile, interesting urban rooftop or open plaza background with geometric patterns, dynamic perspective, modern creative professional, visually striking | 从低角度或无人机视角仰望镜头，自信微笑，有趣都市屋顶或开放广场几何图案背景，动态透视，现代创意专业人士，视觉冲击力强 | — | 无（内嵌） |

### 3.4 正式活动 / 演讲 (Event / Stage)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 98 | `outdoor-garden-party` | 🟢 | At an upscale garden party or networking event, holding a glass, mid-conversation engaged expression, elegant smart casual or cocktail attire, greenery and string lights bokeh, waist-up, social professional, warm evening light | 在高端花园派对或社交活动中，手持酒杯，对话中投入的表情，优雅商务休闲或鸡尾酒会着装，绿植和串灯散景，半身像，社交型专业人士，温暖傍晚光线 | — | 无（内嵌） |
| 99 | `exec-gala-portrait` | 🟢 | Black-tie formal event portrait, confident polished smile, tuxedo or formal evening attire, elegant event venue with subtle chandelier bokeh and warm ambient light, shoulders-up, award-ceremony professional, prestige | 黑领带正式活动肖像，自信精致微笑，燕尾服或正式晚装，优雅活动场地配水晶吊灯散景和温暖环境光，肩部以上，颁奖典礼级专业人士，尊贵感 | — | 无（内嵌） |
| 100 | `exec-speaker-stage` | 🟢 | On a TED-style conference stage, standing at a minimal podium or hands-free with a wireless mic, passionate knowledgeable expression mid-speech, business formal attire, dramatic stage lighting with audience bokeh, waist-up, thought leader | 在TED风格会议舞台上，站在极简讲台后或脱稿配无线麦克风，演讲中充满激情博学的表情，商务正装，戏剧性舞台灯光配观众散景，半身像，思想领袖 | — | 无（内嵌） |

### 3.5 其他生活方式 (Other Lifestyle)

| # | ID | 状态 | 英文 Prompt | 中文翻译 | 性别限定 | 服装变量 |
|---|-----|------|-------------|----------|----------|----------|
| 101 | `lifestyle-cafe-modern` | 🟢 | {outfit}, seated at a window table in a bright modern minimalist cafe, warm natural window light from side, relaxed genuine half-smile, artisanal coffee cup on table softly out of focus, lifestyle professional portrait, authentic remote-work era vibe | {outfit}，坐在明亮现代极简咖啡馆窗边桌位，侧方温暖自然窗光，放松真实半微笑，手工咖啡杯在桌上柔焦虚化，生活方式职业肖像，真实远程工作时代风格 | — | ✅ 男/女各一套 |
| 102 | `exec-private-jet` | 🟡 | Seated in a luxurious private aviation cabin, relaxed confident smile, smart casual elegant attire, warm interior lighting, window showing clouds, aspirational executive lifestyle portrait | 坐在豪华私人飞机舱内，放松自信微笑，商务休闲优雅着装，温暖舱内灯光，窗外云层，志向高远的高管生活方式肖像 | — | 无（内嵌） |

---

## 汇总统计

| 分类 (Category) | 总数 | 🟢 Active | 🟡 Experimental | 有服装变量 |
|------------------|------|-----------|-----------------|-------------|
| **studio_core** | 31 | 27 | 4 | 14 |
| **office** | 14 | 13 | 1 | 0 |
| **medical_env** | 9 | 9 | 0 | 8 |
| **legal_env** | 8 | 8 | 0 | 8 |
| **academic_env** | 8 | 8 | 0 | 6 |
| **lifestyle** | 33 | 23 | 10 | 1 |
| **合计** | **103** | **88** | **15** | **37** |

### 状态说明
- 🟢 **active (88个)**: 正常参与分配，用户会随机获得
- 🟡 **experimental (15个)**: 不参与分配，仅供测试或手动启用
  - 含 `risk:laugh` 标签的（大笑/张嘴）→ 3个
  - 含 `risk:movement` 标签的（动态行走/全身）→ 5个
  - 夜间/暗光场景 → 1个
  - 极端休闲（海滩大笑、市集行走）→ 2个
  - 其他实验性（镜面反射、无人机角度、私人飞机、暗调单色）→ 4个

### 性别过滤
- 仅男性可用：0 个
- 仅女性可用：2 个（`studio-soft-feminine`、`medical-whitecoat-female`）
- 中性/不限：其余全部

### 风险提示（人工审核关注点）
1. **11 个模板无服装变量且描述偏男性服装**（如 `studio-serious-exec`、`studio-confident-arms` 等写死 "suit/tie/blazer"），对女性用户可能不太合适
2. **15 个 experimental 模板**是否考虑提升部分到 active？尤其 `outdoor-beach-casual` 和 `creative-mirror-reflection` 比较独特
3. **白底模板 6 个**（`studio-white-*` 系列），占比 ~7%，之前讨论过保持现状
4. **深色背景模板 3 个被降级**（`exec-modern-monochrome`、`creative-moody-shadow`、`creative-urban-night`），如需恢复可用 `activateTemplate()` 函数
