// app/modals/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Copy } from "lucide-react";

import { notFound } from "next/navigation";
import { games } from "@/constants";

export default function ProfileCard() {
  const params = useParams();
  const game = games.find((g) => g.id === params.id);

  if (!game) {
    return notFound();
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-[linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]">
      <Card className="w-full max-w-4xl bg-yellow bg-opacity-60 text-yellow-100 backdrop-blur-sm border-yellow-100/20">
        <CardHeader className="space-y-6">
          <div className="flex gap-6">
            <Image
              src={game.imageUrl}
              alt={`${game.name} Image`}
              width={200}
              height={200}
              className="rounded-sm object-cover w-36 h-44"
            />
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-black rounded-xl translate-y-1.5 translate-x-1.5" />
                  <div className="relative bg-[#F9E92B] text-black px-4 md:pl-4 pr-10 py-1.5 md:py-1 rounded-xl border-[3px] border-black">
                    <h2 className="font-saira font-medium text-base md:text-lg z-10">
                      {game.name}
                    </h2>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-yellow text-yellow bg-opacity-50 border-yellow px-4 py-2 rounded-full"
                >
                  {game.category}
                </Badge>
              </div>
              <div className="font-saira text-lg text-white">{game.ticker}</div>
              <p className="font-saira text-sm leading-relaxed text-yellow">
                {game.description}
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="font-saira text-yellow bg-yellow bg-opacity-50 border-yellow hover:bg-yellow hover:text-yellow"
              onClick={() => window.open(game.geckoTerminalUrl, "_blank")}
            >
              Gecko Terminal
              <ExternalLink className="ml-2 h-4 w-4 text-white" />
            </Button>
            <Button
              variant="outline"
              className="font-saira text-yellow bg-yellow bg-opacity-50 border-yellow hover:bg-yellow hover:text-yellow"
              onClick={() =>
                navigator.clipboard.writeText(game.contractAddress)
              }
            >
              CA: {game.contractAddress}
              <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-yellow rounded-none">
              {[
                "Model Card",
                "Code (0)",
                "Discussion (0)",
                "Competitions (0)",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().split(" ")[0]}
                  className="font-saira text-yellow bg-opacity-60 data-[state=active]:text-yellow data-[state=active]:rounded-b-sm data-[state=active]:bg-transparent data-[state=active]:bg-opacity-60 data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:p-0.5 rounded-none"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="model" className="mt-6">
              <h2 className="text-xl font-saira text-yellow">{game.name}</h2>
              <div className="flex flex-row justify-between items-center gap-8">
                <p className="font-saira text-sm leading-relaxed text-white flex-[2.5]">
                  {game.longDescription}
                </p>

                <div className="items-start flex-[1.2]">
                  <div className="text-right">
                    <div className="font-saira text-sm text-yellow">
                      Total Downloads
                    </div>
                    <div className="flex flex-row justify-center gap-4 items-end">
                      <div className="font-saira text-4xl text-yellow">
                        {game.downloads.total}
                      </div>
                      <div className="font-saira text-sm text-yellow mb-2">
                        {game.downloads.weekly} in last 7 Days
                      </div>
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
