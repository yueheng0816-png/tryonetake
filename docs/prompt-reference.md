# OneTake Prompt Template Reference v2

> 64 templates total | 58 active | 4 experimental | 0 deprecated  
> Generated: 2026-07-05

---

## Template Architecture

Each prompt is a **self-contained scene description**: expression + background + outfit + pose + lighting. The suffix is appended automatically:

```
[template prompt], [style injection], photorealistic, hyperrealistic, professional headshot photography, exact facial identity preservation, same person as reference image, natural skin texture, no plastic skin, no AI look, authentic human appearance, masterpiece, 8K detail, professional studio lighting, tack-sharp focus
```

**Style injections:**
| Style | Injection |
|-------|-----------|
| Natural | `natural skin texture, visible pores, minimal retouching, photorealistic, no beauty filter, keep original facial features` |
| Balanced | `subtle skin refinement, flattering studio lighting, natural-looking enhancement, professional retouch` |
| Polished | `beauty lighting, smooth skin subtle, polished professional look, soft glamour, magazine quality` |

---

## Category 1: STUDIO CLASSIC (12 templates)

Clean, timeless corporate portraits on seamless backdrops.

| # | ID | Prompt | Tags |
|---|----|--------|------|
| 1 | `studio-warm-smile` | Warm confident smile with direct eye contact, clean white studio background, soft diffused professional lighting, navy blazer over white shirt, shoulders-up portrait, approachable corporate professional | studio, corporate, smile, classic |
| 2 | `studio-serious-exec` | Serious composed executive expression, slight chin lift, charcoal grey suit with light blue shirt, dark grey studio backdrop, dramatic rim lighting, waist-up portrait, boardroom authority | studio, executive, serious, power |
| 3 | `studio-gentle-closed` | Gentle closed-lip smile, soft friendly eyes, cream textured studio backdrop, beige blazer with neutral top, soft wrap-around lighting, shoulders-up, warm trustworthy professional | studio, friendly, warm, approachable |
| 4 | `studio-confident-arms` | Confident expression with slight smirk, arms crossed, navy suit with white open-collar shirt, white studio background, even three-point lighting, waist-up corporate portrait, modern professional | studio, confident, crossed-arms, corporate |
| 5 | `studio-minimal-black` | Calm centered expression, black fine-knit turtleneck, minimalist white studio background, soft single-source key light with subtle fill, shoulders-up, modern creative director, clean aesthetic | studio, minimalist, creative, turtleneck |
| 6 | `studio-bright-laugh` | Mid-laugh genuine candid expression, bright white studio with subtle vignette, light grey blazer over pastel shirt, beauty dish lighting, shoulders-up, joyful approachable leader | studio, candid, joy, approachable |
| 7 | `studio-thoughtful-gaze` | Thoughtful gaze directed slightly off-camera, intellectual reflective mood, dark navy background with subtle gradient, burgundy blazer, single key light from 45 degrees, shoulders-up, academic consultant | studio, thoughtful, academic, intellectual |
| 8 | `studio-relaxed-seated` | Relaxed seated pose in modern office chair, angled slightly away then looking back at camera, approachable smile, light grey suit, white studio background, soft even lighting, waist-up, friendly executive | studio, seated, relaxed, executive |
| 9 | `studio-power-stance` | Standing confident pose, one hand in pocket, slight three-quarter turn toward camera, charcoal suit with crisp white shirt, dark studio backdrop with subtle hair light separation, full-length if possible, commanding presence | studio, standing, power, full-body |
| 10 | `studio-soft-feminine` | Warm inviting smile, soft glamour lighting with butterfly pattern, cream blazer over silk blouse, pale pink studio backdrop, shoulders-up, approachable yet polished, modern professional feminine aesthetic | studio, soft, polished, warm |
| 11 | `studio-headshot-classic` | Classic professional headshot, straight-on symmetrical framing, confident neutral expression, dark suit jacket with white collar showing, medium grey seamless background, traditional two-light setup, shoulders-up, LinkedIn perfect | studio, classic, linkedin, neutral |
| 12 | `studio-creative-color` | Slight playful smile, forest green blazer over black top, vibrant teal studio backdrop, clamshell lighting setup, shoulders-up, creative industry professional, distinctive personal brand | studio, creative, colorful, distinctive |

