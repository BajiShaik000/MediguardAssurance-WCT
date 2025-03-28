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
import { useAppDispatch, useAppSelector } from "hooks";
import { Switch } from "@progress/kendo-react-inputs";
import AgentAvatar from "./Agent.jpeg";
import PatientAvatar from "./Patient.png";
import { Dialog } from "@progress/kendo-react-dialogs";
import { KnowYourPolicy } from "./KnowYourPolicy";
import { DragDropFile } from "./DragDropFile";
import { setChatHistory } from "store";

export const CallInProgress: FC = () => {
  const { isLoggedIn, policyInfo, patientName, chatHistory } = useAppSelector(
    (state) => state.config
  );
  console.log(isLoggedIn, policyInfo, patientName);
  const dispatch = useAppDispatch();

  const AUTHORS: User[] = [
    {
      id: "user",
      name: patientName,
      avatarUrl: PatientAvatar,
    },
    {
      id: "assistant",
      // name: "MediGuard Agent",
      avatarUrl: AgentAvatar,
    },
  ];

  const initialMessage: Message[] = [
    {
      author: AUTHORS[1],
      text: `Hi${
        patientName === "Guest" ? "" : ` ${patientName}`
      }, I am Mediguard Assurance Agent. How can I help you?`,
      timestamp: new Date(),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessage);

  // useEffect(() => {
  //   setMessages(initialMessage);
  // }, [initialMessage]);

  const MessageTemplate = (props: any) => {
    return (
      props.item.text && (
        <div className="k-bubble" key={props.item?.id}>
          <ReactMarkdown>{props.item.text}</ReactMarkdown>
        </div>
      )
    );
  };

  const AttachmentTemplate = (props: any) => {
    let attachment = props.item;
    return (
      <div className="k-card k-card-type-rich">
        <div className="k-card-body quoteCard">
          <img
            style={{ maxHeight: "124px" }}
            src={attachment.content}
            draggable={false}
            alt="content"
          />
        </div>
      </div>
    );
  };

  const generalSuggestedActions: any = [
    "What does health insurance policy cover?",
    "Does policy cover inpatient hospitalization?",
    "How do I file a claim for reimbursement?",
    "How can I get cashless treatment at a hospital?",
  ];
  const personalSuggstedActions: any = [
    "What is the effective period of my policy?",
    "What are my major covered illnesses?",
    "What are my excluded illnesses?",
    "Know about your claim status",
  ];

  const suggestedActions = isLoggedIn
    ? personalSuggstedActions
    : generalSuggestedActions;

  const onMessageSend = async (e?: ChatMessageSendEvent, text?: string) => {
    const userMessage: Message = {
      author: AUTHORS[0],
      text: text?.trim() ?? e?.message.text?.trim(),
      timestamp: e?.message.timestamp ?? new Date(),
    };

    setMessages((old) => [
      ...(old ?? []),
      userMessage,
      { author: AUTHORS[1], typing: true },
    ]);

    if (userMessage.text === "Know about your claim status") {
      setTimeout(() => {
        setMessages((old) => {
          const finalMessages = [
            ...(old ?? []).slice(0, old.length - 2),
            userMessage,
            {
              author: AUTHORS[1],
              text: `**Claim Amount:** $${policyInfo[`claim_amount($)`]}
               **Claim Status:** ${policyInfo.claim_status}`,
              timestamp: new Date(),
            },
          ];
          return finalMessages;
        });
      }, 2000);
    } else {
      try {
        const response = await fetch(
          "https://func-hlsbot-v1.azurewebsites.net/api/func-http-policy?",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_input: isLoggedIn ? 2 : 1,
              policy_id: isLoggedIn ? policyInfo.policy_id : "",
              query: text?.trim() ?? e?.message.text?.trim(),
            }),
          }
        );
        const data = await response.text();

        if (data) {
          setMessages((old) => {
            const finalMessages = [
              ...(old ?? []).slice(0, old.length - 2),
              userMessage,
              {
                author: AUTHORS[1],
                text: data,
                timestamp: new Date(),
              },
            ];
            return finalMessages;
          });
        } else {
          setMessages((old) => [...(old ?? []).slice(0, old.length - 1)]);
        }
        // dispatch(setChatHistory(messages));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const customMessage = (props: ChatMessageBoxProps) => {
    return (
      <>
        {props.messageInput}
        {props.sendButton}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div
          className={styles.header}
          style={
            messages.length < 2
              ? {}
              : {
                  position: "absolute",
                  top: "1%",
                  left: "40%",
                  flexDirection: "row",
                  gap: "5px",
                }
          }
        >
          {" "}
          <img src={AgentAvatar} alt="agent-icon" />
          <h2>MediGuard Agent</h2>
        </div>
        <div className={styles.middleContainer}>
          <div
            style={
              messages.length < 2
                ? { height: "50%", width: "80%" }
                : { width: "100%", height: "660px" }
            }
          >
            <Chat
              messageTemplate={MessageTemplate}
              attachmentTemplate={AttachmentTemplate}
              onMessageSend={onMessageSend}
              className={styles.chat}
              user={AUTHORS[0]}
              messages={messages}
              messageBox={customMessage}
            />
          </div>
          <div
            className={styles.actionBtnContainer}
            style={messages.length < 2 ? {} : { width: "99%" }}
          >
            <div className={styles.toggleBtnContainer}>
              <KnowYourPolicy />
              {/* {isLoggedIn && <DragDropFile />} */}
            </div>
            <div
              className={styles.clearChat}
              style={
                messages.length < 2
                  ? {
                      cursor: "not-allowed",
                      opacity: "0.2",
                    }
                  : {}
              }
              onClick={() => setMessages(initialMessage)}
            >
              <Delete24Regular />
              <span>Clear Chat</span>
            </div>
          </div>
          {messages.length < 2 && (
            <div
              className={styles.suggestedActionsContainer}
              style={{ width: "80%" }}
            >
              {suggestedActions.map((item: any, index: number) => (
                <div
                  key={index}
                  className={styles.suggestedAction}
                  onClick={() => onMessageSend(undefined, item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          <p
            style={
              messages.length < 2
                ? { color: "#323130", width: "80%", marginTop: "10px" }
                : {
                    color: "#323130",
                    width: "99%",
                  }
            }
          >
            ** AI generated content may be incomplete or factually incorrect.
          </p>
        </div>
      </div>
    </div>
  );
};
