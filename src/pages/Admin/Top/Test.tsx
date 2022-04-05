import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase_config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";

type Props = {};

const SImage = styled.img`
  height: 10rem;
`;

export const Test: React.FC<Props> = () => {
  const imageRef = ref(getStorage(), "Test/imageId2.svg");
  const audioRef = ref(getStorage(), "UsoSE.wav");
  const [url, setUrl] = useState<string>("");
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const [audio2] = useState<HTMLAudioElement>(new Audio());
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [urls, setUrls] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<ArrayBuffer | undefined>();
  const [soundUrl, setSoundUrl] = useState<string>();
  const { stamps } = useSelector((state: RootState) => state.stamps);
  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
      const img = new Image(100, 100);
      setImage(img);
      img.src = url;
    });
    getDownloadURL(audioRef).then((url) => {
      setAudio(new Audio(url));
    });
  }, []);

  useEffect(() => {}, [audio, image]);

  const _handler = () => {
    console.log("click");
    setUrls([...urls, url]);
  };

  const play = () => {
    if (audio) audio.play();
  };

  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (reader) => {
        const result = reader.target?.result;
        if (result) {
          if (typeof result === "string") {
            setImageUrl(result);
            console.log("URLとして読み込まれました");
          } else {
            setImageFile(result);
            console.log("ファイルとして読み込まれました");
          }
        }
      };
      //reader.readAsDataURL(file);
      reader.readAsArrayBuffer(file);
    }
  };

  const onChangeSoundfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (reader) => {
        const result = reader.target?.result;
        if (result) {
          if (typeof result === "string") {
            setSoundUrl(result);
            audio2.src = result;
            console.log("URLとして読み込まれました");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const playSound = () => {
    audio2.play();
  };

  const upload = () => {
    if (imageFile) {
      uploadBytes(ref(getStorage(), "Test/imageId2.svg"), imageFile);
    } else {
      console.log("がぞうをいれて");
    }
  };

  return (
    <div>
      <h1>管理者トップ</h1>
      <div>
        <button onClick={_handler}>画像を増やす</button>
        <button onClick={play}>再生</button>
      </div>
      <div>{JSON.stringify(stamps)}</div>
      <div>
        <input type="file" src={imageUrl} onChange={onChangeInputFile} />
        <img src={imageUrl} alt="" />
        <button onClick={upload}>アップロード</button>
      </div>
      <div>
        <input type="file" src={soundUrl} onChange={onChangeSoundfile} />
        <button onClick={playSound}>再生</button>
      </div>
      <div>
        imageRef:
        <ul>
          <li>fullpath: {imageRef.fullPath}</li>
          <li>name: {imageRef.name}</li>
          <li>bucket: {imageRef.bucket}</li>
          <li>
            from URL
            <SImage src={url} alt="image" />
          </li>
          {/* <li>
            from Blob
            <img src={url2} alt="image2" />
          </li> */}
        </ul>
      </div>
      <div>
        audioRef:
        <ul>
          <li>fullpath: {audioRef.fullPath}</li>
          <li>name: {audioRef.name}</li>
          <li>bucket: {audioRef.bucket}</li>
        </ul>
      </div>
      <ul>
        {urls.map((url, index) => (
          <SImage key={index} src={url} alt="増やした画像" />
        ))}
      </ul>
    </div>
  );
};