---

## Category 2: MODERN TECH (12 templates)

Startup culture, casual-smart attire, innovative environments.

| # | ID | Prompt | Tags |
|---|----|--------|------|
| 1 | `tech-open-office` | Confident subtle smirk, blurred modern open-plan office with glass walls and natural window light behind, smart casual white button-down with rolled sleeves, waist-up, startup founder, authentic tech vibe | office, tech, casual, startup |
| 2 | `tech-standing-desk` | Standing at a height-adjustable desk, leaning slightly forward with hands resting on the desk edge, engaged listener expression, dark fitted polo shirt, bright modern office background with plants, relaxed tech professional | office, tech, standing, engaged |
| 3 | `tech-cafe-remote` | Warm genuine smile, blurred cozy coffee shop interior with warm pendant lights, casual oatmeal sweater, soft window light from side, shoulders-up, digital nomad remote worker, authentic lifestyle | cafe, remote, casual, lifestyle |
| 4 | `tech-brick-wall` | Creative confident expression, exposed brick wall with warm Edison bulb bokeh behind, black denim jacket over charcoal tee, three-quarter turn, creative tech district professional, urban authentic | urban, creative, casual, edgy |
| 5 | `tech-rooftop` | Relaxed happy expression, rooftop terrace with city skyline bokeh at golden hour, smart casual navy blazer over white tee, warm natural backlight with reflector fill, shoulders-up, modern entrepreneur | outdoor, urban, golden-hour, entrepreneur |
| 6 | `tech-lounge-seated` | Seated on a modern minimalist lounge chair in a tech office lounge area, relaxed crossed-leg pose, thoughtful expression, grey merino wool sweater, natural light from large windows, lifestyle corporate portrait | office, lounge, seated, lifestyle |
| 7 | `tech-conference-room` | Standing in front of a whiteboard with faint strategy diagrams blurred, explaining gesture with hands, confident knowledgeable expression, business casual blazer no tie, modern conference room, thought-leader portrait | office, conference, standing, leader |
| 8 | `tech-garden-walk` | Walking shot captured mid-stride on a modern corporate campus garden path, looking at camera with natural smile, smart casual outfit with light blazer, golden hour dappled light through trees, full-body, dynamic lifestyle | outdoor, walking, dynamic, lifestyle |
| 9 | `tech-monitor-glow` | Working late aesthetic, face softly lit by monitor glow with practical desk lamp fill, focused expression transitioning to a slight smile, dark modern office, dark crew neck sweater, intimate authentic tech portrait | office, moody, authentic, tech |
| 10 | `tech-balcony-overlook` | Leaning on a modern glass balcony railing overlooking a city, confident relaxed expression, smart casual navy blazer with pocket square, bright overcast natural light, waist-up, visionary professional | outdoor, city, confident, visionary |
| 11 | `tech-coworking` | Warm collaborative expression, blurred vibrant coworking space with colorful furniture and people, light denim shirt open over white tee, shoulders-up, community-oriented professional, modern work culture | office, coworking, casual, community |
| 12 | `tech-podcast-guest` | Expression mid-conversation as if answering an interesting question, professional podcast setup with microphone and acoustic panels blurred behind, dark polo or casual blazer, warm video light, authentic media professional | studio, media, conversational, modern |

---

## Category 3: EXECUTIVE (13 templates)

Power, authority, leadership — premium settings, formal attire.

