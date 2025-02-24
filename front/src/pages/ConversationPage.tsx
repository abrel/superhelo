import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import cx from 'classnames';
import {
  useHandleQuestionMutation,
  useRetriveConversationQuery,
} from '@@/services/conversation';
import { formatMessageText } from '@@/utils/format';
import { MessageTypes } from '@@/constants/message';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StandardInput from '@@/components/Inputs/StandardInput';
import TypingIndicator from '@@/components/TypingIndicator';
import AuthenticatedLink from '@@/components/AuthenticatedLink';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import { LuArrowUpFromLine, LuPaperclip } from 'react-icons/lu';
import { CiCirclePlus } from 'react-icons/ci';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';

import MicRecorder from '@@/components/MicRecorder';

const schema = yup
  .object({
    question: yup
      .string()
      .required('Veuillez entrer votre question ici')
      .min(5, 'Votre question doit contenir au moins 5 caractères'),
  })
  .required();

type ConversationInput = {
  question: string;
  files?: File[];
};

const ConversationPage: React.FC = () => {
  const { conversationId } = useParams<{
    conversationId?: string;
  }>();
  const navigate = useNavigate();
  const [handleQuestion, { isLoading, isSuccess, data }] =
    useHandleQuestionMutation();

  const { data: conversation } = useRetriveConversationQuery(conversationId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ConversationInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [question, files] = watch(['question', 'files']);
  const [questionInProcess, setQuestionInProcess] = useState<ConversationInput>(
    {
      question: '',
      files: [],
    },
  );

  const onSubmit = useCallback(
    (input: ConversationInput) => {
      handleQuestion({
        question: input.question,
        files: input.files,
        conversationId,
      });

      setQuestionInProcess({
        question: input.question,
        files: input.files,
      });

      setTimeout(() => {
        document
          .getElementById('typing-indicator')
          ?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }, 500);
    },
    [conversationId, handleQuestion, setQuestionInProcess],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && question) {
        onSubmit({ question, files });
      }
    },
    [question, onSubmit],
  );

  const handleMic = useCallback(
    (err: Error | null, txt: string | null) => {
      if (err) {
        return;
      }
      if (txt) {
        setValue('question', txt);
      }
    },
    [setValue],
  );

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('question')?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    if (conversation?.length) {
      const lastMessage = conversation[conversation.length - 1];
      const lastMessageDOM = document.getElementById(lastMessage.id);
      if (lastMessageDOM) {
        setTimeout(() => {
          lastMessageDOM.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }, 500);
      }
    }
  }, [conversation]);

  useEffect(() => {
    reset({ question: '', files: [] });
  }, [isLoading, reset]);

  useEffect(() => {
    if (isSuccess) {
      setQuestionInProcess({ question: '', files: [] });
      if (!conversationId) {
        navigate(`/conversations/${data?.[0]?.conversationId}`);
      }
    }
  }, [isSuccess, data, conversationId, navigate]);

  return (
    <div className="relative flex flex-col px-6 py-4 h-[calc(100svh-60px)] sm:h-screen">
      <div className="flex-1 overflow-y-auto">
        {!conversation?.length && !isLoading && (
          <p className="mt-4 text-center px-4 w-fit mx-auto sm:w-[500px]">
            Bonjour je suis&nbsp;
            <span className="text-black text-lg font-bold">Super</span>
            <span className="text-yellow-500 text-lg font-bold ml-1">Hélo</span>
            , je suis là pour répondre à toutes vos question sur les mesures de
            protection des majeurs. Que puis-je faire pour vous ?
          </p>
        )}
        <div className="mx-auto w-full sm:max-w-[1000px]">
          {conversation?.map((message) => (
            <div
              key={message.id}
              id={message.id}
              className={cx(
                'relative mb-4 p-4 rounded-lg break-words max-w-[calc(100%-20px)] sm:max-w-[800px] w-fit',
                message.type === MessageTypes.HUMAN
                  ? 'bg-green-200 ml-auto'
                  : 'bg-gray-200 mr-auto',
              )}
            >
              {message?.documentIds?.map((doc) => (
                <AuthenticatedLink
                  key={doc.id}
                  documentId={`${doc.id}/${message.conversationId}`}
                  className="flex flex-row items-center mb-1 bg-gray-100 border border-gray-200 p-1 rounded-md w-fit"
                >
                  {doc.mimetype.includes('image') ? (
                    <AuthenticatedImage
                      documentId={`${doc.id}/${message.conversationId}`}
                      alt={doc.name}
                      className="h-10 w-10 content-center object-cover rounded-lg"
                    />
                  ) : (
                    <IoDocumentTextOutline size={22} />
                  )}
                  <span className="ml-1">{doc.name}</span>
                </AuthenticatedLink>
              ))}

              <div
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(message.content),
                }}
              />

              <div className="flex flex-row justify-end">
                <p className="text-sm text-gray-500 text-right italic mr-1">
                  {moment(message.createdAt).calendar()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div
              key="current-message"
              className={cx(
                'relative mb-4 p-4 rounded-lg break-words max-w-[calc(100%-20px)] sm:max-w-[800px] w-fit bg-green-200 ml-auto',
              )}
            >
              {questionInProcess?.files?.map((file, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center bg-gray-100 border border-gray-200 p-1 rounded-md w-fit"
                >
                  {file.type.includes('image') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-10 w-10 content-center object-cover rounded-lg"
                    />
                  ) : (
                    <IoDocumentTextOutline size={22} />
                  )}
                  <span className="ml-1">{file.name}</span>
                </div>
              ))}
              <p className="mt-0.5">{questionInProcess?.question}</p>
            </div>
          )}
          {isLoading && (
            <div
              key="typing-indicator"
              id="typing-indicator"
              className={cx(
                'relative mb-4 p-4 rounded-lg max-w-[800px] w-4/5 sm:w-fit bg-gray-200 mr-auto',
              )}
            >
              <TypingIndicator />
            </div>
          )}
        </div>
      </div>

      <div
        id="input-bar"
        className="py-4 relative bottom-0 mx-auto w-full sm:max-w-[1000px]"
      >
        {!!conversationId && (
          <Link
            reloadDocument
            className="bg-gray-400 w-fit py-1 px-2 rounded-md mx-auto mb-2 flex flex-row items-center"
            to="/conversations"
          >
            <CiCirclePlus className="text-white" size={18} />
            <span className="text-xs text-white ml-1">
              Nouvelle conversation
            </span>
          </Link>
        )}

        <div className="relative bg-white h-30 border border-blue-300 p-0.5 rounded-md">
          {!!files?.length && (
            <div className="m-1 flex flex-row items-center">
              {Array.from(files).map((file: any, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center bg-gray-200 p-1 m-0.5 rounded-md w-fit"
                >
                  <p className="font-main">{file.name}</p>
                  <button
                    className="ml-2"
                    onClick={() => {
                      const newFiles = Array.from(files).filter(
                        (_: any, index: number) => index !== i,
                      );
                      setValue('files', newFiles);
                    }}
                  >
                    <TiDelete className="text-red-500" size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <StandardInput
            register={register}
            id="question"
            label="Vos question(s)"
            type="textarea"
            placeholder={errors.question?.message || 'Vos question(s)'}
            rows={3}
            handleKeyDown={handleKeyDown}
            labelClassName="hidden"
            inputClassName={cx(
              'block outline-none resize-none w-full text-sm py-3 px-4',
              errors.question && 'placeholder-red-500 placeholder-opacity-75',
            )}
          />

          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-row items-center w-full">
              <label
                htmlFor="files"
                className="bg-gray-200 p-1 m-0.5 mr-1 rounded-md cursor-pointer"
              >
                <LuPaperclip size={18} />
                <Controller
                  control={control}
                  name="files"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        value=""
                        onChange={(event) => {
                          const newFiles = event.target.files
                            ? Array.from(event.target.files)
                            : [];
                          const existingFiles = Array.isArray(field.value)
                            ? field.value
                            : [];
                          field.onChange([...existingFiles, ...newFiles]);
                        }}
                        type="file"
                        id="files"
                        multiple
                        className="hidden"
                      />
                    );
                  }}
                />
              </label>
              <MicRecorder cb={handleMic} />
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-gray-500 m-0.5 p-1 rounded-md ml-2"
            >
              <LuArrowUpFromLine size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
