import React, { useEffect, useState } from "react";

import { unsplashAccessKey, unsplashSecretKey } from "@/config";

import axios, { AxiosError, CancelTokenSource } from "axios";
import { Photo } from "./types";

export const RandomImageFetching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo | []>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData(source)
      .then(() => {
        console.log("Fetching data");
      })
      .catch((e) => console.error(e));

    return () => {
      source.cancel("Request Cancelled");
    };
  }, []);

  const fetchData = async (source: CancelTokenSource): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Photo>(
        `https://api.unsplash.com/photos`,
        {
          cancelToken: source.token,
          headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`,
          },
        }
      );
      setPhotos(data);
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log("Error:", error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div>
        <h1>An Image Fetching Component With NextJS</h1>
        {isLoading ? <p>Loading....</p> : null}
      </div>
    </section>
  );
};
