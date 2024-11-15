"use client";
import React, { useState } from "react";
import axios from "axios";

interface IUrlResponse {
  data: {
    originalUrl: string;
    shortCode: string;
  };
}

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleShorten = async () => {
    try {
      const response = await axios.post<IUrlResponse>("http://localhost:5001", {
        originalUrl,
      });

      setShortUrl(`http://localhost:5001/${response.data.data.shortCode}`);
    } catch (error) {
      console.error("Error creating shortened URL", error);
    }
  };

  const handleCopy = (): void => {
    if (shortUrl) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          setCopySuccess("Successfully copied the short link!");
          setTimeout(() => setCopySuccess(""), 5000);
        })
        .catch((error) => console.error("Failed to copy the URL", error));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="uppercase text-4xl font-semibold">URLs Shortener</h1>
      <div className="text-center box-border">
        <h4 className="capitalize">Paste URL to be shortened</h4>
        <div>
          <input
            type="text"
            placeholder="Paste URL here"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="p-3 m-3 border border-gray-300 rounded-md w-80 text-black"
          />
          <button
            onClick={handleShorten}
            className="p-3 m-3 bg-slate-700 rounded-md hover:bg-slate-800"
          >
            Shorten URL
          </button>
        </div>
        {shortUrl && (
          <div className="flex flex-col items-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold underline mb-2"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-500 rounded-md"
            >
              Copy Short URL
            </button>
            {copySuccess && (
              <p className="text-green-600 mt-2">{copySuccess}</p>
            )}
          </div>
        )}
        <p className="mt-4">
          ShortURL is a free tool to shorten URLs and generate easy-to-share
          links.
        </p>
      </div>
    </div>
  );
}
