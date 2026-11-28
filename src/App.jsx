import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LanguageProvider, useTranslation } from "./context/LanguageContext";
import { brand, curatedGallery, photos, scheduleDays, storyChapters } from "./data/weddingData";
import { getGuestNameFromUrl } from "./lib/guest";

import ChapterOpening from "./components/ChapterOpening";
import Navbar from "./components/Navbar";
import Lightbox from "./components/Lightbox";
import HeroSection from "./sections/HeroSection";

import weddingMusic from "./assets/audio/wedding_theme.mp3";

const AmbientFireflies = lazy(() => import("./components/AmbientFireflies"));
const VineNav = lazy(() => import("./components/VineNav"));
const LoveSyncDial = lazy(() => import("./components/LoveSyncDial"));
const FamiliesSection = lazy(() => import("./sections/FamiliesSection"));
const StorySection = lazy(() => import("./sections/StorySection"));
const CelebrationsSection = lazy(() => import("./sections/CelebrationsSection"));
const CountdownSection = lazy(() => import("./sections/CountdownSection"));
const GallerySection = lazy(() => import("./sections/GallerySection"));
const VenueSection = lazy(() => import("./sections/VenueSection"));
const BlessingsSection = lazy(() => import("./sections/BlessingsSection"));
const RsvpSection = lazy(() => import("./sections/RsvpSection"));
const FooterSection = lazy(() => import("./sections/FooterSection"));

const THEME_STORAGE_KEY = "am-chapter-theme";

function preloadCoverImages(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  uniqueUrls.forEach((url, index) => {
    const img = new Image();
    if (index < 2) img.fetchPriority = "high";
    img.decoding = "async";
    img.src = url;
  });
}

function firePistachioConfetti() {
  import("canvas-confetti")
    .then(({ default: confetti }) => {
      confetti({
        particleCount: 48,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#DF6C98", "#E6B45A", "#7C944F", "#6E1A24", "#FDF6EC"],
        disableForReducedMotion: true,
      });
    })
    .catch(() => {});
}

