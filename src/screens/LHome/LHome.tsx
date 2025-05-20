import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { FloatingModal, StakingModal } from "../../components/ui/FloatingModal";

const shuffleText = (text: string): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return text
    .split('')
    .map(char => char === ' ' || char === ',' || char === '\n' ? char : characters[Math.floor(Math.random() * characters.length)])
    .join('');
};

// Data for navigation items
const navItems = [
  { text: "PURPOSE", link: "#who-am-i" },
  { text: "POWERS", link: "#powers" },
  { text: "MEDIA", link: "#media" },
  { text: "TOKEN", link: "#token" },
];

// Add styles for navigation items
const navItemStyles = {
  transition: "color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    color: "red",
  },
};

// Data for media cards
const mediaCards = [
  {
    title: "MANGA",
    link: "https://personajourney.io/manga",
    description:
      "Hana unveils the mysteries of Timefall Valley in Shards of a Stained Reverie, the official Persona manga.",
    backgroundImage: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeib5xfejcjpn2jpqspdvauqxlhdje5jqvubgjd32sr5oyhbmtkyd7q",
  },
  {
    title: "WELCOME TO THE VALLEY",
    backgroundImage: "public/parallax-1.png",
    videoUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeielgd7k4yl2mby4hiallktkc5ohe4n33b652plpsritt5ephlwysq",
    previewUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeif5aiscamzocwj56gx37iymgp3askxu3j7kahbuwrf536sacfkkha",
  },
  {
    title: "A STRANGE EVENT",
    backgroundImage: "public/parallax-2.png",
    videoUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiedydgxyvjw22wsws6m3gjcyio2engpftp7relk3tks6fsevydpqq",
    previewUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicswqpezpqvxc5f3dc5jpccibmarq6d6ntywneltjms3mlqj42ixq",
  },
  {
    title: "LIFE IN THE VALLEY",
    backgroundImage: "public/parallax-3.png",
    videoUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiadtquyre3lburx62l5c6ay6i3jensnkp46p2aihhcrxldvqt4xye",
    previewUrl: "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeic6w7h7zeajoagz4rubg6sk4dlgo4ezppspoekr7ierknt3xgi4fq",
  },
];

// Data for agentic powers
const agenticPowersLeft = [
  {
    title: "GEN AI POWERHOUSE",
    content: (
      <>
        Hana is equipped of the latest AI generative tools: Kling 2.0, Vidu Q1, Luma Ray Flash 2.<br /><br />
        Hana is also equipped with multiple custom workflows developed by the Persona team that users can explore on{' '}
        <a href="https://hanastudios.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-500 transition-colors">hanastudios.ai</a>.
      </>
    ),
  },
  {
    title: "ANIME CONTENT CREATOR",
    content: "Hana shares quality anime & vibes content on her twitter account and Persona instagram account."
  },
  {
    title: "TRANSMEDIA INTERACTIONS",
    content: "Engages with users 24/7 on social media platforms such as X, Telegram, Instagram."
  }
];

const agenticPowersRight = [
  {
    title: "WEB3 INTEGRATION",
    content: "Operates with an on-chain wallet, enabling financial independence to reward community with $HANA tokens and execute transactions autonomously."
  },
  {
    title: "CROSS-PLATFORM",
    content: "• Twitter\n• Telegram\n• Tiktok\n• Instagram (coming soon)"
  },
  {
    title: "PERSONALIZED",
    content: "Utilizes memory synchronization to remember past interactions, maintaining consistent and personalized relationships with users across platforms."
  },
  {
    title: "ECOSYSTEM DATA",
    content: "• Hana Token data\n• Persona community data\n• Persona collection data\n• Agents data (cookie fun)"
  }
];

// Footer navigation items
const footerNavItems = [
  { text: "PURPOSE", link: "#who-am-i" },
  { text: "TAPES", link: "#tapes" },
  { text: "POWERS", link: "#powers" },
  { text: "MEDIA", link: "#media" },
  { text: "TOKEN", link: "#token" },
];

