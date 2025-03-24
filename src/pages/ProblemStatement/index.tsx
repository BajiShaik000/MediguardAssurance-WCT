import { Delete24Regular } from "@fluentui/react-icons";
import ReactMarkdown from "react-markdown";
import {
  Chat,
  ChatMessageBoxProps,
  ChatMessageSendEvent,
  Message,
  User,
} from "@progress/kendo-react-conversational-ui";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import KPI from './chatbot_kpi.png'

export const ProblemStatement: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h4>Building a chatbot to help insurance members quickly get answers about their healthcare claims anytime, improving member experience and reducing wait times.</h4>
        <img src={KPI} alt="architecture" />
      </div>
    </div>
  );
};