function WeddingInvitationApp() {
  const { lang, t } = useTranslation();
  const [stage, setStage] = useState("closed");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "am" || saved === "pm") return saved;
      } catch {
        // Ignore storage errors
      }
    }
    return "am";
  });
  const [playing, setPlaying] = useState(false);
  const [previewState, setPreviewState] = useState(null);
  const audioRef = useRef(null);
  const guestName = useMemo(() => getGuestNameFromUrl(), []);

  const isUnlocked = stage === "complete";
  const isRevealed = stage !== "closed";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Preload only lightweight Cover + Hero images immediately
    preloadCoverImages([brand.logo, brand.lilyTl, brand.lilyBr, photos.gatefoldCouple]);

    // Gently warm up lazy section JS chunks once idle on the Cover
    const warmChunks = () => {
      void import("./components/LoveSyncDial");
      void import("./sections/FamiliesSection");
      void import("./sections/StorySection");
      void import("./sections/CelebrationsSection");
      void import("./sections/CountdownSection");
      void import("./sections/GallerySection");
      void import("./sections/VenueSection");
      void import("./sections/BlessingsSection");
      void import("./sections/RsvpSection");
      void import("./sections/FooterSection");
      void import("./components/VineNav");
      void import("./components/AmbientFireflies");
    };

    if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(warmChunks, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(warmChunks, 800);
    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", !isUnlocked);
    return () => document.body.classList.remove("locked");
  }, [isUnlocked]);

  useEffect(() => {
    const isPm = theme === "pm";
    document.body.classList.toggle("theme-pm-body", isPm);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", isPm ? "#180d10" : "#fdf6ec");
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
    return () => document.body.classList.remove("theme-pm-body");
  }, [theme]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = 0.52;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const stopPlayback = () => {
      if (!audio.paused) audio.pause();
    };
    const onVisibility = () => {
      if (document.hidden || document.visibilityState === "hidden") stopPlayback();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", stopPlayback);
    window.addEventListener("beforeunload", stopPlayback);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", stopPlayback);
      window.removeEventListener("beforeunload", stopPlayback);
    };
  }, []);

  const handleOpenChapter = useCallback(() => {
    if (stage !== "closed") return;
    setStage("opening");
    firePistachioConfetti();
    audioRef.current?.play().catch(() => {});
  }, [stage]);

  const handleSkipOpening = useCallback((playAudio = true) => {
    setStage("complete");
    if (playAudio) {
      audioRef.current?.play().catch(() => {});
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const albums = useMemo(
    () => ({
      gallery: curatedGallery.map((item) => ({
        src: item.src,
        caption: t(item.caption),
      })),
      events: scheduleDays.flatMap((day) =>
        day.events.map((ev) => ({
          src: ev.image,
          caption: `${t(ev.title)} · ${t(ev.time)}`,
        }))
      ),
      story: storyChapters.map((ch) => ({
        src: ch.art,
        caption: `${t(ch.chapter)} · ${t(ch.title)}`,
      })),
      storyPhotos: storyChapters
        .filter((ch) => ch.tapedPhoto)
        .map((ch) => ({
          src: ch.tapedPhoto.src,
          caption: `${t(ch.chapter)} · ${t(ch.tapedPhoto.caption)}`,
        })),
    }),
    [t]
  );

  const activeAlbum = previewState?.album ? albums[previewState.album] : null;
  const activeLightboxItem = activeAlbum
    ? activeAlbum[previewState.index]
      ? {
          ...activeAlbum[previewState.index],
          index: previewState.index,
          total: activeAlbum.length,
          prevSrc:
            activeAlbum[
              (previewState.index - 1 + activeAlbum.length) % activeAlbum.length
            ].src,
          nextSrc:
            activeAlbum[(previewState.index + 1) % activeAlbum.length].src,
        }
      : null
    : previewState;

  const stepLightbox = (delta) => {
    if (!activeAlbum) return;
    setPreviewState((prev) =>
      prev
        ? {
            ...prev,
            index: (prev.index + delta + activeAlbum.length) % activeAlbum.length,
          }
        : null
    );
  };

  return (
    <div className={`app lang-${lang} theme-${theme}`}>
      <audio ref={audioRef} src={weddingMusic} preload="none" loop />

      <ChapterOpening
        stage={stage}
        guestName={guestName}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "am" ? "pm" : "am"))}
        onOpen={handleOpenChapter}
        onSkip={handleSkipOpening}
      />

      {isUnlocked && (
        <Suspense fallback={null}>
          <AmbientFireflies active={isUnlocked} />
        </Suspense>
      )}

      {isRevealed && (
        <>
          <Suspense fallback={null}>
            <VineNav />
          </Suspense>
          <Navbar
            theme={theme}
            onToggleTheme={() => setTheme((prev) => (prev === "am" ? "pm" : "am"))}
            playing={playing}
            onToggleMusic={toggleMusic}
          />
        </>
      )}

      <Lightbox
        item={activeLightboxItem}
        onClose={() => setPreviewState(null)}
        onPrev={activeAlbum ? () => stepLightbox(-1) : undefined}
        onNext={activeAlbum ? () => stepLightbox(1) : undefined}
      />

      <main className={`scroll-canvas ${isRevealed ? "is-revealed" : ""}`}>
        <HeroSection guestName={guestName} unlocked={isRevealed} />

        {isRevealed && (
          <Suspense fallback={null}>
            <LoveSyncDial />
            <FamiliesSection />
            <StorySection onPreview={setPreviewState} />
            <CelebrationsSection
              onOpenEventLightbox={(index) =>
                setPreviewState({ album: "events", index })
              }
            />
            <CountdownSection />
            <GallerySection
              onOpenGalleryLightbox={(index) =>
                setPreviewState({ album: "gallery", index })
              }
            />
            <VenueSection />
            <BlessingsSection />
            <RsvpSection initialGuest={guestName} />
          </Suspense>
        )}
      </main>

      {isRevealed && (
        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WeddingInvitationApp />
    </LanguageProvider>
  );
}
