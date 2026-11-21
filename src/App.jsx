import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { LanguageProvider, useTranslation } from "./context/LanguageContext";
import { lookbookGallery, photos, scheduleDays, storyChapters } from "./data/weddingData";
import { getGuestNameFromUrl } from "./lib/guest";

import ChapterOpening from "./components/ChapterOpening";
import Navbar from "./components/Navbar";
import VineNav from "./components/VineNav";
import AmbientFireflies from "./components/AmbientFireflies";
import LoveSyncDial from "./components/LoveSyncDial";
import Lightbox from "./components/Lightbox";

import HeroSection from "./sections/HeroSection";
import FamiliesSection from "./sections/FamiliesSection";
import StorySection from "./sections/StorySection";
import CelebrationsSection from "./sections/CelebrationsSection";
import CountdownSection from "./sections/CountdownSection";
import GallerySection from "./sections/GallerySection";
import VenueSection from "./sections/VenueSection";
import BlessingsSection from "./sections/BlessingsSection";
import RsvpSection from "./sections/RsvpSection";
import FooterSection from "./sections/FooterSection";

import weddingMusic from "./assets/audio/wedding_theme.mp3";

function firePistachioConfetti() {
  confetti({
    particleCount: 72,
    spread: 85,
    origin: { y: 0.55 },
    colors: ["#C8DEC2", "#8BB17E", "#E4BD70", "#A63A2E"],
  });
}

function WeddingInvitationApp() {
  const { lang, t } = useTranslation();
  const [stage, setStage] = useState("closed");
  const [theme, setTheme] = useState("am");
  const [playing, setPlaying] = useState(false);
  const [previewState, setPreviewState] = useState(null);
  const audioRef = useRef(null);
  const guestName = useMemo(() => getGuestNameFromUrl(), []);

  const isUnlocked = stage === "complete";
  const isRevealed = stage !== "closed";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Preload and pre-decode all Hero, Family, Story & Celebration images while on Envelope page
    const priorityUrls = [
      photos.gatefoldCouple,
      photos.soloMansi,
      photos.soloAditya,
      ...storyChapters.flatMap((ch) => [ch.art, ch.tapedPhoto?.src]),
      ...scheduleDays.flatMap((d) => d.events.map((ev) => ev.image)),
    ].filter(Boolean);

    const uniqueUrls = [...new Set(priorityUrls)];
    uniqueUrls.forEach((url, index) => {
      const img = new Image();
      if (index < 3) img.fetchPriority = "high";
      img.decoding = "async";
      img.src = url;
      img.decode?.().catch(() => {});
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", !isUnlocked);
    return () => document.body.classList.remove("locked");
  }, [isUnlocked]);

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
    const onWindowBlur = () => {
      if (document.activeElement?.tagName === "IFRAME") return;
      stopPlayback();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", stopPlayback);
    window.addEventListener("beforeunload", stopPlayback);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", stopPlayback);
      window.removeEventListener("beforeunload", stopPlayback);
      window.removeEventListener("blur", onWindowBlur);
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
      gallery: lookbookGallery.map((item) => ({
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
      <audio ref={audioRef} src={weddingMusic} preload="metadata" loop />

      <ChapterOpening
        stage={stage}
        guestName={guestName}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "am" ? "pm" : "am"))}
        onOpen={handleOpenChapter}
        onSkip={handleSkipOpening}
      />

      {stage !== "closed" && (
        <>
          <AmbientFireflies active={isUnlocked} />
          <VineNav />
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
        <LoveSyncDial />
        <FamiliesSection />
        <StorySection onPreview={setPreviewState} />
        <CelebrationsSection
          onOpenEventLightbox={(index) =>
            setPreviewState({ album: "events", index })
          }
        />
        <CountdownSection />
        <GallerySection />
        <VenueSection />
        <BlessingsSection />
        <RsvpSection initialGuest={guestName} />
      </main>

      <FooterSection />
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
