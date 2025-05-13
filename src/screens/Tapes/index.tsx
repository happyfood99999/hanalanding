import React from "react";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { FloatingModal } from "../../components/ui/FloatingModal";

// Initialize Supabase client
const supabase = createClient(
  'https://vltocvanawajqmezrbah.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdG9jdmFuYXdhanFtZXpyYmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMjY3NzMsImV4cCI6MjA1MjcwMjc3M30._fsAfCZitteHPDvQKo3z8duJUoopkeAoc1gd0p53pVY'
);

// Define K7 background images
const k7Backgrounds = {
  red: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiaift6htxcn4ij2utkkdt2dh2p7twijeede6rhanfm3u2txq3ar7y",
  black: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreigee6myvvwin2qba4shm2nncbp42vctlw55cf64rurxcysttcbqz4",
  white: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreibailpdb4l54cgw34sak5cowlb4j65echkj2a3cjek6gjwng7y5gi"
};

// Define data for navigation items
const navItems = [
  { label: "MEDIA", id: "media" },
  { label: "TOKENOMICS", id: "tokenomics" },
];

interface Tape {
  id: number;
  title: string;
  url: string;
  thumbnail_url: string;
  persona_id?: string;
  created_at: string;
  twitter_url?: string;
  instagram_url?: string;
}

