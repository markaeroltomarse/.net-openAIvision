import Button from "@/components/Button";
import DragDrop from "@/components/UploadFiles";
import useAnalyzeImagesApi from "@/hooks/useAnalyzeImagesApi";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [images, setImages] = useState<File[]>([])
  const [imagesPreview, setImagesPreview] = useState<string[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  const { run: getAnalyzeImages, reset, data, isLoading, error: resError } = useAnalyzeImagesApi()

  useEffect(() => {
    const previews = images.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(previews).then((previewUrls) => {
      setImagesPreview(previewUrls)
    });
  }, [images])

  const handleOnClickAnalyze = async () => {
    setError(undefined)
    await getAnalyzeImages(imagesPreview)
  }


  const renderImageList = useCallback(() => {
    return imagesPreview.length > 0 && <>
      <h4 className="font-bold text-md">{imagesPreview.length} Image{imagesPreview.length > 1 && 's'}</h4>
      <br />
      <div className="grid grid-cols-3 gap-5">
        {
          imagesPreview.map((image: string) => <div className="relative aspect-square rounded-lg bg-slate-50"><Image alt="" className="rounded-lg" objectFit="contain" fill src={image} /></div>)
        }
      </div>
    </>
  }, [imagesPreview])

  const renderResult = useCallback(() => {
    if (!data || isLoading) return

    const answers: string[] = data.message.content.split('||')

    return <>
      <h4 className="font-bold text-md mb-2">Result</h4>
      <div className="rounded-md p-5 bg-slate-700 text-white flex flex-col gap-16">
        {
          data && !isLoading && answers?.map((result: string, index: number) => (
            <div className="flex gap-5 items-start ">
              <div className="pt-2 ">
                <div className="aspect-square w-[50px] rounded-md relative border bg-white">
                  <Image fill alt="" objectFit="contain" className="rounded-md" src={imagesPreview[index]} />
                </div>
              </div>

              <div className="break-words tracking-wide w-[100%] font-light">
                {result}
              </div>
            </div>
          ))
        }
      </div>
    </>
  }, [data, isLoading])

  return (
    <main
      className={`min-w-full flex container min-h-screen flex-col text-slate-800 justify-start items-center gap-3 py-24 ${inter.className}`}
    >
      <div className="md:w-[50%]">
        <h1 className="text-4xl font-bold"><b className="text-green-700">GPT 4</b> VISION</h1>

        <br />
        <p>
          Choose and upload images, which are then analyzed using OpenAI's Vision API.
        </p>

        <br />
        <div className="flex justify-between">
          <DragDrop onChangeFiles={(files, error) => {
            reset()
            setError(error)
            setImages(files)
          }} />

          <Button
            buttonAttributes={{
              className: `rounded-md p-5 flex gap-3 bg-green-700 text-green-50 hover:opacity-70 `,
              disabled: imagesPreview.length === 0,
              onClick: handleOnClickAnalyze
            }}
            isLoading={isLoading}
          >
            <h3 className="text-lg font-bold">Analyze</h3>
          </Button>
        </div>

        <br /><br />
        {
          (error || resError) && <div className="border-2 border-red-500 p-5 text-lg text-red-800 bg-red-200 rounded-md">
            {error || 'Image is too large'}
          </div>
        }

        <br />
        {renderImageList()}

        <br />
        {renderResult()}
      </div>
    </main>
  );
}
