"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Copy } from "lucide-react";
import { notFound } from "next/navigation";
import { games } from "@/constants";
import { CodeItem, Competition, Discussion } from "@/lib/types";
import { useState } from "react";

export default function ProfileCard() {
  const params = useParams();
  const game = games.find((g) => g.id === params.id);
  const [copyStatus, setCopyStatus] = useState(false);
  if (!game) return notFound();

  const codes: CodeItem[] = game.codes || [];
  const discussions: Discussion[] = game.discussions || [];
  const competitions: Competition[] = game.competitions || [];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000); // Reset after 2 seconds
    });
  };

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
              <div className="md:flex items-center gap-3">
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
                  className="bg-yellow text-yellow bg-opacity-50 border-yellow px-4 py-2 rounded-full mt-8 md:mt-0"
                >
                  {game.category}
                </Badge>
              </div>
              <div className="font-saira text-lg text-white">{game.ticker}</div>
              <p className="font-saira text-sm leading-relaxed text-yellow hidden md:block">
                {game.description}
              </p>
            </div>
          </div>
          <p className="font-saira text-sm leading-relaxed text-yellow md:hidden">
            {game.description}
          </p>

          <div className="md:flex justify-between gap-4">
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
              className="font-saira mt-4 md:mt-0 text-yellow bg-yellow bg-opacity-50 border-yellow hover:bg-yellow hover:text-yellow"
              onClick={() =>
                navigator.clipboard.writeText(game.contractAddress)
              }
            >
              CA: {game.contractAddress}
              <Copy className="ml-2 h-4 w-4" />
            </Button>
            <a href={game.demo} target="_blank">
              <Button
                variant="outline"
                className="font-saira mt-4 md:mt-0 text-yellow bg-yellow bg-opacity-50 border-yellow hover:bg-white hover:text-yellow"
              >
                Demo
              </Button>
            </a>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="w-full overflow-scroll justify-start bg-transparent border-b border-yellow rounded-none">
              {[
                { id: "model", label: "Model Card" },
                { id: "code", label: `Code (${codes.length})` },
                {
                  id: "discussion",
                  label: `Discussion (${discussions.length})`,
                },
                {
                  id: "competitions",
                  label: `Competitions (${competitions.length})`,
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="font-saira text-yellow bg-opacity-60 data-[state=active]:text-yellow data-[state=active]:rounded-b-sm data-[state=active]:bg-transparent data-[state=active]:bg-opacity-60 data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:p-0.5 rounded-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="model" className="mt-6">
              <h2 className="text-xl font-saira text-yellow">{game.name}</h2>
              <div className="md:flex flex-row justify-between items-center gap-8">
                <p className="font-saira text-sm leading-relaxed text-white flex-[2.5]">
                  {game.longDescription}
                </p>
                <div className="items-start flex-[1.2]">
                  <div className="text-right">
                    <div className="flex items-center md:block font-saira text-sm text-yellow">
                      Total Downloads
                    </div>
                    <div className="md:flex flex-row justify-center gap-4 items-end">
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

            <TabsContent value="code" className="mt-6">
              <div className="space-y-4">
                {codes.map((code) => (
                  <div
                    key={code.id}
                    className="border border-yellow rounded-lg p-4"
                  >
                    {/* <h3 className="font-saira text-lg text-yellow">
                      {code.title}
                    </h3> */}
                    {/* <button
                      onClick={() => handleCopy(code.content)}
                      className="absolute top-2 right-2 flex items-center bg-red bg-opacity-80 text-black px-3 py-1 rounded-full hover:bg-yellow-700 hover:text-white"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copyStatus ? "Copied!" : "Copy"}
                    </button> */}
                    <SyntaxHighlighter
                      language="python"
                      style={materialDark}
                      customStyle={{
                        background: "transparent", // Match your design
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      {code.content}
                    </SyntaxHighlighter>
                    <div className="mt-2 text-sm text-yellow-200">
                      By {code.author} • {code.date}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discussion" className="mt-6">
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="border border-yellow rounded-lg p-4"
                  >
                    <h3 className="font-saira text-lg text-yellow">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-white mt-2">
                      {discussion.content}
                    </p>
                    <div className="mt-2 text-sm text-yellow-200">
                      By {discussion.author} • {discussion.date}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competitions" className="mt-6">
              <div className="space-y-4">
                {competitions.map((competition) => (
                  <div
                    key={competition.id}
                    className="border border-yellow rounded-lg p-4"
                  >
                    <h3 className="font-saira text-lg text-yellow">
                      {competition.title}
                    </h3>
                    <div className="flex justify-between mt-2">
                      <span className="text-white">
                        Prize: {competition.prize}
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-yellow text-yellow bg-opacity-50"
                      >
                        {competition.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-yellow-200">
                      Ends: {competition.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
