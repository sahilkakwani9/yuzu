"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Using lucide-react for icons

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className="relative flex flex-row justify-between items-center p-5 z-100">
        <div className="w-[75px]">
          <a href="/">
            <Image
              src={"/logo.webp"}
              alt="yuzu-logo"
              className="h-[78px] w-[75px] hidden md:block"
              height={78}
              width={75}
            />
          </a>
        </div>

        <a
          href="/stake"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <p className="text-yellow font-saira text-xl md:text-2xl font-bold">
            LP Staking
          </p>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row gap-5">
          <a
            className="bg-yellow h-[30px] w-[30px] flex flex-row justify-center items-center rounded-md"
            href="https://www.tiktok.com/@yuzudotgame?_t=ZN-8ssj4VFyA9G&_r=1"
          >
            <Image
              src={"/assets/tiktok.svg"}
              alt="yuzu-logo"
              className="h-[24px] w-[24px] bg-transparent"
              height={30}
              width={30}
            />
          </a>
          <a href="https://www.instagram.com/yuzudotgame/profilecard/?igsh=MW13ZWQyNWU4cWhuNQ==">
            <Image
              src={"/assets/instagram.svg"}
              alt="yuzu-logo"
              className="h-[30px] w-[30px] rounded-md"
              height={30}
              width={30}
            />
          </a>
          <a href="https://x.com/yuzudotai">
            <Image
              src={"/assets/X.svg"}
              alt="yuzu-logo"
              className="h-[30px] w-[30px] rounded-md"
              height={30}
              width={30}
            />
          </a>
          <WalletMultiButton
            style={{
              backgroundColor: "#F9E92B",
              color: "black",
              height: "30px",
            }}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-yellow"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button
              className="absolute top-5 right-5 text-yellow"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center gap-8">
              <a
                className="bg-yellow h-[40px] w-[40px] flex flex-row justify-center items-center rounded-md"
                href="https://www.tiktok.com/@yuzudotgame?_t=ZN-8ssj4VFyA9G&_r=1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src={"/assets/tiktok.svg"}
                  alt="yuzu-logo"
                  className="h-[32px] w-[32px] bg-transparent"
                  height={40}
                  width={40}
                />
              </a>
              <a
                href="https://www.instagram.com/yuzudotgame/profilecard/?igsh=MW13ZWQyNWU4cWhuNQ=="
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src={"/assets/instagram.svg"}
                  alt="yuzu-logo"
                  className="h-[40px] w-[40px] rounded-md"
                  height={40}
                  width={40}
                />
              </a>
              <a
                href="https://x.com/yuzudotai"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src={"/assets/X.svg"}
                  alt="yuzu-logo"
                  className="h-[40px] w-[40px] rounded-md"
                  height={40}
                  width={40}
                />
              </a>
              <div className="mt-4">
                <WalletMultiButton
                  style={{
                    backgroundColor: "#F9E92B",
                    color: "black",
                    height: "40px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
