"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Copy } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-[linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]">
      <Card className="w-full max-w-4xl bg-yellow bg-opacity-60 text-yellow-100 backdrop-blur-sm border-yellow-100/20">
        <CardHeader className="space-y-6">
          <div className="flex gap-6">
            <Image
              src="/modals/streetfighter.webp"
              alt="Profile Image"
              width={200}
              height={200}
              className="rounded-sm object-cover w-36 h-44"
            />
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
               <div className="relative">
               <div className="absolute inset-0 bg-black rounded-xl translate-y-1.5 translate-x-1.5" />
                <div className="relative bg-[#F9E92B] text-black px-4 md:pl-4 pr-10 py-1.5 md:py-1 rounded-xl border-[3px] border-black">
                  <h2 className="font-saira font-medium text-base md:text-lg z-10 ">
                    AstraMirror -1 14
                  </h2>
                </div>
               </div>
                <Badge
                  variant="outline"
                  className="bg-yellow text-yellow bg-opacity-50 border-yellow px-4 py-2 rounded-full"
                >
                  Productivity
                </Badge>
              </div>
              <div className="font-saira text-lg text-white">
                $Astra114
              </div>
              <p className="font-saira text-sm leading-relaxed text-yellow">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="font-mono text-yellow-100 border-yellow-100/40 hover:bg-yellow-100/20"
            >
              Gecko Terminal
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="font-mono text-yellow-100 border-yellow-100/40 hover:bg-yellow-100/20"
            >
              CA : 0x1C4c...F463a3
              <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-yellow-100/20">
              {[
                "Model Card",
                "Code (0)",
                "Discussion (0)",
                "Competitions (0)",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().split(" ")[0]}
                  className="font-mono text-yellow-100/80 data-[state=active]:text-yellow-100 data-[state=active]:border-b-2 data-[state=active]:border-yellow-100 rounded-none"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="model" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-mono">AstraMirror -1 14</h2>
                <p className="font-mono text-sm leading-relaxed text-yellow-100/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>

                <div className="flex justify-between items-start pt-4">
                  <div className="space-y-2">
                    <div className="font-mono text-sm text-yellow-100/60">
                      Tags
                    </div>
                    <div className="flex gap-2">
                      {["Game", "strategy", "Text"].map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-yellow-100/20 text-yellow-100 border-yellow-100/40"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-sm text-yellow-100/60">
                      Total Downloads
                    </div>
                    <div className="font-mono text-4xl text-yellow-100">
                      1799
                    </div>
                    <div className="font-mono text-sm text-yellow-100/60">
                      248 in last 7 Days
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
