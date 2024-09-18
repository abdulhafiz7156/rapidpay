import React from "react";

interface MethodBlockProps {
    title: string;
    imageSrc?: string;
}

const MethodBlock: React.FC<MethodBlockProps> = ({ title, imageSrc }) => {
    return (
        <div className="method-block flex items-center p-2.5 text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg">
            <h2>{title}</h2>
            {imageSrc && <img src={imageSrc} alt={title} className="method-image" />}
        </div>
    );
}
export default MethodBlock