"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { Placeholder } from "@/components/Placeholder";
import { featuredProducts, type Product, type ProductForm } from "@/content/products";
import { CROSSFADE_FRAMES, frameConfig, framePath, LITE_MODE_STEP } from "@/config/frames";


type ScrollJourneyProps = { marketMap: ReactNode };
type ConnectionInfo = { saveData?: boolean; effectiveType?: string };
type NavigatorWithHints = Navigator & { deviceMemory?: number; connection?: ConnectionInfo };

function isLiteDevice() {
  const device = navigator as NavigatorWithHints;
  return window.innerWidth < 768 || (device.deviceMemory !== undefined && device.deviceMemory <= 4) ||
    device.connection?.saveData === true || ["slow-2g", "2g", "3g"].includes(device.connection?.effectiveType ?? "");
}

function FeaturedCard({ product, locale, formLabel }: { product: Product; locale: "ar" | "en"; formLabel: (form: ProductForm) => string }) {
  const name = product.name[locale];
  return (
    <Link className="journey-product-card" href={`/products/${product.slug}`}>
      <Placeholder label={name} className="journey-product-image">
        {product.images[0]
          ? <Image src={product.images[0]} alt="" aria-hidden="true" fill sizes="(max-width: 600px) 45vw, 20vw" className="product-card-photo" />
          : <span className="product-glyph" aria-hidden="true">{name.slice(0, 1)}</span>}
      </Placeholder>
      <span className="journey-product-name">{name}</span>
      <span className="journey-product-forms">{product.forms.slice(0, 2).map(formLabel).join(" · ")}</span>
    </Link>
  );
}

