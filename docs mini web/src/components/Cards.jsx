import React from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaRegWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";

function Cards({ data, reference }) {
    
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    const iconHoverVariants = {
        hover: { scale: 1.2, rotate: 15 },
    };

    return (
        <motion.div
            drag
            dragConstraints={reference}
            dragSnapToOrigin
            whileDrag={{ scale: 1.15 }}
            dragElastic={0.2}
            dragTransition={{ bounceDamping: 8, bounceStiffness: 250 }}
            className="relative flex-shrink-0 bg-zinc-900/90 rounded-[45px] w-60 h-72 text-white py-10 px-8 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div variants={iconHoverVariants} whileHover="hover">
                <FaRegFileAlt />
            </motion.div>
            <p className='font-semibold text-sm leading-tight mt-5'>{data.desc}</p>
            <div className="footer absolute bottom-0 w-full left-0">
                <div className='flex items-center justify-between mb-3 px-8 py-3'>
                    <h5>{data.filesize}</h5>
                    <motion.span
                        className='w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center'
                        variants={iconHoverVariants}
                        whileHover="hover"
                    >
                        {data.close ? <FaRegWindowClose /> : <PiDownloadSimpleBold />}
                    </motion.span>
                </div>
                {data.tag && data.tag.isOpen && (
                    <motion.div
                        className={`tag w-full py-4 ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} flex items-center justify-center`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                    >
                        <h3 className='text-sm font-semibold'>{data.tag.tagTitle}</h3>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default Cards;
