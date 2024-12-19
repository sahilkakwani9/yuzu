"use client";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "Search AI Gaming models..",
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto mt-24">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-xl border-2 border-yellow  px-6 py-1.5 pr-12 bg-yellow bg-opacity-55 font-medium font-saira text-md text-lg text-yellow placeholder:text-yellow focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.3)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,0,0.4)]"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Search className="h-6 w-6 text-yellow" />
        </div>
      </div>
    </div>
  );
}