export const LHome = (): JSX.Element => {
  const [showCopied, setShowCopied] = React.useState(false);
  const [playingStates, setPlayingStates] = React.useState<{ [key: string]: boolean }>({});
  const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [mouseX, setMouseX] = React.useState(0);
  const [titleText, setTitleText] = React.useState("HI,\nI'M HANA");
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
  const [showEmailCopied, setShowEmailCopied] = React.useState(false);
  const [showHanaModal, setShowHanaModal] = React.useState(true);
  const [showStakingModal, setShowStakingModal] = React.useState(true);

  React.useEffect(() => {
    const originalText = "HI,\nI'M HANA";
    let iterations = 0;
    const maxIterations = 20;
    
    const startShuffle = () => {
      iterations = 0;
      const shuffleInterval = setInterval(() => {
        if (iterations >= maxIterations) {
          setTitleText(originalText);
          clearInterval(shuffleInterval);
          return;
        }
        
        setTitleText(shuffleText(originalText));
        iterations++;
      }, 50);
    };

    // Initial shuffle
    startShuffle();

    // Repeat shuffle every 5 seconds
    const repeatInterval = setInterval(startShuffle, 5000);

    return () => clearInterval(repeatInterval);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as a percentage of window width
      const x = (e.clientX / window.innerWidth) * 100;
      setMouseX(x);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("0x1cfc22860Fe46A622e3C2D1c9b036412467Ef4C9");
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("contact@unagi.games");
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleVideoClick = (cardTitle: string) => {
    if (videoRefs.current[cardTitle]) {
      const video = videoRefs.current[cardTitle];
      
      // Update playing state first
      setPlayingStates(prev => ({
        ...prev,
        [cardTitle]: !prev[cardTitle]
      }));
      
      // Use setTimeout to ensure state is updated before playing
      setTimeout(() => {
        if (video) {
          video.currentTime = 0; // Reset video to start
          video.play();
        }
      }, 0);
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const powersSection = document.getElementById('powers');
      if (powersSection) {
        const rect = powersSection.getBoundingClientRect();
        const scrolled = -rect.top;
        document.documentElement.style.setProperty('--scroll-position', `${scrolled}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex items-start relative bg-[#e6e2dc] w-full min-h-screen overflow-x-hidden px-1 md:px-10">
      <StakingModal open={showStakingModal} onClose={() => setShowStakingModal(false)} hanaOpen={showHanaModal} />
      <FloatingModal open={showHanaModal} onClose={() => setShowHanaModal(false)} />
      <div className="flex flex-col items-center gap-[50px] px-4 md:px-0 pt-5 relative flex-1 grow w-full">
        {/* Hero Section */}
        <Card className="relative w-full max-w-[1516px] h-[800px] bg-[#0f100d] rounded-3xl overflow-hidden border-0">
          <CardContent id="hero" className="relative w-full h-[800px] p-0">
            <div className="flex w-full px-4 md:px-8 h-10 items-center justify-between absolute top-[17px] left-0 z-10">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto] mt-[-13.50px] mb-[-13.50px]" />

              <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
                <div className="hidden md:inline-flex items-center gap-6 relative flex-[0_0_auto]">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="relative w-fit mt-[-1.00px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#fefae9] text-xs text-justify tracking-[0] leading-3 whitespace-nowrap hover:text-red-500 transition-colors duration-300 cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ))}
                </div>

                {/* HANA ON X button: only show on md+ */}
                <a
                  href="https://x.com/HanaPersona_"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hidden md:inline-flex items-center gap-2 relative flex-[0_0_auto]"
                >
                  <Button className="h-10 gap-2 px-5 py-6 bg-[#e6e2dc] rounded-[1000px] overflow-hidden hover:bg-[#d6d2cc] transition-colors">
                    <span className="relative w-fit [font-family:'Helvetica_Now_Display-Bold',Helvetica] font-bold text-[#0f100d] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                      HANA ON
                    </span>
                    <img
                      className="relative w-6 h-6"
                      alt="X icon"
                      src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreihwzjn6vme7eq3mc3k6n6uif4knfshsftrym7t5iiwmxvevkm5jom"
                    />
                  </Button>
                </a>

                {/* HANA ON VIRTUALS button: show on all screens, but visible on mobile */}
                <a
                  href="https://app.virtuals.io/virtuals/20453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 relative flex-[0_0_auto]"
                >
                  <Button className="h-10 gap-2 px-5 py-6 bg-[#e6e2dc] rounded-[1000px] overflow-hidden hover:bg-[#d6d2cc] transition-colors">
                    <span className="relative w-fit [font-family:'Helvetica_Now_Display-Bold',Helvetica] font-bold text-[#0f100d] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                      HANA ON VIRTUALS
                    </span>
                    <img
                      className="relative w-6 h-6"
                      alt="Virtuals logo"
                      src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreidcspjjlbf6jyc5gec4ga7njsrvy6ytjwnw5judwonmqbyuv3gbe4"
                    />
                  </Button>
                </a>
              </div>
            </div>

            <div className="absolute w-full h-[722px] top-[78px] left-0 bg-[#999999]">
              <img
                className="absolute w-full h-[722px] top-0 left-0 object-cover"
                style={{ transform: `translateX(${(mouseX - 50) * -0.1}px)` }}
                alt="Background updated"
                src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeicfekmzkxhismxjtp2ilt43h3z6rr6raz4r6227zxchy4xwfntk6a"
              />
            </div>

            <img
              className="absolute w-[480px] md:w-[585px] h-[840px] md:h-[1000px] top-[300px] md:top-0 left-[50%] -translate-x-[50%] md:left-[464px] md:translate-x-0 object-cover object-center pointer-events-none"
              style={{ transform: isDesktop ? `translateX(${(mouseX - 50) * 0.2}px)` : 'translateX(-50%)' }}
              alt="Character"
              src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiavk2mdwo55groqmqiij3zkbyimuakxjnsyx2gd5tts773njjnmge"
            />
            <div className="absolute w-full md:w-[584px] h-[669px] top-[80px] sm:top-[94px] md:top-[94px] left-0 md:left-10 px-4 md:px-0 [font-family:'Anton_SC',Helvetica] font-normal text-[#fff8ef] text-[80px] sm:text-[100px] md:text-[200px] tracking-[-3.00px] leading-[96px] sm:leading-[120px] md:leading-[223px] text-center md:text-left">
              {titleText.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < titleText.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Who Am I Section */}
        <div id="who-am-i" className="inline-flex flex-col h-auto md:h-[1346px] items-center gap-[30px] py-2.5 relative w-full">
          <div className="relative w-full max-w-[1320px] h-auto md:h-[115px] text-center mb-8 md:mb-0">
            <div className="font-display-LG font-[number:var(--display-LG-font-weight)] text-[#0f100d] text-[48px] md:text-[length:var(--display-LG-font-size)] tracking-[var(--display-LG-letter-spacing)] leading-[1.1] md:leading-[var(--display-LG-line-height)] [font-style:var(--display-LG-font-style)]">
              WHO AM I?
            </div>
          </div>

          <Card className="relative w-full max-w-[1320px] h-auto md:h-[437px] bg-[#fefae9] rounded-3xl overflow-hidden border-0">
            <CardContent className="p-0 relative h-full flex">
              <div className="relative w-full md:w-[400px] bg-[#fefae9] h-full z-10 overflow-hidden">
                <div className="p-10 md:p-0 md:pt-[53px] md:px-10 font-body-s text-[#0f100d] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] [font-style:var(--body-s-font-style)] font-normal">
                  <p className="text-[#0f100d]">
                    Introduced in September 2023 -&nbsp;&nbsp;Hana is the main
                    character of the Persona brand and story. <br />
                    <br />
                    Hana is the radio host of Timefall Valley, a secluded city of
                    8888 citizens where time and age seem to stand still. <br />
                    <br />
                    Hana is driven by a deep desire to uncover the secrets that lie
                    beyond her seemingly unchanging world. <br />
                    <br />
                    With her genuine curiosity, courage, and a touch of playfulness,
                    Hana invites Outsiders to join her on an epic quest where every
                    interaction shapes her evolving story.
                  </p>
                </div>
                <div className="absolute right-0 top-0 w-[40px] h-full bg-gradient-to-r from-[#fefae9] to-transparent z-20 pointer-events-none" />
              </div>

              <div className="relative flex-1 h-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeigzcfspjdhh6ct7ijgaa3udamgzy4bwaoibjkdmyneuht7fxgoqoe"
                />
              </div>
            </CardContent>
          </Card>

          <div className="relative w-full max-w-[1320px] h-auto md:h-[704px] flex flex-col md:flex-row gap-4">
            <Card className="relative w-full md:w-[648px] h-[704px] bg-[#fff9ef] rounded-3xl overflow-hidden border-0">
              <CardContent className="p-0">
                <div className="relative w-full h-[704px] bg-[url(public/persona-chap-2-beat-1-market-15.png)] bg-cover bg-center">
                  <div className="absolute w-[calc(100%-40px)] md:w-[calc(100%-80px)] max-w-[476px] bottom-[120px] left-5 md:left-10 font-body-s font-[number:var(--body-s-font-weight)] text-[#fefae9] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] [font-style:var(--body-s-font-style)]">
                    Hana is the main character of tomorrow.
                    <br />
                    <br />
                    A transmedia agentic character featured in short
                    films, manga, games and living alongside us every day as an
                    agent on social media. <br />
                    <br />
                    Persona paves the way for a new generation of brands, and
                    Hana is at the center of it.
                  </div>

                  <div className="absolute w-[calc(100%-40px)] md:w-[calc(100%-80px)] max-w-[568px] h-16 bottom-10 left-5 md:left-10 font-display-MD font-[number:var(--display-MD-font-weight)] text-[#fefae9] text-[32px] md:text-[48px] tracking-[var(--display-MD-letter-spacing)] leading-[1.1] md:leading-[var(--display-MD-line-height)] [font-style:var(--display-MD-font-style)]">
                    MAIN CHARACTER 2.0
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative w-full md:w-[648px] h-[704px] bg-black rounded-3xl overflow-hidden border-0">
              <CardContent className="p-0">
                <div className="relative w-full h-[704px] flex flex-col items-center justify-between py-10">
                  <div className="w-full md:w-[502px] px-6 md:px-0 font-display-MD font-[number:var(--display-MD-font-weight)] text-[#fefae9] text-[32px] md:text-[48px] text-center tracking-[var(--display-MD-letter-spacing)] leading-[1.1] md:leading-[var(--display-MD-line-height)] [font-style:var(--display-MD-font-style)]">
                    SUPERCHARGED AGENT
                  </div>

                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full md:w-[494px] h-[485px] object-contain px-6 md:px-0"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeiftr25ndcxyq6qejbmyxjajhv4vagcw5p4goytsmhjphnnzwjpapq"
                  ></video>

                  <div className="w-full md:w-[542px] px-6 md:px-8 font-body-s font-[number:var(--body-s-font-weight)] text-[#fefae9] text-[14px] md:text-[length:var(--body-s-font-size)] text-center tracking-[var(--body-s-letter-spacing)] leading-[1.5] md:leading-[var(--body-s-line-height)] [font-style:var(--body-s-font-style)]">
                    Hana is a supercharged agent part of the <a href="https://app.virtuals.io/virtuals/20453" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-500 transition-colors">Virtuals</a> ecosystem - gifted with the latest agentic
                    innovations to interact with her community on socials, create
                    content and innovate.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Media Section */}
        <div id="powers" className="w-screen bg-black py-[50px] -mx-1 md:-mx-10">
          <div className="relative max-w-[1200px] mx-auto px-4">
            <h2 className="text-[80px] font-['Anton_SC'] text-[#fefae9] leading-none mb-[50px] text-center">
              AGENTIC POWERS
            </h2>
            <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
              {/* Left column */}
              <div className="flex flex-col gap-8 w-full md:w-1/3 pr-[45%] md:pr-0">
                {agenticPowersLeft.map((power, index) => (
                  <div key={index} className="flex flex-col gap-2.5">
                    <h3 className="text-[40px] font-['Anton_SC'] text-[#fefae9] leading-none">{power.title}</h3>
                    <p className="text-[#fefae9] text-sm whitespace-pre-line [font-family:'Helvetica_Now_Display-Regular',Helvetica]">{power.content}</p>
                  </div>
                ))}
              </div>

              {/* Center column - Video (Desktop) */}
              <div className="hidden md:block w-1/3 flex justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeihclte5zkcbh5tsuj3iqc3xhxtftjw2g6yg5ydmdnmwaarywmfune"
                />
              </div>

              {/* Mobile Video - Scrolls with content */}
              <div className="md:hidden absolute right-4 w-[40%] h-full">
                <div className="relative h-[400px]" style={{ top: 'max(80px, min(calc(100% - 480px), var(--scroll-position, 80px)))' }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full rounded-lg object-cover"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafybeihclte5zkcbh5tsuj3iqc3xhxtftjw2g6yg5ydmdnmwaarywmfune"
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-8 w-full md:w-1/3 pr-[45%] md:pr-0">
                {agenticPowersRight.map((power, index) => (
                  <div key={index} className="flex flex-col gap-2.5">
                    <h3 className="text-[40px] font-['Anton_SC'] text-[#fefae9] leading-none">{power.title}</h3>
                    <p className="text-[#fefae9] text-sm whitespace-pre-line [font-family:'Helvetica_Now_Display-Regular',Helvetica]">{power.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full px-4 md:px-0">
          <div id="media" className="flex flex-col w-full max-w-[1320px] items-center gap-10 relative mx-auto">
            <div className="relative self-stretch w-full h-auto md:h-[352px]">
              <div className="flex flex-col md:flex-row w-full max-w-[1314px] justify-between items-start gap-4">
                <div className="relative w-full md:w-[363px] mt-[-1.00px] [font-family:'Anton_SC',Helvetica] font-normal text-[#0f100d] text-6xl md:text-8xl tracking-[-3.00px] leading-[1.2] md:leading-[108px] text-center md:text-left">
                  MEDIA FEATURING HANA
                </div>

                <a 
                  href="https://personajourney.io/manga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-[895px]"
                >
                  <Card className="relative w-full h-[352px] rounded-3xl overflow-hidden border-0 bg-[#0f100d] transition-transform hover:scale-[1.02]">
                    <CardContent className="p-0 h-full relative">
                      <div className="absolute inset-0">
                        <img
                          className="w-full h-full object-cover object-left-bottom"
                          src={mediaCards[0].backgroundImage}
                          alt="Manga cover"
                        />
                      </div>
                      <div className="absolute bottom-10 right-10 md:right-10 left-10 md:left-auto flex flex-col gap-3 text-center md:text-right">
                        <h3 className="text-[40px] sm:text-[48px] md:text-[64px] leading-[1.1] md:leading-[72px] font-['Anton_SC'] text-[#fefae9]">{mediaCards[0].title}</h3>
                        <p className="text-[#fefae9] text-sm whitespace-pre-line [font-family:'Helvetica_Now_Display-Bold',Helvetica] max-w-[400px] mx-auto md:ml-auto md:mr-0">{mediaCards[0].description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>

            {mediaCards.slice(1).map((card, index) => (
              <Card
                key={index}
                className="relative self-stretch w-full h-[400px] md:h-[704px] bg-[#010101] rounded-3xl overflow-hidden border-0"
              >
                <CardContent className="p-0">
                  <div
                    className="relative w-full h-[400px] md:h-[704px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.backgroundImage})` }}
                  >
                    <div className="absolute inset-0 w-full h-full">
                    {(card.videoUrl || card.previewUrl) && (
                      <video
                        ref={el => videoRefs.current[card.title] = el}
                        autoPlay={!playingStates[card.title]}
                        loop={!playingStates[card.title]}
                        muted={true}
                        playsInline
                        className="absolute w-full h-[400px] md:h-[704px] top-0 left-0 object-cover"
                        src={playingStates[card.title] ? card.videoUrl : card.previewUrl}
                        controls={playingStates[card.title]}
                      />
                    )}

                    {!playingStates[card.title] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={() => card.videoUrl ? handleVideoClick(card.title) : undefined}
                        className="h-10 gap-2 px-5 py-6 bg-[#f6f5f3] rounded-[1000px] overflow-hidden hover:bg-[#e6e6e3] z-10"
                      >
                        <span className="relative w-fit mt-[-11.00px] mb-[-9.00px] font-sub-XS font-[number:var(--sub-XS-font-weight)] text-[#0f100d] text-[length:var(--sub-XS-font-size)] text-center tracking-[var(--sub-XS-letter-spacing)] leading-[var(--sub-XS-line-height)] whitespace-nowrap [font-style:var(--sub-XS-font-style)]">
                          PLAY
                        </span>
                      </Button>
                      </div>
                    )}

                    {!playingStates[card.title] && (
                      <div className="absolute h-16 bottom-10 left-10 font-display-MD font-[number:var(--display-MD-font-weight)] text-[#fefae9] text-[32px] sm:text-[40px] md:text-[length:var(--display-MD-font-size)] tracking-[var(--display-MD-letter-spacing)] leading-[1.1] md:leading-[var(--display-MD-line-height)] whitespace-pre-wrap md:whitespace-nowrap max-w-[calc(100%-80px)] [font-style:var(--display-MD-font-style)]">
                        {card.title}
                      </div>
                    )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hana Token Section */}
        <div id="token" className="flex flex-col min-h-screen items-center gap-5 px-4 md:px-0 py-5 bg-[#e6e2db] w-full">
          <h1 className="w-full md:w-[454px] font-display-LG font-[number:var(--display-LG-font-weight)] text-[length:var(--display-LG-font-size)] text-center tracking-[var(--display-LG-letter-spacing)] leading-[var(--display-LG-line-height)] text-[#0f100d] [font-style:var(--display-LG-font-style)]">
            HANA TOKEN
          </h1>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <a
              href="https://app.uniswap.org/swap?outputCurrency=0x1cfc22860Fe46A622e3C2D1c9b036412467Ef4C9&chain=base"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
            >
              <Button className="h-10 gap-2 px-5 py-6 bg-[#e6e2dc] rounded-[1000px] overflow-hidden hover:bg-[#d6d2cc] transition-colors">
                <span className="relative w-fit mt-[-11.00px] mb-[-9.00px] [font-family:'Helvetica_Now_Display-Bold',Helvetica] font-bold text-[#0f100d] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                  PURCHASE ON UNISWAP
                </span>
                <img
                  className="relative w-6 h-6 mt-[-16.00px] mb-[-16.00px]"
                  alt="Uniswap logo"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreidacemxtclxbzuf6jqjv57txxh4izeuk6pre4sbll44pe5grk4iea"
                />
              </Button>
            </a>
            
            <a
              href="https://app.virtuals.io/virtuals/20453"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
            >
              <Button className="h-10 gap-2 px-5 py-6 bg-[#e6e2dc] rounded-[1000px] overflow-hidden hover:bg-[#d6d2cc] transition-colors">
                <span className="relative w-fit mt-[-11.00px] mb-[-9.00px] [font-family:'Helvetica_Now_Display-Bold',Helvetica] font-bold text-[#0f100d] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                  VIRTUALS
                </span>
                <img
                  className="relative w-6 h-6 mt-[-16.00px] mb-[-16.00px]"
                  alt="Virtuals logo"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreidcspjjlbf6jyc5gec4ga7njsrvy6ytjwnw5judwonmqbyuv3gbe4"
                />
              </Button>
            </a>

            <a
              href="https://dexscreener.com/base/0x7B1b0E65E10AD90794Abf28db9F0a85edB8e6C8C"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
            >
              <Button className="h-10 gap-2 px-5 py-6 bg-[#e6e2dc] rounded-[1000px] overflow-hidden hover:bg-[#d6d2cc] transition-colors">
                <span className="relative w-fit mt-[-11.00px] mb-[-9.00px] [font-family:'Helvetica_Now_Display-Bold',Helvetica] font-bold text-[#0f100d] text-xs text-center tracking-[0] leading-3 whitespace-nowrap">
                  DEXSCREENER
                </span>
                <img
                  className="relative w-6 h-6 mt-[-16.00px] mb-[-16.00px]"
                  alt="DEXSCREENER logo"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreibnl6kr7coxynv2akyxdtvyi6nhjdyalt3yhjtm3ojephhyesa2vy"
                />
              </Button>
            </a>
          </div>

          <div className="w-full max-w-[1320px] flex flex-col gap-5">
            <Card className="flex flex-col md:flex-row items-center w-full md:w-full bg-[#f3eed7] rounded-3xl overflow-hidden border-none">
              <CardContent className="w-full md:h-[471px] flex flex-col items-center md:items-start gap-8 md:gap-0 md:justify-between p-6 md:p-0 md:flex-1">
                <h2 className="text-center md:text-left md:pt-[40px] md:pl-[40px] [font-family:'Anton_SC',Helvetica] font-normal text-[#0f100d] text-[40px] sm:text-[48px] md:text-[64px] tracking-[-1.80px] leading-[1.1]">
                  WHY $HANA?
                </h2>

                <div className="w-full md:hidden flex justify-center">
                  <img
                    className="h-[300px] w-auto object-contain"
                    alt="Persona reference"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreifzjgeauzkz3p57xbsl36dwxf7hzfgpo2hbmb6hbbwhu7g4dpwypu"
                  />
                </div>

                <p className="text-center md:text-left md:pb-[40px] md:pl-[40px] w-full md:w-[607px] [font-family:'Helvetica_Now_Display-Regular',Helvetica] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] text-[#0f100d]">
                  Having her own token empowers Hana to autonomously perform blockchain-native actions, incentivize meaningful user interactions, and seamlessly integrate within decentralized ecosystems.
                  <br />
                  <br />
                  This unique capability is what differentiates Web3 AI agents like Hana from traditional AI agents, unlocking greater autonomy, community engagement, and participation in the decentralized economy.
                </p>
              </CardContent>

              <div className="hidden md:flex items-center justify-end h-[471px]">
                <img
                  className="w-full max-h-[300px] object-contain"
                  alt="Persona reference"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreifzjgeauzkz3p57xbsl36dwxf7hzfgpo2hbmb6hbbwhu7g4dpwypu"
                />
              </div>
            </Card>

            <Card className="flex flex-col md:flex-row items-center w-full md:w-full bg-[#f7b428] rounded-3xl overflow-hidden border-none">
              <CardContent className="w-full md:h-[357px] flex flex-col items-center md:items-start gap-8 md:gap-0 md:justify-between p-6 md:p-0 md:flex-1">
                <h2 className="text-center md:text-left md:pt-[40px] md:pl-[40px] [font-family:'Anton_SC',Helvetica] font-normal text-[#0f100d] text-[40px] sm:text-[48px] md:text-[64px] tracking-[-1.80px] leading-[1.1]">
                  SUPPLY
                </h2>

                <div className="w-full md:hidden flex justify-center">
                  <img
                    className="h-[300px] w-auto object-contain"
                    alt="Supply distribution chart"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiakukqi35fpkpvgeikoubzpoa6eums24eexkrhgbzjrxw4idqahve"
                  />
                </div>

                <p className="text-center md:text-left md:pb-[40px] md:pl-[40px] w-full md:w-[607px] [font-family:'Helvetica_Now_Display-Regular',Helvetica] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] text-[#0f100d]">
                  The Hana token exists to empower Hana and allow her to run her own
                  experiences and grow her reach on socials.
                  <br />
                  <br />
                  70% was released in a bonding curve, 10% to Persona holders.
                </p>
              </CardContent>

              <div className="hidden md:flex items-center justify-end h-[357px]">
                <img
                  className="max-h-full w-auto object-contain pr-6"
                  alt="Supply distribution chart"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiakukqi35fpkpvgeikoubzpoa6eums24eexkrhgbzjrxw4idqahve"
                />
              </div>
            </Card>

            <Card className="flex flex-col md:flex-row items-center w-full md:w-full bg-[#a9cbb3] rounded-3xl overflow-hidden border-none">
              <CardContent className="w-full md:h-[471px] flex flex-col items-center md:items-start gap-8 md:gap-0 md:justify-between p-6 md:p-0 md:flex-1">
                <h2 className="text-center md:text-left md:pt-[40px] md:pl-[40px] [font-family:'Anton_SC',Helvetica] font-normal text-[#0f100d] text-[40px] sm:text-[48px] md:text-[64px] tracking-[-1.80px] leading-[1.1]">
                  UNAGI
                </h2>

                <div className="w-full md:hidden flex justify-center">
                  <img
                    className="h-[300px] w-auto object-contain"
                    alt="Persona reference"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreid4dggkibnawm6xxb6drad524vedckvfg7kjlaehd4s6ot4xgwgtm"
                  />
                </div>

                <p className="text-center md:text-left md:pb-[40px] md:pl-[40px] w-full md:w-[607px] [font-family:'Helvetica_Now_Display-Regular',Helvetica] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] text-[#0f100d]">
                  The Hana token is a token part of the Persona &amp; Unagi ecosystem,
                  as such the trading fees of the token are redistributed into the Una
                  token.
                  <br />
                  <br />
                  Unagi's mission is to build the Future of AI &amp; Web3 Entertainment and Hana plays a key role in it as a ground breaking transmedia character.
                </p>
              </CardContent>

              <div className="hidden md:flex items-center justify-end h-[471px]">
                <img
                  className="max-h-[80%] w-auto object-contain"
                  alt="Persona reference"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreid4dggkibnawm6xxb6drad524vedckvfg7kjlaehd4s6ot4xgwgtm"
                />
              </div>
            </Card>

            <Card className="flex flex-col md:flex-row items-center w-full md:w-full bg-[#f5c8e9] rounded-3xl overflow-hidden border-none">
              <CardContent className="w-full md:h-[425px] flex flex-col items-center md:items-start gap-8 md:gap-0 md:justify-between p-6 md:p-0 md:flex-1">
                <h2 className="text-center md:text-left md:pt-[40px] md:pl-[40px] [font-family:'Anton_SC',Helvetica] font-normal text-[#0f100d] text-[40px] sm:text-[48px] md:text-[64px] tracking-[-1.80px] leading-[1.1]">
                  MONETIZATION
                </h2>

                <div className="w-full md:hidden flex justify-center">
                  <img
                    className="h-[300px] w-auto object-contain"
                    alt="Camera"
                    src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiee4okhigwwy3dxtvsdv2s3ieper7g63m4qcnwaorehejavprvgii"
                  />
                </div>

                <p className="text-center md:text-left md:pb-[40px] md:pl-[40px] w-full md:w-[607px] [font-family:'Helvetica_Now_Display-Regular',Helvetica] text-[length:var(--body-s-font-size)] tracking-[var(--body-s-letter-spacing)] leading-[var(--body-s-line-height)] text-[#0f100d]">
                  The Hana token will power every monetized product crafted by Hana, creating a dynamic ecosystem with continuous demand and utility.
                  <br />
                  <br />
                  It will also unlock exclusive access to Hana's premium services across social platforms, such as promotional campaigns, tailored content creation, and unique digital assets, driving value and adoption of the Hana economy.
                </p>
              </CardContent>

              <div className="hidden md:flex items-center justify-end h-[425px]">
                <img
                  className="max-h-full w-auto object-contain"
                  alt="Camera"
                  src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreiee4okhigwwy3dxtvsdv2s3ieper7g63m4qcnwaorehejavprvgii"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col w-full items-center pt-0 pb-[60px] px-5 relative flex-[0_0_auto] bg-transparent">
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <Separator className="relative self-stretch w-full h-[8.5px] mt-[-0.50px] ml-[-0.50px] mr-[-0.50px]" />

            <div className="flex flex-col md:flex-row items-start justify-between relative self-stretch w-full flex-[0_0_auto] opacity-[0.38] gap-4">
              <div className="relative w-fit mt-[-1.00px] font-caption-XS font-[number:var(--caption-XS-font-weight)] text-[#64615d] text-[length:var(--caption-XS-font-size)] tracking-[var(--caption-XS-letter-spacing)] leading-[var(--caption-XS-line-height)] [font-style:var(--caption-XS-font-style)]">
                48°51′ N <br />
                2°21′ E
              </div>

              <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
                  <div className="font-[number:var(--icon-s-font-weight)] relative w-fit mt-[-1.00px] font-icon-s text-[#64615d] text-[length:var(--icon-s-font-size)] tracking-[var(--icon-s-letter-spacing)] leading-[var(--icon-s-line-height)] whitespace-nowrap [font-style:var(--icon-s-font-style)]">
                    toys_fan
                  </div>
                </div>

                <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
                  <div className="font-normal relative w-fit mt-[-1.00px] [font-family:'Material_Symbols_Rounded',Helvetica] text-[#64615d] text-base tracking-[0] leading-4 whitespace-nowrap">
                    <span className="font-icon-s font-[number:var(--icon-s-font-weight)] text-[#64615d] text-[length:var(--icon-s-font-size)] tracking-[var(--icon-s-letter-spacing)] leading-[var(--icon-s-line-height)] [font-style:var(--icon-s-font-style)]">
                      language
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
                  <div className="font-[number:var(--icon-s-font-weight)] relative w-fit mt-[-1.00px] font-icon-s text-[#64615d] text-[length:var(--icon-s-font-size)] tracking-[var(--icon-s-letter-spacing)] leading-[var(--icon-s-line-height)] whitespace-nowrap [font-style:var(--icon-s-font-style)]">
                    gamepad
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative self-stretch w-full h-16" />

          <div className="flex flex-col items-start px-4 md:px-[88px] py-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-8 relative w-full md:w-[200px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#9d9994] text-xs tracking-[0] leading-3 whitespace-nowrap">
                  DISCOVER
                </div>

                <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                  <a 
                    href="https://personajourney.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-[-1.00px] font-display-s font-[number:var(--display-s-font-weight)] text-[length:var(--display-s-font-size)] tracking-[var(--display-s-letter-spacing)] leading-[var(--display-s-line-height)] relative w-fit text-[#0f100d] whitespace-nowrap [font-style:var(--display-s-font-style)] hover:text-red-500 transition-colors duration-300"
                  >
                    PERSONA
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-start gap-8 relative w-full md:w-[200px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#9d9994] text-xs tracking-[0] leading-3 whitespace-nowrap">
                  NAVIGATE
                </div>

                <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex gap-8">
                    {footerNavItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="relative w-fit [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#0f100d] text-xs text-justify tracking-[0] leading-3 whitespace-nowrap hover:text-red-500 transition-colors duration-300 cursor-pointer"
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-8 relative w-full md:w-[200px] md:ml-auto">
                <div className="inline-flex flex-col gap-8 flex-[0_0_auto] items-start relative">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#9d9994] text-xs tracking-[0] leading-3">
                    FOLLOW US
                  </div>
                  <a
                    href="https://x.com/Persona_Journey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] rounded hover:opacity-80 transition-opacity"
                  >
                    <img
                      className="relative w-6 h-6"
                      alt="Brand icon"
                      src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreihwzjn6vme7eq3mc3k6n6uif4knfshsftrym7t5iiwmxvevkm5jom"
                    />
                    <span className="text-[#0f100d] text-sm font-medium">Persona</span>
                  </a>
                  <a
                    href="https://x.com/HanaPersona_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] rounded hover:opacity-80 transition-opacity"
                  >
                    <img
                      className="relative w-6 h-6"
                      alt="Brand icon"
                      src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreihwzjn6vme7eq3mc3k6n6uif4knfshsftrym7t5iiwmxvevkm5jom"
                    />
                    <span className="text-[#0f100d] text-sm font-medium">Hana</span>
                  </a>
                  <a
                    href="https://x.com/Unagi_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] rounded hover:opacity-80 transition-opacity"
                  >
                    <img
                      className="relative w-6 h-6"
                      alt="Brand icon"
                      src="https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreihwzjn6vme7eq3mc3k6n6uif4knfshsftrym7t5iiwmxvevkm5jom"
                    />
                    <span className="text-[#0f100d] text-sm font-medium">Unagi</span>
                  </a>
                </div>

                <div className="[font-family:'Helvetica_Now_Display-Bold',Helvetica] font-normal text-xl tracking-[0] leading-5 relative w-fit text-[#0f100d] whitespace-nowrap">
                  <span 
                    onClick={handleEmailCopy}
                    className="font-[number:var(--body-LG-font-weight)] leading-[var(--body-LG-line-height)] underline font-body-LG [font-style:var(--body-LG-font-style)] tracking-[var(--body-LG-letter-spacing)] text-[length:var(--body-LG-font-size)] cursor-pointer hover:text-red-500 transition-colors duration-300"
                  >
                    {showEmailCopied ? "Copied!" : "contact@unagi.games"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative self-stretch w-full h-20" />

            <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-[180px] mt-[-1.00px] font-caption-XS font-[number:var(--caption-XS-font-weight)] text-[#9d9994] text-[length:var(--caption-XS-font-size)] tracking-[var(--caption-XS-letter-spacing)] leading-[var(--caption-XS-line-height)] [font-style:var(--caption-XS-font-style)]">
                ©2024 ALL RIGHTS RESERVED BY UNAGI
              </div>

              <div className="relative w-fit mt-[-1.00px] [font-family:'Lower_Pixel-Regular',Helvetica] font-normal text-[#9d9994] text-[10px] tracking-[0] leading-[10px] whitespace-nowrap">
                <span className="underline font-caption-XS [font-style:var(--caption-XS-font-style)] font-[number:var(--caption-XS-font-weight)] tracking-[var(--caption-XS-letter-spacing)] leading-[var(--caption-XS-line-height)] text-[length:var(--caption-XS-font-size)]">
                  terms &amp; conditions
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
