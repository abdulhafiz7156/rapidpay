import React from "react";

interface MethodBlockProps {
    title: string;
    imageSrc?: string; // Accepting imageSrc as a prop
    subtitle: string;
}

const MethodBlock: React.FC<MethodBlockProps> = ({ title, imageSrc, subtitle }) => {
    return (
        <div className="method-block flex items-center p-2.5 text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg w-full">
            <div>
                <h2>{title}</h2>
                {subtitle && (<p>{subtitle}</p>)}
            </div>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={title}
                    className="method-image"
                />
            )}
        </div>
    );
};

export default MethodBlock;
