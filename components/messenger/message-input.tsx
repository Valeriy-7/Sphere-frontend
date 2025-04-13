'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
  onFileUpload?: (files: File[]) => void;
  onVoiceRecord?: (blob: Blob, durationSeconds: number) => void;
  placeholder: string;
  disabled?: boolean;
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

const MessageInput = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  onVoiceRecord,
  placeholder,
  disabled = false,
}: MessageInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<
    { name: string; size: string; type: string; file: File }[]
  >([]);
  const [recordedVoice, setRecordedVoice] = useState<{
    duration: string;
    durationSeconds: number;
    blob?: Blob;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const handleSend = () => {
    if (value.trim() || attachedFiles.length > 0 || recordedVoice) {
      let content = value.trim();

      // Если есть прикрепленные файлы или голосовое сообщение, но нет текста
      if (!content && (attachedFiles.length > 0 || recordedVoice)) {
        content = recordedVoice ? '[Голосовое сообщение]' : '[Файл]';
      }

      // Отправляем файлы, если есть
      if (attachedFiles.length > 0 && onFileUpload) {
        const files = attachedFiles.map((item) => item.file);
        onFileUpload(files);
      }

      // Отправляем голосовое сообщение, если есть
      if (recordedVoice?.blob && onVoiceRecord) {
        onVoiceRecord(recordedVoice.blob, recordedVoice.durationSeconds);
      }

      // Вызываем колбэк с текстом сообщения
      onSend(content);

      // Очищаем прикрепленные файлы
      setAttachedFiles([]);
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
    onChange(value + emoji);
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
    if (!files || files.length === 0) return;

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
        file, // Сохраняем оригинальный файл
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

  const handleVoiceRecord = async () => {
    if (isRecording) {
      // Останавливаем запись
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Останавливаем медиа рекордер
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      setIsRecording(false);
    } else {
      try {
        // Запрашиваем доступ к микрофону
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Создаем медиа рекордер
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        // Обработчик для сохранения аудио данных
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        // Обработчик для сохранения записи при остановке
        mediaRecorder.onstop = () => {
          // Создаем blob из собранных кусков аудио
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });

          // Сохраняем голосовое сообщение
          setRecordedVoice({
            duration: formatTime(recordingTime),
            durationSeconds: recordingTime,
            blob: audioBlob,
          });

          // Останавливаем все треки стрима
          stream.getTracks().forEach((track) => track.stop());
        };

        // Начинаем запись
        mediaRecorder.start();
        setIsRecording(true);
        setRecordedVoice(null);

        // Запускаем таймер для обновления времени записи
        setRecordingTime(0);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } catch (error) {
        console.error('Ошибка при попытке записи голосового сообщения:', error);

        // Показываем сообщение об ошибке пользователю
        alert('Не удалось получить доступ к микрофону. Пожалуйста, проверьте разрешения браузера.');
      }
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

  useEffect(() => {
    // Очистка ресурсов при размонтировании компонента
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

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
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleVoiceRecord}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Поле ввода сообщения */}
      <div className="flex items-center gap-1 rounded-lg bg-background">
        <div className="flex items-center gap-0.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                disabled={disabled}
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[320px] p-2 sm:w-[350px]" sideOffset={5}>
              <Tabs defaultValue="recent">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="recent">Недавние</TabsTrigger>
                  <TabsTrigger value="smileys">Смайлы</TabsTrigger>
                  <TabsTrigger value="people">Люди</TabsTrigger>
                  <TabsTrigger value="symbols">Символы</TabsTrigger>
                </TabsList>
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <TabsContent key={category} value={category} className="mt-2">
                    <div className="grid grid-cols-8 gap-1">
                      {emojis.map((emoji, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          className="h-8 w-8 rounded-md p-0 text-base hover:bg-muted"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                disabled={disabled}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[200px] p-2" sideOffset={5}>
              <div className="grid gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2"
                  onClick={() => handleFileUpload('image')}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Изображение</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2"
                  onClick={() => handleFileUpload('document')}
                >
                  <FileIcon className="h-4 w-4" />
                  <span>Документ</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e)}
          multiple
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e, 'image')}
          accept="image/*"
          multiple
        />

        <div className="flex-1">
          <Textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-10 max-h-32 min-h-[40px] w-full resize-none border-0 px-3 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={disabled || isRecording}
            onKeyDown={handleKeyDown}
          />
        </div>

        {value.trim() || attachedFiles.length > 0 || recordedVoice ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-primary hover:bg-primary/10 hover:text-primary"
            onClick={handleSend}
            disabled={disabled}
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            onClick={handleVoiceRecord}
            disabled={disabled}
          >
            {isRecording ? <Pause className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
