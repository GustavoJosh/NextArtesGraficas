// src/components/ui/CircularGallery.tsx - Versión Final Corregida
"use client";

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

// --- DEFINICIONES DE TIPOS (TypeScript) ---
type OGLRenderer = any;
type OGLCamera = any;
type OGLTransform = any;
type OGLPlane = any;
type OGLMesh = any;
type OGLProgram = any;
type OGLTexture = any;
type OGLContext = any;

interface GalleryItem {
  text: string;
  image: string;
  description: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  spacing?: number | null;
  cardSize?: 'small' | 'normal' | 'large';
}

interface Screen {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

// --- FUNCIONES DE AYUDA (Helpers) ---

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

function createTextTexture(gl: OGLContext, text: string, font: string = "bold 30px monospace", color: string = "black") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2d context");

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

// --- CLASES CON TIPADO ---

class Title {
    gl: OGLContext;
    plane: OGLMesh;
    text: string;
    textColor: string;
    font: string;
    isMobile: boolean;
    mesh: OGLMesh;

    constructor({ gl, plane, text, textColor, font, isMobile }: { gl: OGLContext; plane: OGLMesh; text: string; textColor: string; font: string; isMobile: boolean }) {
        this.gl = gl;
        this.plane = plane;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.isMobile = isMobile;
        this.mesh = this.createMesh();
    }

    createMesh(): OGLMesh {
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

        const mesh = new Mesh(this.gl, { geometry, program });
        const aspect = width / height;

        const textHeightMultiplier = this.isMobile ? 0.12 : 0.15;
        const textHeight = this.plane.scale.y * textHeightMultiplier;
        const textWidth = textHeight * aspect;

        mesh.scale.set(textWidth, textHeight, 1);
        mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
        mesh.setParent(this.plane);
        return mesh;
    }
}

class Media {
    extra: number = 0;
    geometry: OGLPlane;
    gl: OGLContext;
    image: string;
    index: number;
    length: number;
    scene: OGLTransform;
    screen!: Screen;
    text: string;
    viewport!: Viewport;
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    isMobile: boolean;
    spacing: number | null;
    cardSize: 'small' | 'normal' | 'large';

    program: OGLProgram;
    plane: OGLMesh;
    title: Title;
    scale: number = 1;
    padding: number = 0;
    width: number = 0;
    widthTotal: number = 0;
    x: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;

    constructor({ geometry, gl, image, index, length, scene, text, bend, textColor, borderRadius, font, isMobile, spacing, cardSize }: any) {
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.scene = scene;
        this.text = text;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.isMobile = isMobile;
        this.spacing = spacing;
        this.cardSize = cardSize;

        this.program = this.createShader();
        this.plane = this.createMesh();
        this.title = this.createTitle();
    }

    createShader(): OGLProgram {
        const texture = new Texture(this.gl, { generateMipmaps: false });
        const program = new Program(this.gl, {
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
            program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
        };
        return program;
    }

    createMesh(): OGLMesh {
        const plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program,
        });
        plane.setParent(this.scene);
        return plane;
    }

    createTitle(): Title {
        return new Title({
            gl: this.gl,
            plane: this.plane,
            text: this.text,
            textColor: this.textColor,
            font: this.font,
            isMobile: this.isMobile,
        });
    }

