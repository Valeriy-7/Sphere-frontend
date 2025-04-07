'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Paperclip,
  Smile,
  Send,
  Mic,
  X,
  MoreVertical,
  Play,
  Pause,
  ImageIcon,
  FileIcon,
  Camera,
  FileType,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

// Простой набор эмодзи для демонстрации
const emojiCategories = {
  recent: ['😀', '😂', '❤️', '👍', '👌', '🙏', '😊'],
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🙂', '😊', '😇', '😍', '😘'],
  people: ['👍', '👎', '👌', '✌️', '🤞', '🙏', '👏', '🙌', '👐', '🤲', '🤝'],
  nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐮'],
  food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑'],
  activities: ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥅', '🏒'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓'],
};

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<
    { name: string; size: string; type: string }[]
  >([]);
  const [recordedVoice, setRecordedVoice] = useState<{ duration: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0 || recordedVoice) {
      // Можно добавить логику для отправки файлов и голосовых сообщений
      onSendMessage(message || (recordedVoice ? '[Голосовое сообщение]' : '[Файл]'));
      setMessage('');
      setAttachedFiles([] as { name: string; size: string; type: string }[]);
      setRecordedVoice(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleFileUpload = (type: 'document' | 'image') => {
    if (type === 'document') {
      fileInputRef.current?.click();
    } else {
      imageInputRef.current?.click();
    }
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['doc', 'docx', 'pdf', 'txt', 'rtf'].includes(extension)) return 'document';
    return 'other';
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string = 'document',
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => {
      // Преобразуем размер в читаемый формат
      const sizeInKB = file.size / 1024;
      let size =
        sizeInKB < 1024
          ? `${Math.round(sizeInKB * 10) / 10} KB`
          : `${Math.round((sizeInKB / 1024) * 10) / 10} MB`;

      return {
        name: file.name,
        size,
        type: fileType === 'image' ? 'image' : getFileType(file.name),
      };
    });

    setAttachedFiles([...attachedFiles, ...newFiles]);
    // Сбрасываем input, чтобы можно было загрузить тот же файл повторно
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    const newFiles = [...attachedFiles];
    newFiles.splice(index, 1);
    setAttachedFiles(newFiles);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      // Останавливаем запись
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      // Сохраняем голосовое сообщение
      setRecordedVoice({ duration: formatTime(recordingTime) });
      setIsRecording(false);
      setRecordingTime(0);
    } else {
      // Начинаем запись
      setIsRecording(true);
      setRecordedVoice(null);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const cancelVoiceMessage = () => {
    setRecordedVoice(null);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Прикрепленные файлы */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1 text-xs"
            >
              {file.type === 'image' ? (
                <ImageIcon className="h-3.5 w-3.5 text-blue-500" />
              ) : (
                <FileIcon className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className="max-w-[150px] truncate font-medium">{file.name}</span>
              <span className="text-muted-foreground">{file.size}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full p-0"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Записанное голосовое сообщение */}
      {recordedVoice && (
        <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-2 dark:bg-purple-950/30">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-purple-100 p-0 dark:bg-purple-900/50"
          >
            <Play className="h-4 w-4 text-purple-700 dark:text-purple-400" />
          </Button>
          <div className="flex-1">
            <div className="flex justify-between text-xs">
              <span>Голосовое сообщение</span>
              <span>{recordedVoice.duration}</span>
            </div>
            <Progress value={100} className="h-1 w-full bg-purple-200 dark:bg-purple-800/50" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={cancelVoiceMessage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* UI для записи голосового сообщения */}
      {isRecording && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-2 dark:bg-rose-950/30">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-rose-500">
            <span className="absolute h-8 w-8 animate-ping rounded-full bg-rose-400 opacity-75"></span>
            <Mic className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs">
              <span>Запись голосового сообщения</span>
              <span>{formatTime(recordingTime)}</span>
            </div>
            <Progress value={((recordingTime % 60) / 60) * 100} className="h-1 w-full" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleVoiceRecord}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Кнопка прикрепления файла */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground"
          aria-label="Прикрепить файл"
          onClick={() => handleFileUpload('document')}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e, 'document')}
          multiple
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'image')}
          multiple
        />

        {/* Поле для ввода сообщения */}
        <div className="relative flex-1">
          <Input
            placeholder="Введите сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-lg border-muted/20 bg-background pr-10"
          />

          {/* Эмодзи */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-full text-muted-foreground"
                aria-label="Эмодзи"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Tabs defaultValue="recent">
                <div className="border-b px-3 py-2">
                  <TabsList className="grid grid-cols-8 gap-1">
                    <TabsTrigger value="recent">🕒</TabsTrigger>
                    <TabsTrigger value="smileys">😀</TabsTrigger>
                    <TabsTrigger value="people">👍</TabsTrigger>
                    <TabsTrigger value="nature">🐶</TabsTrigger>
                    <TabsTrigger value="food">🍎</TabsTrigger>
                    <TabsTrigger value="activities">⚽️</TabsTrigger>
                    <TabsTrigger value="travel">🚗</TabsTrigger>
                    <TabsTrigger value="symbols">❤️</TabsTrigger>
                  </TabsList>
                </div>

                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <TabsContent
                    key={category}
                    value={category}
                    className="max-h-[300px] overflow-y-auto"
                  >
                    <div className="grid grid-cols-8 gap-1 p-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-lg hover:bg-muted/50"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </PopoverContent>
          </Popover>
        </div>

        {/* Кнопка отправки или записи */}
        {message.trim() || attachedFiles.length > 0 || recordedVoice ? (
          <Button
            size="icon"
            className="rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900"
            onClick={handleSend}
            aria-label="Отправить сообщение"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="icon"
            className={`rounded-full ${isRecording ? 'bg-rose-700 hover:bg-rose-800' : 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-800'}`}
            onClick={handleVoiceRecord}
            aria-label="Голосовое сообщение"
          >
            {isRecording ? <Pause className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
