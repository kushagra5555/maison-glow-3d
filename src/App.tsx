import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Gem,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  Phone,
  Send,
  Sparkles,
  Star,
  WandSparkles,
} from 'lucide-react';
import './App.css';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=88',
    title: 'Signature Bridal Finish',
    description: 'Close-up bridal portrait with luminous skin, defined eyes, and refined jewelry.',
    category: 'Bridal',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1100&q=88',
    title: 'Artist At Work',
    description: 'Makeup artist applying final details in a clean, editorial studio setup.',
    category: 'Editorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1100&q=88',
    title: 'Premium Product Story',
    description: 'Luxury product flat lay with brushes, soft textures, perfume, and florals.',
    category: 'Products',
  },
  {
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1100&q=88',
    title: 'Couture Hair Detail',
    description: 'Elegant salon hair styling with polished finish, shine, and editorial framing.',
    category: 'Hair',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1100&q=88',
    title: 'Skin Ritual',
    description: 'Soft skincare treatment imagery with calm luxury, clean hands, and glow-focused prep.',
    category: 'Skin',
  },
  {
    src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1100&q=88',
    title: 'Evening Glam',
    description: 'Refined party makeup portrait with confident expression and cinematic light.',
    category: 'Party',
  },
];

const services = [
  {
    title: 'The Bride Atelier',
    price: 'From Rs. 18,000',
    description:
      'Bespoke bridal makeup with skin preparation, HD long-wear finish, custom lashes, veil and jewelry checks, and a final camera-readiness ritual.',
  },
  {
    title: 'Engagement Radiance',
    price: 'From Rs. 9,500',
    description:
      'Soft sculpture, luminous skin, refined eyes, and a graceful finish for engagement, reception, sangeet, and family celebrations.',
  },
  {
    title: 'Evening Signature',
    price: 'From Rs. 5,500',
    description:
      'A polished glam service for cocktails, birthdays, festive evenings, editorials, and dinners where the look must hold beautifully.',
  },
  {
    title: 'Couture Hair Styling',
    price: 'From Rs. 3,500',
    description:
      'Sleek buns, sculpted waves, soft curls, braided detailing, and bridal updos shaped around your outfit, neckline, and event mood.',
  },
  {
    title: 'Skin-First Ritual',
    price: 'From Rs. 4,000',
    description:
      'Hydrating, brightening, and calming treatments created to make the complexion look rested, smooth, and makeup-ready.',
  },
  {
    title: 'Drape & Finish',
    price: 'From Rs. 2,000',
    description:
      'Secure saree or dupatta draping with pinning, pleat refinement, jewelry balance, and final styling for confident movement.',
  },
];

const rituals = [
  'Complexion mapping for tone, texture, undertone, and flash photography.',
  'A curated product edit using long-wear, humidity-aware formulas.',
  'Final styling checks for neckline, jewelry, hairline, veil, and portraits.',
];

const packages = [
  {
    name: 'Bridal Signature',
    detail: 'Wedding day makeup, hair, draping support, lashes, and touch-up plan.',
    time: '3.5-4.5 hrs',
  },
  {
    name: 'Celebration Suite',
    detail: 'Engagement, reception, cocktail, or festive glam with hair styling.',
    time: '2-3 hrs',
  },
  {
    name: 'Editorial Polish',
    detail: 'Clean beauty direction for shoots, reels, campaign portraits, and portfolio days.',
    time: 'Custom',
  },
];

const proofPoints = [
  { value: '350+', label: 'occasion looks created' },
  { value: '8 hr', label: 'wear-tested finish' },
  { value: '1:1', label: 'private consultation' },
  { value: '4-8 wk', label: 'ideal bridal lead time' },
];

const comparisonPackages = [
  {
    name: 'Essential',
    price: 'Rs. 5,500+',
    detail: 'Best for parties, festive evenings, and polished one-look appointments.',
    features: ['Soft glam makeup', 'Basic hair finish', 'Skin prep', 'Studio appointment'],
  },
  {
    name: 'Signature',
    price: 'Rs. 18,000+',
    detail: 'Best for brides who want a complete luxury wedding-day experience.',
    features: ['HD bridal makeup', 'Couture hair styling', 'Draping support', 'Final portrait check'],
  },
  {
    name: 'Elite',
    price: 'Custom',
    detail: 'Best for destination events, multi-look celebrations, and VIP scheduling.',
    features: ['Multi-event planning', 'On-location artist', 'Touch-up support', 'Priority booking'],
  },
];