export const Tapes = (): JSX.Element => {
  const [tapes, setTapes] = useState<Tape[]>([]);
  const [playingAssetId, setPlayingAssetId] = useState<number | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const inactivityTimeoutRef = React.useRef<number>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionVideoRef = React.useRef<HTMLVideoElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Fetch tapes from Supabase
  useEffect(() => {
    const fetchTapes = async () => {
      try {
        console.log('Fetching tapes from Supabase...');
        const { data, error } = await supabase
          .from('persona_tapes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          return;
        }

        if (data) {
          console.log('Fetched tapes:', data);
          setTapes(data);
        } else {
          console.log('No data returned from Supabase');
        }
      } catch (err) {
        console.error('Error in fetchTapes:', err);
      }
    };

    fetchTapes();
  }, []);

  // Filter tapes based on search query
  const filteredTapes = tapes.filter(tape => {
    const searchLower = searchQuery.toLowerCase();
    return (
      tape.title.toLowerCase().includes(searchLower) ||
      (tape.persona_id && tape.persona_id.includes(searchLower))
    );
  });

  // Update arrow visibility based on position
  const updateArrowVisibility = (position: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    setShowLeftArrow(position > 0);
    setShowRightArrow(position < maxScroll - 10); // 10px buffer
  };

  // Simple continuous movement effect
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let position = 0;
    const SPEED = 1; // pixels per frame

    const animate = () => {
      if (isPaused || isUserInteracting || searchQuery) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      position += SPEED;
      container.style.transform = `translateX(-${position}px)`;
      updateArrowVisibility(position);

      // Reset position when we've moved the full width
      if (position >= container.scrollWidth / 2) {
        position = 0;
        updateArrowVisibility(0);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isUserInteracting, searchQuery]);

  // Reset position when search query changes
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = 'translateX(0)';
      updateArrowVisibility(0);
    }
  }, [searchQuery]);

  // Handle arrow clicks
  const handleArrowClick = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    setIsUserInteracting(true);
    setIsPaused(true);
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    const currentTransform = scrollContainerRef.current.style.transform;
    const currentPosition = currentTransform ? parseInt(currentTransform.replace('translateX(-', '').replace('px)', '')) : 0;
    
    const targetPosition = direction === 'left' 
      ? Math.max(0, currentPosition - scrollAmount)
      : currentPosition + scrollAmount;
    
    scrollContainerRef.current.style.transform = `translateX(-${targetPosition}px)`;
    updateArrowVisibility(targetPosition);

    // Clear any existing timeout
    if (inactivityTimeoutRef.current) {
      window.clearTimeout(inactivityTimeoutRef.current);
    }

    // Set new timeout to resume movement after 5 seconds of inactivity
    // Only resume if there's no search query
    if (!searchQuery) {
      inactivityTimeoutRef.current = window.setTimeout(() => {
        setIsUserInteracting(false);
        setIsPaused(false);
      }, 5000);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (inactivityTimeoutRef.current) {
        window.clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  // Handle transition video end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleVideoClick = (id: number) => {
    if (playingAssetId === id) {
      setPlayingAssetId(null);
      // Resume automatic movement when video is stopped
      setIsUserInteracting(false);
      setIsPaused(false);
    } else {
      // Play transition effect
      setIsTransitioning(true);
      if (transitionVideoRef.current) {
        transitionVideoRef.current.currentTime = 0;
        transitionVideoRef.current.play();
      }

      setPlayingAssetId(id);
      setIsVideoLoading(true);
      setIsVideoPaused(false); // Ensure new video starts playing
      // Stop automatic movement when video starts
      setIsUserInteracting(true);
      setIsPaused(true);

      // Find and scroll to the TV frame
      const tvFrame = document.querySelector('.aspect-\\[16\\/9\\]');
      if (tvFrame) {
        // Calculate the vertical center position
        const viewportHeight = window.innerHeight;
        const tvFrameRect = tvFrame.getBoundingClientRect();
        const targetScrollY = window.scrollY + tvFrameRect.top - (viewportHeight - tvFrameRect.height) / 2;

        // Scroll to center the TV frame
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle TV frame click for pause/play
  const handleTVFrameClick = () => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsVideoPaused(!isVideoPaused);
    }
  };

  // Helper function to check if a date is today
  const isCreatedToday = (dateString: string) => {
    const today = new Date();
    const createdDate = new Date(dateString);
    return (
      createdDate.getDate() === today.getDate() &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-[50px] p-5 relative bg-[#0f100d]">
      <FloatingModal />
      <div className="p-0 relative w-full max-w-[1280px] aspect-[16/9]">
        <div className="relative w-full aspect-[16/9]" onClick={handleTVFrameClick}>
          <img
            className="absolute w-full h-full top-0 left-0 object-cover"
            alt="Background"
            src="/image.png"
          />

          {playingAssetId ? (
            <>
              <div 
                className="absolute w-[95%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={handleTVFrameClick}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay={!isVideoPaused}
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  onLoadedData={() => {
                    console.log('Video loaded');
                    setIsVideoLoading(false);
                    if (!isVideoPaused && videoRef.current) {
                      videoRef.current.play();
                    }
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                    setIsVideoLoading(false);
                  }}
                  src={tapes.find(t => t.id === playingAssetId)?.url}
                />
                {isVideoPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-15">
                    <div className="w-20 h-20 rounded-full bg-[#FFAF00]/80 flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-12 w-12 text-[#0f100d]" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-15 bg-black/20">
                  <div className="w-16 h-16 border-4 border-[#E6E2DB] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <>
              <img
                className="absolute w-full h-full top-0 left-0 object-cover z-10"
                alt="Grid animation"
                src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicmndopzz6rohgjod6gidkw25nyyw73siwqlac3hna66clpozylbu"
              />
              <style>
                {`
                  @font-face {
                    font-family: 'Abduction2002';
                    src: url('https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreieyti5uignaeud3v5zw47ft7asf4ubnuh3pcmpakysaei2wt6ktvq') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                  }
                `}
              </style>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#E6E2DB] z-20 text-center">
                <div style={{ 
                  fontFamily: 'Abduction2002',
                  fontSize: '4vw',
                  lineHeight: '1.2',
                  letterSpacing: '0.1em'
                }}>
                  Select Persona Tape
                </div>
              </div>
            </>
          )}

          {!playingAssetId && (
            <img
              className="absolute w-full h-full top-0 left-0 object-cover z-20"
              alt="Stars background"
              src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/stars.png"
            />
          )}

          {/* Static overlay video - always playing */}
          <video
            className="absolute w-full h-full top-0 left-0 object-cover opacity-40 mix-blend-screen z-[85]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicwwpmjnrn7trzr75bw4tiohnnsz5tcwuepn2wfpccnkuydlajjce"
          />

          {/* Transition video */}
          <video
            ref={transitionVideoRef}
            className={`absolute w-full h-full top-0 left-0 object-cover opacity-40 mix-blend-screen z-[85] ${isTransitioning ? '' : 'hidden'}`}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onEnded={handleTransitionEnd}
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicbwrd2odhszbyk6fozqsezzhhurpb2gruvhkt7o3pepoz4cd4gm4"
          />

          <img
            className="absolute w-full h-full top-0 left-0 object-cover z-50"
            alt="TV border"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/tv-border.png"
          />

          {/* TV texture overlays */}
          {/* Top Left Corner - Original orientation, crop from bottom */}
          <img
            className="w-1/2 h-1/2 top-0 left-0 absolute object-cover object-top z-[150]"
            alt="TV texture top left"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/tv_texture_coin.png"
          />
          
          {/* Top Right Corner - Flip horizontally, crop from bottom */}
          <img
            className="w-1/2 h-1/2 top-0 right-0 absolute object-cover object-top scale-x-[-1] z-[150]"
            alt="TV texture top right"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/tv_texture_coin.png"
          />
          
          {/* Bottom Left Corner - Flip vertically, crop from top */}
          <img
            className="w-1/2 h-1/2 bottom-0 left-0 absolute object-cover object-top scale-y-[-1] z-[150]"
            alt="TV texture bottom left"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/tv_texture_coin.png"
          />
          
          {/* Bottom Right Corner - Flip both horizontally and vertically, crop from top */}
          <img
            className="w-1/2 h-1/2 bottom-0 right-0 absolute object-cover object-top scale-x-[-1] scale-y-[-1] z-[150]"
            alt="TV texture bottom right"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/tv_texture_coin.png"
          />

          <img
            className="absolute w-full h-full top-0 left-0 z-[200]"
            alt="TV frame border"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiews63jm6p4yv5spn3uqxg6n3sjoemz2mye6u2xwipe6ehmil4ska/28bdeba4-9e1a-4f74-8257-e791cb09190d.svg"
          />

          <img
            className="absolute w-full h-full top-0 left-0 z-60"
            alt="TV overlay"
            src="/28bdeba4-9e1a-4f74-8257-e791cb09190d-1.png"
          />

          {/* Additional static overlay video with blend mode */}
          <video
            className="absolute w-full h-full top-0 left-0 z-[95] mix-blend-overlay opacity-30"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicwwpmjnrn7trzr75bw4tiohnnsz5tcwuepn2wfpccnkuydlajjce"
          />
        </div>
      </div>

      <div className="relative w-full max-w-[1280px] px-4 overflow-hidden">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleArrowClick('left')}
            className="absolute left-8 top-[calc(50%-2rem)] -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-[#0f100d]/80 text-[#E6E2DB] rounded-full cursor-pointer hover:bg-[#0f100d] transition-all border border-[#E6E2DB]/20 backdrop-blur-sm hover:scale-110"
            aria-label="Scroll left"
          >
            <span className="text-3xl font-mono">&lt;</span>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleArrowClick('right')}
            className="absolute right-8 top-[calc(50%-2rem)] -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-[#0f100d]/80 text-[#E6E2DB] rounded-full cursor-pointer hover:bg-[#0f100d] transition-all border border-[#E6E2DB]/20 backdrop-blur-sm hover:scale-110"
            aria-label="Scroll right"
          >
            <span className="text-3xl font-mono">&gt;</span>
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex gap-8 pb-6 transition-transform duration-300 ease-in-out px-24"
          style={{ 
            willChange: 'transform'
          }}
        >
          {filteredTapes.length > 0 ? (
            filteredTapes.map((tape, index) => (
              <div 
                key={tape.id} 
                className="flex flex-col items-center gap-4 flex-shrink-0 snap-center"
                style={{ width: 'min(382px, 30vw)', minWidth: '280px' }}
              >
                <h3 className={`font-mono text-lg tracking-wider ${playingAssetId === tape.id ? 'text-[#FFAF00]' : 'text-[#E6E2DB]'}`}>
                  {tape.title}
                </h3>
                
                <div className="relative w-full aspect-[382/214]">
                  <div
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-[50%_50%] cursor-pointer transition-all ${
                      playingAssetId === tape.id ? 'brightness-50' : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundImage: `url(${k7Backgrounds[index % 3 === 0 ? 'red' : index % 3 === 1 ? 'black' : 'white']})`
                    }}
                    onClick={() => handleVideoClick(tape.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {isCreatedToday(tape.created_at) && (
                      <img
                        src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeig255kfkhkiu3i6beejix5zoy5pw6nq5ivrladf4czhuvp2254h3i"
                        alt="New"
                        className="absolute top-2 left-2 w-16 h-16 z-10"
                      />
                    )}
                    {tape.thumbnail_url && (
                      <img
                        className="absolute opacity-80"
                        style={{
                          width: 'calc(166 * 100% / 382)',
                          height: 'calc(101 * 100% / 214)',
                          top: 'calc(67 * 100% / 214)',
                          left: 'calc(108 * 100% / 382)',
                        }}
                        alt="VHS preview"
                        src={tape.thumbnail_url}
                      />
                    )}
                    {playingAssetId === tape.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[#FFAF00] text-lg tracking-wider bg-black/50 px-4 py-2 rounded">
                          Currently Playing
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full justify-center">
                  <p className={`font-mono text-sm tracking-wider ${playingAssetId === tape.id ? 'text-[#FFAF00]' : 'text-[#E6E2DB]'}`}>
                    Persona {tape.persona_id?.padStart(3, '0') || '000'}
                  </p>
                  {tape.url && (
                    <a
                      href={tape.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0f100d]/80 hover:bg-[#0f100d] border border-[#E6E2DB]/20 transition-all hover:scale-110"
                      title="Download video"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-[#E6E2DB]" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </a>
                  )}
                  {tape.twitter_url && (
                    <a
                      href={tape.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0f100d]/80 hover:bg-[#0f100d] border border-[#E6E2DB]/20 transition-all hover:scale-110"
                      title="View on Twitter"
                    >
                      <img
                        src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiajimis4qegepfwiof53qwulueztkwnzbe3fdqgzctlmegc3uu7iq"
                        alt="Twitter"
                        className="h-4 w-4 filter brightness-0 invert"
                      />
                    </a>
                  )}
                  {tape.instagram_url && (
                    <a
                      href={tape.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0f100d]/80 hover:bg-[#0f100d] border border-[#E6E2DB]/20 transition-all hover:scale-110"
                      title="View on Instagram"
                    >
                      <img
                        src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreih35ztgpb6bvn5juej72qlapqgrmfcly5hk5tvm25ojvzkdxrmmdm"
                        alt="Instagram"
                        className="h-4 w-4 filter brightness-0 invert"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="flex flex-col items-center justify-center gap-4 flex-shrink-0 snap-center"
              style={{ width: 'min(382px, 30vw)', minWidth: '280px' }}
            >
              <div className="relative w-full aspect-[382/214] bg-[#0f100d]/40 border border-[#E6E2DB]/20 rounded-lg flex items-center justify-center">
                <p className="font-mono text-[#E6E2DB] text-lg tracking-wider text-center px-4">
                  No results found
                </p>
              </div>
              <div className="h-[1.5rem]" /> {/* Spacer to match title height */}
              <div className="h-[1.25rem]" /> {/* Spacer to match persona ID height */}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-[1280px] px-4 mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or persona ID..."
              className="w-full px-4 py-3 bg-[#0f100d]/80 text-[#E6E2DB] rounded-lg border border-[#E6E2DB]/20 backdrop-blur-sm focus:outline-none focus:border-[#E6E2DB]/40 font-mono text-sm placeholder-[#E6E2DB]/50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E6E2DB]/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};