    onResize({ screen, viewport }: { screen?: Screen, viewport?: Viewport } = {}) {
        if (screen) this.screen = screen;
        if (viewport) this.viewport = viewport;

        if (!this.screen || !this.viewport) return;
        
        // FIX: Se definen los tipos para que TypeScript no se queje de la indexación implícita.
        type CardSizeConfig = { base: number; width: number; height: number; };
        type CardConfig = { mobile: CardSizeConfig; desktop: CardSizeConfig; };

        const cardSizes: Record<'small' | 'normal' | 'large', CardConfig> = {
            small: { mobile: { base: 1600, width: 400, height: 500 }, desktop: { base: 1800, width: 500, height: 650 } },
            normal: { mobile: { base: 1400, width: 500, height: 600 }, desktop: { base: 1600, width: 600, height: 800 } },
            large: { mobile: { base: 1200, width: 600, height: 700 }, desktop: { base: 1400, width: 700, height: 900 } }
        };
        
        const sizeConfig = cardSizes[this.cardSize];
        const config = this.isMobile ? sizeConfig.mobile : sizeConfig.desktop;

        this.scale = this.screen.height / config.base;
        this.plane.scale.y = (this.viewport.height * (config.height * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (config.width * this.scale)) / this.screen.width;
        this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

        if (this.spacing !== null) {
            this.padding = this.spacing;
        } else {
            // FIX: Tipado para el objeto de espaciado.
            const spacingConfig: Record<'small' | 'normal' | 'large', number> = {
                small: this.isMobile ? 4 : 5,
                normal: this.isMobile ? 3 : 4,
                large: this.isMobile ? 2.5 : 3
            };
            this.padding = spacingConfig[this.cardSize];
        }

        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }

    update(scroll: { current: number }, direction: 'left' | 'right') {
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
    container: HTMLElement;
    items: GalleryItem[];
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    spacing: number | null;
    cardSize: 'small' | 'normal' | 'large';
    isMobile: boolean;

    scroll: { ease: number; current: number; target: number; last: number; position: number };
    isDown: boolean = false;
    touchStartTime: number = 0;
    touchStartX: number = 0;
    velocity: number = 0;
    isScrolling: boolean = false;
    
    renderer: OGLRenderer;
    gl: OGLContext;
    camera: OGLCamera;
    scene: OGLTransform;
    planeGeometry: OGLPlane;
    medias: Media[] = [];
    raf: number = 0;
    screen!: Screen;
    viewport!: Viewport;
    start: number = 0;

    onCheckDebounce: () => void;

    constructor(container: HTMLElement, { items, bend, textColor, borderRadius, font, spacing, cardSize }: CircularGalleryProps) {
        this.container = container;
        this.items = items || [];
        this.bend = bend || -2;
        this.textColor = textColor || "#ffffff";
        this.borderRadius = borderRadius || 0.05;
        this.font = font || "bold 24px 'Inter', sans-serif";
        this.spacing = spacing === undefined ? null : spacing;
        this.cardSize = cardSize || "normal";
        
        this.isMobile = isMobile();
        
        const scrollEase = this.isMobile ? 0.08 : 0.05;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
        
        this.renderer = this.createRenderer();
        this.gl = this.renderer.gl;
        this.camera = this.createCamera();
        this.scene = new Transform();
        this.planeGeometry = this.createGeometry();
        this.onResize(); 
        this.createMedias();
        this.addEventListeners();
        
        this.onCheckDebounce = debounce(this.onCheck, this.isMobile ? 100 : 200);
        this.update();
    }

    createRenderer(): OGLRenderer {
        const rendererOptions = {
            alpha: true,
            antialias: !this.isMobile,
            powerPreference: this.isMobile ? "low-power" : "high-performance"
        };
        const renderer = new Renderer(rendererOptions);
        this.container.appendChild(renderer.gl.canvas);
        return renderer;
    }

    createCamera(): OGLCamera {
        const camera = new Camera(this.gl);
        camera.fov = this.isMobile ? 50 : 45;
        camera.position.z = 20;
        return camera;
    }

    createGeometry(): OGLPlane {
        const segments = this.isMobile ? 5 : 10;
        return new Plane(this.gl, { heightSegments: segments, widthSegments: segments });
    }

    createMedias() {
        const galleryItems = this.items.concat(this.items);
        this.medias = galleryItems.map((data, index) => new Media({
            geometry: this.planeGeometry,
            gl: this.gl,
            image: data.image,
            index,
            length: galleryItems.length,
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
        this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }

    // FIX: Se usan arrow functions para mantener el contexto de 'this' sin necesidad de 'bind'.
    onTouchDown = (e: TouchEvent | MouseEvent) => {
        this.isDown = true;
        this.isScrolling = false;
        this.scroll.position = this.scroll.current;
        this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
        
        this.touchStartTime = Date.now();
        this.touchStartX = this.start;
        this.velocity = 0;
        
        if ('touches' in e) {
            // e.preventDefault(); // Considerar si es necesario, puede bloquear el scroll vertical
        }
    }

    onTouchMove = (e: TouchEvent | MouseEvent) => {
        if (!this.isDown) return;
        
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.isMobile ? 0.03 : 0.05);
        this.scroll.target = this.scroll.position + distance;
        
        const now = Date.now();
        const deltaTime = now - this.touchStartTime;
        if (deltaTime > 0) {
            this.velocity = (x - this.touchStartX) / deltaTime;
        }
        
        this.isScrolling = true;
    }

    onTouchUp = (e: TouchEvent | MouseEvent) => {
        if (!this.isDown) return;
        
        this.isDown = false;
        
        if (this.isMobile && Math.abs(this.velocity) > 0.1) {
            const inertia = this.velocity * -50;
            this.scroll.target += inertia;
        }
        
        setTimeout(this.onCheck, this.isMobile ? 50 : 100);
    }

    onWheel = (e: WheelEvent) => {
        const multiplier = this.isMobile ? 0.005 : 0.01;
        this.scroll.target += e.deltaY * multiplier;
        this.onCheckDebounce();
    }

    onCheck = () => {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        if(width === 0) return;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize = () => {
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

    update = () => {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize, { passive: true });
        
        if (this.isMobile) {
            this.container.addEventListener('touchstart', this.onTouchDown, { passive: true });
            window.addEventListener('touchmove', this.onTouchMove, { passive: true });
            window.addEventListener('touchend', this.onTouchUp, { passive: true });
            window.addEventListener('wheel', this.onWheel, { passive: true });
        } else {
            window.addEventListener('wheel', this.onWheel, { passive: true });
            this.container.addEventListener('mousedown', this.onTouchDown);
            window.addEventListener('mousemove', this.onTouchMove);
            window.addEventListener('mouseup', this.onTouchUp);
        }
    }
    
    destroy() {
        if (this.raf) {
            window.cancelAnimationFrame(this.raf);
        }
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('wheel', this.onWheel);
        
        this.container.removeEventListener('touchstart', this.onTouchDown);
        this.container.removeEventListener('mousedown', this.onTouchDown);

        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchend', this.onTouchUp);
        window.removeEventListener('mousemove', this.onTouchMove);
        window.removeEventListener('mouseup', this.onTouchUp);

        if (this.gl?.canvas && this.container?.contains(this.gl.canvas)) {
            this.container.removeChild(this.gl.canvas);
        }
    }
}


export default function CircularGallery({
    items,
    bend = -2,
    textColor = "#ffffff",
    borderRadius = 0.05,
    font = "bold 24px 'Inter', sans-serif",
    spacing = null,
    cardSize = "normal"
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
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
            <div
                ref={containerRef}
                className={`
          w-full overflow-hidden cursor-grab active:cursor-grabbing
          ${isMobileDevice ? 'h-[400px]' : 'h-[500px]'}
        `}
                style={{
                    touchAction: 'pan-y pinch-zoom',
                }}
            />

            {isMobileDevice && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/60 text-sm pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    <span>Desliza para explorar</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </div>
            )}
        </div>
    );
}