| # | ID | Prompt | Tags |
|---|----|--------|------|
| 1 | `exec-corner-office` | Standing in a premium corner office with floor-to-ceiling windows showing city skyline, arms relaxed at sides, authoritative calm expression, charcoal bespoke suit with subtle pinstripe, natural window backlight with subtle fill, full-length, C-suite presence | office, executive, standing, c-suite |
| 2 | `exec-boardroom-head` | Seated at the head of a polished boardroom table, leaning slightly forward with hands clasped on the table, intense focused gaze directly at camera, dark navy suit with power tie, dramatic overhead lighting, commanding leadership | office, boardroom, seated, intense |
| 3 | `exec-over-the-shoulder` | Over-the-shoulder glance looking back at camera, dramatic confident expression, high-rise office window with twilight cityscape behind, perfectly tailored black suit, cinematic lighting with strong rim light, editorial executive portrait | office, editorial, dramatic, executive |
| 4 | `exec-leaning-standing` | Leaning against a sleek executive desk, arms loosely crossed, slight knowing smile, bespoke grey suit with subtle pattern, warm ambient office lighting with desk lamp glow, modern penthouse office, confident authority | office, leaning, confident, luxury |
| 5 | `exec-library` | Standing in a wood-paneled library or study, one hand resting on a leather chair, dignified composed expression, navy blazer with elbow patches or classic suit, warm tungsten lighting from desk lamp and fireplace glow, distinguished academic leader | library, academic, standing, distinguished |
| 6 | `exec-window-silhouette` | Standing facing a floor-to-ceiling window with city view, silhouette with soft front fill revealing facial features, contemplative leadership expression, sharp suit silhouette, dramatic natural backlight, full-length, visionary CEO portrait | office, silhouette, dramatic, visionary |
| 7 | `exec-handshake` | Mid-handshake pose as if greeting someone off-camera, warm professional smile, classic navy suit, modern corporate lobby with marble and glass blurred behind, dynamic engaged moment, partnership-oriented leader | office, dynamic, engaged, handshake |
| 8 | `exec-thoughtful-window` | Standing by a window looking out thoughtfully, then turning toward camera with a warm knowing smile, dark suit, soft natural daylight, waist-up, reflective leader, approachable yet authoritative | office, thoughtful, natural-light, reflective |
| 9 | `exec-gala-portrait` | Black-tie formal event portrait, confident polished smile, tuxedo or formal evening attire, elegant event venue with subtle chandelier bokeh and warm ambient light, shoulders-up, award-ceremony professional, prestige | event, formal, prestige, elegant |
| 10 | `exec-speaker-stage` | On a TED-style conference stage, standing at a minimal podium or hands-free with a wireless mic, passionate knowledgeable expression mid-speech, business formal attire, dramatic stage lighting with audience bokeh, waist-up, thought leader | stage, speaker, dynamic, thought-leader |
| 11 | `exec-modern-monochrome` | High-contrast black and white style portrait, intense thoughtful expression, black turtleneck, dark seamless background with dramatic single light source creating strong shadows, artistic executive portrait, timeless | studio, dramatic, monochrome, artistic |
| 12 | `exec-walking-hallway` | Walking purposefully down a sleek modern corporate hallway, caught mid-stride looking confidently at camera, sharp tailored suit, motion blur in background, dynamic powerful presence, full-body, leader in motion | office, walking, dynamic, power |
| 13 | `exec-private-jet` ⚠️ | Seated in a luxurious private aviation cabin, relaxed confident smile, smart casual elegant attire, warm interior lighting, window showing clouds, aspirational executive lifestyle portrait | luxury, travel, aspirational, seated |

> ⚠️ = experimental — not in production rotation

---

## Category 4: CREATIVE (14 templates)

Artistic, editorial, unique — for creatives and bold personal brands.

