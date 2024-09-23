import React, { useState } from "react";
import './ProgressTransaction.css';
import { t } from "i18next";


const ProgressTransaction: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col p-2.5 bg-lightBackground dark:bg-darkBackgroundBlocks text-lightText dark:text-darkText mt-5 rounded-lg">
            <div className="flex gap-2 items-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.52271 9.01766V4.78202C5.52279 4.72903 5.53713 4.67703 5.56422 4.63148C5.59131 4.58594 5.63016 4.54851 5.67668 4.52314C5.7232 4.49776 5.7757 4.48536 5.82866 4.48725C5.88162 4.48913 5.9331 4.50522 5.97771 4.53384L9.27261 6.65107C9.31433 6.6778 9.34866 6.71459 9.37244 6.75807C9.39622 6.80154 9.40868 6.85029 9.40868 6.89984C9.40868 6.94939 9.39622 6.99814 9.37244 7.04162C9.34866 7.08509 9.31433 7.12188 9.27261 7.14861L5.97771 9.26643C5.9331 9.29505 5.88162 9.31114 5.82866 9.31303C5.7757 9.31491 5.7232 9.30251 5.67668 9.27714C5.63016 9.25176 5.59131 9.21434 5.56422 9.16879C5.53713 9.12324 5.52279 9.07125 5.52271 9.01825V9.01766Z"
                        fill="currentColor" />
                    <path
                        d="M0.5 6.8999C0.5 3.31013 3.41023 0.399902 7 0.399902C10.5898 0.399902 13.5 3.31013 13.5 6.8999C13.5 10.4897 10.5898 13.3999 7 13.3999C3.41023 13.3999 0.5 10.4897 0.5 6.8999ZM7 1.28627C5.51117 1.28627 4.08332 1.8777 3.03056 2.93046C1.9778 3.98322 1.38636 5.41107 1.38636 6.8999C1.38636 8.38873 1.9778 9.81658 3.03056 10.8693C4.08332 11.9221 5.51117 12.5135 7 12.5135C8.48883 12.5135 9.91668 11.9221 10.9694 10.8693C12.0222 9.81658 12.6136 8.38873 12.6136 6.8999C12.6136 5.41107 12.0222 3.98322 10.9694 2.93046C9.91668 1.8777 8.48883 1.28627 7 1.28627Z"
                        fill="currentColor" />
                </svg>

                <p className="underline">
                    <a href="https://www.youtube.com/watch?v=bb5dvg4_rms" target="_blank" rel="noopener noreferrer">{t('mainBlock.progressTransaction.videoInstruction')}</a>
                </p>
            </div>

            {isExpanded ? (
                <div className="mt-6 bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg">
                    <div className="py-1 flex gap-2 items-center">
                        <div className="circle"></div>
                        <p>{t('mainBlock.progressTransaction.text1')}</p>
                    </div>
                    <div className="line w-px h-8 ml-1.5"></div>
                    <div className="py-1 flex gap-2 items-center">
                        <div className="circle-with-hole"></div>
                        <p>{t('mainBlock.progressTransaction.text2')}</p>
                    </div>
                    <div className="line-grey w-px h-8 ml-1.5"></div>
                    <div className="py-1 flex gap-2 items-start">
                        <div className="circle-grey mt-1"></div>
                        <p className="flex-1">{t('mainBlock.progressTransaction.text3')}</p>
                    </div>
                </div>
            ) : (
                <div className="py-1 flex gap-2 items-center mt-6">
                    <div className="circle"></div>
                    <p>{t('mainBlock.progressTransaction.text1')}</p>
                </div>
            )}

            <div className="text-center flex justify-center">
                <button
                    className="mt-3 pb-1"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ?
                        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 4.3999L4.5373 1.3999L1 4.3999" stroke="currentColor" />
                        </svg>
                        : <div className="flex items-center gap-1">
                            <h6>{t('mainBlock.progressTransaction.next')}</h6>
                            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.399902L3.9627 3.3999L7.5 0.399902" stroke="currentColor" />
                            </svg>
                        </div>}
                </button>
            </div>
        </div>
    );
}

export default ProgressTransaction;
