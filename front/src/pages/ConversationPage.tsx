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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StandardInput from '@@/components/Inputs/StandardInput';
import TypingIndicator from '@@/components/TypingIndicator';
import { LuArrowUpFromLine } from 'react-icons/lu';
import { CiCirclePlus } from 'react-icons/ci';

const schema = yup
  .object({
    question: yup
      .string()
      .required('Veuillez entrer votre question')
      .min(5, 'Votre question doit contenir au moins 5 caractères'),
  })
  .required();

type ConversationInput = {
  question: string;
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
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ConversationInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [question] = watch(['question']);
  const [questionInProcess, setQuestionInProcess] = useState<string>('');

  const onSubmit = useCallback(
    (input: ConversationInput) => {
      handleQuestion({
        question: input.question,
        conversationId,
      });

      setQuestionInProcess(input.question);

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
        onSubmit({ question });
      }
    },
    [question, onSubmit],
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
    reset({ question: '' });
  }, [isLoading, reset]);

  useEffect(() => {
    if (isSuccess) {
      setQuestionInProcess('');
      if (!conversationId) {
        navigate(`/conversations/${data?.[0]?.conversationId}`);
      }
    }
  }, [isSuccess, data, conversationId, navigate]);

  return (
    <div className="relative flex flex-col px-8 sm:p-0 h-[calc(100svh-60px)] sm:h-screen">
      <div className="flex-1 overflow-y-auto p-4">
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
                'relative mb-4 p-4 rounded-lg break-words max-w-[800px] w-4/5 sm:w-fit',
                message.type === MessageTypes.HUMAN
                  ? 'bg-green-200 ml-auto'
                  : 'bg-gray-200 mr-auto',
              )}
            >
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
                'relative mb-4 p-4 rounded-lg max-w-[800px] w-4/5 sm:w-fit bg-green-200 ml-auto',
              )}
            >
              <p>{questionInProcess}</p>
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

      <div id="input-bar" className="p-4">
        <div className="relative bottom-0 mx-auto w-full sm:max-w-[1000px]">
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
          <StandardInput
            register={register}
            id="question"
            label="Vos question(s)"
            type="textarea"
            placeholder="Vos question(s)"
            error={errors.question}
            rows={4}
            handleKeyDown={handleKeyDown}
            labelClassName="hidden"
            inputClassName="peer block w-full ring-1 ring-gray-200 shadow-sm py-3 px-4 border-main rounded-md font-main text-sm"
          />
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={cx(
              'bg-gray-500 p-2 rounded-md absolute right-2',
              errors.question ? 'bottom-8' : 'bottom-2',
            )}
          >
            <LuArrowUpFromLine className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
