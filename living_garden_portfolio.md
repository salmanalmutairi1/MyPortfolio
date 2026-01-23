# 🌱 Living Garden Portfolio - Complete Design Specification

## Project Overview
**Portfolio Name:** Salman's Skill Garden  
**Tagline:** "Watch My Skills Bloom - A Living Portfolio Ecosystem"  
**Theme:** Organic growth representing professional development journey  
**Platforms:** Fully responsive (Desktop, Tablet, Mobile)

---

## 🎨 Visual Design System

### Color Palette

#### Primary Colors (Day Mode)
- **Sky Background:** `#87CEEB` → `#E0F6FF` (gradient top to bottom)
- **Grass/Ground:** `#90EE90` → `#228B22` (gradient light to dark)
- **Soil:** `#8B4513` (rich brown)
- **Sun:** `#FFD700` with `#FFA500` glow

#### Secondary Colors (Plant Growth Stages)
- **Seed Stage:** `#8B7355` (dormant brown)
- **Sprout Stage:** `#90EE90` (light green)
- **Growing Stage:** `#32CD32` (lime green)
- **Blooming Stage:** `#FF69B4`, `#9370DB`, `#FFD700` (vibrant flower colors)
- **Tree Stage:** `#228B22` (deep forest green)

#### Night Mode Colors
- **Sky Background:** `#191970` → `#000428` (midnight blue gradient)
- **Moon:** `#F0E68C` with soft white glow
- **Stars:** `#FFFFFF` (twinkling)
- **Bioluminescent Plants:** `#00FFFF`, `#39FF14` (cyan/neon green glow)

#### Accent Colors
- **Water Droplets:** `#4DD0E1` with `rgba(255, 255, 255, 0.6)` shine
- **Butterflies:** `#FF1493`, `#FFD700`, `#00CED1` (varied species)
- **Bees:** `#FFD700` with `#000000` stripes
- **UI Elements:** `rgba(255, 255, 255, 0.9)` with `backdrop-filter: blur(10px)`

---

## 🌺 Flower & Plant Design System

### Plant Types & Their Meanings

#### 1. **Certification Flowers** (10 total)
Each certification = one blooming flower

**Design Structure:**
```
Flower Anatomy:
├─ Stem: 60-100px height, 3px width, #228B22
├─ Leaves: 2-3 leaves, ellipse shape, #32CD32
├─ Petals: 5-8 petals in circular pattern
├─ Center: Circular badge with certification logo
└─ Glow Effect: Soft shadow, 0 0 20px rgba(255, 215, 0, 0.5)
```

**Flower Types by Certification:**

1. **Apple AI Foundation** - Golden Sunflower
   - Petals: 8 petals, `#FFD700` with `#FFA500` gradient
   - Center: Apple logo in white
   - Size: Large (120px diameter)
   - Animation: Gentle rotation following sun

2. **ISTQB Testing** - Purple Lavender
   - Petals: 6 petals, `#9370DB` with `#DDA0DD` gradient
   - Center: Checkmark symbol
   - Size: Medium (90px diameter)
   - Animation: Sways in wind

3. **Python Certifications** (4 flowers) - Blue Forget-me-nots
   - Petals: 5 petals, `#4169E1` with `#87CEEB` gradient
   - Center: Python logo
   - Size: Medium (80px diameter)
   - Clustered together in a group

4. **BSF Financial** - Green Money Plant Flower
   - Petals: 6 petals, `#50C878` with `#90EE90` gradient
   - Center: Dollar/blockchain symbol
   - Size: Medium (85px diameter)
   - Animation: Sparkle effect

5. **Software Product Management** - Red Rose
   - Petals: 12 layered petals, `#FF1493` with `#FF69B4` gradient
   - Center: Gear icon
   - Size: Large (110px diameter)
   - Animation: Blooming animation on hover

6. **Data Fundamentals (IBM)** - Tech Flower (Crystalline)
   - Petals: 6 geometric petals, `#00CED1` with `#40E0D0` gradient
   - Center: Database icon
   - Size: Medium (85px diameter)
   - Animation: Crystalline shimmer

**Growth Animation Timeline:**
```
0% - Seed in soil (brown circle, 10px)
25% - Sprout emerges (small green stem, 20px)
50% - Stem grows + leaves appear (60px height)
75% - Bud forms (closed flower shape)
100% - Full bloom (petals open, final size)
Duration: 2-3 seconds per flower
Stagger: Each flower blooms 0.5s after previous
```

