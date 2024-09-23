import React, { useState } from "react";
import axios from 'axios';
import { t } from "i18next";
import uploadImage from "../../assets/icons/uploadImage.svg"

interface ImageUploaderProps {
    uploadUrl: string; // URL для загрузки
    onUpload: (base64Image: string) => void; // Функция для обработки загруженного изображения
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadUrl, onUpload }) => {
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // Имя файла
    const [isUploading, setIsUploading] = useState(false); // Отслеживание процесса загрузки
    const [isUploaded, setIsUploaded] = useState(false); // Статус успешной загрузки

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name); // Устанавливаем имя файла
            setIsUploading(true); // Начинаем процесс загрузки
            try {
                const base64Image = await convertToBase64(file); // Конвертируем изображение в base64
                await uploadImageToServer(base64Image); // Загружаем изображение на сервер
                setIsUploaded(true); // Успешная загрузка
                onUpload(base64Image); // Вызов функции обратного вызова с base64 изображением
            } catch (error) {
                console.log(error);
            } finally {
                setIsUploading(false); // Завершаем процесс загрузки
            }
        }
    };

    // Конвертация файла в base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadImageToServer = async (base64Image: string) => {
        try {
            const response = await axios.patch(uploadUrl, {
                file: base64Image,
                status: "canceled",
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Image uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="mt-4 flex justify-center items-center p-2 border rounded-lg border-dashed border-defaultBlue">
            <label htmlFor="upload-image" className="flex items-center cursor-pointer">
                <img src={uploadImage} alt="Upload" className="mr-2" />
                {/* Если файл выбран, показать его имя, иначе "Upload Check" */}
                <span className="text-center">{selectedFileName ? selectedFileName : t('mainBlock.buttons.uploadCheck')}</span>
            </label>
            <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading || isUploaded}
            />
        </div>
    );
};

export default ImageUploader;