| # | ID | Prompt | Tags |
|---|----|--------|------|
| 1 | `creative-gallery` | Standing in a contemporary art gallery with abstract paintings blurred on the wall behind, thoughtful appreciative expression, stylish creative professional attire with interesting texture or pattern, gallery track lighting, waist-up, cultural thought leader | gallery, artistic, standing, cultural |
| 2 | `creative-golden-portrait` | Editorial golden hour portrait, warm backlight creating hair glow, slight turned pose looking back at camera with magnetic expression, neutral earth-tone outfit, outdoor with warm grass or urban texture bokeh, magazine cover quality | outdoor, golden-hour, editorial, magazine |
| 3 | `creative-moody-shadow` | Dramatic chiaroscuro lighting, half face in shadow half illuminated, intense artistic expression, dark creative attire, black seamless background, fine-art portrait, bold creative director | studio, dramatic, fine-art, bold |
| 4 | `creative-urban-night` | Nighttime urban portrait, standing under a modern street lamp, city lights and traffic trails bokeh behind, confident mysterious expression, dark stylish coat or leather jacket, cinematic neon-tinged lighting, waist-up, creative nocturnal professional | urban, night, cinematic, edgy |
| 5 | `creative-color-pop` | Bold colorful portrait, vibrant solid-color backdrop matching outfit accent, joyful genuine expression, creative industry professional, clamshell lighting with color gel rim light, shoulders-up, energetic personal brand | studio, colorful, energetic, bold |
| 6 | `creative-architectural` | Standing in a striking modern architectural space with geometric lines and natural light shafts, confident composed expression, architectural minimalist attire in neutral tones, waist-up or full-body, design professional, spatial awareness | architecture, minimalist, design, spatial |
| 7 | `creative-morning-light` | Soft morning light streaming through a large window, seated on a windowsill with coffee cup, relaxed genuine morning-person smile, casual elegant loungewear or smart casual, lifestyle authentic, warm and inviting | indoor, morning, lifestyle, authentic |
| 8 | `creative-dappled-shade` | Outdoor under a tree canopy with dappled sunlight creating natural patterns on face, relaxed dreamy expression, light natural-fabric outfit, bokeh green background, waist-up, bohemian creative professional, nature-connected | outdoor, nature, dreamy, bohemian |
| 9 | `creative-studio-action` | In a creative studio or workshop, surrounded by tools of the trade blurred (camera gear, design materials, art supplies), mid-action engaged expression, authentic work attire, practical lighting, waist-up, maker creative professional | studio, workshop, action, maker |
| 10 | `creative-rain-window` | Behind a rain-streaked window, contemplative moody expression, warm interior lighting contrasting with cool exterior, cozy knitwear visible, cinematic atmospheric portrait, introspective creative, emotional depth | indoor, rain, moody, introspective |
| 11 | `creative-bookstore` | Browsing in a charming independent bookstore, looking up from a book with a warm surprised smile, cozy intellectual attire, warm ambient bookstore lighting with shelves blurred, cultured creative professional | indoor, bookstore, warm, cultured |
| 12 | `creative-mirror-reflection` ⚠️ | Reflection shot in a modern mirror or glass surface, creative composition, confident self-aware expression, stylish contemporary outfit, interesting interior space reflected, editorial artistic portrait, unique perspective | indoor, reflection, editorial, experimental |
| 13 | `creative-aerial-drone` ⚠️ | Looking up toward camera from a lower angle or drone perspective, confident smile, interesting urban rooftop or open plaza background with geometric patterns, dynamic perspective, modern creative professional, visually striking | outdoor, drone, dynamic, experimental |
| 14 | `creative-vinyl-lounge` | In a stylish mid-century modern lounge with vinyl records or design books nearby, relaxed cultured expression, retro-modern smart casual attire, warm analog lighting, music creative or design professional, tasteful aesthetic | indoor, retro, cultured, stylish |

> ⚠️ = experimental — not in production rotation

---

## Category 5: OUTDOOR NATURAL (13 templates)

Environmental, authentic — parks, urban, waterfront, seasonal.