const journeySteps = [
  'Private consultation',
  'Skin preparation',
  'Makeup artistry',
  'Hair sculpting',
  'Drape styling',
  'Camera-ready review',
];

const galleryCategories = ['All', 'Bridal', 'Party', 'Hair', 'Skin', 'Editorial', 'Products'];

const faqItems = [
  {
    question: 'Is a bridal trial recommended?',
    answer:
      'Yes. A trial helps refine skin finish, eye intensity, hair direction, and references before the wedding day.',
  },
  {
    question: 'Do you travel to the venue?',
    answer:
      'On-location bookings are available for bridal mornings, destination events, and group glam subject to timing and travel.',
  },
  {
    question: 'What should clients bring?',
    answer:
      'Share outfit images, jewelry references, hairstyle inspiration, event timing, and any skin sensitivities before the appointment.',
  },
];

const testimonials = [
  {
    quote:
      'My bridal look was exactly what I had imagined: elegant, glowing, and still completely me. The makeup stayed fresh from the morning ceremony to the reception photographs.',
    name: 'Aanya R.',
    event: 'Bride, Winter Wedding',
  },
  {
    quote:
      'The studio experience felt calm and premium from the moment I arrived. Every detail, from the skin prep to the hair finish, was handled with so much care.',
    name: 'Meher S.',
    event: 'Engagement Client',
  },
  {
    quote:
      'I booked party makeup and received compliments all night. It photographed beautifully under venue lights and never felt heavy on my skin.',
    name: 'Nisha K.',
    event: 'Cocktail Glam',
  },
];

const trustItems = ['HD finish', 'Premium products', 'Custom skin prep', 'On-location available'];

function Section3DAccent({ variant }: { variant: 'pearl' | 'ribbon' | 'compact' | 'crystal' | 'mirror' }) {
  return (
    <div className={`section-3d section-3d-${variant}`} aria-hidden="true">
      <span className="orb orb-one" />
      <span className="orb orb-two" />
      <span className="orb orb-three" />
      <span className="metal-ring" />
      <span className="glass-plane" />
    </div>
  );
}

function BeautyThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.3, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: '#fff3ea',
      roughness: 0.22,
      metalness: 0.1,
      transmission: 0.2,
      clearcoat: 1,
    });
    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: '#c98978',
      roughness: 0.28,
      metalness: 0.68,
    });
    const blushMaterial = new THREE.MeshStandardMaterial({
      color: '#d65f7d',
      roughness: 0.36,
      metalness: 0.1,
    });
    const obsidianMaterial = new THREE.MeshStandardMaterial({
      color: '#171116',
      roughness: 0.24,
      metalness: 0.35,
    });

    const group = new THREE.Group();
    scene.add(group);

    const pearlGeometry = new THREE.SphereGeometry(0.18, 32, 32);
    const pearls = Array.from({ length: 18 }, (_, index) => {
      const pearl = new THREE.Mesh(pearlGeometry, pearlMaterial);
      const angle = index * 0.72;
      const radius = 1.5 + (index % 4) * 0.45;
      pearl.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.9) * 1.2, -0.9 + (index % 3) * 0.65);
      pearl.scale.setScalar(0.72 + (index % 5) * 0.08);
      group.add(pearl);
      return pearl;
    });

    const lipstick = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.45, 36), obsidianMaterial);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.22, 36), roseGoldMaterial);
    const bullet = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.86, 36), blushMaterial);
    base.position.y = -0.5;
    band.position.y = 0.28;
    bullet.position.y = 0.84;
    lipstick.add(base, band, bullet);
    lipstick.position.set(2.55, -0.15, 0.2);
    lipstick.rotation.set(-0.5, 0.24, -0.34);
    group.add(lipstick);

    const compact = new THREE.Group();
    const compactBase = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.18, 64), roseGoldMaterial);
    const compactMirror = new THREE.Mesh(
      new THREE.CylinderGeometry(0.66, 0.66, 0.04, 64),
      new THREE.MeshPhysicalMaterial({ color: '#f6efe9', roughness: 0.08, metalness: 0.45, clearcoat: 1 }),
    );
    compactMirror.position.y = 0.12;
    compact.add(compactBase, compactMirror);
    compact.position.set(-2.55, -0.25, 0.1);
    compact.rotation.set(1.2, 0.16, 0.28);
    group.add(compact);

    const brush = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 24), obsidianMaterial);
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.42, 24), roseGoldMaterial);
    const bristles = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.62, 32), new THREE.MeshStandardMaterial({ color: '#ead1c2', roughness: 0.72 }));
    handle.position.y = -0.72;
    ferrule.position.y = 0.65;
    bristles.position.y = 1.1;
    brush.add(handle, ferrule, bristles);
    brush.position.set(-0.35, -0.95, 0.75);
    brush.rotation.set(0.15, 0.45, -0.82);
    group.add(brush);

    const ambientLight = new THREE.AmbientLight('#fff1e8', 1.45);
    const keyLight = new THREE.DirectionalLight('#ffd9c6', 2.8);
    keyLight.position.set(3.8, 4.2, 5);
    const rimLight = new THREE.PointLight('#e8b9ff', 2.6, 8);
    rimLight.position.set(-3.2, 1.8, 2.5);
    scene.add(ambientLight, keyLight, rimLight);

    let animationFrame = 0;

    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;
      group.rotation.y = Math.sin(elapsed * 0.32) * 0.18;
      group.rotation.x = Math.sin(elapsed * 0.18) * 0.08;
      lipstick.rotation.y += 0.005;
      compact.rotation.z += 0.003;
      brush.position.y = -0.95 + Math.sin(elapsed * 1.35) * 0.08;
      pearls.forEach((pearl, index) => {
        pearl.position.y += Math.sin(elapsed + index) * 0.0008;
      });
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });

    resizeObserver.observe(mount);
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      pearlGeometry.dispose();
      pearlMaterial.dispose();
      roseGoldMaterial.dispose();
      blushMaterial.dispose();
      obsidianMaterial.dispose();
    };
  }, []);

  return <div className="beauty-3d" ref={mountRef} aria-hidden="true" />;
}

function BeautyOrbitScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.1, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const pointer = new THREE.Vector2(0, 0);
    const group = new THREE.Group();
    scene.add(group);

    const pearl = new THREE.MeshPhysicalMaterial({
      color: '#fff4e8',
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 1,
      transmission: 0.12,
    });
    const roseGold = new THREE.MeshStandardMaterial({ color: '#bd7a67', metalness: 0.74, roughness: 0.23 });
    const garnet = new THREE.MeshStandardMaterial({ color: '#7b2638', metalness: 0.18, roughness: 0.32 });
    const blackLacquer = new THREE.MeshStandardMaterial({ color: '#160f13', metalness: 0.48, roughness: 0.22 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#ffe8d8',
      roughness: 0.05,
      metalness: 0.18,
      transmission: 0.36,
      clearcoat: 1,
      transparent: true,
      opacity: 0.72,
    });

    const compact = new THREE.Group();
    const compactBase = new THREE.Mesh(new THREE.CylinderGeometry(1.14, 1.14, 0.18, 72), roseGold);
    const compactFace = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.05, 72), glass);
    compactFace.position.y = 0.14;
    compact.add(compactBase, compactFace);
    compact.position.set(-1.95, -0.1, 0.2);
    compact.rotation.set(1.18, 0.1, -0.26);
    group.add(compact);

    const lipstick = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.45, 40), blackLacquer);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 40), roseGold);
    const color = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.78, 40), garnet);
    tube.position.y = -0.52;
    collar.position.y = 0.28;
    color.position.y = 0.82;
    lipstick.add(tube, collar, color);
    lipstick.position.set(1.95, 0.04, 0.35);
    lipstick.rotation.set(-0.44, 0.32, 0.3);
    group.add(lipstick);

    const brush = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.9, 28), blackLacquer);
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.46, 28), roseGold);
    const bristles = new THREE.Mesh(
      new THREE.ConeGeometry(0.34, 0.68, 36),
      new THREE.MeshStandardMaterial({ color: '#e8c6b6', roughness: 0.78 }),
    );
    handle.position.y = -0.9;
    ferrule.position.y = 0.74;
    bristles.position.y = 1.23;
    brush.add(handle, ferrule, bristles);
    brush.position.set(0.18, -0.74, 1);
    brush.rotation.set(0.18, -0.35, -0.9);
    group.add(brush);

    const particleGeometry = new THREE.SphereGeometry(0.07, 24, 24);
    const particles = Array.from({ length: 44 }, (_, index) => {
      const particle = new THREE.Mesh(particleGeometry, pearl);
      const angle = index * 0.51;
      const radius = 2.5 + (index % 5) * 0.18;
      particle.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.18) * 1.16, Math.sin(angle) * 0.85);
      particle.scale.setScalar(0.72 + (index % 4) * 0.12);
      group.add(particle);
      return particle;
    });

    scene.add(new THREE.AmbientLight('#fff0e5', 1.35));
    const keyLight = new THREE.DirectionalLight('#ffd2bd', 3.1);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);
    const violetLight = new THREE.PointLight('#d7b7ff', 1.8, 9);
    violetLight.position.set(-3, 2, 3);
    scene.add(violetLight);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    mount.addEventListener('pointermove', handlePointerMove);

    let animationFrame = 0;
    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      group.rotation.y += (pointer.x * 0.34 + Math.sin(elapsed * 0.28) * 0.08 - group.rotation.y) * 0.045;
      group.rotation.x += (pointer.y * 0.16 + Math.sin(elapsed * 0.22) * 0.06 - group.rotation.x) * 0.045;
      compact.rotation.z += 0.004;
      lipstick.rotation.y += 0.006;
      brush.position.y = -0.74 + Math.sin(elapsed * 1.25) * 0.09;

      particles.forEach((particle, index) => {
        particle.position.y += Math.sin(elapsed * 1.3 + index) * 0.0012;
        particle.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });

    resizeObserver.observe(mount);
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      mount.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      particleGeometry.dispose();
      pearl.dispose();
      roseGold.dispose();
      garnet.dispose();
      blackLacquer.dispose();
      glass.dispose();
    };
  }, []);

  return <div className="orbit-scene" ref={mountRef} aria-hidden="true" />;
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(58);

  return (
    <div className="before-after">
      <div className="ba-stage">
        <img
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=88"
          alt="Before beauty preparation with professional makeup tools"
        />
        <div className="ba-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=88"
            alt="After luxury beauty styling with polished makeup and hair"
          />
        </div>
        <div className="ba-divider" style={{ left: `${position}%` }}>
          <span />
        </div>
        <span className="ba-label ba-label-before">Before</span>
        <span className="ba-label ba-label-after">After</span>
      </div>
      <input
        aria-label="Before and after reveal"
        type="range"
        min="18"
        max="82"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 1100);

    return () => window.clearTimeout(timer);
  }, []);

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryImages;
    }

    return galleryImages.filter((image) => image.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="luxury-page">
      {!isLoaded && (
        <div className="luxury-loader" aria-label="Loading Maison Glow">
          <div className="loader-orbit">
            <span />
            <span />
            <span />
          </div>
          <p>Maison Glow</p>
        </div>
      )}
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
      <section className="hero-section" id="home">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury makeup studio with premium beauty products and soft editorial lighting"
        />
        <div className="hero-vignette" />
        <BeautyThreeScene />
        <nav className="top-nav" aria-label="Primary navigation">
          <a className="brand" href="#home">
            Maison Glow
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#booking">Book</a>
          </div>
          <a className="nav-cta" href="#booking">
            Enquire Now
          </a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Premium boutique beauty studio</p>
          <h1>Maison Glow</h1>
          <p className="hero-copy">
            Luxury bridal makeup, refined hair styling, and skin-first beauty rituals designed for women who want to look
            unforgettable without losing themselves in the look.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#booking">
              Book Your Signature Appointment <ChevronRight size={18} />
            </a>
            <a className="secondary-button" href="#gallery">
              View Portfolio
            </a>
          </div>
          <div className="trust-strip" aria-label="Studio highlights">
            {trustItems.map((item) => (
              <span key={item}>
                <Check size={15} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="intro-section">
        <Section3DAccent variant="pearl" />
        <div className="intro-heading">
          <p className="eyebrow dark">About the artist</p>
          <h2>Quiet luxury, shaped around your face.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Maison Glow is a boutique beauty studio for clients who want polish without excess. The artistry begins with
            your skin, features, outfit, jewelry, ceremony timing, and how the look will move through real light,
            photography, and celebration.
          </p>
          <p>
            Every appointment is calm, private, and precise. Expect thoughtful skin prep, refined sculpting, elegant eyes,
            soft-touch hair finishing, and a final look that feels expensive because it feels considered.
          </p>
        </div>
        <div className="proof-ribbon" aria-label="Studio credibility">
          {proofPoints.map((point) => (
            <span key={point.label}>
              <strong>{point.value}</strong>
              {point.label}
            </span>
          ))}
        </div>
      </section>

      <section className="orbit-section">
        <div className="orbit-copy">
          <p className="eyebrow dark">The Maison experience</p>
          <h2>A 3D beauty world built around ceremony, camera, and confidence.</h2>
          <p>
            This immersive section gives the mockup a true premium signature: a moving vanity universe with cosmetics,
            pearls, glass, and soft studio light that reacts to the visitor's pointer.
          </p>
          <div className="orbit-notes">
            <span>Interactive product orbit</span>
            <span>Luxury editorial mood</span>
            <span>Mobile-safe visual depth</span>
          </div>
        </div>
        <BeautyOrbitScene />
      </section>

      <section className="services-section" id="services">
        <Section3DAccent variant="ribbon" />
        <div className="section-heading">
          <p className="eyebrow dark">Services menu</p>
          <h2>Curated beauty services with clear, premium intent.</h2>
          <p>
            These sample packages feel realistic for a high-end salon mockup while leaving room for the client to
            confirm exact pricing, inclusions, and event policies.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card tilt-card" key={service.title}>
              <div className="service-icon">
                <Sparkles size={20} />
              </div>
              <h3>{service.title}</h3>
              <p className="price">{service.price}</p>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="packages-section">
        <Section3DAccent variant="compact" />
        <div className="section-heading">
          <p className="eyebrow dark">Signature packages</p>
          <h2>Make the choice feel effortless.</h2>
          <p>
            Premium clients want clarity fast. These package cards help brides and event clients understand what to book
            without reading a long menu.
          </p>
        </div>
        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card tilt-card" key={item.name}>
              <span>{item.time}</span>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <a href="#booking">Request this package <ChevronRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <Section3DAccent variant="crystal" />
        <img
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1500&q=88"
          alt="Elegant beauty products and brushes arranged for a premium studio consultation"
        />
        <div className="experience-copy">
          <p className="eyebrow dark">Studio ritual</p>
          <h2>A composed experience before the first brush touches skin.</h2>
          <p>
            The studio flow is designed like a private dressing suite: consultation, skin preparation, product selection,
            hair direction, draping checks, and final portrait review. Nothing feels rushed. Nothing feels accidental.
          </p>
          <div className="ritual-list">
            {rituals.map((item, index) => (
              <span key={item}>
                {index === 0 && <Gem size={18} />}
                {index === 1 && <WandSparkles size={18} />}
                {index === 2 && <Heart size={18} />}
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="transformation-section">
        <div className="section-heading">
          <p className="eyebrow dark">Before and after</p>
          <h2>A transformation reveal built for premium beauty proof.</h2>
          <p>
            A luxury beauty site needs tactile proof. This interactive slider gives visitors a simple, visual way to
            feel the difference between preparation and the final polished look.
          </p>
        </div>
        <BeforeAfterSlider />
      </section>

      <section className="journey-section">
        <div className="section-heading">
          <p className="eyebrow dark">Client journey</p>
          <h2>From first consultation to final portrait check.</h2>
        </div>
        <div className="journey-track">
          {journeySteps.map((step, index) => (
            <article className="journey-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <Section3DAccent variant="mirror" />
        <div className="section-heading">
          <p className="eyebrow dark">Portfolio direction</p>
          <h2>Image direction that makes the mockup feel editorial.</h2>
          <p>
            Use warm, close, high-resolution beauty imagery: real skin texture, soft directional light, visible hands,
            premium product details, bridal jewelry, finished hair, and confident client expressions. Avoid flat stock
            smiles and over-filtered skin.
          </p>
        </div>
        <div className="portfolio-tabs" aria-label="Portfolio filters">
          {galleryCategories.map((category) => (
            <button
              className={category === activeCategory ? 'active' : ''}
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {filteredGallery.map((image) => (
            <motion.article
              className="gallery-item tilt-card"
              key={image.title}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <img src={image.src} alt={image.description} />
              <div>
                <span>{image.category}</span>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="compare-section">
        <div className="section-heading">
          <p className="eyebrow dark">Package comparison</p>
          <h2>Three clear ways to book the Maison Glow experience.</h2>
        </div>
        <div className="compare-grid">
          {comparisonPackages.map((item) => (
            <article className={item.name === 'Signature' ? 'compare-card featured' : 'compare-card'} key={item.name}>
              <span>{item.name}</span>
              <h3>{item.price}</h3>
              <p>{item.detail}</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} /> {feature}
                  </li>
                ))}
              </ul>
              <a href="#booking">Choose {item.name}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <Section3DAccent variant="pearl" />
        <div className="section-heading">
          <p className="eyebrow dark">Client love</p>
          <h2>Trust signals that feel human, not generic.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card tilt-card" key={testimonial.name}>
              <div className="stars" aria-label="Five star review">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"{testimonial.quote}"</p>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.event}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="details-section">
        <Section3DAccent variant="ribbon" />
        <div className="section-heading">
          <p className="eyebrow dark">What clients need to know</p>
          <h2>Small details that make the booking feel premium.</h2>
        </div>
        <div className="details-grid">
          <article>
            <ShieldCheck size={22} />
            <h3>Hygiene & product care</h3>
            <p>Brushes, tools, palettes, and applicators are sanitized between appointments with a clean-kit setup.</p>
          </article>
          <article>
            <Clock size={22} />
            <h3>Timing guidance</h3>
            <p>Bridal bookings are best reserved 4-8 weeks in advance. Event bookings are recommended 7-14 days ahead.</p>
          </article>
          <article>
            <Sparkles size={22} />
            <h3>Look planning</h3>
            <p>Clients can share outfit, jewelry, hair, and makeup references so the final direction feels cohesive.</p>
          </article>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-section" id="booking">
        <Section3DAccent variant="compact" />
        <div className="booking-copy">
          <p className="eyebrow dark">Reserve your appointment</p>
          <h2>Share the occasion. Receive a curated beauty plan.</h2>
          <p>
            This enquiry form captures the essentials a premium studio needs before confirming availability: event type,
            timing, location, number of clients, desired mood, and styling references.
          </p>
          <div className="contact-list">
            <span><Phone size={18} /> +91 98765 43210</span>
            <span><Mail size={18} /> appointments@maisonglow.com</span>
            <span><MapPin size={18} /> Boutique studio and on-location bookings</span>
          </div>
        </div>
        <form
          className="booking-form"
          onSubmit={(event) => {
            event.preventDefault();
            setIsSubmitted(true);
          }}
        >
          <label>
            Full Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Phone Number
            <input type="tel" placeholder="+91 98765 43210" />
          </label>
          <label>
            Email Address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Service Interested In
            <select defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>The Bride Atelier</option>
              <option>Engagement Radiance</option>
              <option>Evening Signature</option>
              <option>Couture Hair Styling</option>
              <option>Skin-First Ritual</option>
            </select>
          </label>
          <label>
            Preferred Date
            <input type="date" />
          </label>
          <label>
            Preferred Time
            <input type="time" />
          </label>
          <label>
            Event Location
            <input type="text" placeholder="Studio visit or venue address" />
          </label>
          <label>
            Number of People
            <input type="number" min="1" placeholder="1" />
          </label>
          <label className="wide">
            Desired Look / Inspiration Notes
            <textarea placeholder="Soft bridal glow, refined matte glam, outfit colors, jewelry style, hair preference, skin concerns..." />
          </label>
          {isSubmitted && (
            <div className="form-success" role="status">
              <Sparkles size={18} /> Request received. The studio will respond with availability and package details.
            </div>
          )}
          <button type="submit" className="primary-button form-button">
            <CalendarDays size={18} /> Request Availability
          </button>
        </form>
      </section>
      <a className="whatsapp-float" href="https://wa.me/919876543210" aria-label="Chat on WhatsApp">
        <Send size={18} /> WhatsApp
      </a>
      <a className="sticky-booking" href="#booking">
        <CalendarDays size={18} /> Book Appointment
      </a>
    </main>
  );
}

export default App;
