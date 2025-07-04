import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Cards from './Cards';

function Foreground() {
    const ref = useRef(null);

    const data = [
        {
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            filesize: ".9mb",
            close: true,
            tag: { isOpen: true, tagTitle: "Download Now", tagColor: "blue" }
        },
        {
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            filesize: ".4mb",
            close: true,
            tag: { isOpen: false, tagTitle: "Download Now", tagColor: "blue" }
        },
        {
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            filesize: ".5mb",
            close: false,
            tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green" }
        },
        {
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            filesize: ".3mb",
            close: false,
            tag: { isOpen: true, tagTitle: "Upload Now", tagColor: "green" }
        }
    ];

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delays between each child element animation
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            ref={ref}
            className="fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {data.map((item, index) => (
                <motion.div key={index} variants={cardVariants}>
                    <Cards data={item} reference={ref} />
                </motion.div>
            ))}
        </motion.div>
    );
}

export default Foreground;
