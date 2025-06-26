// components/CircularGallery.jsx - Optimizado para Móvil

"use client"

import { useRef, useEffect, useState } from 'react';
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl';

// --- FUNCIONES DE AYUDA (Helpers) ---

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

// Detectar si es dispositivo móvil
function isMobile() {
  return typeof window !== 'undefined' && (
    window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

// Esta función es para crear una textura a partir de texto (para los títulos)
function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, text, textColor, font, isMobile }) {
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.isMobile = isMobile;
    this.createMesh();
  }

  createMesh() {
    // 📱 Ajustar tamaño de fuente para móvil
    const fontSize = this.isMobile ? "bold 20px" : "bold 24px";
    const adjustedFont = this.font.replace(/\d+px/, fontSize);
    
    const { texture, width, height } = createTextTexture(this.gl, this.text, adjustedFont, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    
    // 📱 Texto más pequeño en móvil
    const textHeightMultiplier = this.isMobile ? 0.12 : 0.15;
    const textHeight = this.plane.scale.y * textHeightMultiplier;
    const textWidth = textHeight * aspect;
    
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font, isMobile, spacing, cardSize }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.isMobile = isMobile;
    this.spacing = spacing;
    this.cardSize = cardSize;

    this.createShader();
    this.createMesh();
    this.createTitle();
    
    if (screen && viewport) {
      this.onResize({ screen, viewport });
    }
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
      isMobile: this.isMobile,
    });
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    if (!this.screen || !this.viewport) {
      return;
    }
    
    // 🔄 Configuración de tamaños de tarjetas
    const cardSizes = {
      small: {
        mobile: { base: 1600, width: 400, height: 500 },
        desktop: { base: 1800, width: 500, height: 650 }
      },
      normal: {
        mobile: { base: 1400, width: 500, height: 600 },
        desktop: { base: 1600, width: 600, height: 800 }
      },
      large: {
        mobile: { base: 1200, width: 600, height: 700 },
        desktop: { base: 1400, width: 700, height: 900 }
      }
    };
    
    // Obtener configuración según el tamaño de tarjeta seleccionado
    const sizeConfig = cardSizes[this.cardSize] || cardSizes.normal;
    const config = this.isMobile ? sizeConfig.mobile : sizeConfig.desktop;
    
    this.scale = this.screen.height / config.base;
    this.plane.scale.y = (this.viewport.height * (config.height * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (config.width * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    // 🔄 Espaciado personalizable o automático
    if (this.spacing !== null) {
      // Usar espaciado personalizado
      this.padding = this.spacing;
    } else {
      // Espaciado automático basado en el tamaño de tarjeta
      const spacingConfig = {
        small: this.isMobile ? 4 : 5,
        normal: this.isMobile ? 3 : 4,
        large: this.isMobile ? 2.5 : 3
      };
      this.padding = spacingConfig[this.cardSize] || spacingConfig.normal;
    }
    
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
}

class App {
    constructor(container, { items, bend, textColor, borderRadius, font, spacing, cardSize }) {
        this.container = container;
        this.items = items;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.spacing = spacing;
        this.cardSize = cardSize;
        
        // 📱 Detectar si es móvil
        this.isMobile = isMobile();
        
        // 📱 Configuración de scroll adaptativa
        const scrollEase = this.isMobile ? 0.08 : 0.05; // Más suave en móvil
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.isDown = false;
        
        // 📱 Variables para touch mejorado
        this.touchStartTime = 0;
        this.touchStartX = 0;
        this.velocity = 0;
        this.isScrolling = false;
        
        this.autoBind();
        this.onCheckDebounce = debounce(this.onCheck, this.isMobile ? 100 : 200);

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.createGeometry();
        this.onResize();
        this.createMedias();
        this.update();
        this.addEventListeners();
    }

    autoBind() {
        ['onResize', 'onWheel', 'onTouchDown', 'onTouchMove', 'onTouchUp', 'onCheck'].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    createRenderer() {
        // 📱 Configuración de renderer optimizada para móvil
        const rendererOptions = {
            alpha: true,
            antialias: !this.isMobile, // Desactivar antialiasing en móvil para mejor performance
            powerPreference: this.isMobile ? "low-power" : "high-performance"
        };
        
        this.renderer = new Renderer(rendererOptions);
        this.gl = this.renderer.gl;
        
        // 📱 Configurar pixel ratio
        const pixelRatio = Math.min(window.devicePixelRatio || 1, this.isMobile ? 2 : 3);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.gl.canvas.style.width = '100%';
        this.gl.canvas.style.height = '100%';
        
        this.container.appendChild(this.gl.canvas);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = this.isMobile ? 50 : 45; // FOV ligeramente mayor en móvil
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }
    
    createGeometry() {
        // 📱 Menor detalle en móvil para mejor performance
        const segments = this.isMobile ? 5 : 10;
        this.planeGeometry = new Plane(this.gl, { 
            heightSegments: segments, 
            widthSegments: segments 
        });
    }

    createMedias() {
        const galleryItems = this.items;
        this.mediasImages = galleryItems.concat(galleryItems);
        this.medias = this.mediasImages.map((data, index) => new Media({
            geometry: this.planeGeometry,
            gl: this.gl,
            image: data.image,
            index,
            length: this.mediasImages.length,
            scene: this.scene,
            screen: this.screen,
            text: data.text,
            viewport: this.viewport,
            bend: this.bend,
            textColor: this.textColor,
            borderRadius: this.borderRadius,
            font: this.font,
            isMobile: this.isMobile,
            spacing: this.spacing,
            cardSize: this.cardSize,
        }));
    }

    // --- MANEJADORES DE EVENTOS MEJORADOS PARA MÓVIL ---
    onTouchDown(e) {
        this.isDown = true;
        this.isScrolling = false;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientX : e.clientX;
        
        // 📱 Guardar tiempo para calcular velocidad
        this.touchStartTime = Date.now();
        this.touchStartX = this.start;
        this.velocity = 0;
        
        // 📱 Prevenir scroll del navegador en móvil
        if (e.touches) {
            e.preventDefault();
        }
    }

    onTouchMove(e) {
        if (!this.isDown) return;
        
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.isMobile ? 0.03 : 0.05); // Menos sensible en móvil
        this.scroll.target = this.scroll.position + distance;
        
        // 📱 Calcular velocidad para inercia
        const now = Date.now();
        const deltaTime = now - this.touchStartTime;
        if (deltaTime > 0) {
            this.velocity = (x - this.touchStartX) / deltaTime;
        }
        
        this.isScrolling = true;
        
        // 📱 Prevenir scroll del navegador
        if (e.touches) {
            e.preventDefault();
        }
    }

    onTouchUp(e) {
        if (!this.isDown) return;
        
        this.isDown = false;
        
        // 📱 Agregar inercia en móvil
        if (this.isMobile && Math.abs(this.velocity) > 0.1) {
            const inertia = this.velocity * -50; // Ajustar multiplicador según preferencia
            this.scroll.target += inertia;
        }
        
        // 📱 Snap más rápido en móvil
        setTimeout(() => {
            this.onCheck();
        }, this.isMobile ? 50 : 100);
        
        if (e.touches) {
            e.preventDefault();
        }
    }

    onWheel(e) {
        // 📱 Scroll diferente para móvil vs desktop
        const multiplier = this.isMobile ? 0.005 : 0.01;
        this.scroll.target += e.deltaY * multiplier;
        this.onCheckDebounce();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        if (!this.container) return;
        
        this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({ aspect: this.screen.width / this.screen.height });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize, { passive: true });
        
        // 📱 Listeners optimizados para móvil
        if (this.isMobile) {
            // Solo eventos táctiles en móvil
            this.container.addEventListener('touchstart', this.onTouchDown, { passive: false });
            window.addEventListener('touchmove', this.onTouchMove, { passive: false });
            window.addEventListener('touchend', this.onTouchUp, { passive: false });
            
            // Wheel con passive para mejor performance
            window.addEventListener('wheel', this.onWheel, { passive: true });
        } else {
            // Eventos completos en desktop
            window.addEventListener('wheel', this.onWheel, { passive: true });
            this.container.addEventListener('mousedown', this.onTouchDown);
            window.addEventListener('mousemove', this.onTouchMove);
            window.addEventListener('mouseup', this.onTouchUp);
            this.container.addEventListener('touchstart', this.onTouchDown, { passive: false });
            window.addEventListener('touchmove', this.onTouchMove, { passive: false });
            window.addEventListener('touchend', this.onTouchUp, { passive: false });
        }
    }

    destroy() {
        if (this.raf) {
            window.cancelAnimationFrame(this.raf);
        }
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('wheel', this.onWheel);
        
        if (this.container) {
            this.container.removeEventListener('mousedown', this.onTouchDown);
            this.container.removeEventListener('touchstart', this.onTouchDown);
        }
        
        window.removeEventListener('mousemove', this.onTouchMove);
        window.removeEventListener('mouseup', this.onTouchUp);
        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchend', this.onTouchUp);
        
        if (this.gl && this.gl.canvas && this.container && this.container.contains(this.gl.canvas)) {
            this.container.removeChild(this.gl.canvas);
        }
    }
}

export default function CircularGallery({
  items,
  bend = -2, // 🔄 Curvatura reducida por defecto (era -3)
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 24px 'Inter', sans-serif",
  spacing = null, // 🔄 Nuevo prop para controlar espaciado personalizado
  cardSize = "normal" // 🔄 Nuevo prop: "small", "normal", "large"
}) {
  const containerRef = useRef(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // 📱 Detectar móvil en cliente
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    
    if (!items || items.length === 0) {
      console.warn('CircularGallery: No items provided');
      return;
    }
    
    const app = new App(containerRef.current, { 
      items, 
      bend, 
      textColor, 
      borderRadius, 
      font,
      spacing,
      cardSize
    });
    
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, spacing, cardSize]);

  return (
    <div className="w-full relative">
      {/* 📱 Altura responsiva */}
      <div 
        ref={containerRef}
        className={`
          w-full overflow-hidden cursor-grab active:cursor-grabbing
          ${isMobileDevice ? 'h-[400px]' : 'h-[500px]'}
        `}
        style={{ 
          touchAction: 'pan-y pinch-zoom', // Permite zoom pero previene scroll horizontal
        }}
      />
      
      {/* 📱 Indicador de swipe para móvil */}
      {isMobileDevice && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/60 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Desliza para explorar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      )}
    </div>
  );
}

/* 
🔧 EJEMPLOS DE USO:

// Curvatura reducida (menos curvatura = más separación visual)
<CircularGallery items={items} bend={-1} />

// Tarjetas pequeñas con más espacio
<CircularGallery items={items} cardSize="small" />

// Espaciado personalizado (mayor número = más separación)
<CircularGallery items={items} spacing={5} />

// Combinación para máxima separación
<CircularGallery 
  items={items} 
  bend={-1.5}           // Poca curvatura
  cardSize="small"      // Tarjetas pequeñas
  spacing={6}           // Mucho espacio entre tarjetas
/>
*/