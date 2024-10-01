import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import LandingHeader from "../../extras/LandingHeader";
import { LoadingView } from "app/shared-components/index";
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    ListSubheader,
    Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function FAQs() {
    const [faqsData, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function updateRecordState() {
            const inputJson = { status: "RELEASED", faqType: "EXTERNAL" };
            const response = await axios.post(`/faqs/list`, inputJson);
            const result = await response.data;
            if (result.messageId === 200) {
                const data = result.data;
                const categories = Object.keys(data).filter((item) => !!data[item]);
                setCategories(categories);
                setData(data);
            }
        }

        updateRecordState();
    }, []);

    const handleClick = (category, index) => {
        setIsOpen(!isOpen);
        faqsData[category][index].isOpen = faqsData[category][index].isOpen
            ? false
            : true;
    };

    /**
     * Wait while data is loading
     */
    if (!categories || !faqsData) {
        return <LoadingView />;
    }

    return (
        <>
            <LandingHeader />
            <div className="relative flex flex-col flex-auto min-w-0 overflow-hidden mt-20">
                <div
                    className="flex flex-col items-center px-24 py-40 sm:px-64 sm:pt-72 sm:pb-80 app-features"
                    sx={{ backgroundColor: "primary.main" }}
                >
                    <div className="w-full max-w-7xl">
                        <motion.div
                            className="flex flex-col w-full mb-20"
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.3 } }}
                        >
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                Frequently Asked Questions
                            </Typography>
                        </motion.div>

                        {categories.map((category) => {
                            return (
                                <List
                                    key={category}
                                    className="bg-white"
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            <Typography
                                                className="text-20 font-bold tracking-tight"
                                                color="secondary"
                                                variant="span"
                                            >
                                                {category}
                                            </Typography>
                                        </ListSubheader>
                                    }
                                >
                                    {faqsData[category].map((faq, i) => {
                                        return (
                                            <div key={faq._id}>
                                                <ListItemButton
                                                    className="pl-24"
                                                    onClick={() => handleClick(category, i)}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                className="text-16 tracking-tight font-medium"
                                                                color="primary"
                                                                variant="span"
                                                            >
                                                                Query: {faq?.question}
                                                            </Typography>
                                                        }
                                                    />
                                                    {faqsData[category][i].isOpen ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                                </ListItemButton>
                                                <Collapse
                                                    in={faqsData[category][i].isOpen}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <List component="div" disablePadding>
                                                        <ListItemButton className="pl-32">
                                                            <ListItemText
                                                                primary={
                                                                    <Typography
                                                                        className="text-16 tracking-tight"
                                                                        color="primary"
                                                                        variant="span"
                                                                    >
                                                                        Explanation: {" "}
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: faq?.answer,
                                                                            }}
                                                                        />
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </div>
                                        );
                                    })}
                                </List>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQs;