#### 2. **Skill Trees** (Major competency areas)

**Design Structure:**
```
Tree Anatomy:
├─ Trunk: 150-250px height, 40px width, brown gradient
├─ Branches: 4-6 branches, spreading outward
├─ Leaves: Multiple small leaves (15-30)
├─ Roots: Visible root system extending into soil
└─ Canopy: Circular/organic shape, dense foliage
```

**Tree Types:**

1. **AI/ML Tree** - Oak Tree (Strong, Established)
   - Height: 250px
   - Canopy: Dense, dark green (#228B22)
   - Special: Small neural network pattern in leaves
   - Position: Center-left of garden

2. **Testing/QA Tree** - Cherry Blossom (Quality Focus)
   - Height: 200px
   - Canopy: Pink blossoms (#FFB7C5)
   - Special: Checkmark-shaped blossoms
   - Position: Center-right of garden

3. **Python Development Tree** - Willow Tree (Flexible)
   - Height: 220px
   - Canopy: Drooping branches with blue-green leaves
   - Special: Code symbols in leaf patterns
   - Position: Left side

**Tree Growth States:**
```
Sapling (0-3 months experience): 80px height, thin trunk
Young Tree (3-12 months): 150px height, developing branches
Mature Tree (1+ years): 250px height, full canopy
Ancient Tree (3+ years): 300px height, thick trunk, sprawling roots
```

#### 3. **Skill Sprouts** (Growing skills)

**Design:**
- Small plants emerging from soil
- 30-50px height
- Light green color
- 2-4 small leaves
- Represents: Skills currently learning
- Animation: Gentle sway, growing taller over time

**Examples:**
- React sprout (React logo on leaf)
- Docker sprout (Container icon)
- New framework sprout

---

## 💧 Water Interaction System

### Watering Can Mechanism

**Visual Design:**
```
Watering Can:
├─ Body: Metallic silver (#C0C0C0) with shine gradient
├─ Spout: Curved, 60px length
├─ Handle: Arc shape, wooden texture (#8B4513)
├─ Size: 80px width × 60px height
└─ Icon: Appears when hovering over unwatered plants
```

**Interaction Flow:**

1. **Desktop:**
   - Cursor becomes watering can when hovering over plants
   - Click to pour water (animated water droplets)
   - Water droplets fall with physics (gravity + slight horizontal drift)
   - Plant glows when watered, information modal appears

2. **Mobile/Tablet:**
   - Tap plant to reveal watering can icon
   - Tap icon to water
   - Water animation plays
   - Swipe up to view details

**Water Droplet Animation:**
```css
Properties:
- Shape: Teardrop (rounded top, pointed bottom)
- Color: rgba(77, 208, 225, 0.8)
- Size: 8-15px (random variation)
- Quantity: 8-12 droplets per pour
- Fall Duration: 0.8-1.2s
- Physics: Gravity (800px/s²), slight horizontal randomness
- Splash Effect: Tiny ripple circles on ground impact
```

**Water Effects on Plants:**
```
Immediate Effects:
├─ Glow animation (0 0 30px rgba(77, 208, 225, 0.6))
├─ Slight size increase (scale: 1.05)
├─ Sparkle particles around plant
├─ Information panel slides up from bottom
└─ Duration: 2 seconds

Information Panel Content:
├─ Certification/Skill name
├─ Date earned/started
├─ Key competencies
├─ Skills acquired (bullets)
├─ Related projects (if applicable)
└─ "View Certificate" button
```

---

## 🦋 Wildlife & Ecosystem Elements

### Butterflies (Technologies Used)

**Design:**
```
Butterfly Structure:
├─ Body: 15px length, gradient color
├─ Antennae: Thin curved lines
├─ Wings: 4 wings, symmetrical
│   ├─ Top Wings: 30px × 20px
│   ├─ Bottom Wings: 25px × 15px
│   └─ Pattern: Technology logo or icon
├─ Colors: Varies by technology
└─ Animation: Flutter pattern, figure-8 flight path
```

**Technology-Butterfly Mapping:**
- **Swift Butterfly:** Orange wings (#FF6B35) with Swift logo
- **Python Butterfly:** Blue/yellow wings (#3776AB/#FFD43B)
- **React Butterfly:** Cyan wings (#61DAFB)
- **TypeScript Butterfly:** Blue wings (#3178C6)
- **Git Butterfly:** Orange-red wings (#F05032)

**Behavior:**
- Random flight paths across garden
- Land on flowers occasionally (5-10 seconds)
- Follow cursor slightly when nearby (attraction)
- 6-8 butterflies active at once
- Mobile: Reduced to 3-4 for performance

### Bees (Active Projects/Work)

**Design:**
```
Bee Structure:
├─ Body: Oval, 20px length
├─ Stripes: Black/gold alternating (#000000/#FFD700)
├─ Wings: 2 pairs, translucent white
├─ Size: 18px × 12px
└─ Animation: Zigzag flight, wing vibration
```

**Behavior:**
- Fly between flowers collecting "pollen" (data)
- Represent active projects in progress
- Each bee has a small label (project name)
- Hover to see project details
- Return to "hive" (off-screen) when clicked

### Environmental Elements

**Sun/Moon Cycle:**
```
Sun (Day Mode):
├─ Position: Top-right corner
├─ Size: 80px diameter
├─ Color: #FFD700 with #FFA500 rays
├─ Animation: Gentle pulsing glow
└─ Rays: 12 rays rotating slowly

Moon (Night Mode):
├─ Position: Top-right corner (replaces sun)
├─ Size: 70px diameter
├─ Color: #F0E68C with craters
├─ Glow: Soft white (0 0 40px rgba(255, 255, 255, 0.4))
└─ Animation: Subtle breathing effect
```

**Stars (Night Mode Only):**
- 50-80 stars scattered across sky
- 3 size variations (2px, 3px, 4px)
- Twinkling animation (random intervals)
- Some stars form subtle constellations

**Clouds:**
- 3-5 fluffy clouds drifting horizontally
- SVG shapes with gradient fills
- Parallax effect (slower than scroll)
- Semi-transparent (#FFFFFF, opacity: 0.7)

**Birds (Optional Detail):**
- Small silhouettes flying across sky
- Simple V-shape or bird sprite
- Follow sine wave path
- 2-3 birds visible at random times

---

## 📱 Responsive Design System

### Desktop Layout (1920px × 1080px)

```
Layout Structure:
┌─────────────────────────────────────────────┐
│  Sky + Sun/Moon                             │
│  [Logo: Salman] [Language Toggle AR/EN]     │
├─────────────────────────────────────────────┤
│                                             │
│  🌸 🌸    🌳        🌸 🌸                    │
│    🌸   🌳  🌳   🌸   🌸                     │
│  🌱 🌸 🌳      🌳 🌸 🌱                       │
│ ═══════════════════════════════════════════ │ ← Ground Line
│ ▓▓▓▓▓▓▓▓▓ Soil Layer ▓▓▓▓▓▓▓▓▓▓▓▓▓▓        │
└─────────────────────────────────────────────┘
  └─ Scroll down to expand garden timeline ─┘
```

**Zones:**
- **Top 20%:** Sky, branding, navigation
- **Middle 60%:** Main garden with flowers/trees
- **Bottom 20%:** Soil, roots visible, scroll indicator

**Grid System:**
- 12-column grid for plant placement
- Plants placed using CSS Grid or absolute positioning
- Flowers: Columns 2, 4, 6, 8, 10 (staggered)
- Trees: Columns 3, 7, 11

### Tablet Layout (768px × 1024px)

```
Adjustments:
├─ Sky height: Reduced to 15%
├─ Garden area: 70%
├─ Plant density: 70% of desktop
├─ Butterflies: Reduced to 4-5
├─ Font sizes: 90% of desktop
└─ Touch targets: Minimum 44px × 44px
```

**Changes:**
- Flowers rearrange into 3 rows
- Trees positioned in background layer
- Watering interaction: Tap-based
- Information panels: Full-width modals

### Mobile Layout (375px × 812px)

```
Vertical Scroll Design:
┌─────────────────┐
│   Sky + Sun     │ ← 10% height
├─────────────────┤
│   Salman Logo   │ ← Fixed header
├─────────────────┤
│                 │
│      🌸         │
│    🌸 🌸        │ ← Scrollable
│   🌳           │   garden
│      🌸         │   sections
│    🌱 🌱        │
│                 │
│═════════════════│ ← Ground
└─────────────────┘
```

**Mobile Optimizations:**
- **Vertical Timeline:** Garden expands downward as user scrolls
- **Simplified Animations:** Reduced particle effects
- **Touch Gestures:**
  - Tap flower: Open info modal
  - Swipe: Navigate sections
  - Pinch: Zoom in/out (optional)
- **Performance:**
  - 3-4 butterflies max
  - Reduced shadow/glow effects
  - Lazy loading for off-screen plants
- **Plant Sizing:**
  - Flowers: 60px diameter (vs 90px desktop)
  - Trees: 150px height (vs 250px desktop)
  - Spacing: Reduced to fit screen

---

## 🌓 Day/Night Cycle System

### Timing Mechanism

**Option 1: Real-Time Based**
```javascript
// Detect user's local time
const hour = new Date().getHours();
const isNight = hour >= 19 || hour < 6; // 7 PM - 6 AM
```

**Option 2: Toggle Switch**
```
UI Toggle:
├─ Position: Top-right corner near sun/moon
├─ Design: Sun icon ☀️ ←→ Moon icon 🌙
├─ Animation: Smooth transition over 3 seconds
└─ Saves preference to localStorage
```

### Transition Effects

**Day → Night Transition:**
```
Duration: 3 seconds

Timeline:
0.0s - Sky gradient starts shifting
0.5s - Sun begins setting (moves down, fades)
1.0s - Moon rises (fades in, moves up)
1.5s - Stars appear (fade in, staggered)
2.0s - Plant colors shift to night tones
2.5s - Bioluminescence activates on flowers
3.0s - Complete night mode
```

**Visual Changes:**

| Element | Day Mode | Night Mode |
|---------|----------|------------|
| Sky | Light blue gradient | Dark blue/black gradient |
| Light Source | Golden sun | Silver moon |
| Flowers | Vibrant colors | Muted + glow |
| Trees | Green foliage | Dark green + subtle glow |
| Butterflies | Normal flight | Slower, glowing trails |
| UI Text | Dark text | Light text |
| Shadows | Soft gray | Deep purple |

**Bioluminescent Effects (Night Only):**
- Flower petals emit soft glow
- Certain leaves have light veins
- Fireflies appear (new element)
- Water droplets shimmer with moonlight
- Mushrooms appear near trees (glowing)

---

## 🎯 Interactive Features

### 1. Certification Reveal System

**Interaction Flow:**
```
User Action → Plant Response → Information Display

Desktop:
1. Hover over flower → Glow effect + tooltip preview
2. Click flower → Full bloom animation
3. Information modal slides up from bottom
4. Background blurs (backdrop-filter)
5. Modal shows: Title, Date, Skills, Certificate image
6. "View Certificate" button → Full PDF/image
7. Close (X) or click outside → Modal fades out

Mobile:
1. Tap flower → Immediate bloom animation
2. Info card slides up from bottom (covers 70% screen)
3. Swipe down to close
```

**Modal Design:**
```
┌─────────────────────────────────────┐
│  [Certificate Icon] Certification Name │
│  ───────────────────────────────────  │
│  📅 Issued: November 2024             │
│  🏢 Issuer: University of Michigan    │
│                                       │
│  ✨ Skills Acquired:                  │
│  • API Development                    │
│  • Data Processing                    │
│  • Python Libraries                   │
│                                       │
│  [View Full Certificate]  [Close ✕]   │
└─────────────────────────────────────┘
```

### 2. Timeline Scroll System

**Scroll Behavior:**
```
Vertical Scroll Triggers:
├─ 0% - Initial garden view (most recent)
├─ 25% - Garden expands, older certifications appear
├─ 50% - Timeline label appears: "2024 Journey"
├─ 75% - More plants grow, early career items
└─ 100% - Full garden, "Journey Started" marker

Horizontal Timeline (Desktop Alternative):
- Left side: Present (2025)
- Right side: Past (2024)
- Scroll right to see career beginning
- Parallax: Background slower than foreground
```

**Timeline Markers:**
```
Visual Markers:
├─ Year Labels: Wooden signs, hand-painted style
├─ Season Changes: Winter → Spring → Summer → Fall
├─ Milestone Stones: Large rocks with engraved dates
└─ Growth Rings: Visible on tree trunks (age)
```

### 3. Skill Tree Exploration

**Tree Interaction:**
```
Click Tree → Expand Branches

Animation:
1. Camera zooms into tree (scale: 1.5)
2. Branches highlight individually
3. Each branch = skill category
4. Leaves show specific skills
5. Hover leaf → Skill details tooltip
6. Click anywhere outside → Zoom back out
```

**Branch Categories (Example for Python Tree):**
- Branch 1: Data Processing (4 leaves: Pandas, NumPy, APIs, Files)
- Branch 2: OOP (3 leaves: Classes, Inheritance, Polymorphism)
- Branch 3: Functions (3 leaves: Decorators, Generators, Lambda)
- Branch 4: Testing (2 leaves: Pytest, Unit tests)

### 4. Butterfly Technology Tags

**Interaction:**
```
Hover Butterfly → Slow down, show label
Click Butterfly → Technology detail card

Card Shows:
├─ Technology name & logo
├─ Proficiency level (bar chart)
├─ Projects used in
├─ Years of experience
└─ Related certifications
```

### 5. Seasonal Events (Easter Eggs)

**Hidden Interactions:**
- **Click Sun 5 times:** Rainbow appears
- **Water all flowers:** Garden sparkles, achievement unlocked
- **Night mode + hover moon:** Shooting star crosses sky
- **Visit on your birthday:** Confetti + birthday flower blooms
- **Konami code (↑↑↓↓←→←→BA):** Secret golden flower appears

---

## 🛠️ Technical Implementation

### Technology Stack

**Recommended Technologies:**
```
Frontend Framework:
├─ React 18+ (component-based, hooks for animations)
├─ TypeScript (type safety)
└─ Vite (fast build tool)

Styling:
├─ Tailwind CSS (utility classes, responsive design)
├─ Framer Motion (smooth animations)
└─ CSS Modules (scoped styles)

3D/Animation Libraries:
├─ Three.js (optional: for advanced 3D effects)
├─ GSAP (GreenSock Animation Platform)
├─ Lottie (for complex animations if needed)
└─ React Spring (physics-based animations)

State Management:
├─ Zustand (lightweight, for theme/language state)
└─ React Context (for global garden state)

Performance:
├─ React.lazy (code splitting)
├─ Intersection Observer (lazy load plants)
└─ requestAnimationFrame (smooth 60fps animations)
```

### File Structure

```
portfolio-garden/
├─ public/
│  ├─ certificates/
│  │  ├─ Apple.png
│  │  ├─ Testing.png
│  │  ├─ BSF.png
│  │  └─ [other certificates]
│  └─ assets/
│     ├─ butterflies/
│     ├─ plants/
│     └─ sounds/ (optional)
├─ src/
│  ├─ components/
│  │  ├─ Garden/
│  │  │  ├─ Garden.tsx (main container)
│  │  │  ├─ Sky.tsx
│  │  │  ├─ Ground.tsx
│  │  │  └─ Timeline.tsx
│  │  ├─ Plants/
│  │  │  ├─ Flower.tsx
│  │  │  ├─ Tree.tsx
│  │  │  ├─ Sprout.tsx
│  │  │  └─ PlantFactory.tsx
│  │  ├─ Wildlife/
│  │  │  ├─ Butterfly.tsx
│  │  │  ├─ Bee.tsx
│  │  │  └─ Bird.tsx
│  │  ├─ Interactions/
│  │  │  ├─ WateringCan.tsx
│  │  │  ├─ InfoModal.tsx
│  │  │  └─ DayNightToggle.tsx
│  │  └─ UI/
│  │     ├─ Header.tsx
│  │     ├─ LanguageToggle.tsx
│  │     └─ ScrollIndicator.tsx
│  ├─ data/
│  │  ├─ certifications.ts (certification data)
│  │  ├─ skills.ts
│  │  └─ projects.ts
│  ├─ hooks/
│  │  ├─ useResponsive.ts
│  │  ├─ useScrollProgress.ts
│  │  └─ useTheme.ts
│  ├─ utils/
│  │  ├─ animations.ts
│  │  └─ helpers.ts
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ themes.css
│  ├─ App.tsx
│  └─ main.tsx
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
└─ vite.config.ts
```

### Data Structure

**certifications.ts:**
```typescript
export interface Certification {
  id: string;
  name: string;
  nameAr: string; // Arabic translation
  issuer: string;
  issueDate: string;
  image: string; // Path to certificate image
  type: 'flower' | 'tree' | 'sprout';
  flowerType: 'sunflower' | 'lavender' | 'rose' | 'forget-me-not' | 'money-plant' | 'crystalline';
  color: {
    primary: string;
    secondary: string;
  };
  size: 'small' | 'medium' | 'large';
  position: {
    x: number; // percentage or pixel value
    y: number;
  };
  skills: string[];
  description: string;
  descriptionAr: string;
  growthDuration: number; // seconds for animation
}

export const certifications: Certification[] = [
  {
    id: 'apple-ai',
    name: 'Apple AI Foundation x Tuwaiq Academy',
    nameAr: 'برنامج أساسيات الذكاء الاصطناعي من أبل',
    issuer: 'Tuwaiq Academy & Apple',
    issueDate: '2025-08-21',
    image: '/certificates/Apple.png',
    type: 'flower',
    flowerType: 'sunflower',
    color: {
      primary: '#FFD700',
      secondary: '#FFA500'
    },
    size: 'large',
    position: { x: 50, y: 40 }, // Center position
    skills: [
      'AI-driven Development',
      'API Development',
      'Swift Programming',
      'UI/UX Design'
    ],
    description: 'Intensive Apple Foundation Program with hands-on AI experience...',
    descriptionAr: 'برنامج أبل المكثف مع خبرة عملية في الذكاء الاصطناعي...',
    growthDuration: 2.5
  },
  // ... more certifications
];
```

### Core Animation Code

**Flower Growth Animation (GSAP):**
```typescript
import { gsap } from 'gsap';

export const animateFlowerGrowth = (
  element: HTMLElement,
  duration: number
) => {
  const timeline = gsap.timeline();

  // Seed stage
  timeline.from(element, {
    scale: 0.1,
    opacity: 0,
    y: 20,
    duration: 0.3,
  });

  // Sprout emerges
  timeline.to(element.querySelector('.stem'), {
    height: '60px',
    duration: duration * 0.3,
    ease: 'power2.out',
  });

  // Leaves appear
  timeline.to(element.querySelectorAll('.leaf'), {
    scale: 1,
    opacity: 1,
    stagger: 0.1,
    duration: duration * 0.2,
  });

  // Bud forms
  timeline.to(element.querySelector('.bud'), {
    scale: 1,
    duration: duration * 0.2,
  });

  // Bloom
  timeline.to(element.querySelectorAll('.petal'), {
    rotation: 0,
    scale: 1,
    opacity: 1,
    stagger: 0.05,
    duration: duration * 0.3,
    ease: 'elastic.out(1, 0.5)',
  });

  return timeline;
};
```

**Water Droplet Physics:**
```typescript
export class WaterDroplet {
  x: number;
  y: number;
  velocity: { x: number; y: number };
  gravity: number = 800; // pixels per second squared

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
    this.velocity = {
      x: (Math.random() - 0.5) * 100, // Random horizontal drift
      y: 0,
    };
  }

  update(deltaTime: number) {
    // Apply gravity
    this.velocity.y += this.gravity * deltaTime;

    // Update position
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
  }

  hasLanded(groundY: number): boolean {
    return this.y >= groundY;
  }
}
```

**Day/Night Transition:**
```typescript
export const transitionToNightMode = () => {
  const timeline = gsap.timeline();

  // Sky transition
  timeline.to('.sky', {
    background: 'linear-gradient(to bottom, #191970, #000428)',
    duration: 3,
  });

  // Sun sets, moon rises
  timeline.to('.sun', {
    y: 100,
    opacity: 0,
    duration: 1.5,
  }, 0.5);

  timeline.from('.moon', {
    y: -100,
    opacity: 0,
    duration: 1.5,
  }, 1);

  // Stars appear
  timeline.to('.star', {
    opacity: 1,
    stagger: 0.05,
    duration: 2,
  }, 1.5);

  // Flowers activate bioluminescence
  timeline.to('.flower', {
    filter: 'drop-shadow(0 0 20px currentColor)',
    duration: 2,
  }, 2);

  return timeline;
};
```

### Responsive Breakpoints

```typescript
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
};

export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia(breakpoints.mobile).matches) {
        setDeviceType('mobile');
      } else if (window.matchMedia(breakpoints.tablet).matches) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceType;
};
```

---

## ⚡ Performance Optimization

### Loading Strategy

**Progressive Enhancement:**
```
Phase 1: Critical Path (First Paint < 1.5s)
├─ Load HTML shell
├─ Load minimal CSS (above-the-fold)
├─ Display sky + ground immediately
└─ Show "Garden Loading..." indicator

Phase 2: Core Content (Interactive < 3s)
├─ Load main JavaScript bundle
├─ Initialize React
├─ Render static flower positions (no animations yet)
└─ Load certification data

Phase 3: Enhancements (Progressive)
├─ Trigger growth