| # | ID | Prompt | Tags |
|---|----|--------|------|
| 1 | `outdoor-park-bench` | Seated on a modern park bench, surrounded by soft green foliage bokeh, warm genuine smile, smart casual blazer with chinos, late afternoon golden sunlight filtering through trees, waist-up, approachable authentic professional | outdoor, park, seated, approachable |
| 2 | `outdoor-city-steps` | Seated on modern urban architecture steps in a downtown plaza, confident relaxed posture, business casual attire, bright overcast sky providing perfect diffused light, waist-up, urban professional, city hall or corporate district vibe | outdoor, urban, seated, corporate |
| 3 | `outdoor-campus-walk` | Walking along a tree-lined university campus path, looking at camera with intellectual smile, tweed blazer or academic casual attire, soft morning light, full-body walking shot, professor or academic administrator | outdoor, campus, walking, academic |
| 4 | `outdoor-beach-casual` | Beach setting at golden hour, relaxed genuine laughter, smart casual linen shirt, ocean horizon bokeh behind with warm sunset tones, shoulders-up, lifestyle entrepreneur, coastal professional, authentic joy | outdoor, beach, golden-hour, lifestyle |
| 5 | `outdoor-market-stroll` | Walking through an upscale outdoor market or shopping district, caught mid-stride looking at camera with natural smile, stylish casual attire, afternoon natural light, lifestyle authentic, cosmopolitan professional | outdoor, market, walking, cosmopolitan |
| 6 | `outdoor-mountain-view` | Standing on a viewpoint overlooking mountains or hills, fresh air wind slightly moving hair, confident serene expression, outdoor smart jacket, dramatic natural landscape bokeh behind, crisp clear daylight, adventurous leader | outdoor, mountain, standing, adventurous |
| 7 | `outdoor-riverside` | Leaning on a riverside railing with water and city reflection behind, relaxed reflective expression, smart casual dark jacket, soft afternoon light, waist-up, thoughtful urban professional, serene moment | outdoor, water, reflective, serene |
| 8 | `outdoor-garden-party` | At an upscale garden party or networking event, holding a glass, mid-conversation engaged expression, elegant smart casual or cocktail attire, greenery and string lights bokeh, waist-up, social professional, warm evening light | outdoor, event, social, elegant |
| 9 | `outdoor-autumn-leaves` | Standing among autumn foliage with warm orange and gold leaves blurred, cozy sophisticated sweater or light coat, genuine warm smile, crisp autumn afternoon light, waist-up, seasonal warmth, authentic professional | outdoor, autumn, seasonal, warm |
| 10 | `outdoor-bridge-crossing` | Walking across a modern pedestrian bridge with city skyline behind, purposeful stride, confident expression, business attire with long coat, dynamic movement, full-body, metropolitan professional, forward momentum | outdoor, bridge, walking, metropolitan |
| 11 | `outdoor-courtyard` | Standing in a serene internal courtyard or atrium with modern architecture and plants, calm centered expression, sophisticated casual attire, soft overhead natural light filtered through structure, full-length, oasis professional | outdoor, courtyard, calm, architectural |
| 12 | `outdoor-harbor` | Harbor or marina background with boats softly blurred, confident relaxed posture leaning on a wooden railing, nautical-inspired smart casual with navy blazer, bright sea-light, waist-up, maritime city professional | outdoor, harbor, nautical, relaxed |
| 13 | `outdoor-snow-crisp` ⚠️ | Crisp winter day with soft snow-covered background, warm sophisticated coat and scarf, breath visible in cold air, joyful resilient expression, bright overcast winter light creating soft even illumination, shoulders-up, northern professional | outdoor, winter, seasonal, resilient |

> ⚠️ = experimental — not in production rotation

---

## Distribution Strategy

- **Pool**: 58 active templates → shuffle → take first 30
- **Assignment**: Round-robin across user's photos (e.g., 1 photo gets 30 prompts assigned)
- **Variety guarantee**: With 58 active and only 30 needed, ~48% buffer ensures rotation across orders
- **Pro vs Starter**: Same prompt pool; Pro uses FLUX.2 max for higher quality output

---

## Known Gaps & Improvement Areas

Based on analysis of professional headshot photography standards:

### Underrepresented
| Gap | Current Coverage | Ideal |
|-----|-----------------|-------|
| Female-specific outfits | 1 explicit (soft-feminine) | 5-8 gendered variants |
| Healthcare (scrubs/white coat) | 0 | 2-3 |
| Legal profession (robe, law library) | 0 (library is academic) | 2-3 |
| Hospitality / service smile | 0 | 1-2 |
| Trade/industrial (hard hat, workshop) | 0 | 1-2 |
| High-key white background | Only 3-4 | 5-6 (most common in real studios) |
| Arms-crossed pose | 1 | 3-4 (extremely popular in corporate) |

### Overrepresented
| Area | Count | Notes |
|------|-------|-------|
| "Thoughtful/contemplative" | ~5 | Could trim 2 |
| Outdoor walking shots | ~4 | Could trim 1-2 |
| Night/dramatic | 3 | Could trim 1 |
| Luxury/aspirational | 3 | exec-private-jet already experimental |

### Suggested Additions for v3
1. **"LinkedIn classic" variants (high-key)** — white bg, navy/grey suit, warm smile (most-requested style)
2. **Female executive variants** — sheath dress, silk blouse, statement jewelry
3. **Medical professional** — white coat, stethoscope, clinic background
4. **Legal professional** — law library, wooden shelves, formal dark suit
5. **"Jacket off" casual variants** — same pose, sleeve-rolled shirt, relaxed
6. **Team/group subtle hint** — blurred colleague in background (warm, collaborative)