export function ScrollJourney({ marketMap }: ScrollJourneyProps) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("landing");
  const formsT = useTranslations("forms");
  const certificationsT = useTranslations("certifications");
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeScene, setActiveScene] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liteMode, setLiteMode] = useState(false);
  const [ready, setReady] = useState(false);

  const formLabel = useCallback((form: ProductForm) => formsT(form), [formsT]);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncSettings = () => {
      setReducedMotion(reduceQuery.matches);
      setLiteMode(isLiteDevice());
    };
    syncSettings();
    reduceQuery.addEventListener("change", syncSettings);
    window.addEventListener("resize", syncSettings, { passive: true });
    return () => {
      reduceQuery.removeEventListener("change", syncSettings);
      window.removeEventListener("resize", syncSettings);
    };
  }, []);

  useEffect(() => {
    if (
      reducedMotion ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !stage || !track || !context) return;

    gsap.registerPlugin(ScrollTrigger);
    const frameStep = liteMode ? LITE_MODE_STEP : 1;
    const frames = Array.from({ length: Math.ceil(frameConfig.framesPerScene / frameStep) }, (_, i) => i * frameStep + 1);
    const frameCache = new Map<string, HTMLImageElement>();
    const frameLoads = new Map<string, Promise<void>>();
    const overlays = overlayRefs.current;
    let activeScene = 0;
    let currentFrame = 0;
    let disposed = false;
    let drawRequest = 0;
    let lastDrawnKey = "";

    const drawGradient = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rootStyle = getComputedStyle(document.documentElement);
      const bg = rootStyle.getPropertyValue("--green").trim();
      const surface = rootStyle.getPropertyValue("--bg").trim();
      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, surface);
      gradient.addColorStop(0.5, bg);
      gradient.addColorStop(1, rootStyle.getPropertyValue("--green-ink").trim());
      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);
      context.globalAlpha = 0.14;
      context.fillStyle = surface;
      context.beginPath();
      context.ellipse(rect.width * 0.8, rect.height * 0.78, rect.width * 0.36, rect.height * 0.28, -0.35, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;
    };

    const drawImageCover = (image: HTMLImageElement, alpha = 1) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.globalAlpha = alpha;
      context.drawImage(image, (rect.width - width) / 2, (rect.height - height) / 2, width, height);
      context.globalAlpha = 1;
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
      context.globalAlpha = 0.35;
      context.fillRect(0, 0, rect.width, rect.height);
      context.globalAlpha = 1;
    };

    const findNearestFrame = (scene: number, frame: number) => {
      const desired = framePath(scene + 1, frame);
      if (frameCache.has(desired)) return [desired, frameCache.get(desired)!] as const;
      for (let distance = 1; distance < frames.length; distance += 1) {
        const before = frames[frames.indexOf(frame) - distance];
        const after = frames[frames.indexOf(frame) + distance];
        if (before !== undefined) {
          const key = framePath(scene + 1, before);
          const image = frameCache.get(key);
          if (image) return [key, image] as const;
        }
        if (after !== undefined) {
          const key = framePath(scene + 1, after);
          const image = frameCache.get(key);
          if (image) return [key, image] as const;
        }
      }
      return null;
    };

    const drawCurrent = () => {
      drawRequest = 0;
      if (disposed) return;
      const desiredFrame = frames[Math.min(frames.length - 1, currentFrame)] ?? 1;
      const nearest = findNearestFrame(activeScene, desiredFrame);
      if (!nearest) return;
      const dissolveStartIndex = frames.length - Math.ceil(CROSSFADE_FRAMES / frameStep);
      const dissolve = activeScene < frameConfig.scenes - 1
        ? Math.max(0, Math.min(1, (currentFrame - dissolveStartIndex) / (frames.length - 1 - dissolveStartIndex)))
        : 0;
      drawImageCover(nearest[1]);
      if (dissolve > 0) {
        const nextFrames = frames;
        const dissolveFrames = Math.min(Math.ceil(CROSSFADE_FRAMES / frameStep), nextFrames.length);
        const incomingIndex = Math.min(dissolveFrames - 1, Math.round(dissolve * (dissolveFrames - 1)));
        const incoming = frameCache.get(framePath(activeScene + 2, nextFrames[incomingIndex]));
        if (incoming) drawImageCover(incoming, dissolve);
      }
      if (nearest[0] !== lastDrawnKey) lastDrawnKey = nearest[0];
    };

    const scheduleDraw = () => {
      if (!drawRequest) drawRequest = window.requestAnimationFrame(drawCurrent);
    };

    const trimCache = () => {
      const activeActualFrame = currentFrame * frameStep + 1;
      for (const key of frameCache.keys()) {
        const match = key.match(/scene-(\d+)\//);
        const sceneNumber = match ? Number(match[1]) : 0;
        const frameMatch = key.match(/\/(\d+)\./);
        const frameNumber = frameMatch ? Number(frameMatch[1]) : 0;
        const offset = sceneNumber - (activeScene + 1);
        const keepCurrentWindow = offset === 0 && Math.abs(frameNumber - activeActualFrame) <= frameStep * 4;
        const keepNextDissolve = offset === 1 && activeActualFrame >= frameConfig.framesPerScene - CROSSFADE_FRAMES - 1 && frameNumber <= CROSSFADE_FRAMES + 1;
        const keepPreviousEdge = offset === -1 && activeActualFrame <= CROSSFADE_FRAMES + 1 && frameNumber >= frameConfig.framesPerScene - CROSSFADE_FRAMES - 1;
        if (!keepCurrentWindow && !keepNextDissolve && !keepPreviousEdge) {
          const image = frameCache.get(key);
          if (image) image.src = "";
          frameCache.delete(key);
        }
      }
    };

    const loadFrame = (scene: number, frame: number) => {
      if (Math.abs(scene - activeScene) > 1) return Promise.resolve();
      const key = framePath(scene + 1, frame);
      if (frameCache.has(key)) return Promise.resolve();
      const existing = frameLoads.get(key);
      if (existing) return existing;
      const promise = new Promise<void>((resolve) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => {
          frameLoads.delete(key);
          const offset = scene - activeScene;
          const activeActualFrame = currentFrame * frameStep + 1;
          const isRelevant = offset === 0
            ? Math.abs(frame - activeActualFrame) <= frameStep * 4
            : offset === 1
              ? activeActualFrame >= frameConfig.framesPerScene - 16 && frame <= 16
              : activeActualFrame <= 16 && frame >= frameConfig.framesPerScene - 16;
          if (!disposed && Math.abs(offset) <= 1 && isRelevant) {
            frameCache.set(key, image);
            trimCache();
            if (scene === activeScene) scheduleDraw();
          }
          resolve();
        };
        image.onerror = () => {
          frameLoads.delete(key);
          resolve();
        };
        image.src = key;
      });
      frameLoads.set(key, promise);
      return promise;
    };

    const preloadWindow = (scene: number, frameIndex = currentFrame) => {
      const jobs: Promise<void>[] = [];
      const range = frames.slice(Math.max(0, frameIndex - 4), Math.min(frames.length, frameIndex + 5));
      for (const frame of range) {
        if (!frameCache.has(framePath(scene + 1, frame))) jobs.push(loadFrame(scene, frame));
      }
      const activeActualFrame = frameIndex * frameStep + 1;
      if (scene < frameConfig.scenes - 1 && activeActualFrame >= frameConfig.framesPerScene - CROSSFADE_FRAMES - 1) {
        for (const frame of frames.filter((item) => item <= CROSSFADE_FRAMES + 1)) {
          if (!frameCache.has(framePath(scene + 2, frame))) jobs.push(loadFrame(scene + 1, frame));
        }
      }
      if (scene > 0 && activeActualFrame <= CROSSFADE_FRAMES + 1) {
        for (const frame of frames.filter((item) => item >= frameConfig.framesPerScene - CROSSFADE_FRAMES - 1)) {
          if (!frameCache.has(framePath(scene, frame))) jobs.push(loadFrame(scene - 1, frame));
        }
      }
      void Promise.all(jobs).then(trimCache);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      drawGradient();
      scheduleDraw();
    };

    const setProgress = (value: number) => {
      const safeValue = Math.max(0, Math.min(frameConfig.scenes - 0.001, value));
      const nextScene = Math.floor(safeValue);
      const progress = safeValue - nextScene;
      if (activeScene !== nextScene) {
        activeScene = nextScene;
        setActiveScene(nextScene);
        trimCache();
        preloadWindow(nextScene);
      }
      currentFrame = Math.round(progress * (frames.length - 1));
      preloadWindow(activeScene, currentFrame);
      trimCache();
      stage.style.setProperty("--scene-progress", String(progress));
      overlays.forEach((overlay, index) => {
        if (!overlay) return;
        if (index !== nextScene) {
          overlay.style.opacity = "0";
          return;
        }
        const fadeIn = nextScene === 0 ? 1 : Math.max(0, Math.min(1, (progress - 0.015) / 0.06));
        const fadeOut = Math.max(0, Math.min(1, (0.99 - progress) / 0.08));
        overlay.style.opacity = String(Math.min(fadeIn, fadeOut));
      });
      scheduleDraw();
    };

    drawGradient();
    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(stage);
    const initialFrames = frames.slice(0, Math.min(12, frames.length));
    void Promise.all(initialFrames.map((frame) => loadFrame(0, frame))).then(() => {
      if (disposed) return;
      setReady(true);
      preloadWindow(0);
      scheduleDraw();
    });

    const progressState = { value: 0 };
    setProgress(0);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: stage,
        id: "crest-journey",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    timeline.to(progressState, {
      value: frameConfig.scenes - 0.001,
      duration: frameConfig.scenes,
      ease: "none",
      onUpdate: () => setProgress(progressState.value),
    });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      if (drawRequest) window.cancelAnimationFrame(drawRequest);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      for (const image of frameCache.values()) image.src = "";
      frameCache.clear();
      frameLoads.clear();
    };
  }, [liteMode, reducedMotion]);

  useEffect(() => {
    const jumpToProducts = (event: MouseEvent) => {
      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const useStaticScenes = window.matchMedia("(max-width: 767px)").matches || reduceMotion;
      window.history.replaceState(null, "", `${window.location.pathname}#products`);

      if (useStaticScenes) {
        const productsScene = document.getElementById("products");
        if (productsScene) {
          window.scrollTo({
            top: window.scrollY + productsScene.getBoundingClientRect().top,
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
        return;
      }

      const trigger = ScrollTrigger.getById("crest-journey");
      const track = trackRef.current;
      if (!track) return;
      const start = trigger?.start ?? window.scrollY + track.getBoundingClientRect().top;
      const end = trigger?.end ?? start + track.offsetHeight - window.innerHeight;
      const sceneProgress = 2 / (frameConfig.scenes - 1);
      window.scrollTo({ top: start + (end - start) * sceneProgress, behavior: "smooth" });
    };
    const productJumpLinks = document.querySelectorAll<HTMLAnchorElement>('a[href="#products"]');
    productJumpLinks.forEach((link) => link.addEventListener("click", jumpToProducts));
    return () => productJumpLinks.forEach((link) => link.removeEventListener("click", jumpToProducts));
  }, []);

  const sceneContents = [
    <div className="scene-content hero-content" key="hero">
      <p className="scene-eyebrow">{t("hero.eyebrow")}</p>
      <h1>{t("hero.title")}</h1>
      <p className="scene-description">{t("hero.description")}</p>
    </div>,
    <div className="scene-content split-content" key="care">
      <p className="scene-eyebrow">{t("scenes.care.eyebrow")}</p>
      <h2>{t("scenes.care.title")}</h2>
      <p className="scene-description">{t("scenes.care.body")}</p>
      <Link className="text-link" href="/about">{t("scenes.care.link")} <DirectionalArrow kind="forward" /></Link>
      <div className="certification-row" aria-label={t("scenes.care.certifications")}>
        <span>{certificationsT("globalgap")}</span><span>{certificationsT("iso")}</span>
      </div>
    </div>,
    <div className="scene-content product-content" key="harvest">
      <div className="product-heading">
        <div><p className="scene-eyebrow">{t("scenes.harvest.eyebrow")}</p><h2>{t("scenes.harvest.title")}</h2></div>
        <p>{t("scenes.harvest.body")}</p>
      </div>
      <div className="featured-grid">
        {featuredProducts.map((product) => <FeaturedCard key={product.slug} product={product} locale={locale} formLabel={formLabel} />)}
      </div>
      <Link className="text-link" href="/products">{t("scenes.harvest.all")} <DirectionalArrow kind="forward" /></Link>
    </div>,
    <div className="scene-content split-content" key="packing">
      <p className="scene-eyebrow">{t("scenes.packing.eyebrow")}</p>
      <h2>{t("scenes.packing.title")}</h2>
      <p className="scene-description">{t("scenes.packing.body")}</p>
      <div className="private-label">
        <span className="private-label-title">{t("scenes.packing.privateLabel")}</span>
        <span className="private-label-description">{t("scenes.packing.privateLabelBody")}</span>
      </div>
    </div>,
    <div className="scene-content split-content" key="shipping">
      <p className="scene-eyebrow">{t("scenes.shipping.eyebrow")}</p>
      <h2>{t("scenes.shipping.title")}</h2>
      <p className="scene-description">{t("scenes.shipping.body")}</p>
      <div className="shipping-forms">
        {(["fresh", "frozen"] as const).map((form) => <span key={form}>{formsT(form)}</span>)}
      </div>
    </div>,
    <div className="scene-content map-content" key="markets">
      <div className="map-content-heading"><div><p className="scene-eyebrow">{t("scenes.markets.eyebrow")}</p><h2>{t("scenes.markets.title")}</h2></div><p>{t("scenes.markets.body")}</p></div>
      {marketMap}
    </div>,
    <div className="scene-content closing-content" key="delivery">
      <p className="scene-eyebrow">{t("scenes.delivery.eyebrow")}</p>
      <h2>{t("scenes.delivery.title")}</h2>
      <p className="scene-description">{t("scenes.delivery.body")}</p>
      <a className="button button-primary" href="#quote">{t("scenes.delivery.quote")}</a>
    </div>,
  ];

  const staticScenes = sceneContents.map((content, index) => (
    <section id={index === 2 ? "products" : undefined} key={`static-${index}`} className={`journey-static-scene journey-static-scene-${index + 1}`} style={{ "--static-frame": `url("${framePath(index + 1, 1)}")` } as CSSProperties}>
      <div className="static-scene-shade" />
      <div className={`journey-overlay journey-overlay-${index + 1}`}>{content}</div>
    </section>
  ));

  return (
    <>
      <div className="journey-static">{staticScenes}</div>
      <div className={`journey-track${liteMode ? " is-lite" : ""}`} ref={trackRef} style={{ "--scene-count": frameConfig.scenes } as CSSProperties}>
        <div className="journey-stage" ref={stageRef}>
          <canvas ref={canvasRef} className="journey-canvas" aria-hidden="true" />
          <div className="journey-shade" aria-hidden="true" />
          {!ready && <div className="journey-loader" role="status"><span className="loader-mark" aria-hidden="true" /><span>{t("loading")}</span></div>}
          {sceneContents.map((content, index) => (
            <div
              key={`overlay-${index}`}
              ref={(element) => { overlayRefs.current[index] = element; }}
              className={`journey-overlay journey-overlay-${index + 1}${activeScene === index ? " is-active" : ""}`}
              aria-hidden={activeScene !== index}
              inert={activeScene !== index}
            >
              {content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
