import { useState, useEffect, useCallback } from "react";
import {createUrl} from '../services/urlService'

interface UseShortenedUrl {
  shortenedUrl: string | null;
  shortenUrl: (url: string) => void;
}

export const useShortenedUrl=(url:string): UseShortenedUrl => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");

  const shortenUrl = useCallback(async (url: string) => {
    try {
       let createUrlResponse = await createUrl(url)

      if (!createUrlResponse.ok) {
        throw new Error(`Failed to shorten URL: ${createUrlResponse.status} ${createUrlResponse.statusText}`);
      }
      const data = await createUrlResponse.json();
      setShortenedUrl(`https://urlshortener.smef.io/${data.id}`);
    } catch (error) {
      console.error(error);
      setShortenedUrl(null);
    }
  }, []);

  useEffect(() => {
    if (inputUrl) {
      shortenUrl(inputUrl);
    }
  }, [inputUrl, shortenUrl]);

  return { shortenedUrl, shortenUrl };
}

export default useShortenedUrl;
