import { IoMdImages } from "react-icons/io";

export const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

import React, { useRef } from "react";

interface IProps {
    onChangeFiles: (files: File[], isError?: string) => void;
}

function DragDrop(props: IProps) {
    const fileRef = useRef<any>(null)
    const MAX_SIZE = 1024 * 1024; // 1MB in bytes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const validFiles = Array.from(files).filter((file) => {
                // Check file type
                const fileType = file.type.split("/")[1].toUpperCase();
                if (!fileTypes.includes(fileType)) {
                    // File type not allowed
                    return false;
                }

                // Check file size
                if (file.size > MAX_SIZE) {
                    // File size exceeds the limit
                    console.error(`File ${file.name} exceeds the maximum size of 1MB`);
                    return false;
                }

                return true;
            });

            props.onChangeFiles(validFiles, validFiles.length !== files.length ? 'Some image is not valid or exceeds the maximum size of 1MB' : undefined);
        }
    };

    return (
        <>
            <button onClick={() => fileRef && fileRef.current.click()} className="rounded-md p-5 flex gap-3 bg-gray-300 hover:opacity-70">
                <h3 className="text-lg font-bold">Choose Images</h3>
                <IoMdImages size={30} />
            </button>
            <input
                type="file"
                accept=".jpg, .png, .gif"
                onChange={handleFileChange}
                multiple
                hidden
                ref={fileRef}
            />
        </>
    );
}

export default DragDrop;
