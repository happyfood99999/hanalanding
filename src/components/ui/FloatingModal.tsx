import React, { useState } from "react";
import { Card } from "./card";
import { Button } from "./button";

const HANA_LOGO_URL = "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreid4ju7kzhn4abdviuccwcial7orumi7tksly67xtovplmxmsn2hxy";
const VIRTUALS_LOGO_URL = "https://emerald-famous-coyote-461.mypinata.cloud/ipfs/bafkreidcspjjlbf6jyc5gec4ga7njsrvy6ytjwnw5judwonmqbyuv3gbe4";

export const StakingModal: React.FC<{ open: boolean; onClose: () => void; hanaOpen: boolean }> = ({ open, onClose, hanaOpen }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: hanaOpen ? 280 : 24,
        left: 24,
        zIndex: 1001,
        width: 340,
        maxWidth: 340,
        minWidth: 280,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
      className="animate-fade-in"
    >
      <Card className="relative p-6 pt-5 pb-4 bg-[#181818] border-none rounded-2xl shadow-xl flex flex-col items-center gap-3">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 text-[#fff8ef] hover:text-[#f5c8e9] text-xl font-bold bg-transparent border-none cursor-pointer"
          style={{ background: "none", border: "none" }}
        >
          ×
        </button>
        <img
          src={VIRTUALS_LOGO_URL}
          alt="Virtuals Logo"
          className="w-10 h-10 mb-2"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        />
        <div className="font-bold text-lg text-[#fff8ef] mb-1 text-center">Stake HANA tokens on Virtuals</div>
        <Button
          asChild
          className="w-full mt-1 bg-[#fff8ef] text-[#181818] hover:bg-[#f5c8e9] hover:text-[#181818] rounded-lg shadow font-semibold"
        >
          <a
            href="https://app.virtuals.io/virtuals/20453"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Virtuals
          </a>
        </Button>
      </Card>
    </div>
  );
};

export const FloatingModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 1000,
        maxWidth: 340,
        minWidth: 280,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
      className="animate-fade-in"
    >
      <Card className="relative p-6 pt-5 pb-4 bg-[#181818] border-none rounded-2xl shadow-xl flex flex-col items-center gap-3">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 text-[#fff8ef] hover:text-[#f5c8e9] text-xl font-bold bg-transparent border-none cursor-pointer"
          style={{ background: "none", border: "none" }}
        >
          ×
        </button>
        <img
          src={HANA_LOGO_URL}
          alt="Hana Studios Logo"
          className="w-10 h-10 mb-2"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        />
        <div className="font-bold text-lg text-[#fff8ef] mb-1">Hana Studios</div>
        <div className="text-sm text-[#fff8ef] text-center mb-3">
          Hana's tools are now available on her Agent as a Service platform!
        </div>
        <Button
          asChild
          className="w-full mt-1 bg-[#fff8ef] text-[#181818] hover:bg-[#f5c8e9] hover:text-[#181818] rounded-lg shadow font-semibold"
        >
          <a
            href="https://hanastudios.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </a>
        </Button>
      </Card>
    </div>
  );
};

export default FloatingModal; 